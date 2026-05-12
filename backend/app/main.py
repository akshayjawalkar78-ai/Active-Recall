from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import Session, select
from typing import List, Optional
import json
import os
import re

# Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Active Recall Coach API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Global Error Handler to prevent "Internal Server Error" text
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Server Error: {str(exc)}"}
    )

# Input Sanitization Helper
def sanitize_input(text: str) -> str:
    if not text: return ""
    # Basic XSS protection: remove script tags and html
    clean = re.sub(r'<[^>]*?>', '', text)
    return clean.strip()

from .database import create_db_and_tables, get_session
from .models import User, Folder, StudySession, TopicMastery

# NLP and SM-2 Imports
import nltk
from datetime import datetime, timedelta

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab')
from rake_nltk import Rake

def calculate_sm2(quality: int, repetitions: int, previous_interval: int, previous_ease_factor: float):
    if quality >= 3:
        if repetitions == 0:
            interval = 1
        elif repetitions == 1:
            interval = 6
        else:
            interval = round(previous_interval * previous_ease_factor)
        repetitions += 1
        ease_factor = previous_ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    else:
        repetitions = 0
        interval = 1
        ease_factor = previous_ease_factor
    if ease_factor < 1.3:
        ease_factor = 1.3
    return repetitions, interval, ease_factor
from .auth import get_current_user, get_password_hash, verify_password, create_access_token

# Security: CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Auth routes removed for single-user mode

# --- User Routes ---
@app.get("/api/user/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "xp": current_user.xp,
        "streak": current_user.streak
    }

# --- Folder Routes ---
@app.get("/api/folders", response_model=List[Folder])
async def get_folders(current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    return db.exec(select(Folder).where(Folder.user_id == current_user.id)).all()

@app.post("/api/folders")
async def create_folder(name: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    folder = Folder(name=name, user_id=current_user.id)
    db.add(folder)
    db.commit()
    db.refresh(folder)
    return folder

# --- Session Routes ---
@app.get("/api/sessions")
async def get_sessions(current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    sessions = db.exec(select(StudySession).where(StudySession.user_id == current_user.id).order_by(StudySession.date.desc())).all()
    return sessions

@app.post("/api/sessions")
async def create_session(
    topic: str, 
    brain_dump: str, 
    score: int, 
    results: dict, 
    confidence: int,
    folder_id: Optional[int] = None,
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_session)
):
    session = StudySession(
        topic=topic,
        brain_dump=brain_dump,
        score=score,
        results_json=json.dumps(results),
        confidence=confidence,
        user_id=current_user.id,
        folder_id=folder_id
    )
    
    # Update SM-2 Topic Mastery
    mastery = db.exec(select(TopicMastery).where(TopicMastery.user_id == current_user.id, TopicMastery.topic == topic)).first()
    if not mastery:
        mastery = TopicMastery(topic=topic, user_id=current_user.id)
    
    # Map 0-100 score to 0-5 quality
    quality = min(max(int(score / 20), 0), 5)
    rep, interval, ef = calculate_sm2(quality, mastery.repetition, mastery.interval, mastery.ease_factor)
    
    mastery.repetition = rep
    mastery.interval = interval
    mastery.ease_factor = ef
    mastery.next_review_date = datetime.utcnow() + timedelta(days=interval)
    
    db.add(session)
    db.add(current_user)
    db.add(mastery)
    db.commit()
    db.refresh(session)
    return session

# AI integration completely removed per user request for security.

@app.post("/api/analyze")
@limiter.limit("3/minute")
async def analyze(
    request: Request,
    topic: str, 
    brain_dump: str, 
    source_material: str, 
    confidence: int,
    current_user: User = Depends(get_current_user)
):
    topic = sanitize_input(topic)
    brain_dump = sanitize_input(brain_dump)
    source_material = sanitize_input(source_material)
    
    # Using strictly local heuristic analysis (AI completely removed)
    
    # --- Fallback: Server-Side Heuristic Analysis ---
    word_count = len(brain_dump.strip().split())
    lower_dump = brain_dump.lower()
    is_clueless = "clueless" in lower_dump or "don't know" in lower_dump or word_count < 5
    
    recalled_correctly = []
    gaps = []
    review_flag = ""
    
    stop_words = {'the','is','at','which','on','and','a','an','in','to','of','for','with','as','by','that','this','it','from','or','be','are','was','were','have','has','had','not','but','what','when','where','why','how'}

    if is_clueless and confidence <= 2:
        recalled_correctly.append("Honest self-assessment: You've identified a significant knowledge gap.")
        gaps.append({ 
            "concept": "Core Fundamentals", 
            "cue_question": f"Since you're feeling clueless about {topic}, what's the very first thing a textbook would say about it?" 
        })
        review_flag = "Critical Retrieval Failure."
    elif len(source_material.strip()) > 10:
        # Advanced NLP keyword extraction via RAKE
        rake = Rake(max_length=3)
        rake.extract_keywords_from_text(source_material)
        keywords = rake.get_ranked_phrases()[:8]
        
        for kw in keywords:
            if kw in lower_dump:
                # Check for depth
                index = lower_dump.find(kw)
                context = lower_dump[index:index+60]
                if len(context.split()) > 5:
                    recalled_correctly.append(f"Detailed Recall: You explained '{kw}' with depth.")
                else:
                    gaps.append({
                        "concept": f"{kw} (Surface Level)",
                        "cue_question": f"You mentioned '{kw}', but can you explain *how* it works?"
                    })
            else:
                gaps.append({
                    "concept": f"Missing: {kw}",
                    "cue_question": f"How does '{kw}' fit into {topic}?"
                })
        
        review_flag = f"Analysis complete. {len(recalled_correctly)} points mastered."
    else:
        review_flag = "Insufficient source material for deep analysis."

    # Calculate Score
    score = 0
    if is_clueless:
        score = 10
    else:
        keyword_score = (len(recalled_correctly) / (len(recalled_correctly) + len(gaps)) * 70) if (len(recalled_correctly) + len(gaps)) > 0 else 30
        score = int(keyword_score + min(word_count/2, 20) + (confidence * 2))

    # Get next review date from SM-2 dynamically
    quality = min(max(int(score / 20), 0), 5)
    _, interval, _ = calculate_sm2(quality, 0, 1, 2.5) # Estimate for first time
    next_review_str = f"In {interval} days" if interval > 1 else "Tomorrow"
    if score < 60: next_review_str = "Tomorrow (Needs Work)"

    return {
        "score": score,
        "recalled_correctly": recalled_correctly,
        "gaps": gaps,
        "review_flag": review_flag,
        "nextReview": next_review_str
    }

# Generate source route removed.

# Serve Static Files (Frontend)
app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
