"use client";
import { useState } from "react";
import { langGraphConcepts } from "@/data/curriculum";
import CodeBlock from "@/components/shared/CodeBlock";

const graphNodes = [
  { id: "start", label: "__start__", x: 50, y: 20, color: "#10B981", shape: "circle" },
  { id: "classifier", label: "Classifier", x: 50, y: 100, color: "#7C3AED", shape: "rect" },
  { id: "tools", label: "Tool Executor", x: 20, y: 190, color: "#06B6D4", shape: "rect" },
  { id: "llm", label: "LLM Node", x: 80, y: 190, color: "#EC4899", shape: "rect" },
  { id: "formatter", label: "Formatter", x: 50, y: 280, color: "#F97316", shape: "rect" },
  { id: "end", label: "__end__", x: 50, y: 360, color: "#F59E0B", shape: "circle" },
];

const graphEdges = [
  { from: "start", to: "classifier", label: "" },
  { from: "classifier", to: "tools", label: "needs tools" },
  { from: "classifier", to: "llm", label: "direct" },
  { from: "tools", to: "llm", label: "results" },
  { from: "llm", to: "formatter", label: "" },
  { from: "formatter", to: "end", label: "" },
  { from: "llm", to: "classifier", label: "retry", dashed: true },
];

export default function LangGraphSection() {
  const [activeConceptId, setActiveConceptId] = useState("state");
  const activeConcept = langGraphConcepts.find((c) => c.id === activeConceptId)!;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          <span style={{ color: "#06B6D4" }}>LangGraph</span> Essentials
        </h2>
        <p className="text-white/50 text-sm">
          Low-level orchestration framework for stateful, long-running agents · Stable 1.0 since Oct 2025
        </p>
      </div>

      {/* Why LangGraph */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { emoji: "🔁", title: "Cycles", desc: "Unlike chains, graphs can loop back" },
          { emoji: "💾", title: "Durable", desc: "Persist through failures, resume from checkpoints" },
          { emoji: "🧵", title: "Multi-threaded", desc: "Concurrent agent execution" },
          { emoji: "👤", title: "Human-in-loop", desc: "Pause and wait for human approval" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl p-4 text-center"
            style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-white font-bold text-sm">{item.title}</div>
            <div className="text-white/40 text-xs mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Graph Visualization + Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Graph */}
        <div>
          <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
            LangGraph Workflow Visualization
          </h3>
          <div
            className="rounded-2xl p-4 relative"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", minHeight: 420 }}
          >
            <svg width="100%" height="400" viewBox="0 0 200 400">
              {/* Edges */}
              {graphEdges.map((edge, i) => {
                const from = graphNodes.find((n) => n.id === edge.from)!;
                const to = graphNodes.find((n) => n.id === edge.to)!;
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                return (
                  <g key={i}>
                    <line
                      x1={from.x} y1={from.y + 12}
                      x2={to.x} y2={to.y - 12}
                      stroke={edge.dashed ? "#F97316" : "rgba(255,255,255,0.15)"}
                      strokeWidth={edge.dashed ? "1" : "1.5"}
                      strokeDasharray={edge.dashed ? "4,3" : "none"}
                      markerEnd="url(#arrowhead)"
                    />
                    {edge.label && (
                      <text x={mx + 4} y={my} fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.3)" />
                </marker>
              </defs>
              {/* Nodes */}
              {graphNodes.map((node) => (
                <g key={node.id}>
                  {node.shape === "circle" ? (
                    <circle cx={node.x} cy={node.y} r={12} fill={`${node.color}33`} stroke={node.color} strokeWidth="1.5" />
                  ) : (
                    <rect x={node.x - 24} y={node.y - 12} width={48} height={24} rx={6}
                      fill={`${node.color}22`} stroke={node.color} strokeWidth="1.5" />
                  )}
                  <text x={node.x} y={node.y + 1} fill="white" fontSize="6.5" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <div className="text-center text-white/30 text-xs mt-2">Interactive LangGraph agent graph</div>
          </div>
        </div>

        {/* Concept selector */}
        <div>
          <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
            Core Primitives
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {langGraphConcepts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConceptId(c.id)}
                className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                style={
                  activeConceptId === c.id
                    ? { background: `${c.color}22`, border: `1px solid ${c.color}66` }
                    : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
                }
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-white font-semibold text-sm">{c.title}</span>
              </button>
            ))}
          </div>

          {/* Active concept detail */}
          <div
            className="rounded-xl p-4"
            style={{ background: `${activeConcept.color}11`, border: `1px solid ${activeConcept.color}33` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{activeConcept.icon}</span>
              <h4 className="text-white font-bold">{activeConcept.title}</h4>
            </div>
            <p className="text-white/60 text-xs mb-3">{activeConcept.description}</p>
          </div>
        </div>
      </div>

      {/* Code for active concept */}
      <div>
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
          {activeConcept.title} — Code Example
        </h3>
        <CodeBlock code={activeConcept.code} language="python" title={`${activeConcept.title.toLowerCase()}.py`} />
      </div>

      {/* Full minimal agent example */}
      <div>
        <h3 className="text-white font-bold mb-3">Complete Minimal Agent</h3>
        <CodeBlock
          code={`from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from typing import TypedDict

# 1. State definition
class AgentState(TypedDict):
    messages: list
    iterations: int

# 2. LLM
llm = ChatGroq(api_key="YOUR_GROQ_KEY", model="llama-3.1-70b-versatile")

# 3. Nodes
def agent_node(state: AgentState):
    response = llm.invoke(state["messages"])
    return {
        "messages": state["messages"] + [response],
        "iterations": state["iterations"] + 1
    }

def should_stop(state: AgentState) -> str:
    if state["iterations"] >= 3:
        return "stop"
    last = state["messages"][-1].content
    if "FINAL ANSWER:" in last:
        return "stop"
    return "continue"

# 4. Build graph
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_stop, {
    "continue": "agent",   # loop back
    "stop": END
})

# 5. Compile + run (with persistence)
from langgraph.checkpoint.memory import MemorySaver
app = graph.compile(checkpointer=MemorySaver())

result = app.invoke(
    {"messages": [HumanMessage(content="What are the 3 key benefits of LangGraph?")], "iterations": 0},
    config={"configurable": {"thread_id": "hexaware-demo-001"}}
)
print(result["messages"][-1].content)`}
          language="python"
          title="minimal_agent.py"
        />
      </div>
    </div>
  );
}
