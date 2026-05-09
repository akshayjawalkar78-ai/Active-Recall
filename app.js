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

const App = () => {
  const [topic, setTopic] = useState('');
  const [brainDump, setBrainDump] = useState('');
  const [sourceMaterial, setSourceMaterial] = useState('');
  const [confidence, setConfidence] = useState(3);
  
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('active_recall_apikey') || '');
  
  const [sessions, setSessions] = useState([]);
  const [folders, setFolders] = useState(['General']);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [currentFolder, setCurrentFolder] = useState('General');
  
  const [stats, setStats] = useState({
    streak: 0,
    xp: 0,
    lastDate: null,
    history: [] // [{date, score}]
  });
  const [feynmanMode, setFeynmanMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef(null);
  
  useEffect(() => {
    const savedSessions = localStorage.getItem('active_recall_sessions');
    const savedStats = localStorage.getItem('active_recall_stats');
    const savedFolders = localStorage.getItem('active_recall_folders');
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions));
      } catch (e) { console.error(e); }
    }
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) { console.error(e); }
    }
    if (savedFolders) {
      try {
        setFolders(JSON.parse(savedFolders));
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('active_recall_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('active_recall_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('active_recall_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('active_recall_apikey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setBrainDump(prev => prev + (prev ? ' ' : '') + finalTranscript.trim());
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Your browser does not support Speech Recognition. Try using Chrome or Edge.");
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsParsing(true);
    setError('');

    try {
      let text = '';
      const fileType = file.name.split('.').pop().toLowerCase();

      if (fileType === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          fullText += strings.join(' ') + '\n';
        }
        text = fullText;
      } else if (fileType === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        // Fallback to plain text for everything else (txt, md, js, etc.)
        text = await file.text();
      }

      if (text.trim()) {
        setSourceMaterial(text.trim());
      } else {
        setError("Could not extract any text from the file.");
      }
    } catch (err) {
      console.error("File upload error:", err);
      setError("Failed to read file. Make sure it's a valid document.");
    } finally {
      setIsParsing(false);
      // Reset input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const handleAIGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first so the AI knows what to generate.");
      return;
    }

    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    if (!apiKey) {
      const key = prompt("Please enter your Anthropic API Key to use this feature. You can also save it in the sidebar.");
      if (key) setApiKey(key);
      else return;
    }

    setIsGeneratingAI(true);
    setError('');

    try {
      // Feynman Mode Enhancement
      let aiPrompt = feynmanMode 
        ? `Act as a curious but confused student. Create a concise study guide for "${topic}". Then, ask me 2-3 specific, challenging questions that test if I truly understand the underlying concepts, not just the definitions. Focus on "Why" and "How" rather than "What".`
        : `Create a high-density study guide for: "${topic}". For each key point, provide a short "Deep Understanding" explanation that shows the mechanism behind the concept, not just the buzzword.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: aiPrompt
            }
          ]
        })
      });

      const data = await response.json();
      if (data.content && data.content[0].text) {
        setSourceMaterial(data.content[0].text);
      } else {
        throw new Error(data.error?.message || "AI generation failed");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      setError(`AI Error: ${err.message}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAddFolder = () => {
    const name = prompt("Enter folder name:");
    if (name && !folders.includes(name)) {
      setFolders([...folders, name]);
      setCurrentFolder(name);
    }
  };

  const filteredSessions = sessions.filter(s => 
    selectedFolder === 'All' || s.folder === selectedFolder
  );

  const dueForReview = sessions.filter(s => {
    const score = s.score || 0;
    return score < 80; // Simple logic: anything not mastered is due
  }).slice(0, 3);
  const handleAnalyze = async () => {
    if (!topic.trim() || !brainDump.trim()) {
      setError("Please provide both a topic and your brain dump.");
      return;
    }

    setCurrentScreen('loading');
    setError('');

    // Simulate analysis delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      let recalled_correctly = [];
      let gaps = [];
      let review_flag = "";
      
      const wordCount = brainDump.trim().split(/\s+/).length;
      const lowerDump = brainDump.toLowerCase();
      const isClueless = lowerDump.includes("clueless") || lowerDump.includes("don't know") || lowerDump.includes("don't remember") || lowerDump.includes("idk") || wordCount < 5;

      const stopWords = new Set(['the','is','at','which','on','and','a','an','in','to','of','for','with','as','by','that','this','it','from','or','be','are','was','were','have','has','had','not','but','what','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','can','will','just']);
      
      if (isClueless && confidence <= 2) {
        recalled_correctly.push("Honest self-assessment: You've identified a significant knowledge gap.");
        gaps.push({ 
          concept: "Core Fundamentals", 
          cue_question: `Since you're feeling clueless about ${topic}, what's the very first thing a textbook would say about it? Try to recall just one definition.` 
        });
        review_flag = "Critical Retrieval Failure. Do not move on. You need to review the source material again before your next brain dump.";
      } else if (sourceMaterial.trim().length > 10) {
        // Extract words from source
        const sourceWordsRaw = sourceMaterial.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
        const freqMap = {};
        sourceWordsRaw.forEach(w => {
           if (w.length > 3 && !stopWords.has(w)) {
             freqMap[w] = (freqMap[w] || 0) + 1;
           }
        });
        
        // Find top 8 most frequent keywords
        const keywords = Object.keys(freqMap).sort((a,b) => freqMap[b] - freqMap[a]).slice(0, 8);
        const brainDumpLower = brainDump.toLowerCase();
        
        keywords.forEach(kw => {
          const index = brainDumpLower.indexOf(kw);
          if (index !== -1) {
             // Check for "Explanation Depth" - see if the keyword is followed by a substantial phrase
             const context = brainDumpLower.substring(index, index + 60);
             const wordsInContext = context.split(/\s+/).filter(w => w.length > 0).length;
             
             if (wordsInContext > 5) {
               recalled_correctly.push(`Detailed Recall: You explained "${kw}" with conceptual depth.`);
             } else {
               gaps.push({
                 concept: `${kw} (Surface Level)`,
                 cue_question: `You mentioned "${kw}", but can you explain *what* it is or *how* it works? Stating the word isn't enough for mastery.`
               });
             }
          } else {
             gaps.push({
               concept: `Missing: ${kw}`,
               cue_question: `How does "${kw}" fit into your understanding of ${topic}? Try to define it in your own words.`
             });
          }
        });
        
        if (recalled_correctly.length === 0) {
          recalled_correctly.push("Attempted recall initiated, but no core vocabulary was detected.");
          review_flag = "Low retrieval accuracy. Focus on the bolded terms in your source material next time.";
        } else if (gaps.length > 0) {
          review_flag = `You have the building blocks (${recalled_correctly.length} concepts), but you're missing ${gaps.length} key links.`;
        } else {
          review_flag = "Total Recall! You've successfully retrieved all major keywords from the source.";
        }
      } else {
        // Heuristic analysis based on length and structure
        if (wordCount > 50) {
          recalled_correctly.push("High retrieval volume: You have a lot of 'active' information ready to be organized.");
          gaps.push({ concept: "Precision & Accuracy", cue_question: `Can you verify the specific details of your brain dump? High volume sometimes hides small errors.` });
          review_flag = "Broad knowledge detected. Now, try to structure this into a 'teaching' format for someone else.";
        } else if (wordCount > 10) {
          recalled_correctly.push("Initial retrieval baseline established.");
          gaps.push({ concept: "Elaboration", cue_question: `You've got the 'what'. Can you explain the 'why' or 'how' for ${topic}?` });
          review_flag = "Foundation is there, but the 'branches' are missing. Aim for more detail in your next dump.";
        } else {
          recalled_correctly.push("Brief retrieval attempt.");
          gaps.push({ concept: "Minimum Detail", cue_question: `That was very short. What's one more sentence you can add about ${topic}?` });
          review_flag = "Insufficient data for a full analysis. Challenge yourself to write at least 3-4 sentences next time.";
        }
      }

      // Calculate Score (0-100)
      let score = 0;
      if (isClueless) {
        score = 10;
      } else {
        const keywordScore = sourceMaterial.trim().length > 10 ? (recalled_correctly.length / (recalled_correctly.length + gaps.length)) * 70 : 30;
        const lengthScore = Math.min(wordCount / 2, 20);
        const confidenceBonus = confidence * 2;
        score = Math.round(keywordScore + lengthScore + confidenceBonus);
      }

      // Next Review Date
      let nextReview = "";
      if (score < 40) nextReview = "Tomorrow";
      else if (score < 75) nextReview = "In 3 days";
      else nextReview = "In 1 week (Mastery reached!)";

      const parsedResults = {
        recalled_correctly,
        gaps,
        consolidation_cues: [
          `If you had to explain ${topic} to a 10-year-old using only the things you JUST recalled, could you?`,
          `What is the most 'boring' part of this topic? (That's usually the part you'll forget first).`
        ],
        review_flag,
        score,
        nextReview
      };
      
      setResults(parsedResults);
      
      // Update Stats & Gamification
      const now = new Date();
      const today = now.toDateString();
      
      setStats(prev => {
        let newStreak = prev.streak;
        if (!prev.lastDate) {
          newStreak = 1;
        } else {
          const last = new Date(prev.lastDate);
          const diffTime = Math.abs(now - last);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) newStreak += 1;
          else if (diffDays > 1) newStreak = 1;
        }

        return {
          ...prev,
          streak: newStreak,
          xp: prev.xp + (score * 5),
          lastDate: now.toISOString(),
          history: [{date: today, score}, ...prev.history].slice(0, 10)
        };
      });

      if (score >= 90) {
        triggerConfetti();
      }

      const newSession = {
        id: Date.now(),
        topic,
        confidence,
        review_flag: parsedResults.review_flag,
        date: new Date().toISOString(),
        score,
        folder: currentFolder
      };
      setSessions(prev => [newSession, ...prev]);
      setCurrentScreen('results');
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setCurrentScreen('input');
    }
  };

  const handleClearHistory = () => {
    if(confirm("Are you sure you want to clear your session history?")) {
      setSessions([]);
    }
  };

  const copyReviewFlag = () => {
    if (results?.review_flag) {
      navigator.clipboard.writeText(results.review_flag);
    }
  };
  const DashboardView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total XP</div>
          <div className="text-3xl font-bold text-white mt-1">{stats.xp || 0}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Streak</div>
          <div className="text-3xl font-bold text-orange-400 mt-1">{stats.streak || 0} Days</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Sessions</div>
          <div className="text-3xl font-bold text-indigo-400 mt-1">{sessions.length}</div>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Needs Attention (Low Scores)</h3>
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
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Recent Performance</h3>
        <div className="flex items-end gap-3 h-40 px-2">
          {(stats.history || []).slice(-10).reverse().map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div 
                className="w-full bg-indigo-500/20 rounded-t-lg relative group transition-all hover:bg-indigo-500/40" 
                style={{ height: `${h.score}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-xl border border-gray-700">
                  <div className="font-bold text-indigo-400">{h.score}% Accuracy</div>
                  <div className="text-[8px] text-gray-500">{h.date}</div>
                </div>
              </div>
              <div className="text-[9px] text-gray-600 font-medium rotate-[-45deg] origin-top-left translate-y-1">
                {h.date.split(' ').slice(1, 3).join(' ')}
              </div>
            </div>
          ))}
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
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-white transition-colors"
              title="Close Sidebar (Zen Mode)"
            >
              <XIcon />
            </button>
          </div>
          
          <div className="flex items-center gap-1 text-orange-400 font-bold text-xs bg-orange-400/10 px-2 py-1 rounded border border-orange-400/20 w-fit">
            <FlameIcon />
            {stats.streak} Streak
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentScreen === 'dashboard' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'text-gray-500 hover:bg-gray-900'}`}
            >
              <LayoutIcon /> Dashboard
            </button>
            <button 
              onClick={() => {
                setTopic('');
                setBrainDump('');
                setSourceMaterial('');
                setCurrentScreen('input');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${currentScreen === 'input' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'text-gray-500 hover:bg-gray-900'}`}
            >
              <SparklesIcon /> New Session
            </button>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                <FolderIcon />
                Library
              </h3>
              <button onClick={handleAddFolder} className="text-gray-600 hover:text-indigo-400 text-lg">+</button>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setSelectedFolder('All')}
                className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition ${selectedFolder === 'All' ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-500 hover:text-gray-300'}`}
              >
                All Sessions
              </button>
              {(folders || []).map(f => (
                <button 
                  key={f}
                  onClick={() => setSelectedFolder(f)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition ${selectedFolder === f ? 'text-indigo-400 bg-indigo-500/5 font-medium' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="px-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <HistoryIcon />
              History
            </h3>
            <div className="space-y-2">
              {filteredSessions.length === 0 ? (
                <p className="text-gray-700 text-[10px] px-2 italic">Empty...</p>
              ) : (
                filteredSessions.slice(0, 8).map(session => (
                  <div 
                    key={session.id} 
                    className="group px-3 py-2 rounded-lg hover:bg-gray-900/50 cursor-pointer transition border border-transparent hover:border-gray-800"
                    onClick={() => {
                      setTopic(session.topic);
                      setConfidence(session.confidence);
                      setCurrentScreen('input');
                    }}
                  >
                    <div className="text-[11px] font-medium text-gray-400 truncate group-hover:text-indigo-300 transition-colors">{session.topic}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[9px] text-gray-700">{new Date(session.date).toLocaleDateString()}</span>
                      <span className="text-[9px] font-bold text-indigo-500/70">{session.score}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-950/20">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">AI Settings</label>
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Anthropic API Key"
            className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 transition placeholder:text-gray-700"
          />
          <p className="text-[9px] text-gray-600 mt-2 leading-tight">Your key is stored locally in your browser and never sent anywhere else.</p>
        </div>

        {sessions.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <button onClick={handleClearHistory} className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 py-2 rounded transition">
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900">
        {/* Header */}
        <header className="h-16 flex shrink-0 items-center justify-between px-6 border-b border-white/5 glass z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-indigo-400 transition-all animate-in fade-in"
                title="Open Sidebar"
              >
                <MenuIcon />
              </button>
            )}
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
              <ZapIcon />
              Active Recall Coach
            </h1>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Local Mode</span>
          </div>

          <a 
            href="mailto:akshay.jawalkar78@gmail.com"
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-indigo-300 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-indigo-500/30 group"
          >
            <MailIcon />
            <span className="hidden sm:inline">akshay.jawalkar78@gmail.com</span>
          </a>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-3xl mx-auto">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-start gap-3 shadow-lg">
                <div className="mt-0.5"><XIcon /></div>
                <div className="text-sm break-words flex-1">{error}</div>
              </div>
            )}
            {currentScreen === 'dashboard' && <DashboardView />}

            {currentScreen === 'input' && (
              <div className="space-y-8 animate-in">
                {/* Topic Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white tracking-tight">Focus on a Topic</h2>
                      <select 
                        value={currentFolder} 
                        onChange={(e) => setCurrentFolder(e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-indigo-500 transition"
                      >
                        {folders.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <p className="text-gray-500 text-sm">What are you mastering today?</p>
                  </div>
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="What are you studying? (e.g. Action Potentials)"
                    className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-600 shadow-inner"
                  />
                </div>

                {/* Brain Dump Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-gray-300 flex items-baseline gap-2">
                      Brain Dump 
                      <span className="text-gray-500 font-normal text-xs">— speak or write everything you remember</span>
                    </label>
                    <button 
                      onClick={toggleListening}
                      className={`p-2 rounded-full transition flex items-center justify-center gap-1.5 text-xs font-semibold ${isListening ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'}`}
                      title={isListening ? "Stop Listening" : "Start Voice to Text"}
                    >
                      <MicIcon />
                      {isListening ? "Listening..." : "Dictate"}
                    </button>
                  </div>
                  <textarea 
                    value={brainDump}
                    onChange={(e) => setBrainDump(e.target.value)}
                    placeholder="Type or speak freely here..."
                    className="w-full h-48 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-indigo-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-600 resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Source Material Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-gray-300 flex items-baseline gap-2">
                      Source Material (Optional but recommended) 
                      <span className="text-gray-500 font-normal text-xs">— used to generate precise gaps</span>
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        id="source-file" 
                        className="hidden" 
                        onChange={handleFileUpload}
                        accept=".txt,.pdf,.docx,.md,.js,.py,.html,.css"
                      />
                      <label 
                        htmlFor="source-file"
                        className={`p-2 rounded-full transition flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer ${isParsing ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'}`}
                        title="Upload file (PDF, DOCX, TXT...)"
                      >
                        {isParsing ? <LoaderIcon /> : <FileIcon />}
                        {isParsing ? "Parsing..." : "File"}
                      </label>
                      <button 
                        onClick={handleAIGenerate}
                        className={`p-2 rounded-full transition flex items-center justify-center gap-1.5 text-xs font-semibold ${isGeneratingAI ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 animate-pulse' : 'bg-indigo-900/40 text-indigo-300 hover:text-white hover:bg-indigo-800 border border-indigo-500/30'}`}
                        title="Generate study material using AI"
                      >
                        {isGeneratingAI ? <LoaderIcon /> : <SparklesIcon />}
                        {isGeneratingAI ? "Generating..." : "AI Magic"}
                      </button>
                    </div>
                  </div>
                  <textarea 
                    value={sourceMaterial}
                    onChange={(e) => setSourceMaterial(e.target.value)}
                    placeholder="Paste source text or upload a file..."
                    className="w-full h-24 bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-gray-600 resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Confidence Section */}
                <div className="space-y-3 pt-2 bg-gray-900/30 p-4 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">How confident do you feel?</label>
                    <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold border border-indigo-500/30">
                      {confidence}/5
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="5" 
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value)}
                    className="w-full accent-indigo-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 px-1 font-medium">
                    <span>Clueless</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Feynman Mode Toggle */}
                <div className="pt-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-indigo-300">Feynman Mode</span>
                        <div className="group relative">
                          <InfoIcon className="text-indigo-500 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg text-[11px] text-gray-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                            <span className="font-bold text-indigo-400 block mb-1">Teaching is the best way to learn.</span>
                            The AI will act as a confused student and ask you challenging "why" and "how" questions to test if you truly understand the concepts, not just the definitions.
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500">Enable AI-driven Socratic questioning.</p>
                    </div>
                    <button 
                      onClick={() => setFeynmanMode(!feynmanMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${feynmanMode ? 'bg-indigo-600' : 'bg-gray-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${feynmanMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleAnalyze}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-lg transition shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex justify-center items-center gap-2"
                  >
                    Analyze My Recall Instantly
                  </button>
                </div>
              </div>
            )}

            {currentScreen === 'loading' && (
              <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-indigo-400">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse-slow"></div>
                  <LoaderIcon />
                </div>
                <div className="text-lg font-medium animate-pulse">Running Local Analysis...</div>
              </div>
            )}

            {currentScreen === 'results' && results && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                
                {/* Score & Mastery Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Recall Accuracy</div>
                    <div className="text-5xl font-black bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                      {results.score}%
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (results.score/20) ? 'bg-indigo-500' : 'bg-gray-700'}`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Next Review</div>
                    <div className="text-xl font-bold text-gray-200">
                      {results.nextReview}
                    </div>
                    <div className="text-[10px] text-indigo-400 font-medium">Spaced Repetition Optimized</div>
                  </div>
                </div>

                {/* Sections */}
                <CollapsibleSection 
                  title="Recalled Correctly" 
                  icon={<CheckIcon />} 
                  color="green" 
                  defaultOpen={true}
                >
                  <ul className="space-y-2">
                    {results.recalled_correctly.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-200 bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                        <div className="text-green-500 mt-0.5"><CheckIcon /></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection 
                  title="Gaps & Errors" 
                  icon={<XIcon />} 
                  color="red" 
                  defaultOpen={true}
                >
                  <div className="space-y-3">
                    {results.gaps.map((gap, i) => (
                      <div key={i} className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                        <div className="font-medium text-red-400 mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          {gap.concept}
                        </div>
                        <div className="text-gray-200 pl-4 border-l-2 border-red-500/30 mt-2 py-1 leading-relaxed">
                          <span className="text-red-300/70 text-xs uppercase tracking-wider font-bold block mb-1">Retrieval Cue</span>
                          {gap.cue_question}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection 
                  title="Consolidation Cues" 
                  icon={<RefreshIcon />} 
                  color="amber" 
                  defaultOpen={true}
                >
                  <div className="space-y-3">
                    {results.consolidation_cues.map((cue, i) => (
                      <div key={i} className="bg-amber-500/5 p-4 rounded-lg border border-amber-500/10 text-gray-200 flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-500 font-bold bg-amber-500/10 w-6 h-6 flex items-center justify-center rounded-full text-xs shrink-0 mt-0.5">{i+1}</span>
                        <span>{cue}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Review Flag Card */}
                <div className="mt-8 bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden shadow-lg shadow-indigo-500/5">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-indigo-300 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <RefreshIcon />
                      Review Flag (Save for next time)
                    </h3>
                    <button 
                      onClick={copyReviewFlag}
                      className="text-gray-400 hover:text-white p-1.5 rounded transition bg-gray-800 hover:bg-gray-700 active:scale-95"
                      title="Copy to clipboard"
                    >
                      <CopyIcon />
                    </button>
                  </div>
                  <p className="text-gray-100 font-medium text-lg leading-relaxed">{results.review_flag}</p>
                </div>

                <div className="pt-6 flex flex-col gap-3">
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6 shadow-inner animate-pulse-slow">
                    <h3 className="text-indigo-300 font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                      <ZapIcon />
                      Immediate Active Recall Challenge
                    </h3>
                    <p className="text-gray-200 text-lg mb-6 leading-relaxed italic">
                      "{results.gaps.length > 0 ? results.gaps[0].cue_question : results.consolidation_cues[0]}"
                    </p>
                    <button 
                      onClick={() => {
                        setBrainDump('');
                        setCurrentScreen('input');
                        // Auto-fill topic to encourage immediate retry with the new focus
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-indigo-600/40 flex justify-center items-center gap-2 group"
                    >
                      Answer This in a New Dump
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      setBrainDump('');
                      setCurrentScreen('input');
                    }}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3.5 rounded-lg transition border border-gray-700 shadow-md active:scale-[0.98]"
                  >
                    Try Again from Scratch
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

      {/* Attribution Footer */}
      <footer className="w-full py-8 px-6 border-t border-white/5 bg-gray-950/50 backdrop-blur-md mt-auto z-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="font-semibold tracking-tight">Active Recall Coach</span>
            <span className="text-gray-600">v1.0.1</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            Crafted with precision by <span className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors cursor-pointer">Akshay Jawalkar</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
};

// Collapsible Section Component
const CollapsibleSection = ({ title, icon, color, defaultOpen, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const colorMap = {
    green: "text-green-400 border-green-500/30 bg-green-500/10",
    red: "text-red-400 border-red-500/30 bg-red-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  };
  
  const accentClasses = colorMap[color];

  return (
    <div className="border border-gray-800/80 rounded-xl overflow-hidden bg-gray-900/40 backdrop-blur-sm shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition group"
      >
        <div className={`flex items-center gap-3 font-semibold text-lg ${accentClasses.split(' ')[0]}`}>
          <div className={`p-2 rounded-lg ${accentClasses.split(' ').slice(1).join(' ')} group-hover:scale-105 transition-transform`}>
            {icon}
          </div>
          {title}
        </div>
        <ChevronDownIcon className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-5 pt-0 border-t border-gray-800/50 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
