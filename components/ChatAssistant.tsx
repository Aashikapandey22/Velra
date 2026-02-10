
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { useProducts, useTranslation, useTheme } from '../App';
import { Icons, CURRENCY } from '../constants';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const { t } = useTranslation();

  useEffect(() => {
    // Initial message based on theme
    const initialText = theme === 'day' 
      ? "Welcome to the VELRA Atelier. I'm delighted to begin this bright journey with you. To help me curate a masterwork that truly resonates, could you tell me a bit about your energy today? Are we preparing for a high-stakes moment that requires confidence, or perhaps a relaxed occasion where comfort is your priority?"
      : "Good evening. Welcome back to the VELRA Atelier. I'm delighted to assist you in this intimate styling journey. To curate the perfect evening masterwork for you, could you share a bit about your current mood? Are we seeking a piece that commands a room with bold elegance, or perhaps something more refined and understated?";
    
    setMessages([{ role: 'model', text: initialText }]);
  }, [theme]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const categories = [...new Set(products.map(p => p.category))];
      const productContext = products.slice(0, 30).map(p => 
        `- ${p.name}: ${p.category}, ${p.leatherType}, ${CURRENCY}${p.price.toLocaleString('en-IN')}`
      ).join('\n');

      const systemInstruction = `
        You are the VELRA AI Concierge, a master of luxury fashion and emotional intelligence at VELRA, India's premier leather boutique.
        
        CURRENT MOOD CONTEXT: The website is currently in ${theme.toUpperCase()} MOOD.
        
        ADAPT YOUR TONE BASED ON THEME:
        - DAY MOOD: Be energetic, confident, uplifting, and clear. Use brighter adjectives. Focus on "clarity", "purpose", and "vibrancy".
        - NIGHT MOOD: Be calm, intimate, refined, and slightly poetic. Use smoother, more cinematic language. Focus on "elegance", "sophistication", and "mystery".

        STYLING RECOMMENDATIONS BASED ON THEME:
        - DAY: Suggest lighter colors (Tan, Cognac, Forest Green), casual elegance, and practical silhouettes.
        - NIGHT: Suggest deeper tones (Burgundy, Jet Black, Midnight Blue), statement leather, bold metallic accents, and silhouettes that command attention.

        PHASE 1: THE GENTLE DISCOVERY (Beginning of conversation)
        - If the user is new or hasn't shared their mood, gently ask 2-3 soft, optional questions about:
          1. Current Mood (e.g., "What is the energy of your ${theme === 'day' ? 'day' : 'evening'}?")
          2. Intended Occasion (e.g., "Are we dressing for a high-stakes meeting or a celebratory gala?")
          3. Style Comfort Level (e.g., "Do you seek pieces that command attention, or subtle, quiet luxury?")
        - Be supportive and conversational. If they skip, infer from context.

        PHASE 2: EMOTIONAL INTELLIGENCE & SENTIMENT ANALYSIS
        - Analyze user message tone and word choice to infer emotional state (Confident, Calm, Stressed, Excited, Unsure).
        - ADAPT YOUR VOICE:
          * STRESSED: Soothing, gentle tones. Recommend "comfort-first" leathers like soft Suede or Tan leathers that feel grounded.
          * CONFIDENT/EXCITED: Match their energy with bold, descriptive adjectives. Recommend "statement" pieces in Jet Black or deep Burgundy.
          * UNSURE: Be a guiding authority. Reassure them with timeless classics and explained logic.

        PHASE 3: PERSONALIZED OUTFIT-BASED RECOMMENDATIONS
        - Always recommend OUTFIT COMBINATIONS (e.g., "A specific Jacket paired with a specific Bag and Belt").
        - Suggest color palettes (e.g., "Ebony and Cognac for a grounded contrast").
        - EXPLAIN THE "WHY" (Psychological & Practical):
          * "I recommend Burgundy for your evening because it carries a sense of royalty and quiet power, which perfectly balances the excitement you're feeling."
          * "The Suede texture is ideal for your travel as it's more forgiving and tactile, reducing the friction of your busy day."

        CONTEXT:
        Available Categories: ${categories.join(', ')}.
        Current Catalog Reference:
        ${productContext}

        BRAND RULES:
        - Use "we" and "us".
        - Maintain a persona of a sophisticated master artisan who cares deeply about the user's emotional experience.
        - Keep responses concise but rich in editorial detail.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8, 
        }
      });

      const aiText = response.text || "Forgive me, my artistic senses are momentarily clouded. How else may I assist your style journey?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Concierge Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Forgive me, there was a disruption in our connection. I am here to help as soon as the signal returns." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className={`absolute bottom-20 right-0 w-[90vw] max-w-[420px] h-[650px] rounded-[2.5rem] shadow-lux border overflow-hidden flex flex-col transition-all duration-500 ${theme === 'day' ? 'bg-white border-gold/15' : 'bg-[#1A0006] border-white/10'}`}
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center text-gold relative ${theme === 'day' ? 'bg-burgundy' : 'bg-black'}`}>
              <div className="absolute inset-0 leather-texture opacity-10 pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center ${theme === 'day' ? 'bg-burgundy-deep' : 'bg-burgundy'}`}>
                  <Icons.Star className="w-5 h-5 fill-gold" />
                </div>
                <div>
                  <h3 className="luxury-serif text-lg leading-none">VELRA Concierge</h3>
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-60">Personal AI Stylist</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform relative z-10 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Chat History */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar transition-colors duration-500 ${theme === 'day' ? 'bg-beige/30' : 'bg-black/20'}`}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] p-5 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? theme === 'day' ? 'bg-burgundy text-beige-ivory rounded-tr-none shadow-md' : 'bg-gold text-burgundy rounded-tr-none shadow-gold-glow'
                      : theme === 'day' ? 'bg-white text-burgundy-dark border border-gold/10 rounded-tl-none shadow-sm italic font-light' : 'bg-white/5 text-beige-ivory border border-white/10 rounded-tl-none shadow-lux italic font-light'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`p-5 rounded-3xl border rounded-tl-none flex gap-1.5 shadow-sm ${theme === 'day' ? 'bg-white border-gold/10' : 'bg-white/5 border-white/10'}`}>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-6 border-t transition-colors duration-500 ${theme === 'day' ? 'bg-white border-gold/10' : 'bg-[#1A0006] border-white/10'}`}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Share your style needs..."
                  className={`flex-1 border rounded-full px-6 py-4 text-xs outline-none focus:border-gold transition-all shadow-inner ${theme === 'day' ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10 text-beige-ivory'}`}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 transition-all transform active:scale-95 ${theme === 'day' ? 'bg-burgundy text-gold hover:bg-burgundy-cherry' : 'bg-gold text-burgundy hover:bg-beige-ivory'}`}
                >
                  <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </div>
              <p className="text-[8px] uppercase tracking-widest text-center mt-5 text-gray-400 font-black">
                Personal Discovery • Bespoke Styling • {theme.toUpperCase()} MOOD
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-[151] ${
          isOpen 
            ? theme === 'day' ? 'bg-white text-burgundy border border-gold/20 shadow-lux' : 'bg-[#1A0006] text-gold border border-white/10 shadow-gold-glow'
            : theme === 'day' ? 'bg-burgundy text-gold shadow-gold-glow' : 'bg-gold text-burgundy shadow-gold-glow'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
             <Icons.Star className="w-7 h-7 fill-current" />
             <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${theme === 'day' ? 'bg-gold-bright' : 'bg-white'}`}></span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatAssistant;
