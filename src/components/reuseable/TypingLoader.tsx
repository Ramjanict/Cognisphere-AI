import { motion } from "framer-motion";
import React from "react";

const TypingLoader: React.FC<{
  size?: number;
  color?: string;
  text?: string;
}> = ({ size = 8, color = "#999", text = "Thinking" }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Dots */}
      <div className="flex space-x-2 items-end h-6">
        {[0, 0.2, 0.4].map((delay, index) => (
          <motion.div
            key={index}
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: color }}
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{
              y: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay,
              },
            }}
          />
        ))}
      </div>

      {/* Text */}
      <span className="text-gray-300 text-sm font-medium">{text}...</span>
    </div>
  );
};

export default TypingLoader;
