import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Code2, Terminal, Zap, ChevronRight, 
  CheckCircle2, Circle, ListChecks, MessageCircle, Send
} from 'lucide-react';
import CodeQuickLogo from '../components/CodeQuickLogo';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { name: 'Java', iconClass: 'devicon-java-plain colored' },
    { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
    { name: 'C++', iconClass: 'devicon-cplusplus-plain colored' },
  ];

  const steps = [
    { num: '01', title: 'Pick a problem', desc: 'Choose one from the problem set to work on.' },
    { num: '02', title: 'Write & run it', desc: 'Code in Java, JavaScript, or C++ and test it against real cases.' },
    { num: '03', title: 'Track what you\u2019ve solved', desc: 'Every accepted submission is checked off on your list, so you always know where you left off.' }
  ];

  const recentProblems = [
    { name: 'Two Sum', solved: true },
    { name: 'Valid Parentheses', solved: true },
    { name: 'Merge Intervals', solved: true },
    { name: 'Longest Substring Without Repeating Characters', solved: false },
    { name: 'Binary Tree Level Order Traversal', solved: false },
  ];

  const solvedCount = recentProblems.filter(p => p.solved).length;

  return (
    <div className="bg-white text-slate-600 min-h-screen overflow-x-hidden font-sans selection:bg-emerald-500/20">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[460px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 20 ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group">
              <CodeQuickLogo className="group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black font-mono italic tracking-tighter text-slate-900">
                CODE<span className="text-emerald-600">QUICK</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <NavLink to="/login" className="hidden sm:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/signup">
                <button className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800">
                  <span>Start Coding</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold font-mono tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6 leading-[1.08]">
              Practice problems.
              <br />
              <span className="text-emerald-600">Track what sticks.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-6 leading-relaxed max-w-xl">
              A zero-setup editor for Java, JavaScript, and C++. Solve a problem, run it against real test cases, and ask the built-in assistant when you get stuck.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-20">
              <NavLink to="/signup">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-emerald-500">
                  <Terminal className="h-5 w-5" />
                  Solve your first problem
                </button>
              </NavLink>
            </div>
          </div>

          {/* Editor + solved-list panel: the actual product */}
          <div className="relative mx-auto rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

              {/* Left: editor, spans 2 cols */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Code2 className="h-3.5 w-3.5" />
                    TwoSum.java
                  </div>
                  <button className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md font-mono">Run</button>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="flex">
                    <div className="text-slate-300 select-none pr-4 mr-4 text-right border-r border-slate-200">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <div>
                      <span className="text-purple-600">class</span> <span className="text-emerald-700">Solution</span> {'{'}<br />
                      {'    '}<span className="text-purple-600">public</span> <span className="text-purple-600">int</span>[] twoSum(<span className="text-purple-600">int</span>[] nums, <span className="text-purple-600">int</span> target) {'{'}<br />
                      {'        '}Map{'<'}Integer, Integer{'>'} seen = <span className="text-purple-600">new</span> HashMap{'<>'}();<br />
                      {'        '}<span className="text-purple-600">for</span> (<span className="text-purple-600">int</span> i = 0; i {'<'} nums.length; i++) {'{'}<br />
                      {'            '}<span className="text-slate-500">// check target - nums[i] against seen</span><br />
                      {'        '}{'}'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-6 pb-5 text-xs font-mono text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Accepted — added to your solved list
                </div>
              </div>

              {/* Right: solved list */}
              <div className="bg-slate-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                    <ListChecks className="h-3.5 w-3.5" /> Your problems
                  </span>
                  <span className="text-xs font-mono text-slate-400">{solvedCount}/{recentProblems.length}</span>
                </div>
                <ul className="p-3 space-y-1">
                  {recentProblems.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white text-sm">
                      {p.solved
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        : <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />}
                      <span className={p.solved ? 'text-slate-700' : 'text-slate-400'}>{p.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-10 border-y border-slate-200 bg-slate-50/60 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-8">Runs your code in</p>
          <div className="flex flex-wrap justify-center gap-16 sm:gap-24 opacity-80">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-3 text-lg font-semibold">
                <i className={`${lang.iconClass} text-4xl`}></i>
                <span className="text-slate-800">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — kept honest to three real things */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-slate-900 mb-4">
              Simple, on purpose.
            </h2>
            <p className="text-lg text-slate-500">
              An editor, three languages, a record of what you've done — and help when you're stuck.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quiet stacked cards */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 p-6">
                <Terminal className="h-5 w-5 text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Zero-setup editor</h3>
                <p className="text-sm text-slate-500">Write and run code straight in the browser — nothing to install.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <Code2 className="h-5 w-5 text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Java, JavaScript, C++</h3>
                <p className="text-sm text-slate-500">Three languages, fully supported, no half-working extras.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <ListChecks className="h-5 w-5 text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Solved-problem tracking</h3>
                <p className="text-sm text-slate-500">Every problem you clear is checked off, so you can see your progress at a glance.</p>
              </div>
            </div>

            {/* Chat assistant demo — real feature, real transcript */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5" /> Ask about this problem
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-lg rounded-tr-sm bg-emerald-600 text-white text-sm px-4 py-2.5">
                    Why is my Two Sum solution timing out?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-white/10 text-slate-200 text-sm px-4 py-2.5 font-mono">
                    Your nested loop checks every pair, so it's O(n²). Try storing numbers you've already seen in a hash map — you can look up a match in one pass.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-lg rounded-tr-sm bg-emerald-600 text-white text-sm px-4 py-2.5">
                    What should I use as the key?
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10">
                <div className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-500 font-mono">Ask about your code or a problem...</div>
                <Send className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps + real progress panel */}
      <section className="py-24 relative z-10 bg-slate-50/60 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-slate-900 mb-6 leading-tight">
                Three steps. Every problem.
              </h2>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold font-mono text-sm">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solved list, larger view */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-slate-900">Your progress</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{solvedCount} solved</span>
              </div>
              <ul className="space-y-2">
                {recentProblems.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50">
                    {p.solved
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      : <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />}
                    <span className={`text-sm ${p.solved ? 'text-slate-700' : 'text-slate-400'}`}>{p.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white mb-4">
              Submit your first solution in under a minute.
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto mb-10">
              Free account. No credit card. Pick a problem and start writing code in Java, JavaScript, or C++.
            </p>
            <NavLink to="/signup">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-500">
                Create free account
                <ChevronRight className="h-5 w-5" />
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white pt-16 pb-10 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <CodeQuickLogo width={32} height={32} />
                <span className="text-xl font-black font-mono italic tracking-tighter text-slate-900">
                  CODE<span className="text-emerald-600">QUICK</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                A zero-setup editor for Java, JavaScript, and C++, with a running list of the problems you've solved.
              </p>
            </div>

            <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Compiler IDE</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Problem Set</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-slate-900 font-semibold mb-6 text-sm">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} CodeQuick. All rights reserved.</p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating chat launcher — the assistant is available on every page */}
      <button
        aria-label="Ask about your problem"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-500 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default LandingPage;