import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { message, apiKey, useCase, history = [] } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "GROQ API key is required" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Build system prompt based on use case
    const systemPrompts: Record<string, string> = {
      general: `You are an expert AI assistant specializing in GPT-5.6 and LangGraph for Hexaware's enterprise training session.
You have deep knowledge of:
- GPT-5.6 family (Sol, Terra, Luna) capabilities and pricing
- LangGraph architecture (StateGraph, nodes, edges, checkpointing)
- Agentic AI design patterns (ReAct, Plan-and-Execute, Multi-agent)
- Enterprise use cases: ITSM, code review, RAG, finance, HR
Be concise, use emojis for clarity, and provide code snippets when relevant.`,
      itsm: `You are an ITSM expert AI agent powered by LangGraph and GPT-5.6.
Your job: analyze IT service requests, classify their priority (P1=critical, P2=major, P3=minor), 
suggest resolutions from your knowledge base, and determine if escalation is needed.
Format your response with: 🎫 Category, 🚨 Priority, 💡 Resolution or Escalation path.`,
      codereview: `You are an autonomous code review agent.
Analyze the provided code for: security vulnerabilities, performance issues, code style violations, 
and suggest improvements. Format with sections: 🔒 Security, ⚡ Performance, 🎨 Style, ✅ Suggestions.`,
      rag: `You are a RAG (Retrieval-Augmented Generation) knowledge assistant for Hexaware.
Answer questions by citing relevant knowledge, explaining your reasoning, and 
distinguishing between what you know confidently vs what requires verification.
Always cite your sources as [Source: ...].`,
    };

    const systemPrompt = systemPrompts[useCase] || systemPrompts.general;

    // Build messages array for Groq API
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // Call Groq API directly
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.json();
      return NextResponse.json(
        { error: error.error?.message || "Groq API error" },
        { status: groqResponse.status }
      );
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content || "No response generated.";

    // Simulate LangGraph agent trace steps for visualization
    const agentTrace = [
      { node: "Input Parser", status: "done", color: "#7C3AED" },
      { node: "Intent Classifier", status: "done", color: "#EC4899" },
      { node: useCase === "itsm" ? "ITSM Resolver" : useCase === "codereview" ? "Code Analyzer" : "LLM Node", status: "done", color: "#06B6D4" },
      { node: "Response Formatter", status: "done", color: "#10B981" },
    ];

    return NextResponse.json({
      response: content,
      model: "llama-3.1-70b-versatile (via Groq)",
      agentTrace,
      tokens: data.usage,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
