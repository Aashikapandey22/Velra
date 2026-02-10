
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useTheme } from '../App';
import { CURRENCY, Icons } from '../constants';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-12">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors ${theme === 'day' ? 'bg-burgundy/5 text-burgundy/20' : 'bg-white/5 text-white/20'}`}>
            <Icons.ShoppingCart className="w-16 h-16" />
        </div>
        <div className="text-center space-y-4">
            <h1 className={`text-4xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Your Bag is Empty</h1>
            <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-black italic">Begin your luxury journey today</p>
        </div>
        <Link to="/products" className="lux-button px-12 py-5 inline-block">Discover Collections</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className={`text-5xl luxury-serif tracking-tight ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>The Boutique Bag</h1>
        </div>
        <div className={`text-[10px] uppercase tracking-[0.4em] font-black ${theme === 'day' ? 'text-gold' : 'text-gold/60'}`}>
          {cart.length} Masterwork{cart.length > 1 ? 's' : ''} Selected
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group rounded-[2rem] p-8 border transition-all flex flex-col sm:flex-row gap-8 ${
                theme === 'day' 
                  ? 'bg-white border-gold/10 hover:shadow-lux' 
                  : 'bg-white/5 border-white/5 hover:border-gold/20 hover:shadow-gold-glow'
              }`}
            >
              <div className="w-full sm:w-44 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gold/5 shadow-sm">
                <img src={item.images[0]} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${theme === 'night' ? 'brightness-90' : ''}`} alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className={`luxury-serif text-3xl transition-colors ${theme === 'day' ? 'text-burgundy group-hover:text-gold' : 'text-beige-ivory group-hover:text-gold'}`}>{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-gray-400 hover:text-burgundy transition-colors uppercase text-[9px] font-black tracking-widest border-b border-transparent hover:border-burgundy"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gold font-black uppercase tracking-widest px-3 py-1 bg-gold/10 rounded-full">{item.category}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{item.leatherType}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-10">
                  <div className={`flex items-center gap-6 border rounded-full px-5 py-2 transition-colors ${theme === 'day' ? 'bg-beige/50 border-gold/10' : 'bg-white/5 border-white/10'}`}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className={`text-xl font-bold transition-colors ${theme === 'day' ? 'text-burgundy hover:text-gold' : 'text-gold hover:text-white'}`}
                    >-</button>
                    <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className={`text-xl font-bold transition-colors ${theme === 'day' ? 'text-burgundy hover:text-gold' : 'text-gold hover:text-white'}`}
                    >+</button>
                  </div>
                  <div className={`text-2xl font-black tracking-tight ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>
                    {CURRENCY}{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className={`rounded-[3rem] p-10 border sticky top-32 shadow-lux transition-all ${theme === 'day' ? 'bg-ivory border-gold/15' : 'bg-black/40 border-white/10'}`}>
            <h2 className={`text-3xl luxury-serif mb-10 pb-6 border-b ${theme === 'day' ? 'text-burgundy-dark border-gold/10' : 'text-beige-ivory border-white/10'}`}>Acquisition Order</h2>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase tracking-widest font-black">Investment Subtotal</span>
                <span className={`font-black ${theme === 'day' ? 'text-burgundy' : 'text-beige-ivory'}`}>{CURRENCY}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase tracking-widest font-black">Priority Shipping</span>
                <span className="text-gold font-black tracking-widest">Complimentary</span>
              </div>
              <div className={`pt-8 border-t flex justify-between items-baseline ${theme === 'day' ? 'border-gold/20' : 'border-white/10'}`}>
                <span className={`text-xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Total</span>
                <span className={`text-3xl font-black tracking-tighter ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{CURRENCY}{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full lux-button py-6 rounded-2xl text-[10px] shadow-gold-glow group flex items-center justify-center gap-3"
              >
                <span>Continue to Checkout</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </button>
              
              <div className={`flex items-center justify-center gap-4 py-5 border-2 border-dashed rounded-2xl transition-colors ${theme === 'day' ? 'border-gold/20' : 'border-white/10'}`}>
                 <img src="https://www.razorpay.com/favicon.png" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Razorpay" />
                 <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">Razorpay Secure Protocol</span>
              </div>
            </div>
          </div>
          
          <div className={`rounded-3xl p-8 border text-center transition-all ${theme === 'day' ? 'bg-white border-gold/10' : 'bg-white/5 border-white/10'}`}>
            <h4 className={`font-black uppercase tracking-[0.5em] text-[10px] mb-4 ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>The VELRA Guarantee</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed italic">"Every handcrafted piece comes with our lifetime craftsmanship guarantee. Experience excellence that truly lasts across generations."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
