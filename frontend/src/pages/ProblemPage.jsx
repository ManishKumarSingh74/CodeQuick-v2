// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router';
// import axiosClient from "../utils/axiosClient"


// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState('description');
//   const [activeRightTab, setActiveRightTab] = useState('code');
//   const editorRef = useRef(null);
//   let {problemId}  = useParams();

//   const { handleSubmit } = useForm();

//   useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
        
//         const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        
//         const initialCode = response.data.startCode.find((sc) => {
        
//         if (sc.language == "C++" && selectedLanguage == 'cpp')
//         return true;
//         else if (sc.language == "Java" && selectedLanguage == 'java')
//         return true;
//         else if (sc.language == "Javascript" && selectedLanguage == 'javascript')
//         return true;

//         return false;
//         })?.initialCode || 'Hello';

//         console.log(initialCode);
//         setProblem(response.data);
//         // console.log(response.data.startCode);
        
//         console.log(initialCode);
//         setCode(initialCode);
//         setLoading(false);
        
//       } catch (error) {
//         console.error('Error fetching problem:', error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);

//   // Update code when language changes
//   useEffect(() => {
//     if (problem) {
//       const initialCode = problem.startCode.find(sc => sc.language === selectedLanguage)?.initialCode || '';
//       setCode(initialCode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || '');
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleRun = async () => {
    
//     setLoading(true);
//     setRunResult(null);
    
//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab('testcase');
      
//     } catch (error) {
//       console.error('Error running code:', error);
//       setRunResult({
//         success: false,
//         error: 'Internal server error'
//       });
//       setLoading(false);
//       setActiveRightTab('testcase');
//     }
//   };

//   const handleSubmitCode = async () => {
    
//     setLoading(true);
//     setSubmitResult(null);
    
//     try {
//         const response = await axiosClient.post(`/submission/submit/${problemId}`, {
//         code:code,
//         language: selectedLanguage
//       });
//       console.log(response.data);
//        setSubmitResult(response.data);
//        setLoading(false);
//        setActiveRightTab('result');
      
//     } catch (error) {
//       console.error('Error submitting code:', error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab('result');
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case 'javascript': return 'javascript';
//       case 'java': return 'java';
//       case 'cpp': return 'cpp';
//       default: return 'javascript';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy': return 'text-green-500';
//       case 'medium': return 'text-yellow-500';
//       case 'hard': return 'text-red-500';
//       default: return 'text-gray-500';
//     }
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-base-100">
//       {/* Left Panel */}
//       <div className="w-1/2 flex flex-col border-r border-base-300">
//         {/* Left Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('description')}
//           >
//             Description
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('editorial')}
//           >
//             Editorial
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('solutions')}
//           >
//             Solutions
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('submissions')}
//           >
//             Submissions
//           </button>
//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {problem && (
//             <>
//               {activeLeftTab === 'description' && (
//                 <div>
//                   <div className="flex items-center gap-4 mb-6">
//                     <h1 className="text-2xl font-bold">{problem.title}</h1>
//                     <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
//                       {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
//                     </div>
//                     <div className="badge badge-primary">{problem.tags}</div>
//                   </div>

//                   <div className="prose max-w-none">
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {problem.description}
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Examples:</h3>
//                     <div className="space-y-4">
//                       {problem.visibleTestCases.map((example, index) => (
//                         <div key={index} className="bg-base-200 p-4 rounded-lg">
//                           <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
//                           <div className="space-y-2 text-sm font-mono">
//                             <div><strong>Input:</strong> {example.input}</div>
//                             <div><strong>Output:</strong> {example.output}</div>
//                             <div><strong>Explanation:</strong> {example.explanation}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'editorial' && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     {'Editorial is here for the problem'}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'solutions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                   <div className="space-y-6">
//                     {problem.referenceSolution?.map((solution, index) => (
//                       <div key={index} className="border border-base-300 rounded-lg">
//                         <div className="bg-base-200 px-4 py-2 rounded-t-lg">
//                           <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
//                         </div>
//                         <div className="p-4">
//                           <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
//                             <code>{solution?.completeCode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'submissions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">My Submissions</h2>
//                   <div className="text-gray-500">
//                     Your submission history will appear here.
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 flex flex-col">
//         {/* Right Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('code')}
//           >
//             Code
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('testcase')}
//           >
//             Testcase
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('result')}
//           >
//             Result
//           </button>
//         </div>

