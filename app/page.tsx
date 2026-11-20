"use client";
import { useState } from "react";
import Header from "@/components/shared/Header";
import LearnPanel from "@/components/learn/LearnPanel";
import SandboxPanel from "@/components/sandbox/SandboxPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"learn" | "sandbox">("learn");

  return (
    <div className="min-h-screen" style={{ background: "#0a0a1a" }}>
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 blur-[120px]"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)" }}
        />
      </div>

      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10">
        {activeTab === "learn" ? <LearnPanel /> : <SandboxPanel />}
      </main>
    </div>
  );
}
