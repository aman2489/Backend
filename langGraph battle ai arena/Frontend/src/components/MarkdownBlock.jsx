import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const MarkdownBlock = ({ content, isDark }) => (
  <div className="prose prose-sm dark:prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="my-2 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                {...props}
                style={isDark ? atomOneDark : atomOneLight}
                language={match[1]}
                PreTag="div"
                className="!my-0 !bg-slate-50 dark:!bg-[#0f111a]"
                showLineNumbers
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...props} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-300 font-mono text-xs">
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownBlock;
