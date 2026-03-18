// import { useState, useRef, useEffect } from "react";
// import { Send, Bot, User, Sparkles } from 'lucide-react';
// import axiosClient from "../utils/axiosClient";

// function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     { role: 'model', parts: [{ text: "Hi! I'm your AI coding assistant. I can help you understand this problem, debug your code, or explain concepts. How can I help you today?" }] }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const messagesEndRef = useRef(null);

// console.log(messages);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async () => {
//     const trimmedMessage = inputValue.trim();
    
//     if (trimmedMessage.length < 2) {
//       setError('Please enter at least 2 characters');
//       return;
//     }

//     setError('');
//     setMessages(prev => [...prev, { role: 'user', parts: [{ text: trimmedMessage }] }]);
//     setInputValue('');
//     setIsLoading(true);

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages: messages,
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode
//       });
//       setMessages(prev => [...prev, {
//         role: 'model',
//         parts: [{ text: response.data.message }]
//       }]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages(prev => [...prev, {
//         role: 'model',
//         parts: [{ text: "I apologize, but I encountered an error. Please try again." }]
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setInputValue(suggestion);
//     setTimeout(() => handleSubmit(), 0);
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 border-b border-slate-700/50">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h3 className="font-bold text-white text-lg">AI Coding Assistant</h3>
//             <p className="text-blue-100 text-xs">Always here to help</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50 custom-scrollbar">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
//             style={{ animationDelay: `${index * 0.1}s` }}
//           >
//             <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
//               {/* Avatar */}
//               <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                 msg.role === "user" 
//                   ? "bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30" 
//                   : "bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30"
//               }`}>
//                 {msg.role === "user" ? (
//                   <User className="w-4 h-4 text-white" />
//                 ) : (
//                   <Bot className="w-4 h-4 text-white" />
//                 )}
//               </div>

//               {/* Message Bubble */}
//               <div className={`rounded-2xl px-4 py-3 shadow-lg ${
//                 msg.role === "user"
//                   ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white"
//                   : "bg-slate-800/80 backdrop-blur-xl text-slate-100 border border-slate-700/50"
//               }`}>
//                 <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//                   {msg.parts[0].text}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Loading Indicator */}
//         {isLoading && (
//           <div className="flex justify-start animate-fadeIn">
//             <div className="flex gap-3 max-w-[85%]">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30">
//                 <Bot className="w-4 h-4 text-white" />
//               </div>
//               <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-4 py-3 shadow-lg">
//                 <div className="flex gap-1">
//                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="sticky bottom-0 p-4 bg-slate-800/50 backdrop-blur-xl border-t border-slate-700/50">
//         <div className="flex items-center gap-2">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               placeholder="Ask me anything about this problem..."
//               value={inputValue}
//               onChange={(e) => {
//                 setInputValue(e.target.value);
//                 setError('');
//               }}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//               className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
//                 error
//                   ? "border-red-500 focus:ring-red-500/50"
//                   : "border-slate-700/50 focus:ring-blue-500/50 focus:border-blue-500/50"
//               }`}
//             />
//             {error && (
//               <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>
//             )}
//           </div>
//           <button
//             onClick={handleSubmit}
//             className={`p-3 rounded-xl font-semibold transition-all flex items-center justify-center ${
//               error || isLoading || inputValue.trim().length < 2
//                 ? "bg-slate-700 text-slate-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
//             }`}
//             disabled={error || isLoading || inputValue.trim().length < 2}
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Quick Actions */}
//         <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
//           {[
//             "Explain the problem",
//             "Give me a hint",
//             "Show approach",
//             "Time complexity?"
//           ].map((suggestion, index) => (
//             <button
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               disabled={isLoading}
//               className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {suggestion}
//             </button>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }

//         /* Custom scrollbar */
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(15, 23, 42, 0.3);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(71, 85, 105, 0.5);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(71, 85, 105, 0.7);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ChatAi;

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from 'lucide-react';

// function ChatAi({problem}) {
//     const [messages, setMessages] = useState([
//         { role: 'model', parts:[{text: "Hi, How are you"}]},
//         { role: 'user', parts:[{text: "I am Good"}]}
//     ]);

