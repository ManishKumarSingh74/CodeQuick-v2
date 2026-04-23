import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from './utils/axiosClient';
import { logoutUser, clearAuth } from './authSlice';
import CodeQuickLogo from './components/CodeQuickLogo';

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(800px at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.08), transparent 80%)`,
      }}
    />
  );
};

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="bg-slate-950 text-slate-300 min-h-screen overflow-x-hidden font-sans selection:bg-emerald-500/30">
      <MouseGlow />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-3 group">
              <CodeQuickLogo className="group-hover:scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <span className="text-2xl font-black font-mono italic tracking-tighter text-white">
                CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span>
              </span>
            </NavLink>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-200 font-medium">{user?.firstName}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-800/50 shadow-2xl overflow-hidden p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-800/80 hover:text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                    {user?.role === 'admin' && (
                      <NavLink to={"/adminpanel"} className="block mt-1">
                        <button className='w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-800/80 hover:text-white rounded-lg transition-colors flex items-center gap-2'>
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

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          
          {/* Hero Welcome Banner */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{user?.firstName || 'Developer'}</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Ready to conquer your next coding challenge? Track your progress, explore new algorithms, and elevate your skills today.
            </p>
          </div>

          {/* FeatureCards-style Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            
            <div className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700/50">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-cyan-500 opacity-20"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Total</p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stats.total}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700/50">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-emerald-500 opacity-20"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Solved</p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors">{stats.solved}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700/50">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-emerald-500 opacity-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Easy</p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-emerald-400">
                    <span className="font-bold text-sm">E</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.easy}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700/50">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-amber-500 opacity-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Medium</p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-amber-400">
                    <span className="font-bold text-sm">M</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.medium}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700/50">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-rose-500 opacity-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Hard</p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-rose-400">
                    <span className="font-bold text-sm">H</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{stats.hard}</p>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-8 backdrop-blur-md transition-all hover:border-slate-700/50 mb-10 flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-cyan-500 opacity-10"></div>
            
            <div className="relative z-10 flex items-center gap-4 shrink-0">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Filters</h3>
            </div>

            <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2 ml-1">Status</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-700"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="all">All Problems</option>
                    <option value="solved">Solved Problems</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2 ml-1">Difficulty</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-700"
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2 ml-1">Tags</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:border-slate-700"
                    value={filters.tag}
                    onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                  >
                    <option value="all">All Tags</option>
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                    <option value="dp">DP</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.length === 0 ? (
              <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-16 backdrop-blur-md text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950/50 ring-1 ring-white/10 text-slate-500 mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">No problems found</h3>
                <p className="text-slate-400 text-lg max-w-md mx-auto">We couldn't find any challenges matching your current filters. Try adjusting them to explore more!</p>
              </div>
            ) : (
              filteredProblems.map((problem, index) => {
                const isSolved = solvedProblems.some(sp => sp === problem._id);
                
                return (
                  <div
                    key={problem._id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-md transition-all hover:border-slate-700/50 hover:bg-slate-800/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 bg-cyan-500 opacity-0 group-hover:opacity-10"></div>
                    <div className="relative z-10 p-5 lg:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        
                        {/* Left: Icon & Title */}
                        <div className="flex items-start md:items-center gap-5 flex-1">
                          {isSolved ? (
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 shrink-0">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 text-slate-500 shrink-0 group-hover:text-cyan-400 transition-colors">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>
                          )}

                          <div className="flex-1">
                            <NavLink
                              to={`/problem/${problem._id}`}
                              className="text-xl font-bold text-white hover:text-cyan-400 transition-colors inline-block mb-2 tracking-tight"
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
                            className="w-full md:w-auto group/btn relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                          >
                            <span>{isSolved ? 'Review' : 'Solve'}</span>
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
      </main>

      <style>{`
        select option {
          background-color: rgb(2, 6, 23);
          color: rgb(226, 232, 240);
          padding: 12px;
        }
      `}</style>
    </div>
  );
}

export default Homepage;