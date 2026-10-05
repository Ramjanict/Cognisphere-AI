"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CopyableCodeBlock from "./CopyableCodeBlock";

// import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  messages: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ messages }) => {
  const processedContent = messages
    .replace(/\\\[/g, "$$$$")
    .replace(/\\\]/g, "$$$$")
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$");

  return (
    <div className="markdown-container max-w-4xl mx-auto p-6 bg-black text-white rounded-2xl shadow-sm border border-zinc-800">
      <div
        className="
          prose prose-zinc max-w-none
          /* Paragraph Styling */
          prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-p:leading-relaxed prose-p:my-6

          /* Heading Styling - Modern & Bold with extra spacing */
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
          prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4

          /* List Styling */
          prose-li:my-3 prose-ul:my-6 prose-ol:my-6

          /* Blockquote Styling */
          prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700
          prose-blockquote:bg-zinc-50/50 dark:prose-blockquote:bg-zinc-800/30
          prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:my-6

          /* Strong & Links */
          prose-strong:text-zinc-900 dark:prose-strong:text-white
          prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline

          /* General Spacing */
          mt-2
        "
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const text = String(children);

              if (inline || !className) {
                return (
                  <code
                    className="bg-zinc-800 px-1.5 py-0.5 rounded-md text-sm font-medium text-zinc-200"
                    {...props}
                  >
                    {text}
                  </code>
                );
              }

              const match = /language-(\w+)/.exec(className || "");
              const code = text.replace(/\n$/, "");

              return (
                <div className="my-8 rounded-xl overflow-hidden shadow-md border border-zinc-700">
                  <CopyableCodeBlock
                    code={code}
                    language={match?.[1] || "text"}
                  />
                </div>
              );
            },
            table({ children }) {
              return (
                <div className="my-8 overflow-hidden rounded-xl border border-zinc-700">
                  <table className="min-w-full divide-y divide-zinc-700 bg-zinc-900/50">
                    {children}
                  </table>
                </div>
              );
            },
            hr() {
              return <hr className="my-12 border-zinc-800" />;
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
