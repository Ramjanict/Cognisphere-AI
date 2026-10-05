"use client";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Page = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-gradient-to-br from-rose-50 via-white to-red-100 overflow-hidden">
      {width > 0 && height > 0 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.5}
          initialVelocityY={5}
          confettiSource={{
            x: 0,
            y: 0,
            w: width,
            h: 0,
          }}
          colors={["#f87171", "#ef4444", "#dc2626", "#fee2e2", "#fecaca"]}
        />
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="relative z-10 flex flex-col items-center bg-white px-10 py-12 rounded-3xl shadow-2xl space-y-6 max-w-md text-center border border-red-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-red-100 blur-xl"
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
          <XCircle className="w-24 h-24 text-red-500 drop-shadow-lg relative z-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent"
        >
          Payment Canceled
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 leading-relaxed text-base"
        >
          Your payment was not completed or has been canceled.
          <br />
          Please try again or contact support if you believe this is an error.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Go Back Home
          </Link>

          <Link
            href="/dashboard/home"
            className="inline-block px-8 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200"
          >
            Try Again
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, -20, 0],
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
