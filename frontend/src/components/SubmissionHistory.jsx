// import { useState, useEffect } from 'react';
// import axiosClient from '../utils/axiosClient';

// const SubmissionHistory = ({ problemId }) => {
//     console.log(problemId)
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
//         setSubmissions(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch submission history');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [problemId]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'accepted': return 'badge-success';
//       case 'wrong': return 'badge-error';
//       case 'error': return 'badge-warning';
//       case 'pending': return 'badge-info';
//       default: return 'badge-neutral';
//     }
//   };

//   const formatMemory = (memory) => {
//     if (memory < 1024) return `${memory} kB`;
//     return `${(memory / 1024).toFixed(2)} MB`;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info shadow-lg">
//           <div>
//             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>No submissions found for this problem</span>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="table table-zebra w-full">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Language</th>
//                   <th>Status</th>
//                   <th>Runtime</th>
//                   <th>Memory</th>
//                   <th>Test Cases</th>
//                   <th>Submitted</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((sub, index) => (
//                   <tr key={sub._id}>
//                     <td>{index + 1}</td>
//                     <td className="font-mono">{sub.language}</td>
//                     <td>
//                       <span className={`badge ${getStatusColor(sub.status)}`}>
//                         {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
//                       </span>
//                     </td>

//                     <td className="font-mono">{sub.runtime}sec</td>
//                     <td className="font-mono">{formatMemory(sub.memory)}</td>
//                     <td className="font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</td>
//                     <td>{formatDate(sub.createdAt)}</td>
//                     <td>
//                       <button 
//                         className="btn btn-s btn-outline"
//                         onClick={() => setSelectedSubmission(sub)}
//                       >
//                         Code
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <p className="mt-4 text-sm text-gray-500">
//             Showing {submissions.length} submissions
//           </p>
//         </>
//       )}

//       {/* Code View Modal */}
//       {selectedSubmission && (
//         <div className="modal modal-open">
//           <div className="modal-box w-11/12 max-w-5xl">
//             <h3 className="font-bold text-lg mb-4">
//               Submission Details: {selectedSubmission.language}
//             </h3>

//             <div className="mb-4">
//               <div className="flex flex-wrap gap-2 mb-2">
//                 <span className={`badge ${getStatusColor(selectedSubmission.status)}`}>
//                   {selectedSubmission.status}
//                 </span>
//                 <span className="badge badge-outline">
//                   Runtime: {selectedSubmission.runtime}s
//                 </span>
//                 <span className="badge badge-outline">
//                   Memory: {formatMemory(selectedSubmission.memory)}
//                 </span>
//                 <span className="badge badge-outline">
//                   Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
//                 </span>
//               </div>

//               {selectedSubmission.errorMessage && (
//                 <div className="alert alert-error mt-2">
//                   <div>
//                     <span>{selectedSubmission.errorMessage}</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto">
//              {selectedSubmission.code}
//             </pre>

//             <div className="modal-action">
//               <button 
//                 className="btn"
//                 onClick={() => setSelectedSubmission(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubmissionHistory;

import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  console.log(problemId)
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'wrong': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'error': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'pending': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-slate-400 font-medium">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 my-4">
        <svg className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-rose-400">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-white">Submission History</h2>
      </div>

      {submissions?.length === 0 ? (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">No submissions found for this problem</p>
          <p className="text-slate-500 text-sm mt-2">Your submission history will appear here once you submit solutions</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {submissions.length > 0 && submissions?.map((sub, index) => (
              <div
                key={sub._id}
                className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Submission Number */}
                      <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                        <span className="text-slate-300 font-bold">#{index + 1}</span>
                      </div>

                      {/* Language */}
                      <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <span className="text-blue-400 font-semibold text-sm font-mono">{sub.language}</span>
                      </div>

                      {/* Status */}
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusColor(sub.status)}`}>
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>

                      {/* Stats */}
                      <div className="hidden lg:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-400 font-mono">{sub.runtime}sec</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                          <span className="text-slate-400 font-mono">{formatMemory(sub.memory)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-400 font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-sm hidden md:block">{formatDate(sub.createdAt)}</span>
                      <button
                        className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-200 font-medium text-sm transition-all flex items-center gap-2"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        View Code
                      </button>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="flex lg:hidden items-center gap-4 mt-3 text-sm flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-400 font-mono">{sub.runtime}sec</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span className="text-slate-400 font-mono">{formatMemory(sub.memory)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-400 font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Submission Details
                </h3>
                <button
                  className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-400 hover:text-slate-200 transition-all flex items-center justify-center"
                  onClick={() => setSelectedSubmission(null)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold text-sm">
                  {selectedSubmission.language}
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusColor(selectedSubmission.status)}`}>
                  {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-sm font-mono border border-slate-600/50">
                  Runtime: {selectedSubmission.runtime}sec
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-sm font-mono border border-slate-600/50">
                  Memory: {formatMemory(selectedSubmission.memory)}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 text-sm font-mono border border-slate-600/50">
                  Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
                </span>
              </div>

              {selectedSubmission.errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                  <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-rose-400 text-sm">{selectedSubmission.errorMessage}</span>
                </div>
              )}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
                <pre className="text-slate-300 font-mono text-sm overflow-x-auto">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700/50">
              <button
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
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

export default SubmissionHistory;