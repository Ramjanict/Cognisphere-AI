"use client";

import { Testimonials } from "@/components/Testimonials";
import VideoModal from "@/components/common/custom/VideoModal";
import { DottedGlowBackground } from "@/components/dotted-glow-background";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Cpu,
  Globe,
  Layers,
  Menu,
  MessageSquare,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

// --- UTILITY COMPONENTS ---

const featureItems = [
  {
    title: "Max Accuracy, zero confusion",
    description:
      "Cognisphere compares responses from the top models and gives a summary using advanced reasoning.",
    icon: <BrainCircuit className="w-8 h-8 text-indigo-400" />,
  },
  {
    title: "Side-by-side responses",
    description:
      "Get side-by- side responses from each model with just one click- perfect for our detail oriented users",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
  },
  {
    title: "One Platform For Every Problem",
    description:
      "Cognisphere uses handpicked models that are best in their segment- so get trusted solution to your diverse problems like coding, content creation, email writing, finance planning, travel, you name it.",
    icon: <Globe className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Big AI power, tiny monthly cost",
    description:
      "Get all major AI models for less than the price of a single subscription",
    icon: <Zap className="w-8 h-8 text-emerald-400" />,
  },
  {
    title: "Always learning and growing",
    description:
      "We continuously add new models and evolve the platform based on your feedback to better serve YOUR needs",
    icon: <Sparkles className="w-8 h-8 text-rose-400" />,
  },
];

const ScrollReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
};

const CognisphereLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<string>("");
  const { scrollY } = useScroll();

  const blob1Y = useTransform(scrollY, [0, 3000], [0, 400]);
  const blob2Y = useTransform(scrollY, [0, 3000], [0, -300]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#workflow" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "/faq" },
  ];

  // AI-related placeholder questions
  const placeholderQuestions = [
    "Write a Python function to calculate Fibonacci sequence, but optimize it for large numbers.",
    "Explain quantum computing in simple terms with a real-world analogy.",
    "How does neural network backpropagation work? Show the math.",
    "What are the key differences between transformer and RNN architectures?",
    "Design a REST API endpoint for user authentication with JWT tokens.",
    "What's the time complexity of quicksort and when should you use it?",
  ];

  // Responses from different models based on question type
  const getResponses = (question: string) => {
    if (
      question.toLowerCase().includes("fibonacci") ||
      question.toLowerCase().includes("python")
    ) {
      return {
        chatgpt:
          "Use memoization or iterative approach. For very large numbers, matrix exponentiation is optimal.",
        claude:
          "Memoization is good, but iterative with O(n) is better. For extremely large n, use matrix exponentiation with O(log n).",
        gemini:
          "Dynamic programming with memoization works well. Consider using @lru_cache decorator in Python.",
        synthesis:
          "While ChatGPT suggests memoization and Claude recommends iteration, <strong>Matrix Exponentiation</strong> with O(log n) time complexity is the optimal solution for very large Fibonacci numbers. It uses the property: [F(n+1), F(n)] = [[1,1],[1,0]]^n × [F(1), F(0)].",
      };
    } else if (
      question.toLowerCase().includes("quantum") ||
      question.toLowerCase().includes("computing")
    ) {
      return {
        chatgpt:
          "Quantum computing uses quantum bits (qubits) that can exist in superposition, allowing parallel computation of multiple states simultaneously.",
        claude:
          "Think of a classical bit as a coin showing heads or tails. A qubit is like a spinning coin—simultaneously heads and tails until observed, enabling exponential parallelism.",
        gemini:
          "Quantum computers leverage quantum mechanics: superposition (multiple states), entanglement (correlated qubits), and interference to solve problems exponentially faster.",
        synthesis:
          "Quantum computing uses <strong>qubits in superposition</strong> (like a spinning coin showing both heads and tails). Unlike classical bits, qubits can process multiple possibilities simultaneously, enabling exponential speedup for certain problems like factoring large numbers or quantum simulations.",
      };
    } else if (
      question.toLowerCase().includes("neural") ||
      question.toLowerCase().includes("backpropagation")
    ) {
      return {
        chatgpt:
          "Backpropagation calculates gradients by propagating errors backwards through the network using chain rule of calculus.",
        claude:
          "Backprop applies chain rule recursively: ∂L/∂w = ∂L/∂y × ∂y/∂z × ∂z/∂w, where L is loss, y is output, z is activation, w is weight.",
        gemini:
          "Backpropagation uses automatic differentiation—computes gradients layer by layer from output to input, updating weights via gradient descent.",
        synthesis:
          "Backpropagation uses the <strong>chain rule</strong> to compute gradients: ∂L/∂w = (∂L/∂y) × (∂y/∂z) × (∂z/∂w). Errors flow backwards from output layer through hidden layers, enabling efficient gradient computation for all parameters in a single pass—the foundation of modern deep learning.",
      };
    } else if (
      question.toLowerCase().includes("api") ||
      question.toLowerCase().includes("jwt") ||
      question.toLowerCase().includes("authentication")
    ) {
      return {
        chatgpt:
          "POST /auth/login endpoint: validate credentials, generate JWT with user ID and expiry, return token in response header.",
        claude:
          "Design: POST /api/auth/login accepts email/password, verifies via bcrypt, issues JWT with 15min expiry + refresh token, returns {token, refreshToken, user}.",
        gemini:
          "RESTful endpoint: POST /v1/auth/login, validates input with Joi, checks credentials, signs JWT with HS256, sets httpOnly refresh cookie, returns access token.",
        synthesis:
          "Best practice: <strong>POST /api/auth/login</strong> validates credentials securely (bcrypt), issues short-lived JWT (15min) + refresh token in httpOnly cookie. Return {accessToken, user}. Include rate limiting and CSRF protection. Refresh endpoint exchanges refresh token for new access token—balances security and UX.",
      };
    } else {
      return {
        chatgpt:
          "Based on the latest research, here's a comprehensive explanation...",
        claude:
          "This is a nuanced topic. Let me break it down systematically...",
        gemini: "From a technical perspective, the key considerations are...",
        synthesis:
          "After synthesizing insights from multiple AI models, the consensus approach combines best practices from each perspective to deliver an optimal solution.",
      };
    }
  };

  const currentResponses = currentQuestion
    ? getResponses(currentQuestion)
    : {
        chatgpt:
          "Use memoization or iterative approach. For very large numbers, matrix exponentiation is optimal.",
        claude:
          "Memoization is good, but iterative with O(n) is better. For extremely large n, use matrix exponentiation with O(log n).",
        gemini:
          "Dynamic programming with memoization works well. Consider using @lru_cache decorator in Python.",
        synthesis:
          "While standard recursion is inefficient (noted by ChatGPT) and basic iteration is good (noted by Claude), the best approach for <em>very</em> large numbers is <strong>Matrix Exponentiation</strong>...",
      };

  return (
    <>
      {/* --- DYNAMIC BACKGROUND --- */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-visible -z-[1] pointer-events-none"
        style={{ minHeight: "100vh", height: "100vh" }}
      >
        <motion.div
          style={{ y: blob1Y }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/25 blur-[120px]"
        />
        <motion.div
          style={{ y: blob2Y }}
          className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-900/25 blur-[120px]"
        />
      </div>

      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white relative">
        {/* --- NAVBAR --- */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo Area */}
              <div className="flex items-center gap-3 cursor-pointer group pl-0 ml-0">
                <img
                  src="/final-logo.png"
                  alt="Cognisphere Logo"
                  className="w-34 h-auto object-contain flex-shrink-0 group-hover:scale-110 transition-transform "
                />
                {/*  <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">Cognisphere</span>*/}
              </div>

              <div className="hidden md:flex items-center space-x-8 ml-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="text-sm font-medium text-white hover:text-indigo-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Try it for Free
                </Link>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-slate-300 hover:text-white"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.nav>
        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 relative">
          {/* Dotted Flow Background - starts from top */}
          <div
            className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
            style={{ height: "700px" }}
          >
            <DottedGlowBackground
              className="pointer-events-none"
              gap={16}
              radius={2}
              color="rgba(99, 102, 241, 0.3)"
              glowColor="rgba(99, 102, 241, 0.6)"
              opacity={0.8}
              speedMin={0.8}
              speedMax={1.5}
              speedScale={0.8}
            />
            {/* Fade-out gradient at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none z-[5]"></div>
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 hover:bg-indigo-500/20 transition-colors cursor-pointer">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                More advanced AI capabilities coming your way
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Your AI Co-Pilot That Checks
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                  Every Top Model For You
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
                Cognisphere compares best models and generates the perfect
                summary.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    Get Started Now <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-base font-bold text-slate-300 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 rounded-full"
                  onClick={() => setIsVideoOpen(true)}
                >
                  View Live Demo
                </motion.button>
              </div>
            </ScrollReveal>

            <VideoModal
              videoUrl="https://www.youtube.com/shorts/xBVAHyqVx0Y"
              isOpen={isVideoOpen}
              onClose={() => setIsVideoOpen(false)}
            />

            {/* HERO UI MOCKUP */}
            <ScrollReveal delay={0.4}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-5xl mx-auto rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
              >
                {/* Browser Header */}
                <div className="h-12 bg-slate-800/50 border-b border-slate-700 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <div className="mx-auto bg-slate-950/50 px-4 py-1 rounded-md text-xs text-slate-500 font-mono">
                    cognisphere.us/dashboard/home
                  </div>
                </div>

                <div className="p-6 lg:p-10 text-left">
                  {/* User Input with PlaceholdersAndVanishInput */}
                  <div className="flex gap-4 mb-8 items-start">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center mt-2">
                      <span className="text-slate-300 font-bold">U</span>
                    </div>
                    <div className="flex-1 max-w-2xl">
                      {currentQuestion ? (
                        <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 text-slate-200 max-w-2xl border border-slate-700">
                          <p className="text-sm">{currentQuestion}</p>
                        </div>
                      ) : (
                        <div className="bg-slate-800/50 rounded-2xl rounded-tl-none p-3 border border-slate-700 backdrop-blur-sm">
                          <PlaceholdersAndVanishInput
                            placeholders={placeholderQuestions}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            onSubmit={(e) => {
                              e.preventDefault();
                              const input = e.currentTarget.querySelector(
                                "input",
                              ) as HTMLInputElement;
                              if (input?.value) {
                                setCurrentQuestion(input.value);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Processing Indicators */}
                  {currentQuestion && (
                    <>
                      <div className="flex gap-2 mb-6 ml-14">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" /> ChatGPT
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
                          <CheckCircle className="w-3 h-3" /> Claude
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                          <CheckCircle className="w-3 h-3" /> Gemini
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs animate-pulse">
                          <Cpu className="w-3 h-3" /> Synthesizing...
                        </div>
                      </div>

                      {/* Model Responses */}
                      <div className="space-y-4 mb-6 ml-14">
                        {/* ChatGPT Response */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3 text-slate-300 text-xs border border-green-500/20 flex-1">
                            <p className="text-green-400 text-xs font-medium mb-1">
                              ChatGPT:
                            </p>
                            <p>{currentResponses.chatgpt}</p>
                          </div>
                        </div>

                        {/* Claude Response */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3 text-slate-300 text-xs border border-purple-500/20 flex-1">
                            <p className="text-purple-400 text-xs font-medium mb-1">
                              Claude:
                            </p>
                            <p>{currentResponses.claude}</p>
                          </div>
                        </div>

                        {/* Gemini Response */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3 text-slate-300 text-xs border border-blue-500/20 flex-1">
                            <p className="text-blue-400 text-xs font-medium mb-1">
                              Gemini:
                            </p>
                            <p>{currentResponses.gemini}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Cognisphere Response */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <BrainCircuit className="text-white w-6 h-6" />
                    </div>
                    <div className="bg-slate-900/80 rounded-2xl rounded-tl-none p-6 text-slate-200 border border-indigo-500/30 shadow-lg shadow-indigo-900/10 relative overflow-hidden flex-1">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
                      <h4 className="text-indigo-400 font-semibold text-sm mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Cognisphere Optimized
                        Synthesis
                      </h4>
                      <p
                        className="text-slate-300 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: currentResponses.synthesis,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* --- WORKFLOW SECTION --- */}
        <section id="workflow" className="pt-32 pb-2 relative overflow-visible">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  How the Logic Flows
                </h2>
                <p className="text-slate-400">
                  From a single query to a perfected response in milliseconds.
                </p>
              </div>
            </ScrollReveal>

            {/* Container for the Flowchart */}
            <div className="relative">
              {/* --- THE CONNECTING LINE (Background) --- */}
              <div className="hidden md:block absolute top-[3.5rem] left-[16%] right-[16%] h-2 z-0">
                <svg className="w-full h-full overflow-visible">
                  {/* Dotted Line */}
                  <motion.line
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="12 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>

                {/* Moving Pulse Dot (Animation) */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8]"
                  initial={{ left: "0%", opacity: 0 }}
                  whileInView={{ left: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Flowchart Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Node 1: Input */}
                <ScrollReveal delay={0.1}>
                  <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center group hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-xl z-10">
                    <div className="w-20 h-20 mx-auto bg-slate-950 rounded-full flex items-center justify-center mb-6 border-4 border-slate-900 shadow-lg group-hover:scale-110 transition-transform relative z-20">
                      <MessageSquare className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      1. Input
                    </h3>
                    <p className="text-slate-400 text-sm">
                      User submits a query. The system enhances prompt clarity.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Node 2: Processing */}
                <ScrollReveal delay={0.3}>
                  <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center group hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-xl z-10">
                    <div className="w-20 h-20 mx-auto bg-slate-950 rounded-full flex items-center justify-center mb-6 border-4 border-slate-900 shadow-lg group-hover:scale-110 transition-transform relative z-20">
                      <Layers className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      2. Parallel Processing
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Query sent simultaneously to GPT, Claude, Gemini, and
                      other APIs.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Node 3: Synthesis */}
                <ScrollReveal delay={0.5}>
                  <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center group hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-xl z-10">
                    <div className="w-20 h-20 mx-auto bg-slate-950 rounded-full flex items-center justify-center mb-6 border-4 border-slate-900 shadow-lg group-hover:scale-110 transition-transform relative z-20">
                      <Sparkles className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      3. Synthesis
                    </h3>
                    <p className="text-slate-400 text-sm">
                      AI Reasoning Engine compares outputs and generates the
                      perfect summary.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="py-10 relative">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Everything you need.
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto leading-tight">
                  Unified intelligence in a single powerful dashboard.
                </p>
              </div>
            </ScrollReveal>

            <div className="h-auto py-0 rounded-md flex flex-col antialiased bg-transparent bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards items={featureItems} />
            </div>
          </div>
        </section>
        {/* --- TESTIMONIALS SECTION --- */}
        <Testimonials />
        {/* --- PRICING SECTION --- */}
        <section id="pricing" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Powerful AI. Tiny Price.
              </h2>
              <p className="text-slate-400 mb-12 text-lg">
                Compare the best AI models. Pay for just one.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 group-hover:h-2 transition-all"></div>
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  RECOMMENDED
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                    <p className="text-slate-400 mt-2">
                      Perfect for professionals, coders, and creators.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Access to GPT, Claude, Gemini",
                        "Unlimited Synthesis Queries",
                        "Side-by-side Comparison View",
                        "History & Export",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-slate-300"
                        >
                          <CheckCircle className="w-4 h-4 text-indigo-400" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="flex items-end gap-1 justify-center">
                      <span className="text-6xl font-extrabold text-white">
                        $12.99
                      </span>
                      <span className="text-slate-500 pb-2 text-xl">/mo</span>
                    </div>
                    <Link href="/register">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 w-full md:w-auto px-10 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
                      >
                        Get Started Now
                      </motion.button>
                    </Link>
                    <p className="mt-4 text-xs text-slate-500">
                      No hidden fees. Cancel anytime.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative border-t border-slate-900 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/final-logo.png"
                  alt="Logo"
                  className="w-24 h-auto object-contain"
                />
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                Intellecta Labs LLC.
                <br />
                Every Perspective, Every AI, One Place
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#features" className="hover:text-indigo-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-indigo-400">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CognisphereLanding;
