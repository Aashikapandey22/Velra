
import React from 'react';
import { useTheme } from '../App';

const Legal = () => {
  const { theme } = useTheme();
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
      <section className="space-y-6">
        <h1 className={`text-6xl luxury-serif tracking-tight ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Boutique Protocols</h1>
        <p className="text-gold uppercase tracking-[0.5em] text-[10px] font-black italic">Integrity, Excellence & Legacy</p>
      </section>

      <div className="space-y-16">
        <section className="space-y-6">
          <h2 className={`text-3xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-gold'}`}>Patron Privacy</h2>
          <p className={`leading-relaxed text-lg font-light italic ${theme === 'day' ? 'text-gray-600' : 'text-gray-400'}`}>
            "At VELRA, we handle your personal data with the same uncompromising care we apply to our finest full-grain leathers. Your information is a mark of trust, and we honor it by never sharing it with unauthorized third parties."
          </p>
        </section>

        <section className="space-y-6">
          <h2 className={`text-3xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-gold'}`}>Artisanal Warranty</h2>
          <p className={`leading-relaxed text-lg font-light italic ${theme === 'day' ? 'text-gray-600' : 'text-gray-400'}`}>
            "Every VELRA piece is covered by a lifetime master-crafting warranty. As leather is a living, natural material, variations in grain and character are marks of artisanal authenticity, not flaws in the legacy."
          </p>
        </section>

        <section className="space-y-6">
          <h2 className={`text-3xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-gold'}`}>Luxury Logistics</h2>
          <p className={`leading-relaxed text-lg font-light italic ${theme === 'day' ? 'text-gray-600' : 'text-gray-400'}`}>
            "We offer complimentary white-glove shipping across the subcontinent for all acquisitions. Should you seek an alternative, returns are respectfully accepted within 7 days with security seals intact."
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
