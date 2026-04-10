import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { RippleContainer } from './RippleEffect';

export const FloatingInput = ({ label, id, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  return (
    <div className="relative w-full mb-6">
      <motion.div
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'hsl(var(--ring))' : 'hsl(var(--muted-foreground))'
        }}
        className="absolute left-4 top-4 origin-left pointer-events-none transition-colors"
      >
        {label}
      </motion.div>
      <input
        id={id}
        {...props}
        onFocus={(e) => { setIsFocused(true); if(props.onFocus) props.onFocus(e); }}
        onBlur={(e) => { setIsFocused(false); setHasValue(!!e.target.value); if(props.onBlur) props.onBlur(e); }}
        className="w-full h-14 bg-slate-950/95 border border-slate-700 rounded-t-md px-4 pt-4 pb-2 text-white placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-slate-950 transition-all hover:bg-slate-900"
      />
      <motion.div 
        initial={false}
        animate={{ width: isFocused ? '100%' : '0%' }}
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
      />
    </div>
  );
};

export const FloatingTextarea = ({ label, id, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  return (
    <div className="relative w-full mb-6">
      <motion.div
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'hsl(var(--ring))' : 'hsl(var(--muted-foreground))'
        }}
        className="absolute left-4 top-4 origin-left pointer-events-none transition-colors"
      >
        {label}
      </motion.div>
      <motion.textarea
        id={id}
        {...props}
        animate={{ minHeight: isFocused || hasValue ? 120 : 56 }}
        onFocus={(e) => { setIsFocused(true); if(props.onFocus) props.onFocus(e); }}
        onBlur={(e) => { setIsFocused(false); setHasValue(!!e.target.value); if(props.onBlur) props.onBlur(e); }}
        className="w-full bg-slate-950/95 border border-slate-700 rounded-t-md px-4 pt-6 pb-2 text-white placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-slate-950 transition-all hover:bg-slate-900 resize-none overflow-hidden"
      />
      <motion.div 
        initial={false}
        animate={{ width: isFocused ? '100%' : '0%' }}
        className="absolute bottom-[2px] left-0 h-[2px] bg-accent"
      />
    </div>
  );
};

export const Custom3DCheckbox = ({ checked, onChange, label, id }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group mb-6">
      <div className="relative w-6 h-6 perspective-[500px]">
        <input 
          type="checkbox" 
          id={id} 
          checked={checked} 
          onChange={onChange} 
          className="sr-only" 
        />
        <motion.div 
          animate={{ rotateY: checked ? 180 : 0, backgroundColor: checked ? 'hsl(var(--ring))' : 'rgba(255,255,255,0.8)' }}
          className="w-full h-full rounded border-2 border-gray-300 group-hover:border-accent transition-colors preserve-3d flex items-center justify-center shadow-sm"
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ transform: 'rotateY(180deg)' }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <span className="text-sm text-foreground select-none group-hover:text-primary transition-colors">{label}</span>
    </label>
  );
};

export const SubmitButton = ({ isSubmitting, children }) => {
  return (
    <RippleContainer className="w-full rounded-xl">
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className="w-full bg-accent text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden preserve-3d"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          children
        )}
      </motion.button>
    </RippleContainer>
  );
};