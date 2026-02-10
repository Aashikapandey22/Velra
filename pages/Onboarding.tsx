
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useTranslation } from '../App';
import { LANGUAGES, MOODS, CATEGORY_PREFS, STYLES, Icons } from '../constants';

const Onboarding = () => {
  const { setLang } = useTranslation();
  const { setPreferences } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({
    language: 'English',
    mood: MOODS[0],
    category: CATEGORY_PREFS[0],
    style: STYLES[0]
  });

  const handleLanguageSelect = (langName: string, langCode: string) => {
    setPrefs({ ...prefs, language: langName });
    setLang(langCode); // This updates the entire site immediately
  };

  const handleFinish = () => {
    setPreferences({
        language: prefs.language,
        mood: prefs.mood,
        category: prefs.category as any,
        budgetRange: [0, 1000000], // Default high budget as step is removed
        style: prefs.style
    });
    navigate('/');
  };

  const steps = [
    {
      title: "Select Your Language",
      subtitle: "Choose your preferred tongue for the VELRA experience.",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => handleLanguageSelect(l.name, l.code)}
              className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                prefs.language === l.name 
                ? 'border-gold bg-burgundy text-gold shadow-lg shadow-gold/20' 
                : 'border-gold-matte/10 bg-beige/30 text-burgundy hover:border-gold'
              }`}
            >
              <span className="text-2xl">{l.icon}</span>
              <span className="text-sm font-black uppercase tracking-widest">{l.name}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Your Shopping Mood",
      subtitle: "Tell us the energy of your journey.",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {MOODS.map(m => (
            <button
              key={m}
              onClick={() => setPrefs({...prefs, mood: m})}
              className={`p-6 rounded-xl border-2 transition-all text-[10px] uppercase tracking-[0.2em] font-black ${prefs.mood === m ? 'border-gold bg-burgundy text-gold shadow-lg shadow-gold/20' : 'border-gold-matte/10 text-burgundy hover:border-gold'}`}
            >
              {m}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "I'm Shopping For",
      subtitle: "Help us refine our curation.",
      content: (
        <div className="grid grid-cols-1 gap-4">
          {CATEGORY_PREFS.map(c => (
            <button
              key={c}
              onClick={() => setPrefs({...prefs, category: c})}
              className={`p-6 rounded-xl border-2 transition-all text-[10px] uppercase tracking-[0.2em] font-black ${prefs.category === c ? 'border-gold bg-burgundy text-gold shadow-lg shadow-gold/20' : 'border-gold-matte/10 text-burgundy hover:border-gold'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Aesthetic Style",
      subtitle: "Define your visual legacy.",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={() => setPrefs({...prefs, style: s})}
              className={`p-6 rounded-xl border-2 transition-all text-[10px] uppercase tracking-[0.2em] font-black ${prefs.style === s ? 'border-gold bg-burgundy text-gold shadow-lg shadow-gold/20' : 'border-gold-matte/10 text-burgundy hover:border-gold'}`}
            >
              {s}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-beige/50">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-lux p-12 relative overflow-hidden border border-gold/10">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gold/10">
          <div className="h-full bg-gold transition-all duration-700 ease-out" style={{ width: `${(step / steps.length) * 100}%` }}></div>
        </div>
        
        <div className="mb-12">
          <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-black">Step {step} of {steps.length}</span>
          <h2 className="text-5xl text-burgundy-dark luxury-serif mt-2 tracking-tight">{steps[step-1].title}</h2>
          <p className="text-gray-400 text-xs italic mt-2">{steps[step-1].subtitle}</p>
        </div>

        <div className="min-h-[340px]">
          {steps[step-1].content}
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-8 py-3 rounded-full text-burgundy font-black uppercase tracking-widest text-[10px] disabled:opacity-20 hover:text-gold transition-colors"
          >
            Back
          </button>
          <button 
            onClick={() => step === steps.length ? handleFinish() : setStep(step + 1)}
            className="lux-button px-12 py-5 rounded-full gold-glow flex items-center gap-3 border-none group"
          >
            <span>{step === steps.length ? "Enter Atelier" : "Continue"}</span>
            <Icons.ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
