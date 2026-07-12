const { useState, useEffect, useMemo, useRef } = React;

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const SparklesIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const UploadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v12"></path>
    <path d="m7 8 5-5 5 5"></path>
    <path d="M5 21h14"></path>
  </svg>
);

const MicIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="2" width="6" height="12" rx="3"></rect>
    <path d="M5 10a7 7 0 0 0 14 0"></path>
    <path d="M12 17v4"></path>
    <path d="M8 21h8"></path>
  </svg>
);

const CheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

const FileTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ChartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p> : null}
    </div>
    {action}
  </div>
);

const StatCard = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    {hint ? <p className="mt-1 text-sm text-slate-600">{hint}</p> : null}
  </div>
);

const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button onClick={onClick} className={`rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 ${className}`}>{children}</button>
);

const SecondaryButton = ({ children, onClick, className = '' }) => (
  <button onClick={onClick} className={`rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 ${className}`}>{children}</button>
);

const stopWords = new Set(['the','and','for','with','from','that','this','have','does','what','when','where','about','your','into','their','there','than','them','will','been','were','could','should','would','because','after','before','during','while','these','those','other','each','every','also','very','more','less','only','same','study','topic','concept','knowledge','understand','understanding']);
const normalizeText = (value) => (value || '').replace(/\s+/g, ' ').trim();

const extractConcepts = (text, topic) => {
  const cleaned = normalizeText(text);
  if (!cleaned) return [];
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 6);
  const phrases = [];
  sentences.forEach((sentence) => {
    const words = sentence.toLowerCase().match(/[a-z]{3,}/g) || [];
    const filtered = words.filter((word) => !stopWords.has(word));
    const unique = [...new Set(filtered)].slice(0, 6);
    if (unique.length >= 2) {
      const title = unique.slice(0, 3).join(' ');
      phrases.push({ id: title, title: title.replace(/\b\w/g, (char) => char.toUpperCase()), description: sentence.trim(), keywords: unique });
    }
  });
  const topicWords = (topic || '').toLowerCase().match(/[a-z]{3,}/g) || [];
  const topicSet = new Set(topicWords.filter((word) => !stopWords.has(word)));
  const deduped = phrases.filter((concept, index, arr) => arr.findIndex((item) => item.id === concept.id) === index);
  const ranked = deduped.map((concept) => ({ ...concept, score: concept.keywords.filter((word) => topicSet.has(word)).length + concept.keywords.length * 0.1 })).sort((a, b) => b.score - a.score).slice(0, 5);
  if (ranked.length === 0) {
    const fallback = (topic || 'core ideas').split(/\s+/).slice(0, 3).join(' ');
    return [{ id: fallback, title: fallback.replace(/\b\w/g, (char) => char.toUpperCase()), description: cleaned.slice(0, 140), keywords: [fallback] }];
  }
  return ranked;
};

const getDifficultyLabel = (wordCount) => {
  if (wordCount < 120) return 'Foundational';
  if (wordCount < 240) return 'Intermediate';
  return 'Advanced';
};

const getHighlightTone = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 55) return 'text-amber-600';
  return 'text-rose-600';
};

const getHighlightBg = (score) => {
  if (score >= 80) return 'bg-emerald-50 border-emerald-200';
  if (score >= 55) return 'bg-amber-50 border-amber-200';
  return 'bg-rose-50 border-rose-200';
};

