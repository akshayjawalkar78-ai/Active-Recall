const { useState, useEffect } = React;

// --- Premium UI Icons ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>;
const LoaderIcon = ({className="animate-spin w-24 h-24"}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>;
const LayoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const FlameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>;

// --- SM-2 Algorithm (JS Implementation) ---
const calculateSM2 = (quality, repetitions, previousInterval, previousEaseFactor) => {
  let interval = 1;
  let easeFactor = previousEaseFactor;
  let rep = repetitions;

  if (quality >= 3) {
    if (rep === 0) interval = 1;
    else if (rep === 1) interval = 6;
    else interval = Math.round(previousInterval * previousEaseFactor);
    rep += 1;
    easeFactor = previousEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  } else {
    rep = 0;
    interval = 1;
  }
  if (easeFactor < 1.3) easeFactor = 1.3;
  return { rep, interval, easeFactor };
};

// --- NLP Keyword Extraction Heuristic (JS Implementation) ---
const extractKeywords = (text) => {
  const stopWords = new Set(['the','is','at','which','on','and','a','an','in','to','of','for','with','as','by','that','this','it','from','or','be','are','was','were','have','has','had','not','but','what','when','where','why','how','can','will','would']);
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const freqMap = {};
  words.forEach(w => {
    if (!stopWords.has(w)) freqMap[w] = (freqMap[w] || 0) + 1;
  });
  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(entry => entry[0]);
};

const App = () => {
  // --- LocalStorage State ---
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('ar_user')) || { email: 'Student', xp: 0, streak: 0, lastStudyDate: null });
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem('ar_sessions')) || []);
  const [folders, setFolders] = useState(() => JSON.parse(localStorage.getItem('ar_folders')) || [{ id: 1, name: 'General' }]);
  const [topicMastery, setTopicMastery] = useState(() => JSON.parse(localStorage.getItem('ar_mastery')) || {});

  // --- UI State ---
  const [topic, setTopic] = useState('');
  const [brainDump, setBrainDump] = useState('');
  const [sourceMaterial, setSourceMaterial] = useState('');
  const [confidence, setConfidence] = useState(3);
  
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [currentFolderId, setCurrentFolderId] = useState(1);
  const [feynmanMode, setFeynmanMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Save to LocalStorage ---
  useEffect(() => { localStorage.setItem('ar_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('ar_sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('ar_folders', JSON.stringify(folders)); }, [folders]);
  useEffect(() => { localStorage.setItem('ar_mastery', JSON.stringify(topicMastery)); }, [topicMastery]);

  const handleAnalyze = () => {
    if (!topic.trim() || !brainDump.trim()) {
      setError("Please provide both a topic and your brain dump.");
      return;
    }
    setError('');
    setCurrentScreen('loading');
    
    // Simulate server processing time for effect
    setTimeout(() => {
      const wordCount = brainDump.trim().split(/\s+/).length;
      const lowerDump = brainDump.toLowerCase();
      const isClueless = lowerDump.includes("clueless") || lowerDump.includes("don't know") || wordCount < 5;
      
      let recalled_correctly = [];
      let gaps = [];
      let review_flag = "";
      
      if (isClueless && confidence <= 2) {
        recalled_correctly.push("Honest self-assessment: You've identified a significant knowledge gap.");
        gaps.push({ concept: "Core Fundamentals", cue_question: `Since you're clueless about ${topic}, what's the very first thing a textbook says about it?` });
        review_flag = "Critical Retrieval Failure.";
      } else if (sourceMaterial.trim().length > 10) {
        const keywords = extractKeywords(sourceMaterial);
        keywords.forEach(kw => {
          if (lowerDump.includes(kw)) {
            recalled_correctly.push(`Detailed Recall: You accurately explained '${kw}'.`);
          } else {
            gaps.push({ concept: `Missing: ${kw}`, cue_question: `How does '${kw}' fit into ${topic}?` });
          }
        });
        review_flag = `Analysis complete. ${recalled_correctly.length} points mastered.`;
      } else {
        review_flag = "No strict source material provided. Based on generic length metrics.";
      }

      // Calculate Score
      let score = 0;
      if (isClueless) score = 10;
      else {
        const totalPoints = recalled_correctly.length + gaps.length;
        const kwScore = totalPoints > 0 ? (recalled_correctly.length / totalPoints * 70) : 40;
        score = Math.min(100, Math.floor(kwScore + Math.min(wordCount/2, 20) + (confidence * 2)));
      }

      // Calculate SM-2
      const masteryKey = topic.toLowerCase().trim();
      const previousMastery = topicMastery[masteryKey] || { rep: 0, interval: 1, easeFactor: 2.5 };
      const quality = Math.min(Math.max(Math.floor(score / 20), 0), 5); // 0-5
      
      const newMastery = calculateSM2(quality, previousMastery.rep, previousMastery.interval, previousMastery.easeFactor);
      
      setTopicMastery(prev => ({ ...prev, [masteryKey]: newMastery }));

      const nextReviewStr = newMastery.interval > 1 ? `In ${newMastery.interval} days` : "Tomorrow (Needs Work)";

      const analysisResults = { score, recalled_correctly, gaps, review_flag, nextReview: nextReviewStr };
      
      // Save Session
      const newSession = {
        id: Date.now(),
        topic,
        brain_dump: brainDump,
        score,
        confidence,
        date: new Date().toISOString(),
        folder_id: currentFolderId
      };

      setSessions([newSession, ...sessions]);
      setUser(prev => {
        let newStreak = prev.streak;
        const today = new Date().toDateString();
        const lastDate = prev.lastStudyDate ? new Date(prev.lastStudyDate).toDateString() : null;
        
        if (lastDate !== today) {
           newStreak += 1;
        }
        return { ...prev, xp: prev.xp + (score * 5), streak: newStreak, lastStudyDate: new Date().toISOString() };
      });

      setResults(analysisResults);
      setCurrentScreen('results');
      
      if (score >= 80 && typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#6366f1', '#a855f7', '#ffffff'] });
      }
    }, 1500);
  };

  const handleAddFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) {
      setFolders([...folders, { id: Date.now(), name }]);
    }
  };

  const filteredSessions = sessions.filter(s => selectedFolder === 'All' || s.folder_id === parseInt(selectedFolder));

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f] text-gray-100 font-sans selection:bg-indigo-500/30">
      {/* Premium Dark Glass Sidebar */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-[#13131a] border-r border-white/5 flex flex-col hidden md:flex z-20 transition-all duration-300 relative overflow-hidden`}>
        <div className="p-6 border-b border-white/5 space-y-4 shrink-0">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
                <ZapIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <h1 className="text-lg font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">Active Recall</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-white transition-colors"><XIcon /></button>
          </div>
        </div>

        <div className="px-5 mt-6 mb-2 shrink-0">
          <div className="bg-[#1a1a24] rounded-2xl p-4 border border-white/5 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Student Profile</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                {user.email.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user.email}</p>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">Level {Math.floor(user.xp / 100) + 1}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-black/30 rounded-xl p-2 text-center border border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Total XP</p>
                <p className="font-black text-indigo-400">{user.xp}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-2 text-center border border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Streak</p>
                <p className="font-black text-orange-400">{user.streak} 🔥</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-8">
          <section>
            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 pl-2">Navigation</h3>
            <nav className="space-y-1">
              <button onClick={() => setCurrentScreen('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${currentScreen === 'dashboard' ? 'bg-indigo-500/15 text-indigo-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-indigo-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <LayoutIcon /> Dashboard
              </button>
              <button onClick={() => { setTopic(''); setBrainDump(''); setCurrentScreen('input'); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${currentScreen === 'input' ? 'bg-indigo-500/15 text-indigo-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-indigo-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <SparklesIcon /> Deep Study Session
              </button>
            </nav>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Your Library</h3>
              <button onClick={handleAddFolder} className="text-gray-400 hover:text-indigo-400 transition-colors bg-white/5 hover:bg-white/10 rounded-md w-5 h-5 flex items-center justify-center">+</button>
            </div>
            <div className="space-y-1">
              <button onClick={() => setSelectedFolder('All')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all font-medium ${selectedFolder === 'All' ? 'text-indigo-400 bg-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                <FolderIcon className="w-4 h-4" /> All Subjects
              </button>
              {folders.map(f => (
                <button key={f.id} onClick={() => setSelectedFolder(f.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all font-medium ${selectedFolder === f.id ? 'text-indigo-400 bg-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                  <FolderIcon className="w-4 h-4 shrink-0" /> <span className="truncate">{f.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="w-full text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest py-1">
             Vercel Local JS Mode
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#0a0a0f]">
        <header className="h-16 flex shrink-0 items-center justify-between px-6 border-b border-white/5 bg-[#13131a]/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><MenuIcon /></button>}
            <h1 className="text-lg font-black text-white md:hidden">Active Recall</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
          <div className="max-w-4xl mx-auto pb-20">
            {error && <div className="mb-8 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3 shadow-2xl shadow-red-500/10 animate-in fade-in"><XIcon /> <div className="text-sm font-medium">{error}</div></div>}
            
            {currentScreen === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">Recent Sessions</h2>
                    <p className="text-sm text-gray-400">Review your past performance and SM-2 schedules.</p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {filteredSessions.map(session => (
                    <div key={session.id} className="group bg-[#13131a] border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 hover:bg-[#1a1a24] transition-all cursor-pointer shadow-lg shadow-black/50" onClick={() => { setTopic(session.topic); setConfidence(session.confidence); setCurrentScreen('input'); }}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">{session.topic}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-black shadow-inner ${session.score > 80 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : session.score > 50 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {session.score}%
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed font-mono bg-black/20 p-3 rounded-lg border border-white/5">{session.brain_dump}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">{new Date(session.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                    </div>
                  ))}
                  {filteredSessions.length === 0 && (
                    <div className="text-center py-20 bg-[#13131a]/50 rounded-3xl border border-white/5 border-dashed">
                      <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FolderIcon className="w-6 h-6 text-gray-500" /></div>
                      <p className="text-gray-400 font-medium">Your library is empty.</p>
                      <button onClick={() => setCurrentScreen('input')} className="mt-4 text-indigo-400 text-sm font-bold hover:text-indigo-300 transition">Start Studying →</button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {currentScreen === 'input' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-white tracking-tight mb-2">Deep Study Session</h2>
                  <p className="text-sm text-gray-400">Pour everything from your memory onto the page. Entirely local JS analysis.</p>
                </div>

                <div className="bg-[#13131a] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Topic</label>
                        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Action Potentials" className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:ring-2 focus:ring-indigo-500 transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Folder</label>
                        <select value={currentFolderId} onChange={(e) => setCurrentFolderId(parseInt(e.target.value))} className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:ring-2 focus:ring-indigo-500 transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] appearance-none cursor-pointer">
                          {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest pl-1">The Brain Dump</label>
                      </div>
                      <textarea value={brainDump} onChange={(e) => setBrainDump(e.target.value)} placeholder="Write down absolutely everything you remember. Don't look at your notes!" className="w-full h-56 bg-[#0a0a0f] border border-indigo-500/30 rounded-xl px-5 py-5 text-gray-200 text-base leading-relaxed focus:ring-2 focus:ring-indigo-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] font-mono resize-y" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Source Material (For Strict JS Matching)</label>
                      </div>
                      <textarea value={sourceMaterial} onChange={(e) => setSourceMaterial(e.target.value)} placeholder="Paste your textbook text or lecture notes here..." className="w-full h-24 bg-[#0a0a0f] border border-white/5 rounded-xl px-5 py-4 text-gray-400 text-sm focus:ring-2 focus:ring-indigo-500 transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] resize-y" />
                    </div>

                    <div className="bg-[#0a0a0f] p-5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Self-Confidence Before Feedback</label>
                        <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1 rounded-full text-sm font-black border border-indigo-500/30 shadow-lg shadow-indigo-500/10">{confidence}/5</span>
                      </div>
                      <input type="range" min="1" max="5" value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value))} className="w-full accent-indigo-500 h-2 bg-white/5 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    <button onClick={handleAnalyze} disabled={isParsing} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-lg py-5 rounded-xl transition shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex justify-center items-center gap-3">
                      {isParsing ? <LoaderIcon className="w-6 h-6 animate-spin text-white" /> : "Analyze Local JS Mastery"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentScreen === 'loading' && (
              <div className="h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <LoaderIcon className="w-16 h-16 text-indigo-400 relative z-10 animate-spin" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Running JS Keyword Extraction...</div>
              </div>
            )}

            {currentScreen === 'results' && results && (
              <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 pb-20">
                <div className="text-center space-y-4 mb-10">
                  <h2 className="text-4xl font-black text-white">Analysis Complete</h2>
                  <p className="text-gray-400 text-lg">Here is your local JS heuristic feedback.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#13131a] border border-white/5 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Recall Accuracy</div>
                    <div className={`text-7xl font-black mb-4 ${results.score > 80 ? 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]' : results.score > 50 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.2)]'}`}>
                      {results.score}%
                    </div>
                    <p className="text-sm font-bold text-gray-300 bg-white/5 inline-block px-4 py-2 rounded-full border border-white/10">{results.review_flag}</p>
                  </div>
                  
                  <div className="bg-[#13131a] border border-white/5 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Spaced Repetition SM-2</div>
                    <div className="text-3xl font-black text-indigo-400 mb-2">{results.nextReview}</div>
                    <p className="text-sm text-gray-500 font-medium">Your next review date has been calculated using the JS SM-2 algorithm.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-green-900/10 border border-green-500/20 rounded-3xl p-8">
                    <h3 className="text-lg font-black text-green-400 flex items-center gap-3 mb-6">
                      <CheckIcon className="w-6 h-6" /> Mastered Keywords
                    </h3>
                    <ul className="space-y-4">
                      {results.recalled_correctly.map((item, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-green-500/10">
                          <span className="text-green-500 font-bold mt-0.5">✓</span> <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                      {results.recalled_correctly.length === 0 && <p className="text-sm text-gray-500 italic">No exact keyword matches found.</p>}
                    </ul>
                  </div>

                  <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-8">
                    <h3 className="text-lg font-black text-red-400 flex items-center gap-3 mb-6">
                      <XIcon className="w-6 h-6" /> Missing Concepts
                    </h3>
                    <ul className="space-y-4">
                      {results.gaps.map((gap, i) => (
                        <li key={i} className="bg-black/20 p-4 rounded-xl border border-red-500/10">
                          <p className="text-sm font-black text-gray-200 mb-2">{gap.concept}</p>
                          <p className="text-xs text-indigo-300 leading-relaxed font-medium pl-3 border-l-2 border-indigo-500/50">{gap.cue_question}</p>
                        </li>
                      ))}
                      {results.gaps.length === 0 && <p className="text-sm text-gray-500 italic">Excellent! You hit all extracted keywords.</p>}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center mt-10">
                  <button onClick={() => { setTopic(''); setBrainDump(''); setCurrentScreen('input'); }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-8 rounded-xl transition">
                    Start Another Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
