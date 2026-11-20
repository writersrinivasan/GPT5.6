"use client";
import { useState } from "react";
import CodeBlock from "@/components/shared/CodeBlock";

const patterns = [
  {
    id: "react",
    name: "ReAct",
    fullName: "Reason + Act",
    emoji: "🔁",
    color: "#7C3AED",
    description:
      "The agent alternates between Reasoning (thinking about what to do) and Acting (calling a tool). It loops until it has a final answer. Best for open-ended tasks with multiple tools.",
    steps: ["User query", "Think (LLM)", "Act (Tool)", "Observe result", "Think again", "Final answer"],
    pros: ["Simple to implement", "Handles unknown steps", "Works with any LLM"],
    cons: ["Can loop indefinitely", "Harder to debug", "Less predictable"],
    code: `from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from langchain_core.tools import tool

@tool
def search(query: str) -> str:
    """Search a knowledge base."""
    # Your search logic here
    return f"Results for: {query}"

@tool
def calculate(expr: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expr, {"__builtins__": {}}))

llm = ChatGroq(api_key="YOUR_GROQ_KEY", model="llama-3.1-70b-versatile")
agent = create_react_agent(llm, [search, calculate])

result = agent.invoke({
    "messages": [("user", "What is 15% of the number of employees at Hexaware?")]
})`,
    hexUsage: "ITSM ticket resolution, HR queries, financial calculations",
  },
  {
    id: "plan",
    name: "Plan & Execute",
    fullName: "Plan then Execute",
    emoji: "📋",
    color: "#EC4899",
    description:
      "A planner LLM creates a full task list upfront. An executor LLM runs each step. Cleaner separation of concerns — better for predictable, structured workflows.",
    steps: ["User goal", "Planner → task list", "Execute task 1", "Execute task 2", "Execute task N", "Synthesize"],
    pros: ["Predictable flow", "Easy to debug", "Parallelizable tasks"],
    cons: ["Rigid — can't adapt mid-task", "Requires good planner", "More LLM calls"],
    code: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class PlanState(TypedDict):
    goal: str
    plan: list[str]
    results: list[str]
    step: int

def planner(state: PlanState):
    # Planner LLM creates step list
    plan = ["Step 1: Gather requirements",
            "Step 2: Analyze data",
            "Step 3: Generate report"]
    return {"plan": plan, "step": 0}

def executor(state: PlanState):
    current_task = state["plan"][state["step"]]
    # Execute each task with LLM
    result = f"Completed: {current_task}"
    return {
        "results": state["results"] + [result],
        "step": state["step"] + 1
    }

def should_continue(state: PlanState) -> str:
    return "execute" if state["step"] < len(state["plan"]) else "done"

graph = StateGraph(PlanState)
graph.add_node("plan", planner)
graph.add_node("execute", executor)
graph.set_entry_point("plan")
graph.add_edge("plan", "execute")
graph.add_conditional_edges("execute", should_continue)
graph.add_edge("done", END)`,
    hexUsage: "Code review, compliance audits, multi-step reports",
  },
  {
    id: "multiagent",
    name: "Multi-Agent",
    fullName: "Supervisor + Workers",
    emoji: "🤝",
    color: "#06B6D4",
    description:
      "A supervisor agent decomposes the task and routes sub-tasks to specialist agents. Each specialist handles a narrow domain. Best for complex tasks requiring diverse expertise.",
    steps: ["User task", "Supervisor routes", "Agent A", "Agent B", "Agent C", "Supervisor aggregates"],
    pros: ["Specialization", "Scalable", "Parallel execution"],
    cons: ["Higher latency", "More complex state", "Coordination overhead"],
    code: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq

llm = ChatGroq(api_key="YOUR_GROQ_KEY", model="llama-3.1-70b-versatile")

AGENTS = ["security_agent", "performance_agent", "style_agent"]

def supervisor(state):
    # Supervisor decides which agent handles next
    if not state.get("security_done"):
        return {"next": "security_agent"}
    if not state.get("perf_done"):
        return {"next": "performance_agent"}
    if not state.get("style_done"):
        return {"next": "style_agent"}
    return {"next": "FINISH"}

def security_agent(state):
    result = llm.invoke(f"Security review: {state['code']}")
    return {"security_report": result.content, "security_done": True}

def performance_agent(state):
    result = llm.invoke(f"Performance review: {state['code']}")
    return {"perf_report": result.content, "perf_done": True}

# Build supervisor graph
graph = StateGraph(dict)
graph.add_node("supervisor", supervisor)
for agent in AGENTS:
    graph.add_node(agent, eval(agent))

graph.set_entry_point("supervisor")`,
    hexUsage: "Full code review, HR onboarding, enterprise RAG",
  },
  {
    id: "hitl",
    name: "Human-in-Loop",
    fullName: "Pause + Approve",
    emoji: "👤",
    color: "#10B981",
    description:
      "The agent pauses at defined checkpoints and waits for a human to review, approve, or redirect. Critical for high-stakes actions like deployments, financial operations, or compliance decisions.",
    steps: ["Start task", "Autonomous steps", "⏸ Wait for approval", "Human reviews", "Resume or redirect"],
    pros: ["Safe for high-stakes", "Builds trust", "Auditability"],
    cons: ["Slower", "Human availability required", "Coordination complexity"],
    code: `from langgraph.graph import StateGraph, END, interrupt
from langgraph.checkpoint.memory import MemorySaver

def risky_action(state):
    # Interrupt = pause and wait for human
    action_summary = f"About to delete {state['file_count']} files"
    human_approval = interrupt({"message": action_summary})
    
    if human_approval.get("approved"):
        return {"action": "Files deleted successfully"}
    else:
        return {"action": "Cancelled by user"}

graph = StateGraph(dict)
graph.add_node("risky_action", risky_action)
graph.set_entry_point("risky_action")
graph.add_edge("risky_action", END)

checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer, interrupt_before=["risky_action"])

# Run until interrupt
config = {"configurable": {"thread_id": "approval-001"}}
app.invoke({"file_count": 42}, config)

# Human reviews state, then resumes:
app.invoke({"approved": True}, config)`,
    hexUsage: "Financial approvals, infrastructure changes, compliance sign-off",
  },
];

