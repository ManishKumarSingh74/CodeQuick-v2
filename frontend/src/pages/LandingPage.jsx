import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Code2, Terminal, Video, Zap, BarChart, ChevronRight, 
  Layers, Globe, Cpu, CheckCircle2, Sparkles, 
  Rocket, Play
} from 'lucide-react';
import CodeQuickLogo from '../components/CodeQuickLogo';

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
        background: `radial-gradient(800px at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
      }}
    />
  );
};



const FeatureCard = ({ icon: Icon, title, description, accentClass, bgClass, colSpan }) => (
  <div className={`group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/50 p-8 backdrop-blur-md transition-all hover:border-slate-700/50 ${colSpan}`}>
    <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl transition-all group-hover:bg-opacity-50 ${bgClass} opacity-20`}></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 ${accentClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed grow">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Terminal,
      title: 'Online Code Editor',
      description: 'Write, debug, and run code directly in your browser with our powerful IDE environment. No setup, zero configuration.',
      colSpan: 'md:col-span-2',
      accentClass: 'text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]',
      bgClass: 'bg-blue-500'
    },
    {
      icon: Video,
      title: 'Video Solutions',
      description: 'Master algorithms with expert-led, step-by-step visual explanations for complex problems.',
      colSpan: 'md:col-span-1',
      accentClass: 'text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]',
      bgClass: 'bg-purple-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience instant compilation and execution across 10+ programming languages globally.',
      colSpan: 'md:col-span-1',
      accentClass: 'text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]',
      bgClass: 'bg-amber-500'
    },
    {
      icon: BarChart,
      title: 'Deep Analytics',
      description: 'Track submissions, analyze execution time, and monitor memory usage to optimize your logic.',
      colSpan: 'md:col-span-2',
      accentClass: 'text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
      bgClass: 'bg-emerald-500'
    }
  ];

  const languages = [
    { name: 'Python', iconClass: 'devicon-python-plain colored text-blue-500' },
    { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored text-yellow-500' },
    { name: 'C++', iconClass: 'devicon-cplusplus-plain colored' },
    { name: 'Java', iconClass: 'devicon-java-plain colored' },
    { name: 'Ruby', iconClass: 'devicon-ruby-plain colored text-rose-500' }
  ];

  const steps = [
    { num: '01', title: 'Pick a Challenge', desc: 'Browse our curated collection of algorithmic puzzles.' },
    { num: '02', title: 'Write Your Solution', desc: 'Use our zero-setup online editor to craft your code.' },
    { num: '03', title: 'Analyze & Learn', desc: 'Submit to instant test cases and track performance.' }
  ];

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen overflow-x-hidden font-sans selection:bg-blue-500/30">
      <MouseGlow />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group">
              <CodeQuickLogo className="group-hover:scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <span className="text-2xl font-black font-mono italic tracking-tighter text-white">
                CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <NavLink to="/login" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/signup">
                <button className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50">
                  <span>Start Coding</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">Introducing CodeQuick 2.0</span>
          </div>
          
          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-8xl mb-8 leading-[1.1]">
            Master Algorithms <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Without the Friction.
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed">
            The ultimate collaborative IDE in your browser. Practice with multi-language support, learn from video solutions, and track your progress instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <NavLink to="/signup">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5">
                <Terminal className="h-5 w-5" />
                Start Free Trial
              </button>
            </NavLink>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-0.5">
              <Play className="h-5 w-5 text-slate-300" />
              Watch Demo
            </button>
          </div>

          {/* IDE Mockup */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 text-left overflow-hidden translate-y-4 animate-[flyIn_1s_ease-out_forwards]">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <Code2 className="h-3 w-3" />
                two_sum.py
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-emerald-500/30 transition-colors">
                  <Play className="h-3 w-3" /> Run Code
                </button>
              </div>
            </div>
            {/* Editor Content */}
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <div className="flex">
                  <div className="text-slate-600 select-none pr-4 mr-4 text-right border-r border-slate-800">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
                  </div>
                  <div>
                    <span className="text-purple-400">def</span> <span className="text-blue-400">two_sum</span>(nums, target):<br />
                    {'    '}<span className="text-slate-500 italic"># Initialize a dictionary to store seen numbers</span><br />
                    {'    '}seen = {'{}'}<br />
                    {'    '}<span className="text-purple-400">for</span> i, num <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(nums):<br />
                    {'        '}diff = target - num<br />
                    {'        '}<span className="text-purple-400">if</span> diff <span className="text-purple-400">in</span> seen:<br />
                    {'            '}<span className="text-purple-400">return</span> [seen[diff], i]<br />
                    {'        '}seen[num] = i
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-64 border-t sm:border-t-0 sm:border-l border-slate-800 bg-slate-950/30 p-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Output Console</div>
                <div className="text-sm font-mono text-emerald-400 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4" /> Accepted
                </div>
                <div className="text-xs font-mono text-slate-500 space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span>Runtime:</span>
                    <span className="text-white">52 ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-white">16.4 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Logo Cloud Section */}
      <section className="py-10 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">Supported Environments</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {languages.map((lang, index) => (
              <div key={index} className={`flex items-center gap-3 text-xl font-bold transition-all duration-300 hover:scale-110 cursor-default group`}>
                <i className={`${lang.iconClass} text-4xl group-hover:drop-shadow-lg transition-all`}></i>
                <span className="text-white">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">excel</span>.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit designed to help you prepare for technical interviews and improve your coding skills organically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 relative z-10 bg-slate-900/30 border-y border-slate-800/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                From concept to <br/>
                <span className="text-blue-500">execution</span> in minutes.
              </h2>
              <p className="text-lg text-slate-400 mb-12">
                Our optimized workflow ensures you spend less time configuring environments and more time actually coding.
              </p>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-bold font-mono transition-all group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl border border-slate-800 bg-slate-950/80 overflow-hidden illustration-glow">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-indigo-500/10 rounded-full animate-[spin_15s_reverse_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8 z-10">
                   <Rocket className="w-16 h-16 text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                   <h3 className="text-2xl font-bold text-white mb-2">Accelerate Learning</h3>
                   <p className="text-slate-400">Join thousands of developers leveling up their skills.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-500/20 bg-slate-900 px-8 py-24 text-center shadow-2xl isolate">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-slate-900 to-purple-600/10 -z-10"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Start your journey today.
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Create a free account to access our IDE, problem set, and video solutions. No credit card required.
            </p>

            <NavLink to="/signup">
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Get Started for Free
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950 pt-20 pb-10 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <CodeQuickLogo width={36} height={36} />
                <span className="text-2xl font-black font-mono italic tracking-tighter text-white">CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">QUICK</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                The ultimate collaborative IDE in your browser. Practice, compile, and conquer algorithms with integrated multi-language support and direct video solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Compiler IDE</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Problem Set</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Video Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Leaderboard</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} CodeQuick. All rights reserved.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes flyIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;