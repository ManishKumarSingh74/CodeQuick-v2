// import React, { useEffect } from 'react'
// import { useForm } from "react-hook-form"
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {loginUser} from "../authSlice"


// const signinSchema = z.object({
//   email:z.string().email(),
//   password:z.string().min(8,"password is too weak")
// })

// const Login = () => {
//   const dispatch = useDispatch()
//    const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signinSchema),
//   })

//   const onSubmit = (data) => {
//     console.log(data)
//     dispatch(loginUser(data));
//   }

//   useEffect(() => {
//     console.log(isAuthenticated)
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated,]);

//   return (

//      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
//       <div className="card w-full max-w-md bg-base-100 shadow-xl">
//         {/* Header with Sign In text */}
//         <div className="card-body items-center text-center pb-0">
//           <h2 className="card-title text-2xl font-bold">Login</h2>
//         </div>

//         {/* Your existing form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4">

//           <div className="form-control mt-4">
//             <input


//               type="email"
//               placeholder="Email"
//               className="input input-bordered w-full"
//               {...register("email")}
//             />
//             {errors.email && (
//               <span className="text-error text-sm mt-1">{errors.email?.message}</span>
//             )}
//           </div>

//           <div className="form-control mt-4">
//             <input
//               {...register("password")}
//               type="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//             />
//             {errors.password && (
//               <span className="text-error text-sm mt-1">{errors.password?.message}</span>
//             )}
//           </div>

//           <button type="submit" className="btn btn-primary mt-6 w-full">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../authSlice"
import CodeQuickLogo from '../components/CodeQuickLogo'
import { Link } from 'react-router-dom';

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password is too weak")
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
    dispatch(loginUser(data));
  }

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate('/homepage');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <CodeQuickLogo width={72} height={72} className="drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
          </div>
          <h1 className="text-4xl font-black font-mono italic tracking-tighter text-white mb-2 -ml-2">
            CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span>
          </h1>
          <p className="text-slate-400">Welcome Back! Sign in to continue coding.</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-rose-400 text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full bg-slate-900/50 border ${errors.email ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full bg-slate-900/50 border ${errors.password ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-900/30 border-t border-slate-700/50">
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-emerald-400 hover:text-cyan-400 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-4">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-slate-300 text-sm font-medium">Google</span>
            </button>
            <button className="px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-slate-300 text-sm font-medium">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login