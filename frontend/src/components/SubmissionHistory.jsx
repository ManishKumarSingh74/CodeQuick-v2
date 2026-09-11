import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
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
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'wrong': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'error': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pending': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
          <p className="text-slate-500 font-medium">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 my-4">
        <svg className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-rose-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-900">Submission History</h2>
      </div>

      {submissions?.length === 0 ? (
        <div className="bg-slate-50 rounded-xl p-12 border border-slate-200 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white ring-1 ring-slate-200 mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-600 text-lg">No submissions found for this problem</p>
          <p className="text-slate-400 text-sm mt-2">Your submission history will appear here once you submit solutions</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {submissions.length > 0 && submissions?.map((sub, index) => (
              <div
                key={sub._id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Submission Number */}
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <span className="text-slate-600 font-bold">#{index + 1}</span>
                      </div>

                      {/* Language */}
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200">
                        <span className="text-cyan-700 font-semibold text-sm font-mono">{sub.language}</span>
                      </div>

                      {/* Status */}
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusColor(sub.status)}`}>
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>

                      {/* Stats */}
                      <div className="hidden lg:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-500 font-mono">{sub.runtime}sec</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                          <span className="text-slate-500 font-mono">{formatMemory(sub.memory)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-500 font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm hidden md:block">{formatDate(sub.createdAt)}</span>
                      <button
                        className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-all flex items-center gap-2"
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
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-500 font-mono">{sub.runtime}sec</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span className="text-slate-500 font-mono">{formatMemory(sub.memory)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-500 font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Submission Details
                </h3>
                <button
                  className="w-10 h-10 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-700 transition-all flex items-center justify-center"
                  onClick={() => setSelectedSubmission(null)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 font-semibold text-sm">
                  {selectedSubmission.language}
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusColor(selectedSubmission.status)}`}>
                  {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-mono border border-slate-200">
                  Runtime: {selectedSubmission.runtime}sec
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-mono border border-slate-200">
                  Memory: {formatMemory(selectedSubmission.memory)}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-mono border border-slate-200">
                  Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
                </span>
              </div>

              {selectedSubmission.errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <svg className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-rose-600 text-sm">{selectedSubmission.errorMessage}</span>
                </div>
              )}
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <pre className="text-slate-200 font-mono text-sm overflow-x-auto">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200">
              <button
                className="w-full px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
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

export default SubmissionHistory;