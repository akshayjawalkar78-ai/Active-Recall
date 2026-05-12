const { useState, useEffect } = React;

// --- Icons ---
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const LoaderIcon = () => (
  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
);
const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
);
const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
);
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
);
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
);
const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
);
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);
const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>
);
const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always true for single-user
  const [user, setUser] = useState(null);
  
  const [topic, setTopic] = useState('');
  const [brainDump, setBrainDump] = useState('');
  const [sourceMaterial, setSourceMaterial] = useState('');
  const [confidence, setConfidence] = useState(3);
  
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  
  const [sessions, setSessions] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [currentFolderId, setCurrentFolderId] = useState(null);
  
  const [feynmanMode, setFeynmanMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // login or register
  const [authLoading, setAuthLoading] = useState(false);

  // --- API Calls ---
  const apiCall = async (endpoint, method = 'GET', body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    // Token removed
    
    const config = { method, headers };
    if (body) {
      if (body instanceof FormData) {
        delete headers['Content-Type'];
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    try {
        const response = await fetch(endpoint, config);
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || "Request failed");
        return data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await apiCall('/api/user/me');
      setUser(userData);
      const folderData = await apiCall('/api/folders');
      setFolders(folderData);
      if (folderData.length > 0) setCurrentFolderId(folderData[0].id);
      const sessionData = await apiCall('/api/sessions');
      setSessions(sessionData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchUserData();
  }, [isAuthenticated]);

  // Login/Register functions removed

  const handleLogout = () => {
    alert("Logout disabled in single-user mode.");
  };

  // AI Source Generation removed

  const handleAnalyze = async () => {
    if (!topic.trim() || !brainDump.trim()) {
      setError("Please provide both a topic and your brain dump.");
      return;
    }

    setCurrentScreen('loading');
    setError('');

    try {
      const analysisResults = await apiCall('/api/analyze', 'POST', {
        topic,
        brain_dump: brainDump,
        source_material: sourceMaterial,
        confidence
      });
      
      setResults(analysisResults);

      // Save session to DB
      await apiCall('/api/sessions', 'POST', {
        topic,
        brain_dump: brainDump,
        score: analysisResults.score,
        results: analysisResults,
        confidence,
        folder_id: currentFolderId
      });

      // Refresh data
      fetchUserData();
      
      if (analysisResults.score >= 90) triggerConfetti();
      setCurrentScreen('results');
    } catch (err) {
      setError(err.message);
      setCurrentScreen('input');
    }
  };

  const handleAddFolder = async () => {
    const name = prompt("Enter folder name:");
    if (name) {
      try {
        await apiCall(`/api/folders?name=${encodeURIComponent(name)}`, 'POST');
        fetchUserData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const triggerConfetti = () => {
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ffffff']
      });
    }
  };

  // --- UI Components ---
  // Login screen removed

  const filteredSessions = sessions.filter(s => 
    selectedFolder === 'All' || s.folder_id === parseInt(selectedFolder)
  );

  const dueForReview = sessions.filter(s => s.score < 80).slice(0, 3);

  const DashboardView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ZapIcon className="w-12 h-12" />
          </div>
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total XP</div>
          <div className="text-3xl font-bold text-white mt-1">{user?.xp || 0}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FlameIcon className="w-12 h-12" />
          </div>
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Streak</div>
          <div className="text-3xl font-bold text-orange-400 mt-1">{user?.streak || 0} Days</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutIcon className="w-12 h-12" />
          </div>
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Sessions</div>
          <div className="text-3xl font-bold text-indigo-400 mt-1">{sessions.length}</div>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
          <RefreshIcon className="text-indigo-400" />
          Needs Attention (Low Scores)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dueForReview.length === 0 ? (
            <div className="text-gray-500 text-xs italic py-2">All topics are looking good!</div>
          ) : (
            dueForReview.map(s => (
              <div 
                key={s.id} 
                className="p-4 bg-gray-950 border border-gray-800 rounded-xl hover:border-indigo-500/50 transition cursor-pointer group"
                onClick={() => {
                  setTopic(s.topic);
                  setConfidence(s.confidence);
                  setCurrentScreen('input');
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold text-gray-300 group-hover:text-indigo-400">{s.topic}</div>
                  <div className="text-[10px] bg-red-900/20 text-red-400 px-2 py-0.5 rounded-full">{s.score}%</div>
                </div>
                <p className="text-[10px] text-gray-600 mt-2">Ready for a re-recall session?</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-950 border-r border-gray-800 flex flex-col hidden md:flex z-20 transition-all duration-300 ease-in-out relative overflow-hidden`}>
        <div className="p-6 border-b border-gray-800 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold text-gray-200 tracking-tight">Active Recall</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-white transition-colors"><XIcon /></button>
          </div>
          
          <nav className="space-y-1">
            <button onClick={() => setCurrentScreen('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentScreen === 'dashboard' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 hover:bg-gray-900'}`}>
              <LayoutIcon /> Dashboard
            </button>
            <button onClick={() => { setTopic(''); setBrainDump(''); setCurrentScreen('input'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentScreen === 'input' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 hover:bg-gray-900'}`}>
              <SparklesIcon /> New Session
            </button>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2"><FolderIcon /> Library</h3>
              <button onClick={handleAddFolder} className="text-gray-600 hover:text-indigo-400 text-lg">+</button>
            </div>
            <div className="space-y-1">
              <button onClick={() => setSelectedFolder('All')} className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition ${selectedFolder === 'All' ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-500 hover:text-gray-300'}`}>All Sessions</button>
              {folders.map(f => (
                <button key={f.id} onClick={() => setSelectedFolder(f.id)} className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition ${selectedFolder === f.id ? 'text-indigo-400 bg-indigo-500/5 font-medium' : 'text-gray-500 hover:text-gray-300'}`}>{f.name}</button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="px-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2"><HistoryIcon /> History</h3>
            <div className="space-y-2">
              {filteredSessions.map(session => (
                <div key={session.id} className="group px-3 py-2 rounded-lg hover:bg-gray-900/50 cursor-pointer border border-transparent hover:border-gray-800" onClick={() => { setTopic(session.topic); setConfidence(session.confidence); setCurrentScreen('input'); }}>
                  <div className="text-[11px] font-medium text-gray-400 truncate group-hover:text-indigo-300">{session.topic}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-gray-700">{new Date(session.date).toLocaleDateString()}</span>
                    <span className="text-[9px] font-bold text-indigo-500/70">{session.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 py-2 rounded">
             Single-User Mode
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900">
        <header className="h-16 flex shrink-0 items-center justify-between px-6 border-b border-white/5 glass z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><MenuIcon /></button>}
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
              <ZapIcon /> Active Recall Coach
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <UserIcon className="text-indigo-400" />
              {user?.email}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-3xl mx-auto">
            {error && <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-start gap-3 shadow-lg animate-in fade-in"><XIcon /> <div className="text-sm">{error}</div></div>}
            
            {currentScreen === 'dashboard' && <DashboardView />}
            
            {currentScreen === 'input' && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Focus on a Topic</h2>
                    <select value={currentFolderId} onChange={(e) => setCurrentFolderId(parseInt(e.target.value))} className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400">
                      {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                  </div>
                  <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What are you studying today?" className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 transition shadow-inner" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Brain Dump Everything</label>
                  <textarea value={brainDump} onChange={(e) => setBrainDump(e.target.value)} placeholder="Type or speak freely here..." className="w-full h-48 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-indigo-100 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 transition shadow-inner" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Source Material (Optional)</label>
                  </div>
                  <textarea value={sourceMaterial} onChange={(e) => setSourceMaterial(e.target.value)} placeholder="Paste source text here..." className="w-full h-24 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-indigo-500 transition shadow-inner" />
                </div>

                <div className="space-y-3 pt-2 bg-gray-900/30 p-4 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Confidence Level</label>
                    <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold border border-indigo-500/30">{confidence}/5</span>
                  </div>
                  <input type="range" min="1" max="5" value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value))} className="w-full accent-indigo-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${feynmanMode ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-500'} transition-colors`}>
                      <InfoIcon />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-200">Feynman Mode</div>
                      <div className="text-[10px] text-gray-500 italic">Socratic questioning for deep understanding.</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFeynmanMode(!feynmanMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${feynmanMode ? 'bg-indigo-600' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${feynmanMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <button onClick={handleAnalyze} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-indigo-600/40 flex justify-center items-center gap-2 active:scale-[0.98]">
                  Analyze My Recall Instantly
                </button>
              </div>
            )}

            {currentScreen === 'loading' && (
              <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-indigo-400">
                <LoaderIcon className="w-12 h-12" />
                <div className="text-lg font-medium animate-pulse">Running Server-Side Analysis...</div>
              </div>
            )}

            {currentScreen === 'results' && results && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Recall Accuracy</div>
                    <div className="text-5xl font-black bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">{results.score}%</div>
                  </div>
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Next Review</div>
                    <div className="text-xl font-bold text-gray-200">{results.nextReview}</div>
                    <div className="text-[10px] text-indigo-400 font-medium">Spaced Repetition Optimized</div>
                  </div>
                </div>

                <div className="bg-green-500/5 border border-green-500/20 p-5 rounded-2xl">
                  <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2"><CheckIcon /> Recalled Correctly</h3>
                  <ul className="space-y-2">
                    {results.recalled_correctly.map((item, i) => <li key={i} className="text-gray-300 text-sm leading-relaxed">• {item}</li>)}
                  </ul>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl">
                  <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2"><XIcon /> Gaps Identified</h3>
                  <ul className="space-y-4">
                    {results.gaps.map((gap, i) => (
                      <li key={i} className="border-l-2 border-red-500/30 pl-4 py-1">
                        <div className="text-red-300 text-sm font-bold mb-1">{gap.concept}</div>
                        <div className="text-gray-400 text-xs italic">{gap.cue_question}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => setCurrentScreen('input')} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3.5 rounded-xl transition border border-gray-700">Try Again</button>
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
