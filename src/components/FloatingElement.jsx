import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElement = ({ children, duration = 4, yOffset = 20, delay = 0, className }) => {
  return (
    <motion.div
      className={`gpu-accelerated ${className || ''}`}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};