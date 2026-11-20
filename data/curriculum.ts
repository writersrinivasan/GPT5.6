export const curriculum = [
  {
    id: "intro",
    time: "0:00",
    duration: "10 min",
    title: "Welcome & GPT-5.6 Overview",
    emoji: "🚀",
    color: "from-violet-600 to-purple-700",
    accent: "#7C3AED",
    topics: [
      "GPT-5.6 Family: Sol, Terra, Luna",
      "What's new vs GPT-4o",
      "Hexaware use-case landscape",
      "Session roadmap",
    ],
    description:
      "Kick-off with a visual tour of the GPT-5.6 model family and what frontier intelligence means for enterprise.",
  },
  {
    id: "architecture",
    time: "0:10",
    duration: "12 min",
    title: "GPT-5.6 Architecture Deep-Dive",
    emoji: "🧠",
    color: "from-pink-600 to-rose-700",
    accent: "#EC4899",
    topics: [
      "Sol vs Terra vs Luna tiers",
      "Ultra multi-agent orchestration",
      "Programmatic Tool Calling",
      "Extended context & caching",
    ],
    description:
      "Understand the three-tier architecture and how sub-agent coordination works natively inside GPT-5.6 Sol.",
  },
  {
    id: "langgraph",
    time: "0:22",
    duration: "15 min",
    title: "LangGraph Essentials",
    emoji: "🕸️",
    color: "from-cyan-600 to-teal-700",
    accent: "#06B6D4",
    topics: [
      "StateGraph, Nodes & Edges",
      "Conditional branching",
      "Persistent state & memory",
      "Human-in-the-loop patterns",
    ],
    description:
      "Build your first stateful agent graph — from a single-node LLM call to a multi-step workflow with memory.",
  },
  {
    id: "patterns",
    time: "0:37",
    duration: "10 min",
    title: "Agentic Design Patterns",
    emoji: "🔁",
    color: "from-orange-600 to-amber-600",
    accent: "#F97316",
    topics: [
      "ReAct pattern",
      "Plan-and-Execute",
      "Multi-agent supervision",
      "Tool-use & function calling",
    ],
    description:
      "Compare the leading patterns for building reliable, production-grade AI agents on GPT-5.6 + LangGraph.",
  },
  {
    id: "enterprise",
    time: "0:47",
    duration: "10 min",
    title: "Enterprise Use-Cases at Hexaware",
    emoji: "🏢",
    color: "from-emerald-600 to-green-700",
    accent: "#10B981",
    topics: [
      "Intelligent ITSM automation",
      "Code review agents",
      "RAG-based knowledge bases",
      "Finance & compliance agents",
    ],
    description:
      "Real Hexaware scenarios mapped to LangGraph workflows — from ticket routing to autonomous code review.",
  },
  {
    id: "sandbox",
    time: "0:57",
    duration: "3 min",
    title: "Hands-On & Next Steps",
    emoji: "🛠️",
    color: "from-indigo-600 to-blue-700",
    accent: "#6366F1",
    topics: [
      "Live sandbox walkthrough",
      "Groq BYOK setup",
      "What's coming with Codex CLI",
      "Resources & community",
    ],
    description:
      "Wrap up with the live sandbox, your BYOK key, and a preview of OpenAI Codex CLI as the next layer.",
  },
];

export const gpt56Models = [
  {
    name: "Sol",
    tier: "Flagship",
    emoji: "☀️",
    color: "from-yellow-500 to-orange-500",
    badge: "Best Performance",
    badgeColor: "bg-orange-500",
    features: [
      "Max reasoning & coding",
      "Ultra multi-agent mode",
      "Cybersecurity & bio science",
      "Best output per dollar",
    ],
    useCase: "Complex enterprise workflows, autonomous agents",
  },
  {
    name: "Terra",
    tier: "Balanced",
    emoji: "🌍",
    color: "from-emerald-500 to-teal-500",
    badge: "Best Balance",
    badgeColor: "bg-emerald-500",
    features: [
      "Daily enterprise tasks",
      "Balanced cost & capability",
      "Strong reasoning",
      "API production ready",
    ],
    useCase: "Everyday API calls, structured workflows",
  },
  {
    name: "Luna",
    tier: "Efficient",
    emoji: "🌙",
    color: "from-violet-500 to-purple-500",
    badge: "Most Affordable",
    badgeColor: "bg-violet-500",
    features: [
      "Fastest responses",
      "80% cost reduction",
      "High-volume tasks",
      "Real-time applications",
    ],
    useCase: "High-volume chat, classification, extraction",
  },
];

