
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons, CURRENCY } from '../constants';
import { useAuth, useTheme } from '../App';
import { motion } from 'framer-motion';

const OrderTracking = () => {
  const { id } = useParams();
  const { orders } = useAuth();
  const { theme } = useTheme();

  const order = useMemo(() => orders.find(o => o.id === id), [orders, id]);

  const steps = [
    { name: 'Mastercrafting Initiated', status: 'Completed', date: 'Oct 12', desc: 'The base hides have been hand-selected and cut.' },
    { name: 'Quality Appraisal', status: 'Completed', date: 'Oct 13', desc: 'Grain alignment and stitch integrity verified.' },
    { name: 'Artisan Packaging', status: 'Current', date: 'Oct 14', desc: 'Polished, wrapped in cedar-scented tissue, and boxed.' },
    { name: 'Boutique Dispatch', status: 'Pending', date: '-', desc: 'Entrusted to our white-glove logistics partner.' },
    { name: 'Hand Delivery', status: 'Pending', date: '-', desc: 'Arriving at your doorstep with a certificate of authenticity.' },
  ];

  if (!order) {
    return (
      <div className={`min-h-screen relative flex flex-col items-center justify-center text-center p-6 transition-colors duration-500 ${theme === 'day' ? 'bg-beige' : 'bg-burgundy-deep text-beige-ivory'}`}>
        <div className="absolute inset-0 leather-texture opacity-[0.03] pointer-events-none"></div>
        <h1 className="text-5xl luxury-serif mb-6 tracking-tight">Order Archives Not Found</h1>
        <p className="text-gray-500 italic mb-12">We couldn't locate acquisition reference {id} in our boutique logs.</p>
        <Link to="/dashboard" className="lux-button px-12 py-5 inline-block border-none">Return to Profile</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 pb-24 ${theme === 'day' ? 'bg-beige' : 'bg-burgundy-deep text-beige-ivory'}`}>
      <div className="absolute inset-0 leather-texture opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 relative z-10">
        <div className="mb-20">
          <div className="text-center space-y-6">
            <span className="text-gold uppercase tracking-[0.8em] text-[10px] font-black">The Journey of Legacy</span>
            <h1 className={`text-6xl md:text-8xl luxury-serif tracking-tighter leading-none ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Tracking {id}</h1>
            <div className={`w-24 h-[1px] mx-auto ${theme === 'day' ? 'bg-gold/30' : 'bg-gold/10'}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Progress Timeline */}
          <div className="lg:col-span-2 space-y-12">
            <div className={`rounded-[3rem] p-12 border shadow-lux relative overflow-hidden transition-all ${
              theme === 'day' ? 'bg-white/80 backdrop-blur-3xl border-gold/10' : 'bg-black/30 backdrop-blur-3xl border-white/10'
            }`}>
               <div className="absolute top-0 right-0 w-48 h-48 leather-texture opacity-[0.05] rotate-12 translate-x-12 -translate-y-12 pointer-events-none"></div>
               
               <div className="relative">
                  {/* Vertical Line */}
                  <div className={`absolute left-8 top-0 bottom-0 w-0.5 transition-colors ${theme === 'day' ? 'bg-gold/10' : 'bg-white/5'}`}></div>
                  
                  <div className="space-y-16">
                    {steps.map((step, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex items-start gap-10 group"
                      >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 transition-all duration-700 
                          ${step.status === 'Completed' ? 'bg-burgundy text-gold shadow-lg shadow-burgundy/20' : 
                            step.status === 'Current' ? 'bg-gold text-burgundy animate-pulse scale-110 shadow-2xl shadow-gold/40' : 
                            'bg-beige text-burgundy/20 border border-gold/5'}`}
                        >
                          {step.status === 'Completed' ? <Icons.Star className="w-6 h-6 fill-current" /> : (i + 1)}
                        </div>
                        <div className={`flex-1 pb-10 border-b transition-colors ${theme === 'day' ? 'border-gold/5' : 'border-white/5'}`}>
                          <div className="flex justify-between items-baseline mb-2">
                             <h3 className={`text-2xl luxury-serif ${step.status === 'Pending' ? 'opacity-30' : ''}`}>
                                {step.name}
                             </h3>
                             <span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'Current' ? 'text-gold' : 'opacity-40'}`}>
                                {step.status === 'Current' ? 'Presently' : step.date}
                             </span>
                          </div>
                          <p className={`text-sm leading-relaxed italic ${step.status === 'Pending' ? 'opacity-30' : theme === 'day' ? 'text-gray-500' : 'text-gray-400'}`}>
                             {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
            </div>
            
            <div className={`rounded-[2rem] p-12 text-center space-y-6 shadow-2xl transition-all ${
              theme === 'day' ? 'bg-burgundy text-beige-ivory' : 'bg-white/5 border border-white/10'
            }`}>
              <h4 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black">A Personal Note</h4>
              <p className={`text-2xl luxury-serif italic leading-relaxed ${theme === 'day' ? 'text-beige-ivory' : 'text-white'}`}>
                "Crafted just for you. Every crease and grain in this leather is a testament to the artisan's journey. We hope it becomes an enduring part of your story."
              </p>
              <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-8"></div>
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-8 sticky top-32">
            <div className={`rounded-[3rem] p-10 border shadow-lux transition-all ${
              theme === 'day' ? 'bg-ivory/80 backdrop-blur-xl border-gold/15' : 'bg-black/40 backdrop-blur-xl border-white/10'
            }`}>
               <h2 className={`text-3xl luxury-serif mb-10 pb-6 border-b transition-colors ${theme === 'day' ? 'text-burgundy-dark border-gold/10' : 'text-beige-ivory border-white/10'}`}>Acquired Assets</h2>
               <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                  {order.items.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-28 bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0 border border-gold/5">
                        <img src={item.images[0]} className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${theme === 'night' ? 'brightness-75' : ''}`} alt={item.name} />
                      </div>
                      <div className="flex-1 space-y-2 flex flex-col justify-center">
                        <h4 className={`text-sm luxury-serif transition-colors ${theme === 'day' ? 'text-burgundy' : 'text-beige-ivory group-hover:text-gold'}`}>{item.name}</h4>
                        <div className="flex justify-between items-center">
                           <p className="text-[9px] uppercase tracking-widest text-gold font-black">{item.category} • {item.quantity}</p>
                           <p className={`text-sm font-black ${theme === 'day' ? 'text-burgundy-dark' : 'text-gold'}`}>{CURRENCY}{item.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
               
               <div className={`mt-12 pt-10 border-t space-y-6 transition-colors ${theme === 'day' ? 'border-gold/20' : 'border-white/10'}`}>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-400 uppercase tracking-widest font-black text-[9px]">Investment Capital</span>
                     <span className={`font-black text-2xl tracking-tighter ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{CURRENCY}{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={`p-6 rounded-2xl border transition-all ${theme === 'day' ? 'bg-white/50 border-gold/5' : 'bg-white/5 border-white/5'}`}>
                     <p className="text-[9px] text-gold uppercase font-black tracking-widest mb-2">Delivery Log</p>
                     <p className={`text-xs italic leading-relaxed ${theme === 'day' ? 'text-burgundy/80' : 'text-gray-300'}`}>{order.shippingAddress}</p>
                  </div>
                  <button className={`w-full py-4 rounded-xl border text-[9px] font-black tracking-[0.4em] transition-all uppercase ${
                    theme === 'day' ? 'border-gold/30 text-gold hover:bg-gold hover:text-white' : 'border-gold/20 text-gold hover:bg-gold hover:text-burgundy'
                  }`}>
                     Print Appraisal Certificate
                  </button>
               </div>
            </div>

            <div className={`rounded-3xl p-8 border text-center transition-all ${theme === 'day' ? 'bg-white/40 border-gold/5' : 'bg-white/5 border-white/5'}`}>
               <h5 className="text-[10px] uppercase tracking-widest font-black text-gold mb-6 italic">Artisan Suggestions</h5>
               <div className="flex flex-col gap-4">
                  <Link to="/products" className="lux-button px-10 py-4 inline-block">Continue Discovering</Link>
                  <Link to="/legal" className={`text-[9px] font-black uppercase border-b pb-1 self-center transition-colors ${theme === 'day' ? 'text-burgundy border-gold/40' : 'text-gray-400 border-white/10 hover:text-gold'}`}>Care Protocols</Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
