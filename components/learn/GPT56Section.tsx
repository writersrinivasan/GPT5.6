"use client";
import { gpt56Models } from "@/data/curriculum";
import { Zap, DollarSign, Brain, Shield } from "lucide-react";

const benchmarks = [
  { label: "Coding Agent Index", sol: 94, terra: 81, luna: 68, prev: 72 },
  { label: "MMLU-Pro", sol: 91, terra: 85, luna: 76, prev: 79 },
  { label: "SWE-bench", sol: 88, terra: 74, luna: 60, prev: 65 },
  { label: "MATH-500", sol: 97, terra: 90, luna: 82, prev: 86 },
];

const capabilities = [
  { icon: Brain, label: "Multi-Step Reasoning", desc: "Chains of thought across complex tasks", color: "#7C3AED" },
  { icon: Zap, label: "Programmatic Tool Calling", desc: "Writes JS to call tools, passes results, processes intermediates in a hosted runtime", color: "#F59E0B" },
  { icon: Shield, label: "Safety-First Design", desc: "High capability in cybersecurity/bio — with safeguards", color: "#10B981" },
  { icon: DollarSign, label: "Cost Efficiency", desc: "Luna is 80% cheaper than previous flagship; Sol outperforms at half competitor cost", color: "#06B6D4" },
];

export default function GPT56Section() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          <span className="gradient-text">GPT-5.6</span> Model Family
        </h2>
        <p className="text-white/50 text-sm">Released July 9, 2026 · Three-tier architecture · Frontier intelligence meets frontier efficiency</p>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gpt56Models.map((model) => (
          <div
            key={model.name}
            className="rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Gradient bg */}
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${model.color.replace("from-", "").replace("to-", "").split(" ")[0]}, transparent)` }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{model.emoji}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${model.badgeColor}`}>
                  {model.badge}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-0.5">GPT-5.6 {model.name}</h3>
              <p className="text-white/40 text-xs mb-4">{model.tier}</p>
              <ul className="space-y-2 mb-4">
                {model.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `var(--tw-gradient-from, #7C3AED)` }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className="text-xs p-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
              >
                💼 {model.useCase}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ultra mode callout */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, #F9731611, #F59E0B11)", border: "1px solid #F9731633" }}
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚡</div>
          <div>
            <h4 className="text-white font-black mb-1">GPT-5.6 Sol Ultra Mode</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Ultra is OpenAI&apos;s new high-capacity configuration — coordinates multiple sub-agents in 
              parallel workflows to complete complex tasks faster. Higher compute budget + better design judgment 
              = results ready to deploy, not just generated.
            </p>
          </div>
        </div>
      </div>

      {/* Benchmark chart */}
      <div>
        <h3 className="text-white font-bold mb-4">Benchmark Comparison</h3>
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-5">
            {[
              { label: "Sol", color: "#F59E0B" },
              { label: "Terra", color: "#10B981" },
              { label: "Luna", color: "#7C3AED" },
              { label: "Previous Flagship", color: "#6b7280" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-white/50">
                <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {benchmarks.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>{b.label}</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { v: b.sol, color: "#F59E0B", label: `${b.sol}%` },
                    { v: b.terra, color: "#10B981", label: `${b.terra}%` },
                    { v: b.luna, color: "#7C3AED", label: `${b.luna}%` },
                    { v: b.prev, color: "#6b7280", label: `${b.prev}%`, dashed: true },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000"
                          style={{
                            width: `${bar.v}%`,
                            background: bar.dashed
                              ? `repeating-linear-gradient(90deg, ${bar.color}, ${bar.color} 4px, transparent 4px, transparent 8px)`
                              : bar.color,
                            opacity: bar.dashed ? 0.5 : 1,
                          }}
                        >
                          <span className="text-white text-[10px] font-bold">{bar.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key capabilities */}
      <div>
        <h3 className="text-white font-bold mb-4">Key Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.label}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: `${cap.color}11`, border: `1px solid ${cap.color}33` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cap.color}22`, color: cap.color }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{cap.label}</div>
                  <div className="text-white/50 text-xs mt-0.5">{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h3 className="text-white font-bold mb-4">Release Timeline</h3>
        <div className="flex gap-0 overflow-x-auto pb-2">
          {[
            { date: "Jun 26, 2026", event: "Limited gov preview", color: "#6366F1" },
            { date: "Jul 9, 2026", event: "GPT-5.6 GA launch", color: "#7C3AED" },
            { date: "Jul 30, 2026", event: "Luna -80% pricing", color: "#10B981" },
            { date: "Aug 2026", event: "Safety update", color: "#F97316" },
            { date: "Now →", event: "You are here!", color: "#EC4899" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0 px-4 first:pl-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black mb-2 relative z-10"
                style={{ background: `${item.color}33`, border: `2px solid ${item.color}`, color: item.color }}
              >
                {i + 1}
              </div>
              {i < 4 && <div className="absolute h-0.5 w-8 mt-5" style={{ background: item.color, opacity: 0.3 }} />}
              <div className="text-center">
                <div className="text-white font-semibold text-xs whitespace-nowrap">{item.event}</div>
                <div className="text-white/30 text-[10px] mt-0.5 whitespace-nowrap">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
