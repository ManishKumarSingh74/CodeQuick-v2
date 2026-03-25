// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Home, RefreshCw, Zap,Video } from 'lucide-react';
// import { NavLink } from 'react-router';

// function Admin() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const adminOptions = [
//     {
//       id: 'create',
//       title: 'Create Problem',
//       description: 'Add a new coding problem to the platform',
//       icon: Plus,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/create'
//     },
//     {
//       id: 'update',
//       title: 'Update Problem',
//       description: 'Edit existing problems and their details',
//       icon: Edit,
//       color: 'btn-warning',
//       bgColor: 'bg-warning/10',
//       route: '/admin/update'
//     },
//     {
//       id: 'delete',
//       title: 'Delete Problem',
//       description: 'Remove problems from the platform',
//       icon: Trash2,
//       color: 'btn-error',
//       bgColor: 'bg-error/10',
//       route: '/admin/delete'
//     },
//     {
//       id: 'video',
//       title: 'Video Problem',
//       description: 'Upload And Delete Videos',
//       icon: Video,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/video'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-base-content mb-4">
//             Admin Panel
//           </h1>
//           <p className="text-base-content/70 text-lg">
//             Manage coding problems on your platform
//           </p>
//         </div>

//         {/* Admin Options Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {adminOptions.map((option) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className="card-body items-center text-center p-8">
//                   {/* Icon */}
//                   <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
//                     <IconComponent size={32} className="text-base-content" />
//                   </div>

//                   {/* Title */}
//                   <h2 className="card-title text-xl mb-2">
//                     {option.title}
//                   </h2>

//                   {/* Description */}
//                   <p className="text-base-content/70 mb-6">
//                     {option.description}
//                   </p>

//                   {/* Action Button */}
//                   <div className="card-actions">
//                     <div className="card-actions">
//                     <NavLink 
//                     to={option.route}
//                    className={`btn ${option.color} btn-wide`}
//                    >
//                    {option.title}
//                    </NavLink>
//                    </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Admin;


// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video, Code, Sparkles } from 'lucide-react';
// import { NavLink } from 'react-router';

// function Admin() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const adminOptions = [
//     {
//       id: 'create',
//       title: 'Create Problem',
//       description: 'Add a new coding problem to the platform',
//       icon: Plus,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/create'
//     },
//     {
//       id: 'update',
//       title: 'Update Problem',
//       description: 'Edit existing problems and their details',
//       icon: Edit,
//       color: 'btn-warning',
//       bgColor: 'bg-warning/10',
//       route: '/admin/update'
//     },
//     {
//       id: 'delete',
//       title: 'Delete Problem',
//       description: 'Remove problems from the platform',
//       icon: Trash2,
//       color: 'btn-error',
//       bgColor: 'bg-error/10',
//       route: '/admin/delete'
//     },
//     {
//       id: 'video',
//       title: 'Video Problem',
//       description: 'Upload And Delete Videos',
//       icon: Video,
//       color: 'btn-info',
//       bgColor: 'bg-info/10',
//       route: '/admin/video'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       <div className="container mx-auto px-4 py-12 relative z-10">
//         {/* Header with Brand */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <div className="relative">
//               <Code size={48} className="text-blue-400 animate-pulse" />
//               <Sparkles size={24} className="text-cyan-300 absolute -top-2 -right-2 animate-bounce" />
//             </div>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-4 animate-fade-in drop-shadow-2xl">
//             CodeQuick Admin
//           </h1>
//           <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto">
//             Manage and organize your coding platform with powerful admin tools
//           </p>
//           <div className="flex items-center justify-center gap-2 mt-4">
//             <div className="badge badge-lg bg-blue-500/30 backdrop-blur-md border-blue-400/50 text-blue-100">Admin Panel</div>
//             <div className="badge badge-lg bg-white/10 backdrop-blur-md border-blue-300/30 text-blue-100">v1.0</div>
//           </div>
//         </div>

//         {/* Admin Options Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
//           {adminOptions.map((option, index) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="group card bg-white/10 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-white/20 hover:border-blue-400/50 overflow-hidden"
//                 style={{
//                   animationDelay: `${index * 100}ms`,
//                   animation: 'slideUp 0.6s ease-out forwards',
//                   opacity: 0
//                 }}
//               >
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                 <div className="card-body items-center text-center p-8 relative z-10">
//                   {/* Icon with Animation */}
//                   <div className={`${option.bgColor} backdrop-blur-md p-6 rounded-2xl mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500 border border-white/20`}>
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
//                     <IconComponent size={40} className="text-blue-100 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
//                   </div>

