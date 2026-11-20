"use client";
import { useState } from "react";
import { exercises } from "@/data/curriculum";
import { Clock, ChevronRight, Eye, EyeOff, Copy, Check, Terminal } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  apiKey: string;
}

export default function ExerciseLab({ apiKey }: Props) {
  const [activeEx, setActiveEx] = useState(exercises[0].id);
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const exercise = exercises.find((e) => e.id === activeEx)!;

  const handleCopy = async (code: string, id: string) => {
    // Inject API key if present
    const finalCode = apiKey ? code.replace(/YOUR_GROQ_API_KEY/g, apiKey) : code;
    await navigator.clipboard.writeText(finalCode);
    setCopied(id);
    toast.success(apiKey ? "Code copied with your API key!" : "Code copied! (Add your API key)");
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleSolution = (id: string) => {
    setShowSolution((s) => ({ ...s, [id]: !s[id] }));
  };

  const markComplete = (id: string) => {
    setCompleted((s) => { const n = new Set(s); n.add(id); return n; });
    toast.success("Exercise marked complete! 🎉");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ minHeight: 500 }}>
      {/* Exercise list */}
      <div className="md:col-span-1 space-y-2">
        <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Exercises</h3>
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            className="w-full text-left p-3 rounded-xl transition-all"
            style={
              activeEx === ex.id
                ? { background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
            }
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{ex.emoji}</span>
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded text-white ${ex.levelColor}`}
              >
                {ex.level}
              </span>
              {completed.has(ex.id) && <span className="text-green-400 text-xs ml-auto">✓</span>}
            </div>
            <div className="text-white text-xs font-semibold leading-tight">{ex.title}</div>
            <div className="flex items-center gap-1 mt-1 text-white/30 text-xs">
              <Clock size={9} />
              {ex.duration}
            </div>
          </button>
        ))}

        {/* Progress */}
        <div
          className="p-3 rounded-xl mt-4"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="text-green-400 text-xs font-bold mb-1">Progress</div>
          <div className="text-2xl font-black text-white">{completed.size}/{exercises.length}</div>
          <div className="text-white/40 text-xs">exercises done</div>
          <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(completed.size / exercises.length) * 100}%`, background: "linear-gradient(90deg, #10B981, #06B6D4)" }}
            />
          </div>
        </div>
      </div>

      {/* Exercise detail */}
      <div className="md:col-span-3 space-y-4">
        {/* Header */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{exercise.emoji}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${exercise.levelColor}`}>
                  {exercise.level}
                </span>
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Clock size={10} />
                  {exercise.duration}
                </div>
              </div>
              <h3 className="text-white font-black text-lg">{exercise.title}</h3>
              <p className="text-white/50 text-sm mt-1">{exercise.description}</p>
            </div>
            {!completed.has(exercise.id) && (
              <button
                onClick={() => markComplete(exercise.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105 flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)" }}
              >
                <Check size={13} />
                Mark Done
              </button>
            )}
          </div>
        </div>

        {/* Starter code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white/70 text-xs font-semibold uppercase tracking-widest">
              🚀 Starter Code
            </h4>
            <div className="flex items-center gap-2">
              {!apiKey && (
                <span className="text-xs text-yellow-400">⚠️ Add API key above to auto-inject it</span>
              )}
              <button
                onClick={() => handleCopy(exercise.starterCode, `starter-${exercise.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {copied === `starter-${exercise.id}` ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                Copy
              </button>
            </div>
          </div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "#0d0d1f", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-white/30" />
                <span className="text-white/30 text-xs">{exercise.id}_starter.py</span>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-xs leading-relaxed code-editor text-white/80">
              <code>
                {apiKey
                  ? exercise.starterCode.replace(/YOUR_GROQ_API_KEY/g, `${apiKey.slice(0, 8)}…`)
                  : exercise.starterCode}
              </code>
            </pre>
          </div>
        </div>

        {/* Solution */}
        <div>
          <button
            onClick={() => toggleSolution(exercise.id)}
            className="flex items-center gap-2 text-xs font-semibold transition-all mb-2"
            style={showSolution[exercise.id] ? { color: "#EC4899" } : { color: "rgba(255,255,255,0.4)" }}
          >
            {showSolution[exercise.id] ? <EyeOff size={13} /> : <Eye size={13} />}
            {showSolution[exercise.id] ? "Hide Solution" : "Reveal Solution"}
            <ChevronRight
              size={12}
              className="transition-transform"
              style={{ transform: showSolution[exercise.id] ? "rotate(90deg)" : "none" }}
            />
          </button>

          {showSolution[exercise.id] && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "rgba(236,72,153,0.15)", color: "#EC4899" }}
                >
                  ✅ Solution
                </span>
                <button
                  onClick={() => handleCopy(exercise.solution, `solution-${exercise.id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {copied === `solution-${exercise.id}` ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  Copy
                </button>
              </div>
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: "#0d0d1f", border: "1px solid rgba(236,72,153,0.3)" }}
              >
                <pre className="p-4 overflow-x-auto text-xs leading-relaxed code-editor text-white/80">
                  <code>
                    {apiKey
                      ? exercise.solution.replace(/YOUR_GROQ_API_KEY/g, `${apiKey.slice(0, 8)}…`)
                      : exercise.solution}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