export const langGraphConcepts = [
  {
    id: "state",
    icon: "📦",
    title: "State",
    color: "#7C3AED",
    description:
      "Shared typed object that flows through every node. Nodes read and write to it; LangGraph merges updates automatically.",
    code: `from langgraph.graph import StateGraph
from typing import TypedDict

class AgentState(TypedDict):
    messages: list
    task: str
    result: str

graph = StateGraph(AgentState)`,
  },
  {
    id: "nodes",
    icon: "⬡",
    title: "Nodes",
    color: "#EC4899",
    description:
      "Python functions or Runnable objects. Each node receives the current state, does work (call LLM, run tool), and returns a state patch.",
    code: `def research_node(state: AgentState):
    llm = ChatGroq(model="llama-3.1-70b")
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

graph.add_node("researcher", research_node)`,
  },
  {
    id: "edges",
    icon: "→",
    title: "Edges",
    color: "#06B6D4",
    description:
      "Connect nodes. Static edges always go to the next node; conditional edges inspect state to choose the branch.",
    code: `def route(state: AgentState) -> str:
    last = state["messages"][-1]
    if "DONE" in last.content:
        return "end"
    return "researcher"

graph.add_conditional_edges(
    "researcher", route,
    {"researcher": "researcher", "end": END}
)`,
  },
  {
    id: "memory",
    icon: "🧠",
    title: "Persistence",
    color: "#F97316",
    description:
      "Built-in checkpointing stores every state snapshot. Agents survive failures, support time-travel debugging, and enable human-in-the-loop.",
    code: `from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# Resume from any checkpoint
config = {"configurable": {"thread_id": "hex-001"}}
app.invoke({"task": "audit code"}, config)`,
  },
];

export const useCases = [
  {
    id: "itsm",
    title: "Intelligent ITSM Agent",
    industry: "IT Operations",
    icon: "🎫",
    color: "from-purple-600 to-indigo-600",
    accent: "#7C3AED",
    description:
      "Automatically triage, classify and resolve IT service tickets using a LangGraph ReAct agent backed by GPT-5.6.",
    nodes: ["Ticket Ingestion", "Intent Classifier", "Policy Lookup", "Auto-Resolver", "Escalation"],
    tags: ["LangGraph", "GPT-5.6 Terra", "Tool Use", "ReAct"],
    prompt:
      "Build a LangGraph agent that classifies IT tickets, checks the knowledge base and either auto-resolves or escalates to L2.",
  },
  {
    id: "codereview",
    title: "Autonomous Code Review",
    industry: "Engineering",
    icon: "👨‍💻",
    color: "from-cyan-600 to-blue-600",
    accent: "#06B6D4",
    description:
      "Multi-step code review agent that checks security, performance, style, and writes a structured PR report.",
    nodes: ["PR Fetch", "Security Scan", "Perf Analysis", "Style Check", "Report Writer"],
    tags: ["LangGraph", "GPT-5.6 Sol", "Multi-Step", "Tools"],
    prompt:
      "Create a LangGraph workflow that reviews a code diff for security vulnerabilities, performance issues, and coding standards.",
  },
  {
    id: "rag",
    title: "Enterprise RAG Knowledge Base",
    industry: "Knowledge Management",
    icon: "📚",
    color: "from-emerald-600 to-green-600",
    accent: "#10B981",
    description:
      "Retrieval-augmented generation agent with multi-hop reasoning over Hexaware's internal document corpus.",
    nodes: ["Query Parser", "Retriever", "Re-ranker", "Synthesizer", "Citation Builder"],
    tags: ["LangGraph", "RAG", "GPT-5.6", "Embeddings"],
    prompt:
      "Build a multi-hop RAG agent that retrieves from internal docs, re-ranks results and generates a cited answer.",
  },
  {
    id: "finance",
    title: "Finance & Compliance Agent",
    industry: "Finance",
    icon: "💹",
    color: "from-orange-600 to-amber-600",
    accent: "#F97316",
    description:
      "Automated financial data extraction, anomaly detection and compliance checking for audit workflows.",
    nodes: ["Data Extractor", "Anomaly Detector", "Regulation Checker", "Risk Scorer", "Report Gen"],
    tags: ["LangGraph", "GPT-5.6 Sol", "Plan & Execute", "Compliance"],
    prompt:
      "Design a LangGraph agent that processes financial transactions, detects anomalies and checks IFRS compliance rules.",
  },
  {
    id: "hr",
    title: "HR Onboarding Orchestrator",
    industry: "Human Resources",
    icon: "🤝",
    color: "from-pink-600 to-rose-600",
    accent: "#EC4899",
    description:
      "End-to-end onboarding agent that provisions accounts, schedules training and answers new-hire questions.",
    nodes: ["Profile Setup", "Account Provisioner", "Training Scheduler", "FAQ Bot", "Feedback Collector"],
    tags: ["LangGraph", "Multi-Agent", "GPT-5.6 Terra", "Human-in-loop"],
    prompt:
      "Create a multi-agent onboarding system that handles account provisioning, training scheduling and new-hire Q&A.",
  },
  {
    id: "testing",
    title: "AI Test Generation Agent",
    industry: "QA / Testing",
    icon: "🧪",
    color: "from-violet-600 to-purple-600",
    accent: "#7C3AED",
    description:
      "Generates comprehensive unit tests, integration tests and test data from code changes automatically.",
    nodes: ["Code Analyzer", "Test Strategist", "Unit Test Writer", "Edge Case Gen", "Coverage Checker"],
    tags: ["LangGraph", "GPT-5.6 Sol", "Code Gen", "Tools"],
    prompt:
      "Build a LangGraph agent that analyzes a function signature and generates unit tests with edge cases and mocks.",
  },
];

