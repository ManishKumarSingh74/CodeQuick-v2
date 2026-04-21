// import React, { useEffect } from 'react'
// import { useForm } from "react-hook-form"
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../authSlice';

// const signupSchema = z.object({
//   firstName:z.string().min(3,"Name should contain at least 3 char"),
//   emailId:z.string().email(),
//   password:z.string().min(8,"password is too weak")
// })

// const Signup = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signupSchema),
//   })

//     useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated]);

//   const onSubmit = (data)=>{
//     dispatch(registerUser(data))
//   }


//   return (

//      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
//       <div className="card w-full max-w-md bg-base-100 shadow-xl">
//         {/* Header with Sign In text */}
//         <div className="card-body items-center text-center pb-0">
//           <h2 className="card-title text-2xl font-bold">Sign Up</h2>
//         </div>

//         {/* Your existing form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4">
//           <div className="form-control">
//             <input
//               {...register("firstName", { required: "First name is required" })}
//               placeholder="First Name"
//               className="input input-bordered w-full"
//             />
//             {errors.firstName && (
//               <span className="text-error text-sm mt-1">{errors.firstName?.message}</span>
//             )}
//           </div>

//           <div className="form-control mt-4">
//             <input
//               {...register("emailId", { required: "Email is required" })}
//               placeholder="Email"
//               className="input input-bordered w-full"
//             />
//             {errors.emailId && (
//               <span className="text-error text-sm mt-1">{errors.emailId?.message}</span>
//             )}
//           </div>

//           <div className="form-control mt-4">
//             <input
//               {...register("password", { required: "Password is required" })}
//               type="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//             />
//             {errors.password && (
//               <span className="text-error text-sm mt-1">{errors.password?.message}</span>
//             )}
//           </div>

//           <button type="submit" className="btn btn-primary mt-6 w-full">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup


import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../authSlice';
import CodeQuickLogo from '../components/CodeQuickLogo';

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 char"),
  emailId: z.string().email(),
  password: z.string().min(8, "password is too weak")
})

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <CodeQuickLogo width={72} height={72} className="drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
          </div>
          <h1 className="text-4xl font-black font-mono italic tracking-tighter text-white mb-2 -ml-2">
            JOIN CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span>
          </h1>
          <p className="text-slate-400">Start your coding journey today.</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-rose-400 text-sm">{error}</span>
              </div>
            )}

            <div onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* First Name Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    {...register("firstName")}
                    placeholder="Enter your first name"
                    className={`w-full bg-slate-900/50 border ${errors.firstName ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.firstName?.message}
                  </p>
                )}
              </div>

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
                    {...register("emailId")}
                    placeholder="Enter your email"
                    className={`w-full bg-slate-900/50 border ${errors.emailId ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                </div>
                {errors.emailId && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.emailId?.message}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`w-full bg-slate-900/50 border ${errors.password ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 pl-12 pr-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
                className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-900/30 border-t border-slate-700/50">
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-400 hover:text-cyan-400 font-semibold transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By signing up, you agree to our{' '}
          <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Signup

