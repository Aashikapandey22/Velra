
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../constants';

const ThankYou = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    // Generate star particles
    const s = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 10,
      duration: Math.random() * 5 + 5
    }));
    setStars(s);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-burgundy-deep leather-texture">
      {/* Immersive Star Field */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <div 
            key={s.id}
            className="star-particle bg-gold rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              opacity: 0
            }}
          />
        ))}
        {/* Large Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-burgundy-light/20 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-6 py-20"
      >
        <div className="mb-16 relative inline-block">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 bg-gold blur-[60px] rounded-full"
          ></motion.div>
          <div className="w-28 h-28 bg-gold rounded-full flex items-center justify-center text-burgundy-deep shadow-gold-glow relative z-10 scale-110">
             <Icons.Star className="w-14 h-14 fill-current" />
          </div>
        </div>
        
        <div className="space-y-8 mb-20">
          <h1 className="text-7xl md:text-9xl text-beige-ivory luxury-serif leading-[0.85] tracking-tighter">
            Legacy <br/> <span className="text-gold italic">Secured</span>
          </h1>
          <div className="flex flex-col items-center gap-4">
             <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-black">Acquisition Reference #VLR-{Math.floor(Math.random() * 1000000)}</span>
             <div className="w-24 h-[1px] bg-gold/30"></div>
          </div>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-16 rounded-[3rem] shadow-2xl space-y-12 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-gold/20 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gold/20 pointer-events-none"></div>
          
          <div className="space-y-6">
              <h3 className="text-gold uppercase tracking-[0.4em] text-[11px] font-black">Boutique Confirmation</h3>
              <p className="text-beige-paper/80 leading-relaxed text-3xl font-light italic max-w-2xl mx-auto">
                "A true mark of distinction. Your selected artisan creation has been reserved and is now entering the final phase of master-polishing and personalized appraisal."
              </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="lux-button px-14 py-7 rounded-2xl text-[10px] shadow-gold-glow flex-1"
            >
              Track Your Artisan Journey
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-transparent border border-white/20 text-white px-14 py-7 rounded-2xl text-[10px] font-black tracking-[0.2em] hover:bg-white/5 transition-all flex-1 uppercase"
            >
              Return to Discovery
            </button>
          </div>
          
          <div className="pt-10 border-t border-white/5 text-[9px] uppercase tracking-[0.5em] font-black text-beige-paper/20">
              Personal Artisanal Selection • Verified Pure Full-Grain Leather
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="mt-12 text-[10px] uppercase tracking-[0.4em] text-white italic"
        >
          An email concierge will reach out to you shortly with heritage details.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ThankYou;