//                   {/* Title */}
//                   <h2 className="card-title text-2xl mb-3 group-hover:text-blue-300 transition-colors duration-300 text-blue-50">
//                     {option.title}
//                   </h2>

//                   {/* Description */}
//                   <p className="text-blue-100/70 mb-6 text-sm leading-relaxed">
//                     {option.description}
//                   </p>

//                   {/* Action Button */}
//                   <div className="card-actions w-full">
//                     <NavLink 
//                       to={option.route}
//                       className={`btn ${option.color} btn-wide w-full gap-2 group-hover:scale-105 transition-transform duration-300`}
//                     >
//                       <IconComponent size={20} />
//                       {option.title}
//                       <Zap size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     </NavLink>
//                   </div>
//                 </div>

//                 {/* Corner Decoration */}
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Stats Footer */}
//         <div className="mt-16 max-w-4xl mx-auto">
//           <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20">
//             <div className="stat place-items-center">
//               <div className="stat-title text-blue-200">Total Actions</div>
//               <div className="stat-value text-blue-300">{adminOptions.length}</div>
//               <div className="stat-desc text-blue-100/60">Available operations</div>
//             </div>

//             <div className="stat place-items-center">
//               <div className="stat-title text-blue-200">Platform</div>
//               <div className="stat-value text-cyan-300">CodeQuick</div>
//               <div className="stat-desc text-blue-100/60">Admin Dashboard</div>
//             </div>

//             <div className="stat place-items-center">
//               <div className="stat-title text-blue-200">Status</div>
//               <div className="stat-value text-green-300">Active</div>
//               <div className="stat-desc flex items-center gap-1 text-blue-100/60">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 All systems online
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Admin;


import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform',
      icon: Plus,
      color: 'from-emerald-600 to-emerald-500',
      shadowColor: 'shadow-emerald-500/30',
      hoverColor: 'hover:shadow-emerald-500/50',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problems and their details',
      icon: Edit,
      color: 'from-amber-600 to-amber-500',
      shadowColor: 'shadow-amber-500/30',
      hoverColor: 'hover:shadow-amber-500/50',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems from the platform',
      icon: Trash2,
      color: 'from-rose-600 to-rose-500',
      shadowColor: 'shadow-rose-500/30',
      hoverColor: 'hover:shadow-rose-500/50',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Problem',
      description: 'Upload And Delete Videos',
      icon: Video,
      color: 'from-purple-600 to-purple-500',
      shadowColor: 'shadow-purple-500/30',
      hoverColor: 'hover:shadow-purple-500/50',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      route: '/admin/video'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50">
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

            <NavLink
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all text-slate-200 hover:text-white"
            >
              <Home size={18} />
              <span className="font-medium">Back to Home</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Manage coding problems on your platform with powerful admin tools
          </p>
        </div>

        {/* Admin Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
                  style={{
                    background: `linear-gradient(to right, ${option.color.includes('emerald') ? '#10b981' :
                      option.color.includes('amber') ? '#f59e0b' :
                        option.color.includes('rose') ? '#f43f5e' : '#a855f7'}33, transparent)`
                  }}></div>

                <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full">
                  <div className="p-8 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className={`${option.bgColor} p-5 rounded-2xl mb-6 border ${option.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={36} className="text-white" style={{
                        filter: 'drop-shadow(0 0 8px currentColor)'
                      }} />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3">
                      {option.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 mb-6 flex-grow">
                      {option.description}
                    </p>

                    {/* Action Button */}
                    <NavLink
                      to={option.route}
                      className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r ${option.color} text-white font-semibold shadow-lg ${option.shadowColor} ${option.hoverColor} transition-all flex items-center justify-center gap-2 group/btn`}
                    >
                      <span>Get Started</span>
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
            <div className="text-slate-400 text-sm">Total Problems</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">892</div>
            <div className="text-slate-400 text-sm">Active Users</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">15,428</div>
            <div className="text-slate-400 text-sm">Submissions Today</div>
          </div>
        </div> */}

        {/* Quick Actions */}
        {/* <div className="mt-12 bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-6 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all text-slate-200 hover:text-white text-left flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div>
                <div className="font-semibold">View Analytics</div>
                <div className="text-sm text-slate-400">Check platform statistics</div>
              </div>
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all text-slate-200 hover:text-white text-left flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <div className="font-semibold">Manage Users</div>
                <div className="text-sm text-slate-400">View and edit user accounts</div>
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Admin;