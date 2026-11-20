"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = "python", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting via spans
  const highlight = (src: string) => {
    return src
      .replace(/(#[^\n]*)/g, '<span style="color:#6b7280">$1</span>')
      .replace(/\b(from|import|def|class|return|if|else|elif|for|while|in|not|and|or|True|False|None|pass|async|await|with|as|try|except|raise)\b/g,
        '<span style="color:#c792ea">$1</span>')
      .replace(/\b(str|list|dict|int|bool|float|TypedDict|Literal|Optional)\b/g,
        '<span style="color:#82aaff">$1</span>')
      .replace(/"([^"]*)"/g, '<span style="color:#c3e88d">"$1"</span>')
      .replace(/'([^']*)'/g, "<span style='color:#c3e88d'>'$1'</span>")
      .replace(/\b(\d+)\b/g, '<span style="color:#f78c6c">$1</span>');
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#0d0d1f", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {title && <span className="text-white/40 text-xs ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-white/40 hover:text-white transition-colors"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed code-editor">
        <code
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
          style={{ color: "#cdd6f4" }}
        />
      </pre>
    </div>
  );
}
