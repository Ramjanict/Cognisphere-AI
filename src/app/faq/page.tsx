"use client";
import Link from "next/link";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Cognisphere?",
      a: "Cognisphere is an AI comparison platform that shows and summarizes responses from top AI models like ChatGPT, Claude, Gemini, and Perplexity—all in one place.",
    },
    {
      q: "Why should I choose Cognisphere over ChatGPT or Claude alone?",
      a: "Because no single AI model is always right. Cognisphere queries multiple AI models, compares their responses, and delivers a clear summarized answer. You can also view individual responses side-by-side.",
    },
    {
      q: "Which AI models does Cognisphere support?",
      a: "We support leading AI models across categories, including GPT-4o, Claude 3.5, Gemini 1.5, and more. New models are added regularly.",
    },
    {
      q: "Do I get the full responses from each model?",
      a: "Yes. You can view every model’s full response side-by-side with one click",
    },
    {
      q: "Why are Cognisphere’s answers more accurate?",
      a: "Different AI models are trained on different data. By comparing multiple responses and synthesizing them, Cognisphere reduces bias and hallucinations.",
    },
    {
      q: "Why is Cognisphere cheaper than individual AI subscriptions?",
      a: "We optimize model usage and infrastructure so you get access to multiple models without paying for each separately.",
    },
    {
      q: "What’s included in the Pro Plan?",
      a: "Unlimited synthesis queries, side-by-side comparisons, access to top AI models, and all future improvements.",
    },
    {
      q: "Are there any hidden fees?",
      a: "No. One simple monthly price with no surprises.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. You can cancel your subscription at any time from your account dashboard.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-40 px-6 md:px-12 lg:px-20 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-3xl mix-blend-screen opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl mix-blend-screen opacity-20"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <div className="mt-2 inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-10">
          <span className="text-sm text-indigo-300 tracking-wide font-medium">
            Frequently Asked Questions
          </span>
        </div>

        {/* Header Section */}
        <div className="pt-2 mb-32">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white">
            Your questions answered
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Everything you need to know about Cognisphere. We strive to provide
            the most accurate, synthesized intelligence layer for your workflow.
          </p>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors py-2"
            >
              &larr; Return Home
            </Link>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const number = (index + 1).toString().padStart(2, "0");

            return (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className="group cursor-pointer py-8 border-t border-slate-800 hover:border-indigo-500/50 transition-colors duration-300"
              >
                <div className="flex items-start gap-8 md:gap-12">
                  <div
                    className={`flex-shrink-0 w-12 h-12 mt-2 rounded-full border flex items-center justify-center text-sm transition-all duration-300
                    ${
                      isOpen
                        ? "border-indigo-500 text-indigo-300 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                        : "border-slate-800 text-slate-500 group-hover:border-slate-600"
                    }`}
                  >
                    {number}
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow pt-2">
                    <div className="flex justify-between items-center">
                      <h3
                        className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? "text-indigo-100" : "text-slate-200 group-hover:text-indigo-300"}`}
                      >
                        {item.q}
                      </h3>

                      <span
                        className={`ml-4 text-2xl transition-colors duration-300 ${isOpen ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {/* Expandable Answer */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-8"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden pb-4">
                        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl border-l-2 border-slate-800 pl-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration Line */}
        <div className="w-full h-px bg-gradient-to-r from-slate-800 via-indigo-900/50 to-slate-800 mt-6"></div>
      </div>
    </div>
  );
}
