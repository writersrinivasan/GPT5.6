"use client";
import { useState } from "react";
import { useCases } from "@/data/curriculum";

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState("itsm");
  const active = useCases.find((u) => u.id === activeId)!;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          <span style={{ color: "#10B981" }}>Enterprise</span> Use Cases
        </h2>
        <p className="text-white/50 text-sm">
          Real Hexaware scenarios powered by LangGraph + GPT-5.6 · Click any card to explore
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {useCases.map((uc) => (
          <button
            key={uc.id}
            onClick={() => setActiveId(uc.id)}
            className="rounded-xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 relative overflow-hidden group"
            style={
              activeId === uc.id
                ? { background: `${uc.accent}22`, border: `2px solid ${uc.accent}66` }
                : { background: "rgba(255,255,255,0.03)", border: "2px solid rgba(255,255,255,0.06)" }
            }
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${uc.accent}, transparent)` }}
            />
            <div className="text-3xl mb-2">{uc.icon}</div>
            <div className="text-white font-bold text-sm mb-0.5">{uc.title}</div>
            <div
              className="text-xs font-medium"
              style={{ color: activeId === uc.id ? uc.accent : "rgba(255,255,255,0.4)" }}
            >
              {uc.industry}
            </div>
          </button>
        ))}
      </div>

      {/* Detail view */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${active.accent}33` }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${active.accent}22`, border: `1px solid ${active.accent}44` }}
              >
                {active.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{active.title}</h3>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${active.accent}22`, color: active.accent }}
                >
                  {active.industry}
                </span>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">{active.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: `${active.accent}11`, color: active.accent, border: `1px solid ${active.accent}33` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: LangGraph flow */}
          <div className="flex-shrink-0">
            <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
              LangGraph Pipeline
            </h4>
            <div className="flex flex-col items-center gap-1">
              {active.nodes.map((node, i) => (
                <div key={node} className="flex flex-col items-center">
                  <div
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold w-52 text-center transition-all"
                    style={{
                      background: `${active.accent}22`,
                      border: `1px solid ${active.accent}66`,
                      color: "white",
                      opacity: 0.5 + (i / active.nodes.length) * 0.5,
                    }}
                  >
                    {node}
                  </div>
                  {i < active.nodes.length - 1 && (
                    <div
                      className="w-0.5 h-5"
                      style={{ background: `linear-gradient(to bottom, ${active.accent}66, ${active.accent}22)` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Try in sandbox prompt */}
        <div
          className="mt-5 p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-white/40 text-xs mb-2 font-semibold">🤖 AI Sandbox Prompt</div>
          <div className="text-white/70 text-sm italic">&ldquo;{active.prompt}&rdquo;</div>
          <div className="text-white/30 text-xs mt-2">→ Switch to the Sandbox tab and paste this prompt to try it live with Groq</div>
        </div>
      </div>

      {/* Architecture infographic */}
      <div>
        <h3 className="text-white font-bold mb-4">Why LangGraph for Enterprise?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Reliability",
              emoji: "🛡️",
              desc: "Checkpointing ensures agents resume from failures — no lost work in long enterprise workflows.",
              color: "#10B981",
              stat: "99.9%",
              statLabel: "resumability",
            },
            {
              title: "Observability",
              emoji: "🔍",
              desc: "Every state transition is recorded. Full audit trail for compliance and debugging.",
              color: "#06B6D4",
              stat: "100%",
              statLabel: "traceable steps",
            },
            {
              title: "Scalability",
              emoji: "📈",
              desc: "Parallel subgraphs, concurrent agent execution, and async support for high-throughput.",
              color: "#F97316",
              stat: "10x",
              statLabel: "throughput vs chains",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-5"
              style={{ background: `${item.color}11`, border: `1px solid ${item.color}33` }}
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-2xl font-black" style={{ color: item.color }}>{item.stat}</div>
                <div className="text-white/40 text-xs">{item.statLabel}</div>
              </div>
              <div className="text-white font-bold text-sm mb-1">{item.title}</div>
              <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
