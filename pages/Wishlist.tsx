
import React from 'react';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { CURRENCY, Icons } from '../constants';
import { Link } from 'react-router-dom';
import { useCart, useTheme } from '../App';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  // Simulating a wishlist from mock data
  const wishlistItems = MOCK_PRODUCTS.slice(4, 7);

  if (wishlistItems.length === 0) return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 ${theme === 'day' ? 'bg-beige' : 'bg-burgundy-deep text-beige-ivory'}`}>
      <div className="absolute inset-0 leather-texture opacity-[0.03] pointer-events-none"></div>
      <div className="w-32 h-32 bg-gold/5 rounded-full flex items-center justify-center mb-10 text-gold/30">
        <Icons.Heart className="w-16 h-16" />
      </div>
      <h1 className="text-5xl luxury-serif mb-6 tracking-tight">The Desire Gallery is Empty</h1>
      <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-black italic mb-12">Capture your inspirations for the future</p>
      <Link to="/products" className="lux-button px-12 py-5 inline-block border-none">Begin Selection</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className={`text-6xl luxury-serif tracking-tight ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Desire Gallery</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {wishlistItems.map((p, idx) => (
          <motion.div 
            key={p.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group rounded-[2.5rem] p-8 border transition-all hover:shadow-lux ${
              theme === 'day' ? 'bg-white border-gold/10' : 'bg-white/5 border-white/5 hover:border-gold/20'
            }`}
          >
            <Link to={`/product/${p.id}`} className={`block relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 border ${theme === 'day' ? 'bg-gray-50 border-gold/5' : 'bg-black/40 border-white/5'}`}>
              <img src={p.images[0]} className={`w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${theme === 'night' ? 'brightness-90' : ''}`} alt={p.name} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
            </Link>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] text-gold uppercase tracking-[0.5em] font-black">{p.category}</p>
                  <h3 className={`luxury-serif text-3xl transition-colors ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory group-hover:text-gold'}`}>{p.name}</h3>
                </div>
                <button className={`p-2 transition-colors ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>
                  <Icons.Heart className="w-8 h-8 fill-current" />
                </button>
              </div>
              <p className={`text-2xl font-black tracking-tighter ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>
                {CURRENCY}{p.price.toLocaleString('en-IN')}
              </p>
              <button 
                onClick={() => addToCart(p)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.4em] transition-all text-[10px] shadow-sm flex items-center justify-center gap-3 ${
                  theme === 'day' ? 'lux-button' : 'bg-gold text-burgundy shadow-gold-glow hover:bg-beige-ivory'
                }`}
              >
                <span>Move to Boutique Bag</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
