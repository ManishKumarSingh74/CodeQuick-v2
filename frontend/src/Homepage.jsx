// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from './utils/axiosClient';
// import { logoutUser, clearAuth } from './authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     dispatch(clearAuth());
//     setSolvedProblems([]); 
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">CodeQuick</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <div className="container mx-auto p-4">
//         <div className="flex flex-wrap gap-4 mb-6">
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;


import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from './utils/axiosClient';
import { logoutUser, clearAuth } from './authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
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
        console.log("data", data);
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
      case 'easy': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'hard': return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/30';
    }
  };
  console.log(solvedProblems);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CodeQuick
              </span>
            </NavLink>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-200 font-medium">{user?.firstName}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                    {user?.role === 'admin' && (
                      <NavLink to={"/adminpanel"}>
                        <button className='w-full px-4 py-3 text-left text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center gap-2'>
                          Admin
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

      <div className="container mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Total Problems</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-emerald-600/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Solved</p>
                <p className="text-3xl font-bold text-emerald-400">{stats.solved}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-emerald-600/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Easy</p>
                <p className="text-3xl font-bold text-emerald-400">{stats.easy}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-lg">E</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-amber-600/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Medium</p>
                <p className="text-3xl font-bold text-amber-400">{stats.medium}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <span className="text-amber-400 font-bold text-lg">M</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-rose-600/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Hard</p>
                <p className="text-3xl font-bold text-rose-400">{stats.hard}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <span className="text-rose-400 font-bold text-lg">H</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h3 className="text-lg font-semibold text-white">Filters</h3>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-slate-400 text-sm font-medium mb-2 block">Status</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved Problems</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-slate-400 text-sm font-medium mb-2 block">Difficulty</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-slate-400 text-sm font-medium mb-2 block">Tags</label>
              <select
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">No problems found matching your filters</p>
            </div>
          ) : (
            filteredProblems.map(problem => {

              const isSolved = solvedProblems.some(sp => sp === problem._id);
              console.log(isSolved);
              return (
                <div
                  key={problem._id}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all group"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {isSolved ? (
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-700/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1">
                          <NavLink
                            to={`/problem/${problem._id}`}
                            className="text-lg font-semibold text-white hover:text-blue-400 transition-colors group-hover:text-blue-400"
                          >
                            {problem.title}
                          </NavLink>

                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                              {problem.tags}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isSolved && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-emerald-400 text-sm font-semibold">Solved</span>
                        </div>
                      )}

                      <NavLink
                        to={`/problem/${problem._id}`}
                        className="ml-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                      >
                        Solve
                      </NavLink>
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
        }
      `}</style>
    </div>
  );
}

export default Homepage;