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
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg">AI Coding Assistant</h3>
            <p className="text-slate-400 text-xs">Always here to help</p>
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white custom-scrollbar">

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Ask about this problem — stuck on an approach, an edge case, or why your code isn't passing.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >

            <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-emerald-600"
                  : "bg-slate-800"
              }`}>

                {msg.role === "user"
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-4 h-4 text-white" />
                }

              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-50 text-slate-700 border border-slate-200"
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
      <div className="sticky bottom-0 p-4 bg-slate-50 border-t border-slate-200">

        <div className="flex items-center gap-2">

          <div className="flex-1">

            <input
              placeholder="Ask me anything about this problem..."
              className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none ${
                errors.message
                  ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              }`}
              {...register("message", { required: true, minLength: 2 })}
            />

            {errors.message && (
              <p className="text-rose-500 text-xs mt-1">
                Please enter at least 2 characters
              </p>
            )}

          </div>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatAi;