import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from '../components/SubmissionHistory';
import ChatAi from '../components/ChatAi';

const TAB_ICONS = {
  description: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  chats: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  submissions: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  solutions: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  editorial: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

const TestCaseRow = ({ tc, index, passed }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {passed ? (
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className="text-sm font-medium text-slate-700">Test case {index + 1}</span>
          <span className={`text-xs font-semibold ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {passed ? 'Passed' : 'Failed'}
          </span>
        </div>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 font-mono text-sm space-y-2 border-t border-slate-100 pt-3">
          <div className="flex gap-2">
            <span className="text-slate-400 min-w-[80px]">Input:</span>
            <span className="text-slate-700">{tc.stdin}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-400 min-w-[80px]">Expected:</span>
            <span className="text-slate-700">{tc.expected_output}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-400 min-w-[80px]">Output:</span>
            <span className="text-slate-700">{tc.stdout}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();



  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);



  useEffect(() => {
    const langMap = {
      cpp: "C++",
      java: "Java",
      javascript: "JavaScript"
    };
    if (problem) {
      const expectedLang = langMap[selectedLanguage];
      const initialCode = problem.startCode?.find(sc => sc?.language === expectedLang)?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("codequick-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "94A3B8", fontStyle: "italic" },
        { token: "keyword", foreground: "7C3AED" },
        { token: "number", foreground: "0891B2" },
        { token: "string", foreground: "059669" },
        { token: "function", foreground: "2563EB" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#0F172A",
        "editorCursor.foreground": "#059669",
        "editorLineNumber.foreground": "#CBD5E1",
        "editorLineNumber.activeForeground": "#059669",
        "editor.selectionBackground": "#D1FAE5",
        "editor.inactiveSelectionBackground": "#ECFDF5",
        "editor.lineHighlightBackground": "#F8FAFC",
        "editor.lineHighlightBorder": "#F1F5F9",
        "editorIndentGuide.background": "#F1F5F9",
        "editorIndentGuide.activeBackground": "#E2E8F0",
        "editorWhitespace.foreground": "#E2E8F0",
        "editorGutter.background": "#FFFFFF",
      },
    });

    monaco.editor.setTheme("codequick-light");
  };


  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  const leftTabs = ['description', 'chats', 'submissions', 'solutions', 'editorial'];

  return (
    <div className="h-screen flex bg-white">
      {/* Left Panel */}
      <div className="w-[44%] flex flex-col border-r border-slate-200">
        {/* Left Tabs */}
        <div className="flex items-center gap-1 bg-slate-50 px-4 py-3 border-b border-slate-200">
          {leftTabs.map((tab) => (
            <button
              key={tab}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeLeftTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                }`}
              onClick={() => setActiveLeftTab(tab)}
            >
              {TAB_ICONS[tab]}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {problem && (
            <>
              {activeLeftTab === 'description' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <h1 className="text-3xl font-bold text-slate-900">{problem.title}</h1>
                    <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </div>
                    <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {problem.tags}
                    </div>
                    {problem?.solved && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Solved
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {problem.description}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                      Examples
                    </h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-colors">
                          <h4 className="font-semibold text-emerald-700 mb-3">Example {index + 1}</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm font-mono mb-3">
                            <div>
                              <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide mb-1">Input</p>
                              <p className="text-emerald-700 bg-white rounded-lg px-3 py-2 border border-slate-200">{example.input}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 font-semibold text-xs uppercase tracking-wide mb-1">Output</p>
                              <p className="text-amber-700 bg-white rounded-lg px-3 py-2 border border-slate-200">{example.output}</p>
                            </div>
                          </div>
                          {example.explanation && (
                            <p className="text-sm text-slate-500">
                              <span className="font-semibold text-slate-400">Explanation: </span>
                              {example.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Editorial
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <p className="text-slate-500 leading-relaxed">Editorial is here for the problem</p>
                  </div>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Solutions
                  </h2>
                  <div className="space-y-4">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                          <h3 className="font-semibold text-slate-900">{problem?.title} - {solution?.language}</h3>
                        </div>
                        <div className="p-5">
                          <pre className="bg-slate-900 p-4 rounded-lg text-sm overflow-x-auto">
                            <code className="text-slate-200">{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || <p className="text-slate-400">Solutions will be available after you solve the problem.</p>}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                    My Submissions
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ring-1 ring-slate-200 mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <SubmissionHistory problemId={problemId} />
                  </div>
                </div>
              )}

              {activeLeftTab === 'chats' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Ask about this problem
                  </h2>

                  <ChatAi problem={problem} />

                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[56%] flex flex-col">
        {/* Right Tabs */}
        <div className="flex items-center gap-1 bg-slate-50 px-4 py-3 border-b border-slate-200">
          {['code', 'testcase', 'result'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeRightTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                }`}
              onClick={() => setActiveRightTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex gap-2">
                  {['javascript', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedLanguage === lang
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-800'
                        }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 relative border-t border-slate-100">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="codequick-light"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-slate-200 flex justify-between bg-slate-50">
                <div></div>
                <div className="flex gap-3">
                  <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  >
                    {loading && activeRightTab !== 'result' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></span>
                        Running...
                      </span>
                    ) : 'Run'}
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-600/20 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    {loading && activeRightTab === 'result' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Submitting...
                      </span>
                    ) : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Test Results
              </h3>
              {runResult ? (
                <div className={`rounded-xl p-6 border ${runResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                  {runResult.success ? (
                    <div>
                      <h4 className="font-bold text-lg text-emerald-700 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        All test cases passed!
                      </h4>
                      <div className="flex gap-6 mb-6">
                        <div className="bg-white px-4 py-2 rounded-lg border border-emerald-200">
                          <p className="text-xs text-slate-400 mb-1">Runtime</p>
                          <p className="text-emerald-700 font-semibold">{runResult.runtime} sec</p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-emerald-200">
                          <p className="text-xs text-slate-400 mb-1">Memory</p>
                          <p className="text-emerald-700 font-semibold">{runResult.memory} KB</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {runResult.testCases.map((tc, i) => (
                          <TestCaseRow key={i} tc={tc} index={i} passed={true} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-lg text-rose-700 mb-4 flex items-center gap-2">
                        <span className="text-2xl">❌</span>
                        Error
                      </h4>
                      <div className="space-y-2">
                        {runResult.testCases.map((tc, i) => (
                          <TestCaseRow key={i} tc={tc} index={i} passed={tc.status_id == 3} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ring-1 ring-slate-200 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-slate-400">Click "Run" to test your code with the example test cases.</p>
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Submission Result
              </h3>
              {submitResult ? (
                <div className={`rounded-xl p-6 border ${submitResult.status === 'accepted' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                  {submitResult.status == "accepted" ? (
                    <div>
                      <h4 className="font-bold text-2xl text-emerald-700 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🎉</span>
                        Accepted
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-xs text-slate-400 mb-2">Test Cases</p>
                          <p className="text-2xl font-bold text-emerald-700">{submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-xs text-slate-400 mb-2">Runtime</p>
                          <p className="text-2xl font-bold text-emerald-700">{submitResult.runtime} sec</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-xs text-slate-400 mb-2">Memory</p>
                          <p className="text-2xl font-bold text-emerald-700">{submitResult.memory} KB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-2xl text-rose-700 mb-6 flex items-center gap-3">
                        <span className="text-4xl">❌</span>
                        {submitResult.error}
                      </h4>
                      <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <p className="text-sm text-slate-400 mb-2">Test Cases Passed</p>
                        <p className="text-2xl font-bold text-rose-700">{submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ring-1 ring-slate-200 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-400">Click "Submit" to submit your solution for evaluation.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.6);
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;