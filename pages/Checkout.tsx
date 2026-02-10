
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth, useTheme } from '../App';
import { CURRENCY, Icons } from '../constants';
import { OrderStatus, Order } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

type PaymentMethod = 'online' | 'cod' | 'emi';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [emiTenure, setEmiTenure] = useState(3);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // Updated from 18% to 12%
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  const handlePayment = () => {
    if (!formData.name || !formData.address || !formData.phone) {
        alert("Please fill in your shipping details.");
        return;
    }
    
    setIsProcessing(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
      const orderId = `VLR-${Math.floor(Math.random() * 1000000)}`;
      const newOrder: Order = {
        id: orderId,
        userId: user?.id || 'guest',
        items: [...cart],
        totalAmount: total,
        status: OrderStatus.ORDERED,
        paymentId: paymentMethod === 'cod' ? 'COD-PENDING' : `PAY-${Date.now()}`,
        timestamp: new Date().toISOString(),
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.pincode}`
      };

      addOrder(newOrder);
      setIsProcessing(false);
      clearCart();
      navigate('/thank-you', { state: { orderId } });
    }, 2000);
  };

  const inputClass = `w-full border rounded-2xl p-5 outline-none transition-all text-sm font-medium ${
    theme === 'day' 
      ? 'bg-white border-gold/20 focus:border-burgundy' 
      : 'bg-white/5 border-white/10 text-beige-ivory focus:border-gold'
  }`;

  const PaymentOption = ({ id, title, subtitle, icon }: { id: PaymentMethod, title: string, subtitle: string, icon: React.ReactNode }) => {
    const isActive = paymentMethod === id;
    return (
      <button 
        onClick={() => setPaymentMethod(id)}
        className={`w-full p-6 rounded-3xl border text-left transition-all flex items-center justify-between group ${
          isActive 
            ? theme === 'day' ? 'bg-burgundy text-gold border-gold shadow-lg' : 'bg-gold text-burgundy border-white/20 shadow-gold-glow'
            : theme === 'day' ? 'bg-white border-gold/10 hover:border-gold' : 'bg-white/5 border-white/5 hover:border-gold/40'
        }`}
      >
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isActive 
              ? theme === 'day' ? 'bg-gold text-burgundy' : 'bg-burgundy text-gold'
              : theme === 'day' ? 'bg-gray-100 text-burgundy' : 'bg-white/10 text-gold'
          }`}>
            {icon}
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-[10px]">{title}</p>
            <p className={`text-[9px] uppercase tracking-widest mt-1 opacity-60`}>{subtitle}</p>
          </div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          isActive 
            ? theme === 'day' ? 'border-gold' : 'border-burgundy'
            : 'border-gray-300'
        }`}>
          {isActive && <div className={`w-2.5 h-2.5 rounded-full ${theme === 'day' ? 'bg-gold' : 'bg-burgundy'}`}></div>}
        </div>
      </button>
    );
  };

  if (cart.length === 0) return (
    <div className="text-center py-40 px-6">
      <h1 className={`text-5xl luxury-serif mb-8 ${theme === 'day' ? 'text-burgundy' : 'text-beige-ivory'}`}>Your boutique bag is empty.</h1>
      <button onClick={() => navigate('/products')} className="text-gold uppercase tracking-[0.5em] font-black text-[10px] border-b-2 border-gold pb-2 hover:text-burgundy transition-all">Return to Gallery</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className={`text-6xl luxury-serif tracking-tight ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Boutique Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <section className="space-y-10">
            <h2 className="uppercase tracking-[0.5em] text-[10px] font-black text-gold">I. Shipping Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input 
                type="text" placeholder="Full Name" 
                className={inputClass}
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="tel" placeholder="Phone Number" 
                className={inputClass}
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                type="text" placeholder="Delivery Address" 
                className={`${inputClass} md:col-span-2`}
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
              />
              <input 
                type="text" placeholder="City" 
                className={inputClass}
                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
              />
              <input 
                type="text" placeholder="Pincode" 
                className={inputClass}
                value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})}
              />
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="uppercase tracking-[0.5em] text-[10px] font-black text-gold">II. Secure Payment Method</h2>
            <div className="space-y-4">
              <PaymentOption 
                id="online" 
                title="Online Payment" 
                subtitle="UPI, Cards, Netbanking (Razorpay)" 
                icon={<Icons.ShoppingCart className="w-5 h-5" />}
              />
              <PaymentOption 
                id="cod" 
                title="Cash on Delivery" 
                subtitle="Pay upon master-delivery" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <PaymentOption 
                id="emi" 
                title="Luxury Installments (EMI)" 
                subtitle="Spread the investment" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
              />
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === 'emi' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-8 rounded-3xl border space-y-6 ${theme === 'day' ? 'bg-beige/50 border-gold/10' : 'bg-white/5 border-white/5'}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold">Select Tenure</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[3, 6, 9].map(m => (
                      <button 
                        key={m}
                        onClick={() => setEmiTenure(m)}
                        className={`py-4 rounded-xl border text-[10px] font-black transition-all ${
                          emiTenure === m 
                            ? theme === 'day' ? 'bg-burgundy text-gold border-burgundy' : 'bg-gold text-burgundy border-gold'
                            : theme === 'day' ? 'bg-white border-gold/10' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        {m} Months {m === 3 && "(0%)"}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-gray-400 italic font-bold uppercase tracking-widest">
                    Monthly Investment: {CURRENCY}{Math.round(total / emiTenure).toLocaleString('en-IN')}
                  </p>
                </motion.div>
              )}

              {paymentMethod === 'cod' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-6 rounded-3xl border-2 border-dashed border-gold/20 flex items-center gap-4 ${theme === 'day' ? 'bg-ivory/50' : 'bg-black/20'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Icons.Star className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic leading-relaxed">
                    A Concierge will call to verify your master-delivery address before dispatch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] shadow-lux text-xs disabled:opacity-50 transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
              theme === 'day' ? 'lux-button' : 'bg-gold text-burgundy shadow-gold-glow'
            }`}
          >
            {isProcessing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>
                  {paymentMethod === 'online' ? "Submit Secure Payment" : paymentMethod === 'cod' ? "Confirm COD Order" : `Proceed with ${emiTenure}M EMI`} 
                  {" "}({CURRENCY}{total.toLocaleString('en-IN')})
                </span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </>
            )}
          </button>
        </div>

        {/* Summary */}
        <div className={`rounded-[3rem] p-12 border h-fit sticky top-32 shadow-lux transition-all ${
          theme === 'day' ? 'bg-beige/40 border-gold/15' : 'bg-black/30 border-white/10'
        }`}>
          <h2 className={`text-3xl luxury-serif mb-12 pb-6 border-b ${theme === 'day' ? 'text-burgundy-dark border-gold/10' : 'text-beige-ivory border-white/10'}`}>Review Selection</h2>
          <div className="space-y-10 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            {cart.map((item, idx) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="w-24 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gold/5 shadow-sm">
                  <img src={item.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.name} />
                </div>
                <div className="flex-1 space-y-2 flex flex-col justify-center">
                  <h4 className={`luxury-serif text-lg leading-tight transition-colors ${theme === 'day' ? 'text-burgundy' : 'text-beige-ivory group-hover:text-gold'}`}>{item.name}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Qty: {item.quantity}</p>
                    <p className={`font-black text-sm ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{CURRENCY}{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className={`space-y-6 pt-10 border-t ${theme === 'day' ? 'border-gold/20' : 'border-white/10'}`}>
            <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-gray-400">
              <span>Subtotal</span>
              <span className={theme === 'day' ? 'text-burgundy' : 'text-beige-ivory'}>{CURRENCY}{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-gray-400">
              <span>GST / Taxes (12%)</span>
              <span className={theme === 'day' ? 'text-burgundy' : 'text-beige-ivory'}>{CURRENCY}{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-widest font-black text-gray-400">
              <span>Shipping Fee</span>
              <span className="text-gold">{shipping === 0 ? 'COMPLIMENTARY' : `${CURRENCY}${shipping}`}</span>
            </div>
            <div className={`flex justify-between items-baseline pt-8 border-t ${theme === 'day' ? 'border-gold/10' : 'border-white/5'}`}>
              <span className={`text-2xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Total Acquisition</span>
              <span className={`text-4xl font-black tracking-tighter ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{CURRENCY}{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
