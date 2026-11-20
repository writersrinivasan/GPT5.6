"use client";
import { Brain, FlaskConical, Zap, Clock } from "lucide-react";

interface HeaderProps {
  activeTab: "learn" | "sandbox";
  setActiveTab: (tab: "learn" | "sandbox") => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-white/10" style={{ background: "rgba(10,10,26,0.9)", backdropFilter: "blur(16px)" }}>
      {/* Top bar */}
      <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hexaware logo placeholder */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
            >
              H
            </div>
            <span className="text-sm font-semibold text-white/80">Hexaware Technologies</span>
          </div>
          <span className="text-white/20 text-sm">×</span>
          <span className="text-sm text-white/50">Training Series 2026</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>60-min session</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-yellow-400">Live Training</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="p-2 rounded-xl"
              style={{ background: "linear-gradient(135deg, #7C3AED22, #EC489922)" }}
            >
              <Brain size={24} style={{ color: "#7C3AED" }} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white leading-tight">
                <span className="gradient-text">GPT-5.6</span>
                <span className="text-white/60 font-normal text-lg ml-2">× LangGraph</span>
              </h1>
              <p className="text-white/50 text-xs">Agentic AI Training — Powered by Groq</p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === "learn"
                ? "text-white shadow-lg"
                : "text-white/50 hover:text-white/80"
            }`}
            style={
              activeTab === "learn"
                ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)" }
                : {}
            }
          >
            <Brain size={15} />
            Learn
          </button>
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === "sandbox"
                ? "text-white shadow-lg"
                : "text-white/50 hover:text-white/80"
            }`}
            style={
              activeTab === "sandbox"
                ? { background: "linear-gradient(135deg, #06B6D4, #10B981)" }
                : {}
            }
          >
            <FlaskConical size={15} />
            Sandbox
          </button>
        </div>
      </div>
    </header>
  );
}
