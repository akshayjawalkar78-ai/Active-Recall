from datetime import datetime
from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str
    xp: int = Field(default=0)
    streak: int = Field(default=0)
    last_study_date: Optional[datetime] = None
    
    # Relationships
    folders: List["Folder"] = Relationship(back_populates="user")
    sessions: List["StudySession"] = Relationship(back_populates="user")

class Folder(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    user_id: int = Field(foreign_key="user.id")
    
    # Relationships
    user: User = Relationship(back_populates="folders")
    sessions: List["StudySession"] = Relationship(back_populates="folder")

class StudySession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    topic: str
    brain_dump: str
    source_material: Optional[str] = None
    score: int
    results_json: str  # Store as JSON string
    date: datetime = Field(default_factory=datetime.utcnow)
    confidence: int
    
    user_id: int = Field(foreign_key="user.id")
    folder_id: Optional[int] = Field(default=None, foreign_key="folder.id")
    
    # Relationships
    user: User = Relationship(back_populates="sessions")
    folder: Optional[Folder] = Relationship(back_populates="sessions")

class TopicMastery(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    topic: str
    user_id: int = Field(foreign_key="user.id")
    
    # SM-2 Algorithm variables
    repetition: int = Field(default=0)
    interval: int = Field(default=1)
    ease_factor: float = Field(default=2.5)
    next_review_date: datetime = Field(default_factory=datetime.utcnow)
