"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I was paying for ChatGPT Plus and Claude Pro separately. Cognisphere replaced both for half the price.",
    name: "Sarah Jenkins",
    title: "Software Engineer",
  },
  {
    quote:
      "The synthesis feature is insane. It caught a bug in my code that GPT-4 missed but Claude found.",
    name: "David Chen",
    title: "Full Stack Developer",
  },
  {
    quote:
      "Finally, a tool that aggregates the 'truth'. No more hallucinations.",
    name: "Emily R.",
    title: "Data Analyst",
  },
  {
    quote:
      "I use the 'Auto' model selector for everything. It just knows which AI to use.",
    name: "Michael Ross",
    title: "Content Creator",
  },
  {
    quote:
      "The UI is cleaner than the actual OpenAI interface. Dark mode is perfect.",
    name: "Jessica T.",
    title: "UX Designer",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Gradient Masks for Smooth Fade Effect at Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>

      {/* Section Header */}
      <div className="mb-16 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Don't take our word for it.
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Join thousands of developers, creators, and professionals who use
          Cognisphere to work smarter.
        </p>
      </div>

      {/* The Moving Carousel */}
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20, // Speed: Higher = Slower
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 pr-6"
          style={{ width: "max-content" }}
        >
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[400px] shrink-0 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-indigo-500/30 transition-colors relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-indigo-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 text-lg font-light">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.name}
                  </p>
                  <p className="text-slate-500 text-xs">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
