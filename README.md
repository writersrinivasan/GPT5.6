# GPT-5.6 & LangGraph Training App
### Hexaware Technologies — 60-Minute Agentic AI Session

A colorful, interactive Next.js web app for Hexaware's internal training session on **OpenAI GPT-5.6** and **LangGraph**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 BYOK — Bring Your Own Groq Key

1. Get a **free** API key at [console.groq.com/keys](https://console.groq.com/keys)
2. Paste it in the Sandbox → API Key field
3. Your key stays in your browser and is sent **only** to `api.groq.com`

---

## 📚 Learn Panel

| Section | Content |
|---------|---------|
| **Agenda** | 60-min session timeline with animated infographic |
| **GPT-5.6** | Model family (Sol/Terra/Luna), benchmarks, capabilities |
| **LangGraph** | StateGraph, Nodes, Edges, Persistence + interactive graph viz |
| **Patterns** | ReAct, Plan & Execute, Multi-Agent, Human-in-Loop |
| **Use Cases** | 6 Hexaware enterprise scenarios with LangGraph pipelines |
| **Quiz** | 5-question interactive knowledge check |

## 🛠️ Sandbox Panel

| Feature | Description |
|---------|-------------|
| **AI Assistant** | Live chat powered by Groq + simulated LangGraph trace visualization |
| **Exercises** | 3 hands-on coding exercises (Beginner → Advanced) |

---

## 🏗️ Architecture

```
app/
  page.tsx              — Main layout (Learn / Sandbox split)
  api/agent/route.ts    — LangGraph agent API (calls Groq)
  api/quiz/route.ts     — Quiz API
components/
  learn/                — All learning panel components
  sandbox/              — Chat + exercise components
  shared/               — Header, CodeBlock
data/
  curriculum.ts         — All content: modules, models, exercises, quiz
```

---

## 🤖 Coming Next: Codex CLI

After this session, the presenter will demo **OpenAI Codex CLI** — a terminal-native agentic coding tool that:
- Reads your entire codebase
- Writes, edits and runs code autonomously
- Handles multi-file changes with git awareness
- Perfect complement to GPT-5.6 + LangGraph

---

## 📦 Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** — custom dark theme with gradient animations  
- **LangGraph / LangChain** — agentic AI framework
- **Groq API** — ultra-fast inference (llama-3.1-70b-versatile)
- **TypeScript** — full type safety