//         {/* Right Content */}
//         <div className="flex-1 flex flex-col">
//           {activeRightTab === 'code' && (
//             <div className="flex-1 flex flex-col">
//               {/* Language Selector */}
//               <div className="flex justify-between items-center p-4 border-b border-base-300">
//                 <div className="flex gap-2">
//                   {['javascript', 'java', 'cpp'].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Monaco Editor */}
//               <div className="flex-1">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme="vs-dark"
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: 'on',
//                     lineNumbers: 'on',
//                     glyphMargin: false,
//                     folding: true,
//                     lineDecorationsWidth: 10,
//                     lineNumbersMinChars: 3,
//                     renderLineHighlight: 'line',
//                     selectOnLineNumbers: true,
//                     roundedSelection: false,
//                     readOnly: false,
//                     cursorStyle: 'line',
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 border-t border-base-300 flex justify-between">
//                 <div className="flex gap-2">
//                   <button 
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setActiveRightTab('testcase')}
//                   >
//                     Console
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     Run
//                   </button>
//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeRightTab === 'testcase' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Test Results</h3>
//               {runResult ? (
//                 <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
//                   <div>
//                     {runResult.success ? (
//                       <div>
//                         <h4 className="font-bold">✅ All test cases passed!</h4>
//                         <p className="text-sm mt-2">Runtime: {runResult.runtime+" sec"}</p>
//                         <p className="text-sm">Memory: {runResult.memory+" KB"}</p>
                        
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={'text-green-600'}>
//                                   {'✓ Passed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold">❌ Error</h4>
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
//                                   {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Run" to test your code with the example test cases.
//                 </div>
//               )}
//             </div>
//           )}

//           {activeRightTab === 'result' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Submission Result</h3>
//               {submitResult ? (
//                 <div className={`alert ${submitResult.status ==='accepted'? 'alert-success' : 'alert-error'}`}>
//                   <div>
//                     {submitResult.status=="accepted" ? (
//                       <div>
//                         <h4 className="font-bold text-lg">🎉 Accepted</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
//                           <p>Runtime: {submitResult.runtime + " sec"}</p>
//                           <p>Memory: {submitResult.memory + "KB"} </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Submit" to submit your solution for evaluation.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;