const createAnalysis = ({ topic, sourceText, recallText, confidence }) => {
  const concepts = extractConcepts(sourceText, topic);
  const recall = normalizeText(recallText).toLowerCase();
  const badSignals = ['not true', 'incorrect', 'confused', 'unclear', 'misunderstood', 'does not', 'false', 'wrong'];
  const misunderstood = badSignals.some((signal) => recall.includes(signal));
  const results = concepts.map((concept) => {
    const terms = concept.keywords;
    const overlap = terms.filter((term) => recall.includes(term.toLowerCase())).length;
    const ratio = terms.length ? overlap / terms.length : 0;
    const matchScore = Math.min(100, Math.round(ratio * 100 + (recall.includes(concept.title.toLowerCase()) ? 15 : 0)));
    let status = 'forgotten';
    if (matchScore >= 65) status = 'remembered';
    else if (matchScore >= 30) status = 'partial';
    else if (misunderstood) status = 'misunderstood';
    return { ...concept, matchScore, status };
  });
  const remembered = results.filter((item) => item.status === 'remembered');
  const partial = results.filter((item) => item.status === 'partial');
  const forgotten = results.filter((item) => item.status === 'forgotten' || item.status === 'misunderstood');
  const misunderstoodItems = results.filter((item) => item.status === 'misunderstood');
  const rawScore = Math.round((remembered.length / Math.max(results.length, 1)) * 100 * 0.7 + (partial.length / Math.max(results.length, 1)) * 100 * 0.2 + (confidence / 5) * 20);
  const score = Math.max(15, Math.min(98, rawScore));
  const strong = remembered.slice(0, 2);
  const moderate = partial.slice(0, 2);
  const weak = [...forgotten, ...misunderstoodItems].slice(0, 3);
  const gaps = [
    ...forgotten.map((item) => ({ type: 'Missing concept', label: item.title, detail: `Review the core idea behind ${item.title.toLowerCase()} and connect it to the larger topic.` })),
    ...(!recall.includes('because') && !recall.includes('therefore') ? [{ type: 'Missing explanation', label: 'Reasoning links', detail: 'Add causal relationships and definitions to strengthen retrieval.' }] : [])
  ];
  const suggestions = [
    { title: 'Revisit the high-value ideas', reason: 'These ideas are still fragile in memory and should be tested again soon.', nextStep: 'Run a short review session with the same prompt tomorrow.' },
    { title: 'Strengthen your explanation', reason: 'Recall quality improves when you explain how and why, not just what.', nextStep: 'Try answering one question in full sentences and include an example.' }
  ];
  return { topic, score, confidence, summary: score >= 80 ? 'You retrieved the central ideas with strong clarity.' : score >= 55 ? 'Your recall is partially complete. The remaining gaps are strategic and fixable.' : 'The recall attempt shows a broad gap in understanding. Review the core concepts before testing again.', concepts: results, weaknessMap: { strong, moderate, weak }, gaps, suggestions };
};