export default function PatternsSection() {
  const [activePattern, setActivePattern] = useState("react");
  const pattern = patterns.find((p) => p.id === activePattern)!;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          <span style={{ color: "#F97316" }}>Agentic</span> Design Patterns
        </h2>
        <p className="text-white/50 text-sm">
          Four proven patterns for building reliable production agents with LangGraph
        </p>
      </div>

      {/* Pattern selector tabs */}
      <div className="flex gap-2 flex-wrap">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePattern(p.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={
              activePattern === p.id
                ? { background: `${p.color}33`, border: `1px solid ${p.color}`, color: "white" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }
            }
          >
            <span>{p.emoji}</span>
            {p.name}
          </button>
        ))}
      </div>

      {/* Pattern detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-white mb-1">
              <span style={{ color: pattern.color }}>{pattern.emoji} {pattern.name}</span>
            </h3>
            <p className="text-white/40 text-sm italic mb-3">{pattern.fullName}</p>
            <p className="text-white/70 text-sm leading-relaxed">{pattern.description}</p>
          </div>

          {/* Flow */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Flow</h4>
            <div className="flex flex-wrap gap-1 items-center">
              {pattern.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="text-xs px-2.5 py-1.5 rounded-lg font-medium"
                    style={{ background: `${pattern.color}22`, color: pattern.color, border: `1px solid ${pattern.color}44` }}
                  >
                    {step}
                  </div>
                  {i < pattern.steps.length - 1 && (
                    <span style={{ color: pattern.color }} className="opacity-50">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-green-400 text-xs font-semibold mb-2">✅ Strengths</h4>
              {pattern.pros.map((p) => (
                <div key={p} className="text-white/60 text-xs mb-1 flex items-start gap-1">
                  <span style={{ color: "#10B981" }}>+</span> {p}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-red-400 text-xs font-semibold mb-2">⚠️ Tradeoffs</h4>
              {pattern.cons.map((c) => (
                <div key={c} className="text-white/60 text-xs mb-1 flex items-start gap-1">
                  <span style={{ color: "#F97316" }}>−</span> {c}
                </div>
              ))}
            </div>
          </div>

          {/* Hexaware usage */}
          <div
            className="p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="text-white/40 text-xs mb-1">🏢 Hexaware Use Cases</div>
            <div className="text-white/70 text-sm">{pattern.hexUsage}</div>
          </div>
        </div>

        {/* Code */}
        <div>
          <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Code Template</h4>
          <CodeBlock code={pattern.code} language="python" title={`${pattern.id}_pattern.py`} />
        </div>
      </div>

      {/* Comparison matrix */}
      <div>
        <h3 className="text-white font-bold mb-4">Pattern Comparison</h3>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                <th className="text-left p-3 text-white/50 text-xs font-semibold">Pattern</th>
                <th className="text-center p-3 text-white/50 text-xs font-semibold">Complexity</th>
                <th className="text-center p-3 text-white/50 text-xs font-semibold">Predictability</th>
                <th className="text-center p-3 text-white/50 text-xs font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "ReAct 🔁", complexity: "Low", pred: "Medium", best: "Open-ended tasks", color: "#7C3AED" },
                { name: "Plan & Execute 📋", complexity: "Medium", pred: "High", best: "Structured reports", color: "#EC4899" },
                { name: "Multi-Agent 🤝", complexity: "High", pred: "High", best: "Expert delegation", color: "#06B6D4" },
                { name: "Human-in-Loop 👤", complexity: "Medium", pred: "Very High", best: "High-stakes actions", color: "#10B981" },
              ].map((row) => (
                <tr key={row.name} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <td className="p-3 font-semibold text-white">{row.name}</td>
                  <td className="p-3 text-center text-white/60">{row.complexity}</td>
                  <td className="p-3 text-center text-white/60">{row.pred}</td>
                  <td className="p-3 text-center text-white/60">{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