import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from '../components/SubmissionHistory';
import ChatAi from '../components/ChatAi';

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
  let {problemId}  = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        
        const initialCode = response.data.startCode.find((sc) => {
          if (sc.language == "C++" && selectedLanguage == 'cpp')
            return true;
          else if (sc.language == "Java" && selectedLanguage == 'java')
            return true;
          else if (sc.language == "Javascript" && selectedLanguage == 'javascript')
            return true;
          return false;
        })?.initialCode || 'Hello';

        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const langMap = {
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript"
};

  useEffect(() => {
    if (problem) {
      const expectedLang = langMap[selectedLanguage];
      const initialCode = problem.startCode.find(sc => sc?.language === expectedLang)?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

 const handleEditorDidMount = (editor, monaco) => {
  editorRef.current = editor;

  monaco.editor.defineTheme("codequick-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6B7280" },
      { token: "keyword", foreground: "8B5CF6" },
      { token: "number", foreground: "38BDF8" },
      { token: "string", foreground: "34D399" },
      { token: "function", foreground: "60A5FA" },
    ],
    colors: {
      "editor.background": "#020617", // slate-950
      "editor.foreground": "#E5E7EB",
      "editorCursor.foreground": "#8B5CF6",
      "editorLineNumber.foreground": "#475569",
      "editorLineNumber.activeForeground": "#60A5FA",
      "editor.selectionBackground": "#1E293B",
      "editor.lineHighlightBackground": "#020617",
    },
  });

  monaco.editor.setTheme("codequick-dark");
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
        code:code,
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
      case 'easy': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'hard': return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-400 font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col border-r border-slate-800/50 backdrop-blur-xl">
        {/* Left Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/50 px-4 py-3 border-b border-slate-800/50">
          {['description', 'editorial', 'solutions', 'submissions','chats'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeLeftTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
              onClick={() => setActiveLeftTab(tab)}
            >
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
                  <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
                    <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </div>
                    <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {problem.tags}
                    </div>
                  </div>

                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {problem.description}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                      Examples
                    </h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                          <h4 className="font-semibold text-blue-400 mb-3">Example {index + 1}</h4>
                          <div className="space-y-2 text-sm font-mono">
                            <div className="flex gap-2">
                              <span className="text-slate-500 font-semibold min-w-[100px]">Input:</span>
                              <span className="text-emerald-400">{example.input}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-slate-500 font-semibold min-w-[100px]">Output:</span>
                              <span className="text-amber-400">{example.output}</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <span className="text-slate-500 font-semibold min-w-[100px]">Explanation:</span>
                              <span className="text-slate-400">{example.explanation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Editorial
                  </h2>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <p className="text-slate-400 leading-relaxed">Editorial is here for the problem</p>
                  </div>
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                    Solutions
                  </h2>
                  <div className="space-y-4">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/50 px-5 py-3 border-b border-slate-700/50">
                          <h3 className="font-semibold text-white">{problem?.title} - {solution?.language}</h3>
                        </div>
                        <div className="p-5">
                          <pre className="bg-slate-950/50 p-4 rounded-lg text-sm overflow-x-auto border border-slate-800/50">
                            <code className="text-slate-300">{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || <p className="text-slate-500">Solutions will be available after you solve the problem.</p>}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                    My Submissions
                  </h2>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
                      <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <SubmissionHistory problemId={problemId}/>
                  </div>
                </div>
              )}

              {activeLeftTab === 'chats' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                    Chats
                  </h2>
                  
                    <ChatAi problem={problem} />
                  
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col">
        {/* Right Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/50 px-4 py-3 border-b border-slate-800/50">
          {['code', 'testcase', 'result'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeRightTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
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
              <div className="flex justify-between items-center p-4 border-b border-slate-800/50 bg-slate-900/30">
                <div className="flex gap-2">
                  {['javascript', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedLanguage === lang
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="codequick-dark"
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
              <div className="p-4 border-t border-slate-800/50 flex justify-between bg-slate-900/30">
                <div></div>
                <div className="flex gap-3">
                  <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    className={`px-6 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Test Results
              </h3>
              {runResult ? (
                <div className={`rounded-xl p-6 border ${runResult.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  {runResult.success ? (
                    <div>
                      <h4 className="font-bold text-lg text-emerald-400 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        All test cases passed!
                      </h4>
                      <div className="flex gap-6 mb-6">
                        <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
                          <p className="text-xs text-slate-500 mb-1">Runtime</p>
                          <p className="text-emerald-400 font-semibold">{runResult.runtime} sec</p>
                        </div>
                        <div className="bg-slate-900/50 px-4 py-2 rounded-lg">
                          <p className="text-xs text-slate-500 mb-1">Memory</p>
                          <p className="text-emerald-400 font-semibold">{runResult.memory} KB</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {runResult.testCases.map((tc, i) => (
                          <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                            <div className="font-mono text-sm space-y-2">
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Input:</span>
                                <span className="text-slate-300">{tc.stdin}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Expected:</span>
                                <span className="text-slate-300">{tc.expected_output}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Output:</span>
                                <span className="text-slate-300">{tc.stdout}</span>
                              </div>
                              <div className="text-emerald-400 font-semibold pt-2">✓ Passed</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-lg text-rose-400 mb-4 flex items-center gap-2">
                        <span className="text-2xl">❌</span>
                        Error
                      </h4>
                      <div className="space-y-3">
                        {runResult.testCases.map((tc, i) => (
                          <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                            <div className="font-mono text-sm space-y-2">
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Input:</span>
                                <span className="text-slate-300">{tc.stdin}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Expected:</span>
                                <span className="text-slate-300">{tc.expected_output}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500 min-w-[80px]">Output:</span>
                                <span className="text-slate-300">{tc.stdout}</span>
                              </div>
                              <div className={`font-semibold pt-2 ${tc.status_id==3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-slate-500">Click "Run" to test your code with the example test cases.</p>
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Submission Result
              </h3>
              {submitResult ? (
                <div className={`rounded-xl p-6 border ${submitResult.status ==='accepted'? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  {submitResult.status=="accepted" ? (
                    <div>
                      <h4 className="font-bold text-2xl text-emerald-400 mb-6 flex items-center gap-3">
                        <span className="text-4xl">🎉</span>
                        Accepted
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2">Test Cases</p>
                          <p className="text-2xl font-bold text-emerald-400">{submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2">Runtime</p>
                          <p className="text-2xl font-bold text-emerald-400">{submitResult.runtime} sec</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg">
                          <p className="text-xs text-slate-500 mb-2">Memory</p>
                          <p className="text-2xl font-bold text-emerald-400">{submitResult.memory} KB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold text-2xl text-rose-400 mb-6 flex items-center gap-3">
                        <span className="text-4xl">❌</span>
                        {submitResult.error}
                      </h4>
                      <div className="bg-slate-900/50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500 mb-2">Test Cases Passed</p>
                        <p className="text-2xl font-bold text-rose-400">{submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">Click "Submit" to submit your solution for evaluation.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;