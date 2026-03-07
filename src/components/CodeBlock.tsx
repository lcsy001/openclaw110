"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm rounded-t-lg border-b border-slate-700">
          {filename}
        </div>
      )}
      <div className={`relative ${filename ? "" : ""}`}>
        <pre
          className={`bg-slate-900 text-slate-50 p-4 overflow-x-auto text-sm leading-relaxed ${
            filename ? "rounded-b-lg" : "rounded-lg"
          }`}
        >
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          aria-label="复制代码"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