//     const { register, handleSubmit, reset,formState: {errors} } = useForm();
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const onSubmit = async (data) => {
        
//         setMessages(prev => [...prev, { role: 'user', parts:[{text: data.message}] }]);
//         reset();

//         try {
            
//             const response = await axiosClient.post("/ai/chat", {
//                 messages:messages,
//                 title:problem.title,
//                 description:problem.description,
//                 testCases: problem.visibleTestCases,
//                 startCode:problem.startCode
//             });

           
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts:[{text: response.data.message}] 
//             }]);
//         } catch (error) {
//             console.error("API Error:", error);
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts:[{text: "Error from AI Chatbot"}]
//             }]);
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => (
//                     <div 
//                         key={index} 
//                         className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//                     >
//                         <div className="chat-bubble bg-base-200 text-base-content">
//                             {msg.parts[0].text}
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <form 
//                 onSubmit={handleSubmit(onSubmit)} 
//                 className="sticky bottom-0 p-4 bg-base-100 border-t"
//             >
//                 <div className="flex items-center">
//                     <input 
//                         placeholder="Ask me anything" 
//                         className="input input-bordered flex-1" 
//                         {...register("message", { required: true, minLength: 2 })}
//                     />
//                     <button 
//                         type="submit" 
//                         className="btn btn-ghost ml-2"
//                         disabled={errors.message}
//                     >
//                         <Send size={20} />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default ChatAi;

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send, Bot, User, Sparkles } from 'lucide-react';

// function ChatAi({problem}) {
//   const [messages, setMessages] = useState([

//   ]);
//   console.log(messages);
//   const { register, handleSubmit, reset, formState: {errors} } = useForm();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onSubmit = async (data) => {
//     setMessages(prev => [...prev, { role: 'user', parts:[{text: data.message}] }]);
//     reset();
//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages:messages,
//         title:problem.title,
//         description:problem.description,
//         testCases: problem.visibleTestCases,
//         startCode:problem.startCode
//       });
//       setMessages(prev => [...prev, { 
//         role: 'model', 
//         parts:[{text: response.data.message}] 
//       }]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages(prev => [...prev, { 
//         role: 'model', 
//         parts:[{text: "Error from AI Chatbot"}]
//       }]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 border-b border-slate-700/50">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h3 className="font-bold text-white text-lg">AI Coding Assistant</h3>
//             <p className="text-blue-100 text-xs">Always here to help</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50 custom-scrollbar">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
//           >
//             <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
//               {/* Avatar */}
//               <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                 msg.role === "user" 
//                   ? "bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30" 
//                   : "bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30"
//               }`}>
//                 {msg.role === "user" ? (
//                   <User className="w-4 h-4 text-white" />
//                 ) : (
//                   <Bot className="w-4 h-4 text-white" />
//                 )}
//               </div>

//               {/* Message Bubble */}
//               <div className={`rounded-2xl px-4 py-3 shadow-lg ${
//                 msg.role === "user"
//                   ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white"
//                   : "bg-slate-800/80 backdrop-blur-xl text-slate-100 border border-slate-700/50"
//               }`}>
//                 <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//                   {msg.parts[0].text}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Form */}
//       <div className="sticky bottom-0 p-4 bg-slate-800/50 backdrop-blur-xl border-t border-slate-700/50">
//         <div className="flex items-center gap-2">
//           <div className="flex-1 relative">
//             <input
//               placeholder="Ask me anything about this problem..."
//               className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
//                 errors.message
//                   ? "border-red-500 focus:ring-red-500/50"
//                   : "border-slate-700/50 focus:ring-blue-500/50 focus:border-blue-500/50"
//               }`}
//               {...register("message", { required: true, minLength: 2 })}
//             />
//             {errors.message && (
//               <p className="text-red-400 text-xs mt-1 ml-1">Please enter at least 2 characters</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             onClick={handleSubmit(onSubmit)}
//             className={`p-3 rounded-xl font-semibold transition-all flex items-center justify-center ${
//               errors.message
//                 ? "bg-slate-700 text-slate-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
//             }`}
//             disabled={errors.message}
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(15, 23, 42, 0.3);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(71, 85, 105, 0.5);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(71, 85, 105, 0.7);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ChatAi;

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Bot, User, Sparkles } from "lucide-react";

function ChatAi({ problem }) {

  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {

    const userMessage = {
      role: "user",
      content: data.message
    };

    setMessages(prev => [...prev, userMessage]);

    reset();

    try {

      const response = await axiosClient.post("/ai/chat", {
        messages: [...messages, userMessage],
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode
      });

      const aiMessage = {
        role: "assistant",
        content: response.data.message
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {

      console.error("API Error:", error);

      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Error from AI Chatbot"
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <div>
            <h3 className="font-bold text-white text-lg">AI Coding Assistant</h3>
            <p className="text-blue-100 text-xs">Always here to help</p>
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50 custom-scrollbar">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >

            <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-600 to-blue-500"
                  : "bg-gradient-to-br from-purple-600 to-purple-500"
              }`}>

                {msg.role === "user"
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-4 h-4 text-white" />
                }

              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white"
                  : "bg-slate-800/80 text-slate-100 border border-slate-700/50"
              }`}>

                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.content}
                </p>

              </div>

            </div>

          </div>

        ))}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="sticky bottom-0 p-4 bg-slate-800/50 backdrop-blur-xl border-t border-slate-700/50">

        <div className="flex items-center gap-2">

          <div className="flex-1">

            <input
              placeholder="Ask me anything about this problem..."
              className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none ${
                errors.message
                  ? "border-red-500"
                  : "border-slate-700 focus:ring-2 focus:ring-blue-500"
              }`}
              {...register("message", { required: true, minLength: 2 })}
            />

            {errors.message && (
              <p className="text-red-400 text-xs mt-1">
                Please enter at least 2 characters
              </p>
            )}

          </div>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 transition"
          >
            <Send className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatAi;