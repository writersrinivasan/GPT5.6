"use client";
import { useState } from "react";
import APIKeySetup from "./APIKeySetup";
import AgentChat from "./AgentChat";
import ExerciseLab from "./ExerciseLab";
import { MessageSquare, Code2 } from "lucide-react";

export default function SandboxPanel() {
  const [apiKey, setApiKey] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "exercises">("chat");

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          <span style={{ color: "#06B6D4" }}>🛠️ AI Sandbox</span>
        </h2>
        <p className="text-white/50 text-sm">
          Practice LangGraph patterns, chat with an AI assistant, and run hands-on exercises
        </p>
      </div>

      {/* API Key setup */}
      <APIKeySetup apiKey={apiKey} setApiKey={setApiKey} />

      {/* Sub tabs */}
      <div className="flex gap-2">
        {[
          { id: "chat", label: "AI Assistant", icon: MessageSquare, color: "#06B6D4" },
          { id: "exercises", label: "Hands-On Exercises", icon: Code2, color: "#7C3AED" },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "chat" | "exercises")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                activeTab === tab.id
                  ? { background: `${tab.color}22`, border: `1px solid ${tab.color}66`, color: "white" }
                  : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }
              }
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === "chat" ? (
        <AgentChat apiKey={apiKey} />
      ) : (
        <ExerciseLab apiKey={apiKey} />
      )}
    </div>
  );
}
