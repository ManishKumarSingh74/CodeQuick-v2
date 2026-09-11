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

  const hasActiveFilters = filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all';
  const clearFilters = () => setFilters({ difficulty: 'all', tag: 'all', status: 'all' });

  const stats = {
    total: problems.length,
    solved: solvedProblems.length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
  };

  const solvedPct = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;
  const ringCircumference = 2 * Math.PI * 40;
  const ringOffset = ringCircumference - (solvedPct / 100) * ringCircumference;

  const difficultyBadge = (difficulty) => {
    const d = difficulty.toLowerCase();
    const map = {
      easy: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', bars: 1 },
      medium: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', bars: 2 },
      hard: { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', bars: 3 },
    };
    return map[d] || { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', bars: 0 };
  };

  const difficultyOptions = [
    { value: 'all', label: 'All' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'solved', label: 'Solved' },
  ];

  const tagOptions = [
    { value: 'all', label: 'All tags' },
    { value: 'array', label: 'Array' },
    { value: 'linkedList', label: 'Linked List' },
    { value: 'graph', label: 'Graph' },
    { value: 'dp', label: 'DP' },
  ];

  return (
    <div className="bg-white text-slate-600 min-h-screen overflow-x-hidden font-sans selection:bg-emerald-500/20">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/[0.05] blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-3 group">
              <CodeQuickLogo className="group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black font-mono italic tracking-tighter text-slate-900">
                CODE<span className="text-emerald-600">QUICK</span>
              </span>
            </NavLink>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-800 font-medium">{user?.firstName}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                    {user?.role === 'admin' && (
                      <NavLink to={"/adminpanel"} className="block mt-1">
                        <button className='w-full px-4 py-2.5 text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors flex items-center gap-2'>
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Welcome back, <span className="text-emerald-600">{user?.firstName || 'Developer'}</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Ready to conquer your next coding challenge? Track your progress, explore new algorithms, and elevate your skills today.
            </p>
          </div>

          {/* Progress overview: ring + difficulty breakdown, replaces five equal cards */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-10 p-8 flex flex-col md:flex-row items-center gap-10">

            {/* Progress ring */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle
                    cx="48" cy="48" r="40" fill="none"
                    stroke="#059669" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-900">{solvedPct}%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.solved} <span className="text-slate-400 font-medium text-base">/ {stats.total} solved</span></p>
                <p className="text-sm text-slate-500">Keep going — every solve counts.</p>
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-slate-200"></div>

            {/* Difficulty breakdown */}
            <div className="flex-1 grid grid-cols-3 gap-4 w-full">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">Easy</p>
                <p className="text-2xl font-bold text-emerald-700">{stats.easy}</p>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1">Medium</p>
                <p className="text-2xl font-bold text-amber-700">{stats.medium}</p>
              </div>
              <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-700 mb-1">Hard</p>
                <p className="text-2xl font-bold text-rose-700">{stats.hard}</p>
              </div>
            </div>
          </div>

          {/* Filters: inline chips instead of a heavy card of selects */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mr-1">Status</span>
                {statusOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, status: opt.value })}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      filters.status === opt.value
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mr-1">Difficulty</span>
                {difficultyOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, difficulty: opt.value })}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      filters.difficulty === opt.value
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mr-1">Tag</span>
                {tagOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, tag: opt.value })}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      filters.tag === opt.value
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-3">
            {filteredProblems.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200 text-slate-400 mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">No problems found</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto mb-6">We couldn't find any challenges matching your current filters.</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-all"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const isSolved = solvedProblems.some(sp => sp === problem._id);
                const badge = difficultyBadge(problem.difficulty);

                return (
                  <NavLink
                    key={problem._id}
                    to={`/problem/${problem._id}`}
                    className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 lg:p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                  >
                    {isSolved ? (
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200 text-emerald-600 shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-400 shrink-0 group-hover:text-slate-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1.5 truncate">
                        {problem.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${badge.text} ${badge.bg} ${badge.border}`}>
                          <span className="flex items-end gap-0.5 h-2.5">
                            {[1, 2, 3].map(i => (
                              <span
                                key={i}
                                className={`w-0.5 rounded-full ${i <= badge.bars ? 'bg-current' : 'bg-current opacity-20'}`}
                                style={{ height: `${i * 3}px` }}
                              ></span>
                            ))}
                          </span>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                          {problem.tags}
                        </span>
                      </div>
                    </div>

                    {isSolved ? (
                      <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 shrink-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-700 text-xs font-bold tracking-wide">Solved</span>
                      </span>
                    ) : (
                      <span
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-xs font-semibold shrink-0 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                        title="Ask the assistant about this problem"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Need a hint?
                      </span>
                    )}

                    <svg className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NavLink>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;