const themeStyles = `
  .theme-root { transition: background-color 0.25s ease, color 0.25s ease; }
  .theme-root.light { --app-bg: #f8fafc; --app-surface: #ffffff; --app-surface-muted: #f8fafc; --app-text: #0f172a; --app-text-muted: #475569; --app-border: #e2e8f0; --app-accent: #0f172a; }
  .theme-root.dark { --app-bg: #020617; --app-surface: #0f172a; --app-surface-muted: #111827; --app-text: #f8fafc; --app-text-muted: #cbd5e1; --app-border: #334155; --app-accent: #f8fafc; }
  .theme-root { background-color: var(--app-bg); color: var(--app-text); }
  .theme-root .bg-slate-50 { background-color: var(--app-surface-muted) !important; }
  .theme-root .bg-white { background-color: var(--app-surface) !important; }
  .theme-root .bg-slate-900 { background-color: var(--app-accent) !important; border-color: var(--app-accent) !important; color: var(--app-surface) !important; }
  .theme-root .border-slate-200, .theme-root .border-slate-300 { border-color: var(--app-border) !important; }
  .theme-root .text-slate-900 { color: var(--app-text) !important; }
  .theme-root .text-slate-700 { color: var(--app-text-muted) !important; }
  .theme-root .text-slate-600, .theme-root .text-slate-500, .theme-root .text-slate-400 { color: var(--app-text-muted) !important; }
  .theme-root .text-slate-100, .theme-root .text-slate-300 { color: var(--app-text) !important; }
`;

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('arc_user') || 'null') || { email: 'Student', xp: 140, streak: 5, lastStudyDate: null });
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem('arc_sessions') || '[]'));
  const [mastery, setMastery] = useState(() => JSON.parse(localStorage.getItem('arc_mastery') || '{}'));
  const [notesArchive, setNotesArchive] = useState(() => JSON.parse(localStorage.getItem('arc_notes') || '[]'));
  const [notesText, setNotesText] = useState('');
  const [topic, setTopic] = useState('');
  const [uploadMessage, setUploadMessage] = useState('Paste notes or upload a PDF to begin.');
  const [studyStep, setStudyStep] = useState('upload');
  const [sessionDraft, setSessionDraft] = useState(null);
  const [recallMode, setRecallMode] = useState('typed');
  const [typedResponse, setTypedResponse] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceStatus, setVoiceStatus] = useState('idle');
  const [voiceError, setVoiceError] = useState('');
  const [focusMode, setFocusMode] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('arc_preferences') || '{"voiceEnabled":true,"autoSave":true,"theme":"light"}');
    return saved.theme || 'light';
  });
  const [preferences, setPreferences] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('arc_preferences') || '{"voiceEnabled":true,"autoSave":true,"theme":"light"}');
    return { voiceEnabled: true, autoSave: true, theme: 'light', ...saved };
  });
  const recognitionRef = useRef(null);

  useEffect(() => { localStorage.setItem('arc_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('arc_sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('arc_mastery', JSON.stringify(mastery)); }, [mastery]);
  useEffect(() => { localStorage.setItem('arc_notes', JSON.stringify(notesArchive)); }, [notesArchive]);
  useEffect(() => { localStorage.setItem('arc_preferences', JSON.stringify({ ...preferences, theme })); }, [preferences, theme]);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.body.style.backgroundColor = theme === 'dark' ? '#020617' : '#f8fafc';
    document.body.style.color = theme === 'dark' ? '#f8fafc' : '#0f172a';
  }, [theme]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus('unsupported');
      setVoiceError('Voice capture is not available in this browser. Use typing mode instead.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let interim = '';
      let finalText = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) finalText += `${result[0].transcript} `;
        else interim += result[0].transcript;
      }
      setVoiceTranscript(`${finalText}${interim}`.trim());
    };
    recognition.onerror = (event) => { setVoiceError(`Voice capture stopped: ${event.error}`); setVoiceStatus('idle'); };
    recognition.onend = () => { setVoiceStatus('idle'); };
    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, []);

  const totalStudyMinutes = useMemo(() => {
    const wordCount = notesText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(8, Math.min(35, Math.round(wordCount / 35)));
  }, [notesText]);

  const latestSession = sessions[0] || null;
  const weeklySessions = sessions.filter((session) => new Date(session.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const averageAccuracy = sessions.length ? Math.round(sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length) : 0;
  const weakConceptCount = analysis?.weaknessMap?.weak?.length || 0;
  const studyMinutes = sessions.reduce((sum, session) => sum + (session.studyMinutes || 12), 0);

  const getCachedConcepts = (sourceText, sourceTopic) => {
    try {
      const cacheEntry = localStorage.getItem('arc_concept_cache');
      const cache = cacheEntry ? JSON.parse(cacheEntry) : {};
      const cacheKey = `${(sourceTopic || 'untitled').trim().toLowerCase()}::${sourceText.trim().slice(0, 220)}`;
      return cache[cacheKey] || null;
    } catch (error) {
      return null;
    }
  };

  const setCachedConcepts = (sourceText, sourceTopic, concepts) => {
    try {
      const cacheEntry = localStorage.getItem('arc_concept_cache');
      const cache = cacheEntry ? JSON.parse(cacheEntry) : {};
      const cacheKey = `${(sourceTopic || 'untitled').trim().toLowerCase()}::${sourceText.trim().slice(0, 220)}`;
      cache[cacheKey] = concepts;
      localStorage.setItem('arc_concept_cache', JSON.stringify(cache));
    } catch (error) {
      // ignore gracefully
    }
  };

  const readFileText = async (file) => {
    if (file.name.toLowerCase().endsWith('.pdf')) {
      const buffer = await file.arrayBuffer();
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) throw new Error('PDF viewer unavailable');
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(' ') + '\n';
      }
      return text;
    }
    if (file.name.toLowerCase().endsWith('.docx')) {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }
    return file.text();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadMessage(`Preparing ${file.name}...`);
    try {
      const text = await readFileText(file);
      setNotesText(text);
      setTopic((topic || file.name.replace(/\.[^.]+$/, '')).trim());
      setUploadMessage('Material imported successfully.');
    } catch (error) {
      setUploadMessage('Import failed. Please paste the notes directly instead.');
    } finally {
      event.target.value = '';
    }
  };

  const handleClipboardImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setNotesText(text);
        setUploadMessage('Imported text from your clipboard.');
      } else {
        setUploadMessage('Clipboard was empty.');
      }
    } catch (error) {
      setUploadMessage('Clipboard access is unavailable in this browser.');
    }
  };

  const saveCurrentNotes = () => {
    if (!notesText.trim()) return;
    const entry = { id: Date.now(), topic: topic.trim() || 'Untitled topic', preview: notesText.trim().slice(0, 120), date: new Date().toISOString() };
    setNotesArchive((prev) => [entry, ...prev].slice(0, 4));
    setUploadMessage('Saved to your note library.');
  };

  const handleGenerateSession = () => {
    if (!notesText.trim()) {
      setUploadMessage('Add source material before generating a recall session.');
      return;
    }
    const cleanedTopic = topic.trim() || 'Current Study Topic';
    const cached = getCachedConcepts(notesText, cleanedTopic);
    const concepts = cached || extractConcepts(notesText, cleanedTopic);
    if (!cached) setCachedConcepts(notesText, cleanedTopic, concepts);
    const difficulty = getDifficultyLabel(notesText.trim().split(/\s+/).filter(Boolean).length);
    const studyMinutes = Math.max(8, Math.min(35, Math.round(notesText.trim().split(/\s+/).filter(Boolean).length / 40)));
    const draft = { topic: cleanedTopic, sourceText: notesText, conceptCount: concepts.length, difficulty, studyMinutes, concepts };
    setSessionDraft(draft);
    setStudyStep('recall');
    setCurrentView('sessions');
    setUploadMessage('Recall session is ready.');
  };

  const handleSubmitRecall = () => {
    const responseText = recallMode === 'voice' ? voiceTranscript : typedResponse;
    if (!responseText.trim()) {
      setVoiceError('Add your recall response before reviewing the analysis.');
      return;
    }
    const analysisResult = createAnalysis({ topic: sessionDraft?.topic || topic, sourceText: sessionDraft?.sourceText || notesText, recallText: responseText, confidence: Math.max(1, Math.min(5, Math.round((responseText.split(/\s+/).filter(Boolean).length / 25) + 1))) });
    setAnalysis(analysisResult);
    setStudyStep('feedback');
    const masteryKey = (sessionDraft?.topic || topic || 'current topic').toLowerCase().trim();
    const previous = mastery[masteryKey] || { rep: 0, interval: 1, easeFactor: 2.5 };
    const quality = Math.min(5, Math.max(1, Math.round(analysisResult.score / 20)));
    const interval = quality >= 4 ? 4 : quality === 3 ? 2 : 1;
    const newMastery = { rep: previous.rep + 1, interval, easeFactor: previous.easeFactor + (quality >= 4 ? 0.05 : -0.02) };
    setMastery((prev) => ({ ...prev, [masteryKey]: newMastery }));
    const newSession = { id: Date.now(), topic: sessionDraft?.topic || topic, date: new Date().toISOString(), score: analysisResult.score, mode: recallMode, summary: analysisResult.summary, studyMinutes: sessionDraft?.studyMinutes || 12 };
    setSessions((prev) => [newSession, ...prev]);
    setUser((prev) => ({ ...prev, xp: prev.xp + Math.round(analysisResult.score / 2), streak: prev.lastStudyDate === new Date().toDateString() ? prev.streak : prev.streak + 1, lastStudyDate: new Date().toDateString() }));
  };

  const toggleVoiceCapture = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (voiceStatus === 'listening') { recognition.stop(); setVoiceStatus('idle'); return; }
    setVoiceError('');
    recognition.start();
    setVoiceStatus('listening');
  };

  const resetFlow = () => {
    setStudyStep('upload');
    setTopic('');
    setNotesText('');
    setSessionDraft(null);
    setTypedResponse('');
    setVoiceTranscript('');
    setAnalysis(null);
    setUploadMessage('Paste notes or upload a PDF to begin.');
    setCurrentView('sessions');
  };

  const resetProgress = () => {
    localStorage.removeItem('arc_user');
    localStorage.removeItem('arc_sessions');
    localStorage.removeItem('arc_mastery');
    localStorage.removeItem('arc_notes');
    localStorage.removeItem('arc_concept_cache');
    localStorage.removeItem('arc_preferences');
    setUser({ email: 'Student', xp: 140, streak: 5, lastStudyDate: null });
    setSessions([]);
    setMastery({});
    setNotesArchive([]);
    setPreferences({ voiceEnabled: true, autoSave: true, theme: 'light' });
    setTheme('light');
    setUploadMessage('Progress cleared. You can start fresh.');
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    setPreferences((prev) => ({ ...prev, theme: nextTheme }));
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sessions', label: 'Study Sessions' },
    { id: 'notes', label: 'My Notes' },
    { id: 'progress', label: 'Progress' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className={`min-h-screen theme-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      <style>{themeStyles}</style>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-5 rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Active Recall Coach</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Master your notes through active recall.</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{user.streak} day streak</div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{user.xp} XP</div>
              <PrimaryButton onClick={() => setCurrentView('sessions')}>Start Studying</PrimaryButton>
            </div>
          </div>
          <nav className="mt-4 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setCurrentView(item.id)} className={`rounded-full px-3 py-2 text-sm font-medium transition ${currentView === item.id ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex-1">
          {currentView === 'home' && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Active Recall</p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Stop rereading. Start remembering.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Turn notes into a guided retrieval loop that helps you identify weak concepts quickly and strengthen them before they fade.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryButton onClick={() => setCurrentView('sessions')}>Start Studying</PrimaryButton>
                  <SecondaryButton onClick={() => setCurrentView('dashboard')}>Watch Demo</SecondaryButton>
                </div>
                <div className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-4">
                  {['Upload Notes', 'Recall From Memory', 'AI Finds Weaknesses', 'Study Only What Matters'].map((label, index) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-sm text-slate-700">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Step {index + 1}</div>
                      {label}
                    </div>
                  ))}
                </div>
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Study loop</p>
                  <div className="mt-5 space-y-4 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">1. Import notes</p><p className="mt-1">Bring in a lecture, summary, or textbook passage.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">2. Recall from memory</p><p className="mt-1">Type or speak what you can remember without looking.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">3. Review weaknesses</p><p className="mt-1">Focus on the concepts that still need retrieval practice.</p></div>
                  </div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Why this feels different</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Less clutter, fewer decisions, and a calmer learning rhythm.</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Feedback that points to the next step instead of overwhelming you.</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Local-first analysis that keeps the experience efficient and affordable.</span></li>
                  </ul>
                </div>
              </aside>
            </div>
          )}

          {currentView === 'dashboard' && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <SectionHeading eyebrow="Continue last session" title="Pick up where you left off." description="A calm dashboard with quick access to recent notes, sessions, and next steps." action={<PrimaryButton onClick={() => setCurrentView('sessions')}>Resume</PrimaryButton>} />
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recent notes</p>
                      {notesArchive.length ? <div className="mt-3 space-y-3">{notesArchive.slice(0, 2).map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-3"><p className="font-semibold text-slate-900">{entry.topic}</p><p className="mt-1 text-sm text-slate-600">{entry.preview}</p></div>)}</div> : <p className="mt-3 text-sm text-slate-600">No notes saved yet. Import a passage to build your library.</p>}
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Weekly progress</p>
                      <div className="mt-4 flex items-end gap-2">{[60, 78, 82, 73, 88].map((value, index) => <div key={value + index} className="flex-1 rounded-t-2xl bg-slate-900" style={{ height: `${value}px` }}></div>)}</div>
                      <p className="mt-3 text-sm text-slate-600">{weeklySessions} study sessions this week.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Recent sessions</p>
                  <div className="mt-5 space-y-3">{sessions.length ? sessions.slice(0, 4).map((session) => <div key={session.id} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{session.topic}</p><p className="text-sm text-slate-600">{session.summary}</p></div><div className="text-sm text-slate-500"><span className="font-semibold text-slate-900">{session.score}%</span><span className="ml-3">{new Date(session.date).toLocaleDateString()}</span></div></div>) : <p className="text-sm text-slate-600">No sessions yet. Start a recall round to build your history.</p>}</div>
                </div>
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Snapshot</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <StatCard label="Recall accuracy" value={`${averageAccuracy}%`} />
                    <StatCard label="Questions answered" value={sessions.length} />
                    <StatCard label="Weak concepts" value={weakConceptCount} />
                    <StatCard label="Study time" value={`${studyMinutes} min`} />
                  </div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Suggested next step</p>
                  <p className="mt-4 text-2xl font-semibold">Review one weak concept from your last session.</p>
                  <p className="mt-3 text-sm text-slate-300">The best results come from short, frequent retrieval efforts rather than lengthy review marathons.</p>
                  <button onClick={() => setCurrentView('sessions')} className="mt-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Open session</button>
                </div>
              </aside>
            </div>
          )}

          {currentView === 'sessions' && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Study session</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">A distraction-free recall loop.</h2>
                    </div>
                    <div className="flex gap-2">
                      <div className={`rounded-full border px-3 py-2 text-sm font-medium ${studyStep === 'upload' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>Upload</div>
                      <div className={`rounded-full border px-3 py-2 text-sm font-medium ${studyStep === 'recall' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>Recall</div>
                      <div className={`rounded-full border px-3 py-2 text-sm font-medium ${studyStep === 'feedback' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>Feedback</div>
                    </div>
                  </div>

                  {studyStep === 'upload' && (
                    <div className="space-y-5">
                      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="text-sm font-semibold text-slate-900">Upload your notes</p>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                              <UploadIcon className="h-4 w-4" /> Upload PDF
                              <input type="file" accept=".pdf,.docx,.txt,.md" onChange={handleFileUpload} className="sr-only" />
                            </label>
                            <button onClick={handleClipboardImport} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300">Paste from clipboard</button>
                          </div>
                          <textarea value={notesText} onChange={(event) => setNotesText(event.target.value)} rows={10} placeholder="Paste lecture notes, a textbook excerpt, or your own summary here." className="mt-4 w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-inner outline-none transition focus:border-slate-400" />
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <p className="text-sm font-semibold text-slate-900">Study setup</p>
                          <div className="mt-4 space-y-3">
                            <label className="block text-sm text-slate-700">
                              <span className="mb-2 block">Topic or title</span>
                              <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. Photosynthesis" className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400" />
                            </label>
                            <div className="rounded-2xl border border-slate-200 bg-white p-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Choose study mode</p>
                              <div className="mt-3 flex gap-2">
                                <button onClick={() => setRecallMode('typed')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'typed' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-700'}`}>Typing</button>
                                <button onClick={() => setRecallMode('voice')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'voice' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-700'}`}>Speaking</button>
                              </div>
                            </div>
                            <PrimaryButton onClick={handleGenerateSession} className="w-full">Generate Recall Session</PrimaryButton>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><SparklesIcon className="h-4 w-4 text-slate-500" /><span>{uploadMessage}</span></div>
                        <button onClick={saveCurrentNotes} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">Save note</button>
                      </div>
                    </div>
                  )}

                  {studyStep === 'recall' && sessionDraft && (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Recall prompt</p>
                          <p className="mt-1 text-sm text-slate-600">Explain the main ideas of {sessionDraft.topic} from memory.</p>
                        </div>
                        <button onClick={() => setFocusMode((prev) => !prev)} className={`rounded-full border px-3 py-2 text-sm font-medium transition ${focusMode ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}>{focusMode ? 'Exit Focus' : 'Focus Mode'}</button>
                      </div>
                      <div className={`grid gap-6 ${focusMode ? 'xl:grid-cols-1' : 'xl:grid-cols-[1.1fr_0.7fr]'}`}>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <div className="mb-4 flex gap-2">
                            <button onClick={() => setRecallMode('typed')} className={`rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'typed' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>Type</button>
                            <button onClick={() => setRecallMode('voice')} className={`rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'voice' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>Speak</button>
                          </div>
                          {recallMode === 'typed' ? (
                            <div>
                              <textarea value={typedResponse} onChange={(event) => setTypedResponse(event.target.value)} rows={13} placeholder="Start with the big idea and then add a supporting detail or example." className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 shadow-inner outline-none transition focus:border-slate-400" />
                              <div className="mt-3 text-sm text-slate-500">{typedResponse.trim().split(/\s+/).filter(Boolean).length} words</div>
                            </div>
                          ) : (
                            <div>
                              <button onClick={toggleVoiceCapture} className={`flex w-full items-center justify-center gap-3 rounded-3xl px-4 py-4 text-sm font-semibold transition ${voiceStatus === 'listening' ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-slate-900 text-white hover:bg-slate-700'}`}><MicIcon className="h-5 w-5" />{voiceStatus === 'listening' ? 'Pause Recording' : 'Start Recording'}</button>
                              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">{voiceTranscript || 'Your transcript will show up here as you speak.'}</div>
                              {voiceError && <p className="mt-3 text-sm text-rose-600">{voiceError}</p>}
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-3xl border border-slate-200 bg-white p-5">
                            <p className="text-sm font-semibold text-slate-900">Session summary</p>
                            <div className="mt-3 space-y-2 text-sm text-slate-600">
                              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">Concepts: {sessionDraft.conceptCount}</div>
                              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">Estimated time: {sessionDraft.studyMinutes} min</div>
                              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">Difficulty: {sessionDraft.difficulty}</div>
                            </div>
                          </div>
                          <PrimaryButton onClick={handleSubmitRecall} className="flex w-full items-center justify-center gap-2">Review Feedback <ArrowRightIcon className="h-4 w-4" /></PrimaryButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {studyStep === 'feedback' && analysis && (
                    <div className="space-y-5">
                      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                        <div className={`rounded-3xl border p-6 ${getHighlightBg(analysis.score)}`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recall score</p>
                          <p className={`mt-3 text-5xl font-semibold ${getHighlightTone(analysis.score)}`}>{analysis.score}</p>
                          <p className="mt-3 text-sm leading-6 text-slate-600">{analysis.summary}</p>
                          <div className="mt-5 h-2 rounded-full bg-white/70"><div className="h-2 rounded-full bg-slate-900" style={{ width: `${analysis.score}%` }}></div></div>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">What to study next</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3"><p className="text-sm font-semibold text-emerald-700">Strong concepts</p><ul className="mt-2 space-y-2 text-sm text-emerald-800">{analysis.weaknessMap.strong.length ? analysis.weaknessMap.strong.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• Nothing yet</li>}</ul></div>
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3"><p className="text-sm font-semibold text-amber-700">Needs review</p><ul className="mt-2 space-y-2 text-sm text-amber-800">{analysis.weaknessMap.moderate.length ? analysis.weaknessMap.moderate.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• Nothing yet</li>}</ul></div>
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3"><p className="text-sm font-semibold text-rose-700">Weak concepts</p><ul className="mt-2 space-y-2 text-sm text-rose-800">{analysis.weaknessMap.weak.length ? analysis.weaknessMap.weak.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• Nothing yet</li>}</ul></div>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                          <p className="text-sm font-semibold text-slate-900">One concise explanation</p>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{analysis.gaps[0]?.detail || 'Review the core idea and make it explicit in your own words.'}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                          <p className="text-sm font-semibold text-slate-900">Next actions</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <SecondaryButton onClick={() => { setStudyStep('recall'); setTypedResponse(''); setVoiceTranscript(''); setVoiceError(''); }}>Retry weak concepts</SecondaryButton>
                            <SecondaryButton onClick={() => { setStudyStep('recall'); setTypedResponse(''); setVoiceTranscript(''); setVoiceError(''); }}>Study explanation</SecondaryButton>
                            <SecondaryButton onClick={() => { setStudyStep('recall'); setTypedResponse(''); setVoiceTranscript(''); setVoiceError(''); }}>Generate new question</SecondaryButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Study principles</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Retrieval practice before review.</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Immediate feedback on what is still weak.</span></li>
                    <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Short, consistent sessions beat long passive review.</span></li>
                  </ul>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Efficiency</p>
                  <p className="mt-4 text-xl font-semibold">All analysis runs locally so the product stays calm, fast, and cost-efficient.</p>
                </div>
              </aside>
            </div>
          )}

          {currentView === 'notes' && (
            <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">My notes</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Your note library.</h2>
                  </div>
                  <PrimaryButton onClick={saveCurrentNotes}>Save current note</PrimaryButton>
                </div>
                <textarea value={notesText} onChange={(event) => setNotesText(event.target.value)} rows={14} placeholder="Paste or edit your notes here." className="mt-6 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 shadow-inner outline-none transition focus:border-slate-400" />
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Saved notes</p>
                  <div className="mt-5 space-y-3">{notesArchive.length ? notesArchive.map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-900">{entry.topic}</p><p className="mt-1 text-sm text-slate-600">{entry.preview}</p></div>) : <p className="text-sm text-slate-600">Nothing saved yet. Create a note and it will appear here.</p>}</div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Note workflow</p>
                  <p className="mt-4 text-xl font-semibold">Store, refine, and turn study material into retrieval prompts in one place.</p>
                </div>
              </aside>
            </div>
          )}

          {currentView === 'progress' && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Progress</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">A steadier view of what is improving.</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <StatCard label="Overall accuracy" value={`${averageAccuracy}%`} />
                    <StatCard label="Mastered concepts" value={Object.keys(mastery).length} />
                    <StatCard label="Study streak" value={`${user.streak} days`} />
                  </div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Knowledge heatmap</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">{sessions.slice(0, 6).map((session) => <div key={session.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-2"><p className="font-semibold text-slate-900">{session.topic}</p><span className="text-sm font-semibold text-slate-600">{session.score}%</span></div><div className="mt-3 h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-slate-900" style={{ width: `${session.score}%` }}></div></div></div>)}</div>
                </div>
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Weakest topics</p>
                  <div className="mt-5 space-y-3">{sessions.length ? sessions.slice(0, 3).map((session) => <div key={session.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-900">{session.topic}</p><p className="mt-1 text-sm text-slate-600">Needs a short review round soon.</p></div>) : <p className="text-sm text-slate-600">No data yet. Complete a session to surface weaker topics.</p>}</div>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Most improved</p>
                  <p className="mt-4 text-xl font-semibold">The clearest gains come from repeated short retrieval practice.</p>
                </div>
              </aside>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Settings</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Keep the experience simple and calm.</h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Appearance</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => handleThemeChange('light')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${theme === 'light' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>Light mode</button>
                      <button onClick={() => handleThemeChange('dark')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>Dark mode</button>
                    </div>
                  </div>
                  <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                    <span>Voice recall enabled</span>
                    <input type="checkbox" checked={preferences.voiceEnabled} onChange={() => setPreferences((prev) => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))} className="h-4 w-4 rounded border-slate-300" />
                  </label>
                  <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                    <span>Auto-save notes locally</span>
                    <input type="checkbox" checked={preferences.autoSave} onChange={() => setPreferences((prev) => ({ ...prev, autoSave: !prev.autoSave }))} className="h-4 w-4 rounded border-slate-300" />
                  </label>
                </div>
              </section>
              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Reset</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Clear stored progress and notes if you want a fresh start.</p>
                  <button onClick={resetProgress} className="mt-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">Reset local progress</button>
                </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Accessibility</p>
                  <p className="mt-4 text-xl font-semibold">High contrast, readable typography, and a focused workflow are built into the experience.</p>
                </div>
              </aside>
            </div>
          )}
        </main>
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500">
          <span>Crafted by Akshay Jawalkar</span>
          <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'} • Active Recall Coach</span>
        </footer>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
