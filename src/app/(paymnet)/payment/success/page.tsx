"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Page = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Confetti
          width={width || window.innerWidth}
          height={height || window.innerHeight}
          recycle={false}
          numberOfPieces={400}
          gravity={0.4}
          initialVelocityY={0}
          confettiSource={{
            x: 0,
            y: 0,
            w: width || window.innerWidth,
            h: 0,
          }}
          colors={["#22c55e", "#16a34a", "#4ade80", "#86efac", "#bbf7d0"]}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="relative z-10 flex flex-col items-center bg-white px-10 py-12 rounded-3xl shadow-2xl space-y-6 max-w-md text-center border border-green-100"
      >
        {/* Glowing Ring + Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-green-100 blur-xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          />
          <CheckCircle2 className="w-24 h-24 text-green-500 drop-shadow-lg relative z-10" />
        </motion.div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 leading-relaxed text-base"
        >
          Thank you for your payment. Your transaction has been completed
          successfully. You can now access your dashboard.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 text-white text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>

      {/* Soft background pulse */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-green-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Page;
