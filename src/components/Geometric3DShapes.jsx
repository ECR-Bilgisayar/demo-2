import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { FloatingElement } from './FloatingElement';

export const Geometric3DShapes = () => {
  const { ref, y } = useParallax(150);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      <motion.div style={{ y }} className="w-full h-full relative preserve-3d">
        {/* Cube 1 */}
        <FloatingElement duration={6} delay={0} yOffset={30} className="absolute top-[20%] left-[10%]">
          <motion.div 
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border border-accent/30 bg-white/5 backdrop-blur-sm preserve-3d"
          />
        </FloatingElement>

        {/* Floating Ring */}
        <FloatingElement duration={8} delay={1} yOffset={40} className="absolute top-[60%] right-[15%]">
          <motion.div 
            animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-2 border-accent/20 preserve-3d"
          />
        </FloatingElement>

        {/* Small Cube */}
        <FloatingElement duration={5} delay={2} yOffset={20} className="absolute top-[30%] right-[25%]">
          <motion.div 
            animate={{ rotateX: -360, rotateY: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border border-white/10 bg-accent/5 backdrop-blur-md preserve-3d"
          />
        </FloatingElement>
      </motion.div>
    </div>
  );
};