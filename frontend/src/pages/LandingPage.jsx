import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
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
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
      }}
    />
  );
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for joining! We'll notify ${email} when we launch.`);
    setEmail('');
  };

  const features = [
    {
      icon: '💻',
      title: 'Online Code Editor',
      description: 'Write and run code directly in your browser with our powerful IDE. No installation needed.',
      color: 'from-blue-600 to-blue-500',
      shadow: 'shadow-blue-500/30'
    },
    {
      icon: '🚀',
      title: 'Multi-Language Support',
      description: 'Practice in Python, JavaScript, C++, Java, and more. All major programming languages supported.',
      color: 'from-purple-600 to-purple-500',
      shadow: 'shadow-purple-500/30'
    },
    {
      icon: '🎥',
      title: 'Video Solutions',
      description: 'Learn from detailed video explanations for every problem. Understand concepts deeply.',
      color: 'from-rose-600 to-rose-500',
      shadow: 'shadow-rose-500/30'
    },
    {
      icon: '⚡',
      title: 'Instant Compilation',
      description: 'Get real-time feedback with our fast compiler. Test your code instantly.',
      color: 'from-emerald-600 to-emerald-500',
      shadow: 'shadow-emerald-500/30'
    },
    {
      icon: '📚',
      title: 'Growing Problem Set',
      description: 'Carefully curated problems covering essential data structures and algorithms.',
      color: 'from-amber-600 to-amber-500',
      shadow: 'shadow-amber-500/30'
    },
    {
      icon: '📊',
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with simple analytics and submission history.',
      color: 'from-cyan-600 to-cyan-500',
      shadow: 'shadow-cyan-500/30'
    }
  ];

  const languages = [
    { name: 'Python', icon: '🐍', color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
    { name: 'C++', icon: '⚙️', color: 'from-blue-500 to-blue-700' },
    { name: 'Java', icon: '☕', color: 'from-red-400 to-red-600' },
    { name: 'C', icon: '🔧', color: 'from-gray-400 to-gray-600' },
    { name: 'Ruby', icon: '💎', color: 'from-red-500 to-red-700' }
  ];

  const steps = [
    {
      step: '1',
      title: 'Pick a Problem',
      desc: 'Browse our collection of coding challenges organized by topic and difficulty.',
      color: 'from-blue-600 to-blue-500'
    },
    {
      step: '2',
      title: 'Code & Compile',
      desc: 'Write your solution in our online editor and run it with instant compilation.',
      color: 'from-purple-600 to-purple-500'
    },
    {
      step: '3',
      title: 'Learn from Videos',
      desc: 'Watch detailed video explanations to understand the optimal approach.',
      color: 'from-emerald-600 to-emerald-500'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60 transition-all group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CodeQuick
              </span>
            </div>
            <div className="flex items-center gap-3">
              <NavLink to="/login">
              <button className="px-4 py-2 rounded-lg text-slate-200 hover:bg-slate-800/50 transition-all hover:scale-105">
                Login
              </button>
              </NavLink>
              <NavLink to="/signup">
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105">
                Start Free
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <MouseGlow />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/20 rounded-lg animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-purple-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border border-emerald-500/20 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 mb-8 hover:bg-slate-800/70 transition-all cursor-pointer group">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">🚀 Now Live - Start coding today</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fadeIn">
              Code, Compile
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
                & Conquer
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Master coding with our online IDE, multi-language support, and video solutions. Practice anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <NavLink to="/signup">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg hover:from-blue-500 hover:to-blue-600 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 hover:scale-105 group">
                Start Coding Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              </NavLink>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-white font-semibold text-lg hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2 hover:scale-105 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '50+', label: 'Coding Problems', color: 'text-blue-400' },
                { value: '6+', label: 'Languages', color: 'text-purple-400' },
                { value: '100%', label: 'Free Access', color: 'text-emerald-400' },
                { value: 'Video', label: 'Solutions', color: 'text-amber-400' }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all hover:scale-105 cursor-pointer group animate-fadeIn" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform`}>{stat.value}</div>
                  <div className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Everything You <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete platform to learn, practice, and master coding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all group hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Code in Your <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Favorite Language</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Full support for multiple programming languages with instant compilation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {languages.map((lang, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all group hover:scale-110 hover:-translate-y-2 cursor-pointer text-center">
                <div className={`text-4xl mb-3 group-hover:scale-125 transition-transform`}>
                  {lang.icon}
                </div>
                <div className={`font-bold bg-gradient-to-r ${lang.color} bg-clip-text text-transparent`}>
                  {lang.name}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              More languages coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start solving problems in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 text-center hover:border-slate-600/50 transition-all hover:scale-105 cursor-pointer group">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg text-2xl font-bold group-hover:scale-110 transition-transform`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden group cursor-pointer hover:scale-105 transition-all">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Learning?</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Join CodeQuick today and master coding with video solutions, multi-language support, and more!
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-slate-100 shadow-2xl transition-all hover:scale-105 flex items-center gap-2 group">
                    Start Coding Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                <p className="text-blue-100 text-sm mt-6">
                  ✨ 100% Free • No Credit Card Required • Start Immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                CodeQuick
              </span>
            </div>
            <div className="text-slate-400 text-sm text-center">
              © 2024 CodeQuick. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-all hover:scale-110">About</a>
              <a href="#" className="text-slate-400 hover:text-white transition-all hover:scale-110">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-all hover:scale-110">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;