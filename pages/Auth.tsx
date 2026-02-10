
import React, { useState } from 'react';
import { useAuth } from '../App';
import { Icons } from '../constants';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) login(email);
  };

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden bg-burgundy">
        <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale contrast-125"
            alt="Leather Detail"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center space-y-12 bg-burgundy/40 backdrop-blur-[2px]">
            <Icons.Star className="w-20 h-20 text-gold opacity-30 animate-pulse" />
            <div className="space-y-4">
                <h2 className="text-8xl text-beige-ivory luxury-serif tracking-tighter leading-none">The <br/> <span className="text-gold italic">Atelier</span></h2>
                <p className="text-gold uppercase tracking-[0.8em] text-[10px] font-black">Private Circle • Est. 1984</p>
            </div>
            <div className="w-1 bg-gold/20 h-32"></div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-burgundy-deep leather-texture">
        <div className="max-w-md w-full space-y-12">
          <div className="text-center">
            <h1 className="text-5xl text-beige-ivory luxury-serif mb-4 tracking-tighter">{isLogin ? "Welcome Back" : "Join the Circle"}</h1>
            <p className="text-gold uppercase tracking-[0.5em] text-[9px] font-black opacity-60">Premium Access to VELRA Studio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <input 
                type="text" placeholder="FULL NAME" 
                className="w-full bg-white/5 border border-white/10 text-white rounded-sm p-5 outline-none focus:border-gold transition-all text-[10px] tracking-widest placeholder:text-white/20 uppercase"
              />
            )}
            <input 
              type="email" placeholder="EMAIL ADDRESS" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-sm p-5 outline-none focus:border-gold transition-all text-[10px] tracking-widest placeholder:text-white/20 uppercase"
            />
            <input 
              type="password" placeholder="PASSWORD" 
              required
              className="w-full bg-white/5 border border-white/10 text-white rounded-sm p-5 outline-none focus:border-gold transition-all text-[10px] tracking-widest placeholder:text-white/20 uppercase"
            />
            
            <button className="w-full bg-gold text-burgundy-deep py-6 rounded-full font-black uppercase tracking-[0.4em] shadow-gold-glow text-[10px] hover:bg-white hover:text-burgundy transition-all">
              {isLogin ? "Enter Boutique" : "Create Master Profile"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em] font-black"><span className="px-6 bg-burgundy-deep text-white/40 italic">Authenticate via</span></div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-full hover:bg-white/10 transition-all font-black text-[9px] uppercase tracking-widest text-white/60">
                Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-full hover:bg-white/10 transition-all font-black text-[9px] uppercase tracking-widest text-white/60">
                Phone
            </button>
          </div>

          <p className="text-center text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold">
            {isLogin ? "New to VELRA?" : "Already an owner?"} 
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-4 text-gold font-black border-b border-gold/30 pb-0.5 hover:text-white hover:border-white transition-all"
            >
                {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
