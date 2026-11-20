"use client";
import { curriculum } from "@/data/curriculum";
import { Clock, CheckCircle2 } from "lucide-react";

export default function AgendaSection() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Hero */}
      <div
        className="rounded-2xl p-8 mb-8 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7C3AED22, #EC489922, #06B6D422)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7C3AED 0%, transparent 50%), radial-gradient(circle at 80% 50%, #06B6D4 0%, transparent 50%)" }}
        />
        <div className="relative z-10">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-black text-white mb-3">
            <span className="gradient-text">GPT-5.6 & LangGraph</span>
          </h2>
          <p className="text-white/60 text-lg mb-2">Agentic AI for Enterprise</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-black gradient-text">60</div>
              <div className="text-white/40 text-xs">Minutes</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: "#10B981" }}>6</div>
              <div className="text-white/40 text-xs">Modules</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: "#F97316" }}>3</div>
              <div className="text-white/40 text-xs">Exercises</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black" style={{ color: "#EC4899" }}>5</div>
              <div className="text-white/40 text-xs">Quiz Qs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <h3 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-6 px-1">
        Session Timeline
      </h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-0.5 timeline-line rounded-full" />

        <div className="space-y-4">
          {curriculum.map((item, idx) => (
            <div key={item.id} className="flex gap-4 group">
              {/* Dot */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 text-xl transition-transform group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${item.accent}33, ${item.accent}66)`, border: `2px solid ${item.accent}66` }}
              >
                {item.emoji}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-xl p-4 transition-all duration-200 group-hover:translate-x-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: `${item.accent}22`, color: item.accent }}
                      >
                        {item.time}
                      </span>
                      <div className="flex items-center gap-1 text-white/30 text-xs">
                        <Clock size={10} />
                        {item.duration}
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-1 text-xs text-white/50">
                          <CheckCircle2 size={10} style={{ color: item.accent }} />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${item.accent}22, transparent)`, color: `${item.accent}` }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Codex teaser */}
      <div
        className="mt-8 rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg, #F9731622, #F59E0B22)", border: "1px solid #F9731644" }}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h4 className="text-white font-black text-lg mb-1">Coming Next: OpenAI Codex CLI</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              After this session, the presenter will demo <strong className="text-orange-400">Codex CLI</strong> — 
              OpenAI&apos;s agentic coding tool that runs directly in your terminal, reads your codebase, 
              writes code, runs tests, and fixes bugs autonomously. Think of it as an agent that lives in your shell.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Terminal-native", "Reads full codebase", "Writes & runs code", "Multi-file edits", "Git aware"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full" style={{ background: "#F9731622", color: "#F97316", border: "1px solid #F9731633" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
