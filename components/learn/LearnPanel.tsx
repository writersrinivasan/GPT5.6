"use client";
import { useState } from "react";
import AgendaSection from "./AgendaSection";
import GPT56Section from "./GPT56Section";
import LangGraphSection from "./LangGraphSection";
import PatternsSection from "./PatternsSection";
import UseCasesSection from "./UseCasesSection";
import QuizSection from "./QuizSection";
import { BookOpen, Cpu, GitBranch, Lightbulb, Building2, Trophy } from "lucide-react";

const sections = [
  { id: "agenda", label: "Agenda", icon: BookOpen, color: "#7C3AED" },
  { id: "gpt56", label: "GPT-5.6", icon: Cpu, color: "#EC4899" },
  { id: "langgraph", label: "LangGraph", icon: GitBranch, color: "#06B6D4" },
  { id: "patterns", label: "Patterns", icon: Lightbulb, color: "#F97316" },
  { id: "usecases", label: "Use Cases", icon: Building2, color: "#10B981" },
  { id: "quiz", label: "Quiz", icon: Trophy, color: "#F59E0B" },
];

export default function LearnPanel() {
  const [activeSection, setActiveSection] = useState("agenda");

  return (
    <div className="flex h-[calc(100vh-105px)]">
      {/* Sidebar nav */}
      <aside
        className="w-16 md:w-56 flex-shrink-0 flex flex-col py-4 gap-1 px-2 overflow-y-auto"
        style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group ${
                isActive ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
              style={
                isActive
                  ? { background: `${s.color}22`, border: `1px solid ${s.color}44` }
                  : { border: "1px solid transparent" }
              }
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={isActive ? { background: `${s.color}33`, color: s.color } : { color: "rgba(255,255,255,0.3)" }}
              >
                <Icon size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium">{s.label}</span>
              {isActive && (
                <div
                  className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: s.color }}
                />
              )}
            </button>
          );
        })}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === "agenda" && <AgendaSection />}
        {activeSection === "gpt56" && <GPT56Section />}
        {activeSection === "langgraph" && <LangGraphSection />}
        {activeSection === "patterns" && <PatternsSection />}
        {activeSection === "usecases" && <UseCasesSection />}
        {activeSection === "quiz" && <QuizSection />}
      </main>
    </div>
  );
}
