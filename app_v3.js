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

const BrainIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5c-1.1 0-2 .9-2 2v4"></path>
    <path d="M12 19c2.2 0 4-1.8 4-4v-1.5a3.5 3.5 0 0 0-7 0V15c0 2.2 1.8 4 3 4Z"></path>
    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4"></path>
    <path d="M8 11c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
    <path d="M4 9c0-2.8 2.2-5 5-5"></path>
  </svg>
);

const BookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>
  </svg>
);

const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TargetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
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

  return { topic, score, confidence, summary: score >= 80 ? 'You retrieved the central ideas with strong clarity.' : score >= 55 ? 'Your recall is partially complete. The remaining gaps are strategic and fixable.' : 'The recall attempt shows a broad gap in understanding. Review the core concepts before testing again.', concepts: results, breakdown: { remembered, partial, forgotten, misunderstood: misunderstoodItems }, weaknessMap: { strong, moderate, weak }, gaps, suggestions };
};

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('arc_user') || 'null') || { email: 'Student', xp: 140, streak: 5, lastStudyDate: null });
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem('arc_sessions') || '[]'));
  const [mastery, setMastery] = useState(() => JSON.parse(localStorage.getItem('arc_mastery') || '{}'));
  const [step, setStep] = useState('upload');
  const [topic, setTopic] = useState('');
  const [notesText, setNotesText] = useState('');
  const [uploadMessage, setUploadMessage] = useState('Paste notes or import material to begin.');
  const [isParsing, setIsParsing] = useState(false);
  const [sessionDraft, setSessionDraft] = useState(null);
  const [recallMode, setRecallMode] = useState('typed');
  const [typedResponse, setTypedResponse] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceStatus, setVoiceStatus] = useState('idle');
  const [voiceError, setVoiceError] = useState('');
  const [focusMode, setFocusMode] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [folderName, setFolderName] = useState('General');
  const recognitionRef = useRef(null);

  useEffect(() => { localStorage.setItem('arc_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('arc_sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('arc_mastery', JSON.stringify(mastery)); }, [mastery]);

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
    setIsParsing(true);
    setUploadMessage(`Preparing ${file.name}...`);
    try {
      const text = await readFileText(file);
      setNotesText(text);
      setTopic((topic || file.name.replace(/\.[^.]+$/, '')).trim());
      setUploadMessage('Material imported successfully.');
    } catch (error) {
      setUploadMessage('Import failed. Please paste the notes directly instead.');
    } finally {
      setIsParsing(false);
      event.target.value = '';
    }
  };

  const handleGenerateSession = () => {
    if (!notesText.trim()) {
      setUploadMessage('Add source material before generating a recall session.');
      return;
    }
    const cleanedTopic = topic.trim() || 'Current Study Topic';
    const concepts = extractConcepts(notesText, cleanedTopic);
    const difficulty = getDifficultyLabel(notesText.trim().split(/\s+/).filter(Boolean).length);
    const draft = { topic: cleanedTopic, sourceText: notesText, conceptCount: concepts.length, difficulty, studyMinutes: Math.max(8, Math.min(35, Math.round(notesText.trim().split(/\s+/).filter(Boolean).length / 40))), concepts };
    setSessionDraft(draft);
    setStep('session');
  };

  const handleStartRecall = () => {
    setTypedResponse('');
    setVoiceTranscript('');
    setVoiceError('');
    setStep('recall');
  };

  const handleSubmitRecall = () => {
    const responseText = recallMode === 'voice' ? voiceTranscript : typedResponse;
    if (!responseText.trim()) {
      setVoiceError('Add your recall response before reviewing the analysis.');
      return;
    }
    const analysisResult = createAnalysis({ topic: sessionDraft?.topic || topic, sourceText: sessionDraft?.sourceText || notesText, recallText: responseText, confidence: Math.max(1, Math.min(5, Math.round((responseText.split(/\s+/).filter(Boolean).length / 25) + 1))) });
    setAnalysis(analysisResult);
    setStep('analysis');

    const masteryKey = (sessionDraft?.topic || topic || 'current topic').toLowerCase().trim();
    const previous = mastery[masteryKey] || { rep: 0, interval: 1, easeFactor: 2.5 };
    const quality = Math.min(5, Math.max(1, Math.round(analysisResult.score / 20)));
    const interval = quality >= 4 ? 4 : quality === 3 ? 2 : 1;
    const newMastery = { rep: previous.rep + 1, interval, easeFactor: previous.easeFactor + (quality >= 4 ? 0.05 : -0.02) };
    setMastery((prev) => ({ ...prev, [masteryKey]: newMastery }));

    const newSession = { id: Date.now(), topic: sessionDraft?.topic || topic, date: new Date().toISOString(), score: analysisResult.score, mode: recallMode, summary: analysisResult.summary, folder: folderName };
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
    setStep('upload');
    setTopic('');
    setNotesText('');
    setSessionDraft(null);
    setTypedResponse('');
    setVoiceTranscript('');
    setAnalysis(null);
    setUploadMessage('Paste notes or import material to begin.');
  };

  const filteredSessions = sessions.filter((session) => selectedFolder === 'All' || session.folder === selectedFolder);

  const steps = [{ id: 'upload', label: 'Upload notes' }, { id: 'session', label: 'Generate session' }, { id: 'recall', label: 'Recall' }, { id: 'analysis', label: 'Review report' }];
  const progressIndex = steps.findIndex((item) => item.id === step);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Active Recall Coach</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">A calmer, more rigorous study experience</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{user.streak} day streak</div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{user.xp} XP</div>
              <button onClick={() => setStep('dashboard')} className="rounded-full border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100">Open dashboard</button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((item, index) => {
              const active = step === item.id || (step === 'dashboard' && item.id === 'upload');
              const completed = index < progressIndex;
              return (
                <div key={item.id} className={`rounded-full border px-3 py-2 text-sm font-medium ${completed ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : active ? 'border-slate-300 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">{index + 1}</span>
                  {item.label}
                </div>
              );
            })}
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            {step === 'upload' && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Step 1</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Upload the material you want to study</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">The strongest recall sessions begin with clean source material. Paste notes, import a text file, or upload a PDF or DOCX document.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700"><BookIcon className="h-6 w-6" /></div>
                </div>
                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-400">
                    <UploadIcon className="mb-3 h-8 w-8 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-900">Import notes</span>
                    <span className="mt-2 text-sm text-slate-500">PDF, DOCX, TXT, or MD</span>
                    <input type="file" accept=".pdf,.docx,.txt,.md" onChange={handleFileUpload} className="sr-only" />
                  </label>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Study brief</p>
                    <div className="mt-3 space-y-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2"><TargetIcon className="h-4 w-4 text-slate-500" /><span>Focus on core concepts rather than every detail.</span></div>
                      <div className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-slate-500" /><span>Expected session length: {totalStudyMinutes} minutes.</span></div>
                      <div className="flex items-center gap-2"><BrainIcon className="h-4 w-4 text-slate-500" /><span>We will analyze what you can recall, what you miss, and what needs review.</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <label className="text-sm font-medium text-slate-700" htmlFor="topic">Topic or title</label>
                  <input id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. Photosynthesis" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 transition focus:border-slate-400" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700" htmlFor="notes">Source material</label>
                    <span className="text-xs text-slate-500">{notesText.trim().split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                  <textarea id="notes" value={notesText} onChange={(event) => setNotesText(event.target.value)} rows={12} placeholder="Paste your notes, lecture summary, or textbook section here. The analysis becomes more accurate when the source material is detailed." className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700 shadow-inner outline-none transition focus:border-slate-400" />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><SparklesIcon className="h-4 w-4 text-slate-500" /><span>{uploadMessage}</span></div>
                  <button onClick={handleGenerateSession} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Generate session</button>
                </div>
              </div>
            )}

            {step === 'session' && sessionDraft && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Step 2</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Your recall session is ready</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">This draft is designed to surface what you remember, what you partially know, and what needs deliberate review.</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700">{sessionDraft.difficulty}</div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Estimated difficulty</p><p className="mt-2 text-lg font-semibold text-slate-900">{sessionDraft.difficulty}</p></div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Concepts</p><p className="mt-2 text-lg font-semibold text-slate-900">{sessionDraft.conceptCount}</p></div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Study estimate</p><p className="mt-2 text-lg font-semibold text-slate-900">{sessionDraft.studyMinutes} min</p></div>
                </div>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-800">Core concepts to retrieve</p>
                  <div className="mt-3 flex flex-wrap gap-2">{sessionDraft.concepts.map((concept) => <span key={concept.id} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600">{concept.title}</span>)}</div>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-slate-600">Start recall mode to test what you can reproduce from memory.</div>
                  <button onClick={handleStartRecall} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Start recall mode</button>
                </div>
              </div>
            )}

            {step === 'recall' && sessionDraft && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Step 3</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Recall mode</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">The session is intentionally distraction-free. Write or speak what you remember, then review the feedback.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setFocusMode((prev) => !prev)} className={`rounded-full border px-3 py-2 text-sm font-medium transition ${focusMode ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}>{focusMode ? 'Exit focus' : 'Focus mode'}</button>
                    <button onClick={() => document.documentElement.requestFullscreen?.()} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">Fullscreen</button>
                  </div>
                </div>
                <div className={`grid gap-6 ${focusMode ? 'xl:grid-cols-1' : 'xl:grid-cols-[1.1fr_0.6fr]'}`}>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recall prompt</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-900">Explain the main ideas of {sessionDraft.topic} from memory.</h3>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">{recallMode === 'typed' ? 'Typed recall' : 'Voice recall'}</div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={() => setRecallMode('typed')} className={`rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'typed' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>Typed recall</button>
                      <button onClick={() => setRecallMode('voice')} className={`rounded-full px-3 py-2 text-sm font-medium ${recallMode === 'voice' ? 'bg-slate-900 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>Voice recall</button>
                    </div>
                    {recallMode === 'typed' ? (
                      <div className="mt-5 space-y-3">
                        <label className="text-sm font-medium text-slate-700" htmlFor="recall">What do you remember?</label>
                        <textarea id="recall" value={typedResponse} onChange={(event) => setTypedResponse(event.target.value)} rows={12} placeholder="Start from the most important idea. Then add supporting details, examples, or relationships." className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-inner outline-none transition focus:border-slate-400" />
                        <div className="flex items-center justify-between text-sm text-slate-500"><span>{typedResponse.trim().split(/\s+/).filter(Boolean).length} words</span><span>Auto-saved locally in this browser</span></div>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
                        <button onClick={toggleVoiceCapture} className={`flex w-full items-center justify-center gap-3 rounded-3xl px-4 py-4 text-sm font-semibold transition ${voiceStatus === 'listening' ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-slate-900 text-white hover:bg-slate-700'}`}><MicIcon className="h-5 w-5" />{voiceStatus === 'listening' ? 'Pause recording' : 'Start recording'}</button>
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">{voiceTranscript || 'Your live transcript will appear here as you speak.'}</div>
                        <div className="mt-3 flex items-center justify-between text-sm"><span className={voiceStatus === 'listening' ? 'text-emerald-600' : 'text-slate-500'}>{voiceStatus === 'listening' ? 'Listening actively' : voiceStatus === 'unsupported' ? 'Unavailable in this browser' : 'Ready to capture'}</span><span className="text-slate-500">Confidence is estimated from the quality of the transcript.</span></div>
                        {voiceError && <p className="mt-3 text-sm text-rose-600">{voiceError}</p>}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Session progress</p>
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"><span>Prompt</span><span className="font-semibold text-slate-900">Ready</span></div>
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"><span>Recall effort</span><span className="font-semibold text-slate-900">{recallMode === 'typed' ? 'Typed' : 'Voice'}</span></div>
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"><span>Core ideas</span><span className="font-semibold text-slate-900">{sessionDraft.conceptCount}</span></div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-800">Why this matters</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">The most valuable learning happens when you retrieve ideas from memory and then compare them with the source. This workflow is designed to make that process visible.</p>
                    </div>
                    <button onClick={handleSubmitRecall} className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Review analysis <ArrowRightIcon className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            )}

            {step === 'analysis' && analysis && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Step 4</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Learning report</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">The analysis is designed to feel like feedback from an expert tutor: precise, calm, and actionable.</p>
                  </div>
                  <button onClick={() => setStep('dashboard')} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">View dashboard</button>
                </div>
                <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className={`rounded-3xl border p-6 ${getHighlightBg(analysis.score)}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recall score</p>
                    <p className={`mt-3 text-5xl font-semibold ${getHighlightTone(analysis.score)}`}>{analysis.score}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{analysis.summary}</p>
                    <div className="mt-5 h-2 rounded-full bg-white/70"><div className="h-2 rounded-full bg-slate-900" style={{ width: `${analysis.score}%` }}></div></div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Weakness map</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3"><p className="text-sm font-semibold text-emerald-700">Strong areas</p><ul className="mt-2 space-y-2 text-sm text-emerald-800">{analysis.weaknessMap.strong.length ? analysis.weaknessMap.strong.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• No strong concepts yet</li>}</ul></div>
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3"><p className="text-sm font-semibold text-amber-700">Moderate areas</p><ul className="mt-2 space-y-2 text-sm text-amber-800">{analysis.weaknessMap.moderate.length ? analysis.weaknessMap.moderate.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• No moderate concepts yet</li>}</ul></div>
                      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3"><p className="text-sm font-semibold text-rose-700">Weak areas</p><ul className="mt-2 space-y-2 text-sm text-rose-800">{analysis.weaknessMap.weak.length ? analysis.weaknessMap.weak.map((item) => <li key={item.id}>• {item.title}</li>) : <li>• No weak concepts yet</li>}</ul></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-slate-800">Knowledge gaps</p><ul className="mt-4 space-y-3 text-sm text-slate-600">{analysis.gaps.map((gap, index) => <li key={`${gap.label}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-semibold text-slate-900">{gap.label}</p><p className="mt-1">{gap.detail}</p></li>)}</ul></div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-slate-800">Improvement suggestions</p><div className="mt-4 space-y-3">{analysis.suggestions.map((item) => <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-semibold text-slate-900">{item.title}</p><p className="mt-1 text-sm text-slate-600">{item.reason}</p><p className="mt-2 text-sm font-medium text-slate-700">Next step: {item.nextStep}</p></div>)}</div></div>
                </div>
              </div>
            )}

            {step === 'dashboard' && (
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Progress dashboard</p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A steady record of learning over time</h2>
                  </div>
                  <button onClick={() => setStep('upload')} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">Start another session</button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recall accuracy</p><p className="mt-2 text-2xl font-semibold text-slate-900">{sessions[0]?.score || 0}%</p></div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Study streak</p><p className="mt-2 text-2xl font-semibold text-slate-900">{user.streak} days</p></div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Mastery topics</p><p className="mt-2 text-2xl font-semibold text-slate-900">{Object.keys(mastery).length}</p></div>
                </div>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-800">Recent sessions</p><select value={selectedFolder} onChange={(event) => setSelectedFolder(event.target.value)} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"><option value="All">All sessions</option><option value="General">General</option></select></div>
                  <div className="space-y-3">{filteredSessions.length ? filteredSessions.map((session) => <div key={session.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{session.topic}</p><p className="mt-1 text-sm text-slate-600">{session.summary}</p></div><div className="text-sm text-slate-500"><span className="font-semibold text-slate-900">{session.score}%</span><span className="ml-3">{new Date(session.date).toLocaleDateString()}</span></div></div>) : <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">No sessions yet. Start your first recall session to build a learning history.</p>}</div>
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2"><SparklesIcon className="h-5 w-5 text-slate-700" /></div>
                <div><p className="text-sm font-semibold text-slate-900">What this redesign improves</p><p className="text-sm text-slate-500">Clarity, trust, and learning outcomes.</p></div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Clear workflow from source to feedback.</span></li>
                <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Professional study experience that prioritizes retrieval over decoration.</span></li>
                <li className="flex items-start gap-2"><CheckIcon className="mt-1 h-4 w-4 text-emerald-600" /><span>Actionable weakness mapping and next-step guidance.</span></li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Design principles</p>
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-white">Clarity over spectacle</p>
                  <p className="mt-1">Each screen removes friction and directs attention to the study task.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Professional confidence</p>
                  <p className="mt-1">The product now feels like a serious learning tool, not a side project.</p>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
