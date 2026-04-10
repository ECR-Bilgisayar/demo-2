import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const GlassmorphismCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative w-full h-64 perspective-[1000px] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        className="w-full h-full preserve-3d relative"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-gold-glow">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden glass rounded-2xl p-6 flex items-center justify-center text-center bg-primary text-white border-accent/30"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};