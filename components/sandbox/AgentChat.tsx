"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap, Loader2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useCases } from "@/data/curriculum";

interface Message {
  role: "user" | "assistant";
  content: string;
  trace?: { node: string; status: string; color: string }[];
  tokens?: { prompt_tokens: number; completion_tokens: number };
}

interface Props {
  apiKey: string;
}

const QUICK_PROMPTS = [
  "Explain the difference between GPT-5.6 Sol and Luna",
  "Show me a LangGraph ReAct agent in Python",
  "What LangGraph pattern suits an ITSM ticket router?",
  "How does LangGraph checkpointing work?",
  "Compare GPT-5.6 vs Claude Fable 5 for coding",
  "Give me a human-in-loop approval flow example",
];

export default function AgentChat({ apiKey }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm your GPT-5.6 & LangGraph training assistant, powered by **Groq's Llama 3.1 70B**.\n\nAsk me anything about:\n- 🧠 GPT-5.6 models (Sol, Terra, Luna)\n- 🕸️ LangGraph concepts & code\n- 🏢 Enterprise use cases at Hexaware\n- 🔁 Agentic design patterns\n\nEnter your Groq API key above to get started!",
      trace: [{ node: "Init", status: "done", color: "#10B981" }],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useCase, setUseCase] = useState("general");
  const [showUseCases, setShowUseCases] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    if (!apiKey) {
      toast.error("Please enter your Groq API key first");
      return;
    }

    const newUserMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) > 0).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, apiKey, useCase, history }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          trace: data.agentTrace,
          tokens: data.tokens,
        },
      ]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(errMsg);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Error: ${errMsg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const useCaseOption = useCases.find((u) => u.id === useCase);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", height: "calc(100vh - 340px)", minHeight: 450 }}
    >
      {/* Chat header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
          >
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">LangGraph Agent (via Groq)</div>
            <div className="text-white/30 text-xs">llama-3.1-70b-versatile</div>
          </div>
        </div>

        {/* Use case selector */}
        <div className="relative">
          <button
            onClick={() => setShowUseCases((s) => !s)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/70 transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {useCaseOption ? useCaseOption.icon : "🤖"}
            <span className="hidden md:inline">{useCaseOption ? useCaseOption.industry : "General"}</span>
            <ChevronDown size={12} />
          </button>
          {showUseCases && (
            <div
              className="absolute right-0 top-full mt-1 w-48 rounded-xl overflow-hidden z-50"
              style={{ background: "#1a1a3a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
              {[{ id: "general", icon: "🤖", label: "General Assistant", accent: "#7C3AED" }, ...useCases.map((u) => ({ id: u.id, icon: u.icon, label: u.industry, accent: u.accent }))].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setUseCase(opt.id); setShowUseCases(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span>{opt.icon}</span>
                  {opt.label}
                  {useCase === opt.id && <span className="ml-auto text-green-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={
                msg.role === "assistant"
                  ? { background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }
                  : { background: "linear-gradient(135deg, #EC4899, #F97316)" }
              }
            >
              {msg.role === "assistant" ? <Bot size={15} className="text-white" /> : <User size={15} className="text-white" />}
            </div>
            <div className={`flex-1 max-w-[85%] space-y-2 ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
              <div
                className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  msg.role === "assistant"
                    ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.85)" }
                    : { background: "linear-gradient(135deg, #EC489933, #F9731633)", color: "white" }
                }
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {/* Agent trace */}
              {msg.trace && msg.trace.length > 0 && msg.role === "assistant" && (
                <div className="flex items-center gap-1 flex-wrap">
                  {msg.trace.map((step, j) => (
                    <div key={j} className="flex items-center gap-1">
                      <div
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${step.color}22`, color: step.color, border: `1px solid ${step.color}44` }}
                      >
                        ✓ {step.node}
                      </div>
                      {j < msg.trace!.length - 1 && <span style={{ color: step.color, opacity: 0.5 }} className="text-[10px]">→</span>}
                    </div>
                  ))}
                  {msg.tokens && (
                    <div className="flex items-center gap-1 ml-1 text-[10px] text-white/20">
                      <Zap size={8} />
                      {msg.tokens.completion_tokens} tokens
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <Bot size={15} className="text-white" />
            </div>
            <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Loader2 size={14} className="animate-spin" />
                <span>Agent processing</span>
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div
        className="px-4 py-2 flex gap-2 overflow-x-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full text-white/50 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask anything about GPT-5.6, LangGraph, or agentic AI..."
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              outline: "none",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
          >
            {loading ? <Loader2 size={16} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}
