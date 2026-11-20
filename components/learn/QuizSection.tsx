"use client";
import { useState } from "react";
import { quizQuestions } from "@/data/curriculum";
import { CheckCircle2, XCircle, Trophy, RefreshCw } from "lucide-react";

export default function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setFinished(false);
  };

  const pct = Math.round((score / quizQuestions.length) * 100);

  if (finished) {
    return (
      <div className="p-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
          style={{
            background: pct >= 80 ? "linear-gradient(135deg, #10B981, #06B6D4)" : pct >= 60 ? "linear-gradient(135deg, #F97316, #F59E0B)" : "linear-gradient(135deg, #EC4899, #F43F5E)",
          }}
        >
          <Trophy size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">
          {pct >= 80 ? "🎉 Excellent!" : pct >= 60 ? "👍 Good Work!" : "📚 Keep Learning!"}
        </h2>
        <div className="text-6xl font-black mb-2" style={{ color: pct >= 80 ? "#10B981" : pct >= 60 ? "#F97316" : "#EC4899" }}>
          {score}/{quizQuestions.length}
        </div>
        <div className="text-white/50 text-lg mb-8">{pct}% score</div>

        {/* Score breakdown */}
        <div className="w-full space-y-3 mb-8">
          {quizQuestions.map((q, i) => {
            const ans = answers[i];
            const isCorrect = ans === q.correct;
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{
                  background: isCorrect ? "rgba(16,185,129,0.08)" : "rgba(244,63,94,0.08)",
                  border: `1px solid ${isCorrect ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"}`,
                }}
              >
                {isCorrect ? (
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-white text-sm font-medium">{q.question}</div>
                  <div className="text-white/40 text-xs mt-1">{q.explanation}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-1">
          <span style={{ color: "#F59E0B" }}>Knowledge</span> Check
        </h2>
        <p className="text-white/50 text-sm">Test your understanding of GPT-5.6 and LangGraph</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-xs text-white/40">
          <span>Question {current + 1} of {quizQuestions.length}</span>
          <span className="font-bold" style={{ color: "#F59E0B" }}>{score} correct</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((current) / quizQuestions.length) * 100}%`,
              background: "linear-gradient(90deg, #7C3AED, #EC4899)",
            }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-all"
              style={{
                background:
                  i < current
                    ? answers[i] === quizQuestions[i].correct ? "#10B981" : "#F43F5E"
                    : i === current ? "#F59E0B" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div
        className="rounded-2xl p-6 mb-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
        >
          Q{current + 1}
        </div>
        <h3 className="text-white text-lg font-bold leading-relaxed">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt, idx) => {
          let borderColor = "rgba(255,255,255,0.08)";
          let bg = "rgba(255,255,255,0.03)";
          let textColor = "rgba(255,255,255,0.7)";

          if (selected !== null) {
            if (idx === question.correct) {
              borderColor = "#10B981";
              bg = "rgba(16,185,129,0.1)";
              textColor = "#10B981";
            } else if (idx === selected && idx !== question.correct) {
              borderColor = "#F43F5E";
              bg = "rgba(244,63,94,0.1)";
              textColor = "#F43F5E";
            }
          } else if (selected === null) {
            // Hover handled by button
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200"
              style={{
                background: bg,
                border: `1px solid ${borderColor}`,
                color: textColor,
                cursor: selected !== null ? "default" : "pointer",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: `${borderColor}33`, color: textColor }}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="font-medium text-sm">{opt}</span>
              {selected !== null && idx === question.correct && (
                <CheckCircle2 size={18} className="ml-auto text-green-400" />
              )}
              {selected === idx && idx !== question.correct && (
                <XCircle size={18} className="ml-auto text-red-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            background: selected === question.correct ? "rgba(16,185,129,0.08)" : "rgba(244,63,94,0.08)",
            border: `1px solid ${selected === question.correct ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"}`,
          }}
        >
          <div className="flex items-start gap-2">
            {selected === question.correct ? (
              <CheckCircle2 size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div
                className="font-bold text-sm mb-1"
                style={{ color: selected === question.correct ? "#10B981" : "#F43F5E" }}
              >
                {selected === question.correct ? "Correct! 🎉" : "Not quite"}
              </div>
              <div className="text-white/60 text-sm">{question.explanation}</div>
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
        >
          {current < quizQuestions.length - 1 ? "Next Question →" : "See Results 🏆"}
        </button>
      )}
    </div>
  );
}
