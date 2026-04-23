import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from './utils/axiosClient';
import { logoutUser, clearAuth } from './authSlice';
import CodeQuickLogo from './components/CodeQuickLogo';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearAuth());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' ||
      (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id));
    return difficultyMatch && tagMatch && statusMatch;
  });

  const stats = {
    total: problems.length,
    solved: solvedProblems.length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'hard': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 group">
              <CodeQuickLogo className="group-hover:scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <span className="text-2xl font-black font-mono italic tracking-tighter text-white">
                CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span>
              </span>
            </NavLink>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-200 font-medium">{user?.firstName}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl shadow-black/50 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center gap-2 hover:text-emerald-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                    {user?.role === 'admin' && (
                      <NavLink to={"/adminpanel"}>
                        <button className='w-full px-4 py-3 text-left text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center gap-2 hover:text-cyan-400'>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Admin Panel
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-10">
        
        {/* Hero Welcome Banner */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-700/50 relative overflow-hidden mb-12 shadow-xl shadow-black/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{user?.firstName || 'Developer'}</span>!
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              Ready to conquer your next coding challenge? Track your progress, explore new algorithms, and elevate your skills today.
            </p>
          </div>
        </div>

        {/* Bento-Grid Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-12">
          {/* Total Problems - spans 2 cols on mobile */}
          <div className="col-span-2 md:col-span-1 bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total</p>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stats.total}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Solved</p>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">{stats.solved}</p>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Easy</p>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold text-sm">E</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{stats.easy}</p>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Medium</p>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-sm">M</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-400">{stats.medium}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-rose-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 group">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Hard</p>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <span className="text-rose-400 font-bold text-sm">H</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-rose-400">{stats.hard}</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-slate-700/50 mb-8 shadow-lg shadow-black/20 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Filters</h3>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 px-1 bg-slate-800 text-xs font-semibold text-cyan-400 z-10 rounded">Status</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-600"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved Problems</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-3 px-1 bg-slate-800 text-xs font-semibold text-cyan-400 z-10 rounded">Difficulty</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-600"
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="relative group">
              <label className="absolute -top-2.5 left-3 px-1 bg-slate-800 text-xs font-semibold text-cyan-400 z-10 rounded">Tags</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-600"
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-hover:text-cyan-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-16 border border-slate-700/50 text-center shadow-lg shadow-black/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border border-slate-700 mb-6 shadow-inner">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No problems found</h3>
              <p className="text-slate-400 text-lg max-w-md mx-auto">We couldn't find any challenges matching your current filters. Try adjusting them to explore more!</p>
            </div>
          ) : (
            filteredProblems.map((problem, index) => {
              const isSolved = solvedProblems.some(sp => sp === problem._id);
              
              return (
                <div
                  key={problem._id}
                  className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-300 group shadow-md hover:shadow-cyan-500/10 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-5 lg:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Left: Icon & Title */}
                      <div className="flex items-start md:items-center gap-5 flex-1">
                        {isSolved ? (
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-slate-600 transition-colors shadow-inner">
                            <svg className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1">
                          <NavLink
                            to={`/problem/${problem._id}`}
                            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors inline-block mb-2"
                          >
                            {problem.title}
                          </NavLink>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              {problem.tags}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Solved Badge & CTA */}
                      <div className="flex items-center gap-4 ml-17 md:ml-0">
                        {isSolved && (
                          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 text-sm font-bold tracking-wide">Solved</span>
                          </div>
                        )}

                        <NavLink
                          to={`/problem/${problem._id}`}
                          className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 text-center"
                        >
                          {isSolved ? 'Review' : 'Solve'}
                        </NavLink>
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        select option {
          background-color: rgb(15 23 42);
          color: rgb(226 232 240);
          padding: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 1);
        }
      `}</style>
    </div>
  );
}

export default Homepage;