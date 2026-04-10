import React from 'react';
import { motion } from 'framer-motion';
import { Easing, Duration } from '@/lib/animationConfig';

export const AnimatedText = ({ text, type = 'words', className, delay = 0 }) => {
  const items = type === 'words' ? text.split(' ') : text.split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: type === 'words' ? 0.05 : 0.02, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: type === 'words' ? '0.25em' : '0' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  );
};