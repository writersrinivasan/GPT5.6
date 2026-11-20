"use client";
import { useState } from "react";
import { Key, Eye, EyeOff, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export default function APIKeySetup({ apiKey, setApiKey }: Props) {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(!apiKey);

  const isValid = apiKey.startsWith("gsk_") && apiKey.length > 20;
  const hasKey = apiKey.length > 10;

  if (!expanded) {
    return (
      <div
        className="rounded-xl p-3 flex items-center justify-between cursor-pointer"
        style={{ background: isValid ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${isValid ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}` }}
        onClick={() => setExpanded(true)}
      >
        <div className="flex items-center gap-2 text-sm">
          {isValid ? (
            <CheckCircle2 size={16} className="text-green-400" />
          ) : (
            <AlertCircle size={16} className="text-yellow-400" />
          )}
          <span className={isValid ? "text-green-300" : "text-yellow-300"}>
            {isValid ? "✅ Groq API Key configured" : "⚠️ Enter Groq API key to enable AI features"}
          </span>
          {isValid && <span className="text-white/30 text-xs">{apiKey.slice(0, 8)}…</span>}
        </div>
        <span className="text-white/40 text-xs">click to edit</span>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
        >
          <Key size={16} />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">BYOK — Bring Your Own Groq Key</h3>
          <p className="text-white/40 text-xs">Your key stays in your browser. Never sent anywhere except api.groq.com directly.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={show ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-4 py-2.5 rounded-xl text-sm font-mono text-white pr-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${isValid ? "rgba(16,185,129,0.4)" : hasKey ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.1)"}`,
              outline: "none",
              caretColor: "#06B6D4",
            }}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {isValid && (
          <button
            onClick={() => setExpanded(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)" }}
          >
            ✓ Save
          </button>
        )}
      </div>

      {hasKey && !isValid && (
        <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} /> Key should start with &ldquo;gsk_&rdquo; — get a free key from console.groq.com
        </div>
      )}

      <div className="mt-3 flex items-center gap-4">
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ExternalLink size={11} />
          Get free Groq API key →
        </a>
        <span className="text-white/20 text-xs">•</span>
        <span className="text-white/30 text-xs">Uses llama-3.1-70b-versatile model</span>
      </div>
    </div>
  );
}
