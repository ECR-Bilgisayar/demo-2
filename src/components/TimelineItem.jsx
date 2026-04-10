import React from 'react';
import { motion } from 'framer-motion';
import { Easing } from '@/lib/animationConfig';

export const TimelineItem = ({ time, title, description, isLeft, index }) => {
  const slideDirection = isLeft ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: Easing.premium }}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="hidden md:block md:w-6/12" />
      
      {/* Center Marker */}
      <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary border-4 border-accent shadow-gold-glow absolute left-0 md:left-1/2 md:-translate-x-1/2">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full bg-white"
        />
      </div>

      {/* Content */}
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        className={`w-full pl-12 md:pl-0 md:w-5/12 md:max-w-[42%] ${isLeft ? 'md:pr-16 md:mr-6 md:text-right' : 'md:pl-16 md:ml-6 text-left'}`}
      >
        <div className="glass p-6 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all bg-white/80">
          <span className="text-accent font-bold text-lg mb-1 block">{time}</span>
          <h4 className="text-white font-semibold text-xl mb-2">{title}</h4>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};