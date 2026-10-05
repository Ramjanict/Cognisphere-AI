// components/CopyableCodeBlock.tsx
"use client";

import { Check, Copy } from "lucide-react"; // or use heroicons / your preferred icon lib
import { useState } from "react";

interface CopyableCodeBlockProps {
  code: string;
  language?: string;
}

export default function CopyableCodeBlock({
  code,
  language,
}: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-gray-950 text-gray-50">
      {/* Header bar with language + copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-gray-800 text-sm">
        <span className="text-gray-400 font-medium">{language || "text"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* The code itself */}
      <pre className="p-4 overflow-x-auto text-sm leading-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-950">
        <code className={`language-${language || "plaintext"}`}>{code}</code>
      </pre>
    </div>
  );
}