export const exercises = [
  {
    id: "ex1",
    title: "Hello LangGraph",
    level: "Beginner",
    levelColor: "bg-green-500",
    emoji: "👋",
    duration: "5 min",
    description: "Build your first single-node LangGraph agent that chats with Groq.",
    starterCode: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from typing import TypedDict

# Step 1: Define state
class State(TypedDict):
    messages: list[str]

# Step 2: Create LLM
llm = ChatGroq(
    api_key="YOUR_GROQ_API_KEY",
    model="llama-3.1-70b-versatile"
)

# Step 3: Define node
def chat_node(state: State):
    # TODO: Call the LLM with state["messages"]
    # Return updated messages
    pass

# Step 4: Build graph
graph = StateGraph(State)
graph.add_node("chat", chat_node)
graph.set_entry_point("chat")
graph.add_edge("chat", END)

app = graph.compile()

# Step 5: Run it
result = app.invoke({"messages": ["What is GPT-5.6?"]})
print(result)`,
    solution: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage
from typing import TypedDict

class State(TypedDict):
    messages: list

llm = ChatGroq(
    api_key="YOUR_GROQ_API_KEY",
    model="llama-3.1-70b-versatile"
)

def chat_node(state: State):
    response = llm.invoke(state["messages"])
    return {"messages": state["messages"] + [response]}

graph = StateGraph(State)
graph.add_node("chat", chat_node)
graph.set_entry_point("chat")
graph.add_edge("chat", END)

app = graph.compile()
result = app.invoke({
    "messages": [HumanMessage(content="What is GPT-5.6?")]
})
print(result["messages"][-1].content)`,
  },
  {
    id: "ex2",
    title: "ReAct Agent with Tools",
    level: "Intermediate",
    levelColor: "bg-yellow-500",
    emoji: "🔧",
    duration: "10 min",
    description: "Build a ReAct agent that uses tools to search and calculate.",
    starterCode: `from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from langchain_core.tools import tool

llm = ChatGroq(
    api_key="YOUR_GROQ_API_KEY",
    model="llama-3.1-70b-versatile"
)

# TODO: Define a @tool for web search simulation
# TODO: Define a @tool for calculation

# TODO: Create the ReAct agent using create_react_agent
# TODO: Run it with a question that requires both tools

tools = []  # Add your tools here
agent = create_react_agent(llm, tools)

result = agent.invoke({
    "messages": [("user", "What is 15% of 2847? Also what year was LangGraph released?")]
})`,
    solution: `from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from langchain_core.tools import tool

llm = ChatGroq(
    api_key="YOUR_GROQ_API_KEY",
    model="llama-3.1-70b-versatile"
)

@tool
def calculate(expression: str) -> str:
    """Evaluate a math expression safely."""
    try:
        result = eval(expression, {"__builtins__": {}})
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool
def search_knowledge(query: str) -> str:
    """Search a knowledge base for factual info."""
    facts = {
        "langgraph": "LangGraph was first released in early 2024 and hit stable 1.0 in October 2025.",
        "gpt-5.6": "GPT-5.6 was released on July 9, 2026 as a family of Sol, Terra and Luna models.",
        "groq": "Groq provides ultra-fast LLM inference using its custom LPU hardware.",
    }
    for k, v in facts.items():
        if k in query.lower():
            return v
    return "No specific result found."

tools = [calculate, search_knowledge]
agent = create_react_agent(llm, tools)

result = agent.invoke({
    "messages": [("user", "What is 15% of 2847? Also what year was LangGraph released?")]
})
for msg in result["messages"]:
    print(f"{msg.__class__.__name__}: {msg.content[:200]}")`,
  },
  {
    id: "ex3",
    title: "Multi-Step ITSM Agent",
    level: "Advanced",
    levelColor: "bg-orange-500",
    emoji: "🎫",
    duration: "15 min",
    description: "Build a full ITSM ticket routing agent with conditional branching.",
    starterCode: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, Literal

class TicketState(TypedDict):
    ticket: str
    category: str
    priority: str
    resolution: str
    escalate: bool

llm = ChatGroq(api_key="YOUR_GROQ_API_KEY", model="llama-3.1-70b-versatile")

# TODO: implement classify_node — sets category and priority
# TODO: implement resolve_node — tries auto-resolution
# TODO: implement escalate_node — formats escalation message
# TODO: implement route_after_classify — returns "resolve" or "escalate"

def classify_node(state: TicketState):
    pass

def resolve_node(state: TicketState):
    pass

def escalate_node(state: TicketState):
    pass

def route_after_classify(state: TicketState) -> Literal["resolve", "escalate"]:
    pass

graph = StateGraph(TicketState)
# TODO: add nodes and edges
app = graph.compile()`,
    solution: `from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from typing import TypedDict, Literal

class TicketState(TypedDict):
    ticket: str
    category: str
    priority: str
    resolution: str
    escalate: bool

llm = ChatGroq(api_key="YOUR_GROQ_API_KEY", model="llama-3.1-70b-versatile")

def classify_node(state: TicketState):
    response = llm.invoke([
        SystemMessage(content="Classify this IT ticket. Reply with JSON: {category, priority (P1/P2/P3), escalate (true/false)}"),
        HumanMessage(content=state["ticket"])
    ])
    import json, re
    match = re.search(r'\\{.*\\}', response.content, re.DOTALL)
    data = json.loads(match.group()) if match else {}
    return {
        "category": data.get("category", "General"),
        "priority": data.get("priority", "P3"),
        "escalate": data.get("escalate", False)
    }

def resolve_node(state: TicketState):
    response = llm.invoke([
        SystemMessage(content="You are an ITSM agent. Provide a clear resolution for this ticket."),
        HumanMessage(content=f"Category: {state['category']}\\nTicket: {state['ticket']}")
    ])
    return {"resolution": f"✅ AUTO-RESOLVED: {response.content[:300]}"}

def escalate_node(state: TicketState):
    return {"resolution": f"🚨 ESCALATED to L2 ({state['priority']}): {state['ticket'][:100]}"}

def route_after_classify(state: TicketState) -> Literal["resolve", "escalate"]:
    return "escalate" if state.get("escalate") or state.get("priority") == "P1" else "resolve"

graph = StateGraph(TicketState)
graph.add_node("classify", classify_node)
graph.add_node("resolve", resolve_node)
graph.add_node("escalate", escalate_node)
graph.set_entry_point("classify")
graph.add_conditional_edges("classify", route_after_classify)
graph.add_edge("resolve", END)
graph.add_edge("escalate", END)

app = graph.compile()

result = app.invoke({"ticket": "Production database is down, all users affected!"})
print(result["resolution"])`,
  },
];

export const quizQuestions = [
  {
    id: 1,
    question: "Which GPT-5.6 model tier is best for high-volume, cost-sensitive tasks?",
    options: ["Sol", "Terra", "Luna", "Ultra"],
    correct: 2,
    explanation: "Luna is GPT-5.6's most affordable tier, with an 80% price reduction, designed for high-volume real-time applications.",
  },
  {
    id: 2,
    question: "In LangGraph, what flows between nodes?",
    options: ["Messages only", "The entire State object", "Tool results", "Prompt templates"],
    correct: 1,
    explanation: "LangGraph nodes receive the full shared State object, make updates, and return a patch — LangGraph merges it automatically.",
  },
  {
    id: 3,
    question: "Which LangGraph feature lets an agent survive a server failure and resume exactly where it left off?",
    options: ["Conditional Edges", "Memory Saver / Checkpointing", "ReAct loop", "Tool Calling"],
    correct: 1,
    explanation: "LangGraph's built-in checkpointing (MemorySaver, SqliteSaver, etc.) persists every state snapshot for durable execution.",
  },
  {
    id: 4,
    question: "GPT-5.6 Sol 'Ultra' mode coordinates multiple agents in what pattern?",
    options: ["Sequential chains", "Parallel subagent workflows", "Single-thread reasoning", "Consensus voting"],
    correct: 1,
    explanation: "GPT-5.6 Sol Ultra is OpenAI's high-capacity configuration that runs multiple sub-agents in parallel workflows to complete complex tasks faster.",
  },
  {
    id: 5,
    question: "What does BYOK stand for in the context of this workshop?",
    options: ["Bring Your Own Kernel", "Build Your Own Knowledge", "Bring Your Own Key", "Byte Your Own Knowledge"],
    correct: 2,
    explanation: "BYOK = Bring Your Own Key. You supply your own Groq API key, keeping it client-side and avoiding shared credentials.",
  },
];
