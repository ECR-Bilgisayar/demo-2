import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConfettiAnimation = ({ active }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: Math.random() > 0.5 ? '#d4af37' : '#ffffff',
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2
      }));
      setPieces(newPieces);
    } else {
      setPieces([]);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: '-10vh', x: `${p.x}vw`, rotate: p.rotation, scale: p.scale }}
            animate={{ 
              y: '110vh', 
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: p.rotation + 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
            className="absolute w-3 h-3"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};