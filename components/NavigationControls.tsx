
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

export const BackButton = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();

  // Don't show back button on home
  if (location.pathname === '/') return null;

  return (
    <>
      {/* Desktop Version */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className={`hidden md:flex items-center gap-2 mb-8 group transition-all ${
          theme === 'day' ? 'text-burgundy/60 hover:text-burgundy' : 'text-gold/60 hover:text-gold'
        }`}
      >
        <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back</span>
        <div className={`h-[1px] w-0 group-hover:w-8 transition-all duration-500 ${theme === 'day' ? 'bg-burgundy' : 'bg-gold'}`}></div>
      </motion.button>

      {/* Mobile Floating Version */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => navigate(-1)}
        className={`md:hidden fixed bottom-8 left-8 z-[140] w-14 h-14 rounded-full flex items-center justify-center shadow-lux border backdrop-blur-md transition-all ${
          theme === 'day' 
            ? 'bg-white/90 border-gold/10 text-burgundy' 
            : 'bg-burgundy-deep/90 border-white/10 text-gold shadow-gold-glow'
        }`}
      >
        <span className="text-xl">←</span>
      </motion.button>
    </>
  );
};

export const HomeButton = ({ text = "Return to VELRA" }: { text?: string }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')}
      className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all border shadow-sm ${
        theme === 'day'
          ? 'bg-white border-gold/20 text-burgundy hover:bg-beige'
          : 'bg-white/5 border-white/10 text-gold hover:bg-white/10'
      }`}
    >
      {text}
    </motion.button>
  );
};
