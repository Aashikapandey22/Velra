
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, CartItem, Order, UserPreferences, OrderStatus } from './types';
import { fetchBoutiqueCatalog } from './utils/mockData';
import { Icons, CURRENCY, TRANSLATIONS, LANGUAGES } from './constants';
import ChatAssistant from './components/ChatAssistant';

interface LanguageContextType {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

interface ThemeContextType {
  theme: 'day' | 'night';
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useTheme = () => useContext(ThemeContext)!;

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  refreshCatalog: () => Promise<void>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const useProducts = () => useContext(ProductContext)!;

interface AuthContextType {
  user: any;
  login: (email: string) => void;
  logout: () => void;
  preferences: UserPreferences | null;
  setPreferences: (p: UserPreferences) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface CartContextType {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext)!;
export const useCart = () => useContext(CartContext)!;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const FloatingHomeButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (pathname === '/') return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onClick={() => navigate('/')}
      className={`fixed bottom-24 left-8 z-[140] flex items-center gap-3 px-6 py-4 rounded-full shadow-lux border backdrop-blur-md transition-all group ${
        theme === 'day' 
          ? 'bg-white/90 border-gold/10 text-burgundy hover:bg-gold hover:text-white' 
          : 'bg-burgundy-deep/90 border-white/10 text-gold shadow-gold-glow hover:bg-gold hover:text-burgundy'
      }`}
    >
      <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Home</span>
    </motion.button>
  );
};

const PageTransition = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { cart } = useCart();
  const { user, wishlist } = useAuth();
  const { lang, setLang, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      isScrolled || !isHome 
        ? theme === 'day' ? 'bg-white/95 backdrop-blur-3xl py-4 border-b border-gold/15 shadow-sm' : 'bg-burgundy-deep/95 backdrop-blur-3xl py-4 border-b border-gold/15 shadow-lux'
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        <Link to="/" className={`text-2xl lg:text-3xl font-black tracking-[0.8em] luxury-serif transition-colors duration-500 hover:text-gold shrink-0 ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>
          VELRA
        </Link>

        <div className="flex-1 max-w-sm hidden md:flex relative group px-4">
          <input 
            type="text" 
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-full py-2 pl-10 pr-6 text-xs font-medium placeholder:text-gray-400 outline-none focus:border-gold transition-all shadow-inner ${theme === 'day' ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10 text-beige-ivory'}`}
          />
          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all group relative overflow-hidden flex items-center justify-center border ${theme === 'day' ? 'bg-gray-100 border-gray-200 text-burgundy' : 'bg-white/5 border-white/10 text-gold'}`}
          >
            <motion.div
              animate={{ rotate: theme === 'day' ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'day' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </motion.div>
          </button>

          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-2 border rounded-full px-4 py-2 hover:border-gold transition-all text-[10px] font-black uppercase tracking-widest shadow-sm ${theme === 'day' ? 'bg-white border-gray-200 text-burgundy' : 'bg-white/5 border-white/10 text-beige-ivory'}`}
            >
              <Icons.Globe className="w-4 h-4" />
              <span>{LANGUAGES.find(l => l.code === lang)?.name}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute top-full right-0 mt-2 w-48 border rounded-2xl shadow-2xl overflow-hidden py-2 ${theme === 'day' ? 'bg-white border-gold/10' : 'bg-burgundy-deep border-white/10'}`}
                >
                  {LANGUAGES.map(l => (
                    <button 
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all flex items-center gap-3 ${lang === l.code ? 'text-gold bg-gold/5' : theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}
                    >
                      <span className="text-base">{l.icon}</span>
                      {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/wishlist" className={`relative group p-2 rounded-full transition-all ${theme === 'day' ? 'hover:bg-gray-100 text-burgundy' : 'hover:bg-white/10 text-beige-ivory'}`}>
            <Icons.Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-gold text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className={`relative group p-2 rounded-full transition-all ${theme === 'day' ? 'hover:bg-gray-100 text-burgundy' : 'hover:bg-white/10 text-beige-ivory'}`}>
            <Icons.ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-burgundy-cherry text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-white">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <Link to="/dashboard" className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-md ${theme === 'day' ? 'bg-burgundy text-white hover:bg-burgundy-cherry' : 'bg-gold text-burgundy hover:bg-beige-ivory'}`}>{t('profile')}</Link>
          ) : (
            <Link to="/auth" className={`text-[10px] font-black uppercase tracking-widest border px-6 py-2.5 rounded-full transition-all shadow-sm ${theme === 'day' ? 'border-burgundy text-burgundy hover:bg-burgundy hover:text-white' : 'border-gold text-gold hover:bg-gold hover:text-burgundy'}`}>{t('login')}</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
  <footer className={`border-t relative overflow-hidden ${theme === 'day' ? 'bg-white text-burgundy-deep border-gold/10' : 'bg-burgundy-deep text-beige-ivory border-white/10'}`}>
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 space-y-10">
          <Link to="/" className={`text-3xl font-bold tracking-[0.6em] luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>VELRA</Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm italic">
            Chaptered luxury for the global elite. Handcrafted heritage, redefined for the modern connoisseur of fine leather works.
          </p>
        </div>
        <div>
          <h3 className="text-gold-matte uppercase text-[10px] tracking-[0.6em] font-black mb-10">{t('the_collections')}</h3>
          <ul className={`space-y-4 text-[11px] font-bold uppercase tracking-[0.2em] ${theme === 'day' ? 'text-burgundy/40' : 'text-white/40'}`}>
            <li><Link to="/category/Jackets" className="hover:text-gold transition-colors">01 {t('jackets')}</Link></li>
            <li><Link to="/category/Shoes" className="hover:text-gold transition-colors">02 {t('shoes')}</Link></li>
            <li><Link to="/category/Watches" className="hover:text-gold transition-colors">03 {t('watches')}</Link></li>
            <li><Link to="/category/Bags" className="hover:text-gold transition-colors">04 {t('bags')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gold-matte uppercase text-[10px] tracking-[0.6em] font-black mb-10">Concierge</h3>
          <ul className={`space-y-4 text-[11px] font-bold uppercase tracking-[0.2em] ${theme === 'day' ? 'text-burgundy/40' : 'text-white/40'}`}>
            <li><Link to="/dashboard" className="hover:text-gold transition-colors">Account</Link></li>
            <li><Link to="/legal" className="hover:text-gold transition-colors">Care Guide</Link></li>
            <li><Link to="/legal" className="hover:text-gold transition-colors">Returns</Link></li>
          </ul>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-gold-matte uppercase text-[10px] tracking-[0.6em] font-black mb-10">In the Circle</h3>
            <div className={`flex border-b pb-2 group focus-within:border-gold transition-all ${theme === 'day' ? 'border-gold/20' : 'border-white/10'}`}>
              <input type="email" placeholder="Updates" className="bg-transparent border-none outline-none text-[10px] tracking-[0.2em] flex-1 font-bold placeholder:text-gray-300 uppercase" />
              <button className="text-gold font-black text-lg">→</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-20 pt-10 border-t flex flex-col lg:flex-row justify-between items-center text-[9px] uppercase tracking-[0.4em] font-black gap-8 ${theme === 'day' ? 'border-gold/5 text-burgundy/20' : 'border-white/5 text-white/20'}`}>
        <p>&copy; 2024 VELRA STUDIO. HANDCRAFTED IN INDIA.</p>
        <div className="flex gap-10">
          <Link to="/legal" className="hover:text-gold transition-colors">Privacy</Link>
          <Link to="/legal" className="hover:text-gold transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lang, setLang] = useState(() => localStorage.getItem('velra_lang') || 'en');
  const [theme, setTheme] = useState<'day' | 'night'>(() => (localStorage.getItem('velra_theme') as 'day' | 'night') || 'day');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    localStorage.setItem('velra_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('velra_theme', theme);
    if (theme === 'night') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'day' ? 'night' : 'day');

  const t = (key: string) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  const refreshCatalog = async () => {
    setIsLoadingProducts(true);
    try {
      const data = await fetchBoutiqueCatalog();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch curated catalog", err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    refreshCatalog();

    const savedUser = localStorage.getItem('velra_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedPrefs = localStorage.getItem('velra_prefs');
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
    const savedCart = localStorage.getItem('velra_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWish = localStorage.getItem('velra_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
    const savedOrders = localStorage.getItem('velra_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (email: string) => {
    const u = { email, id: 'user_' + Date.now() };
    setUser(u);
    localStorage.setItem('velra_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velra_user');
  };

  const handleSetPreferences = (p: UserPreferences) => {
    setPreferences(p);
    localStorage.setItem('velra_prefs', JSON.stringify(p));
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      const updated = existing 
        ? prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...p, quantity: 1, giftWrap: false }];
      localStorage.setItem('velra_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('velra_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id: string, q: number) => {
    setCart(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, q) } : item);
      localStorage.setItem('velra_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('velra_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (order: Order) => {
    setOrders(prev => {
      const updated = [order, ...prev];
      localStorage.setItem('velra_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('velra_cart');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductContext.Provider value={{ products, isLoading: isLoadingProducts, refreshCatalog }}>
          <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            preferences, 
            setPreferences: handleSetPreferences, 
            wishlist, 
            toggleWishlist,
            orders,
            addOrder
          }}>
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
              <HashRouter>
                <ScrollToTop />
                <div className={`min-h-screen flex flex-col overflow-x-hidden custom-scrollbar transition-colors duration-500 ${theme === 'day' ? 'bg-beige' : 'bg-burgundy-deep text-beige-ivory'}`}>
                  <Navbar />
                  <FloatingHomeButton />
                  <main className="flex-grow pt-[88px] lg:pt-[100px]">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                        <Route path="/auth" element={user ? <Navigate to="/onboarding" /> : <PageTransition><Auth /></PageTransition>} />
                        <Route path="/onboarding" element={user ? <PageTransition><Onboarding /></PageTransition> : <Navigate to="/auth" />} />
                        <Route path="/products" element={<PageTransition><ProductListing /></PageTransition>} />
                        <Route path="/category/:cat" element={<PageTransition><ProductListing /></PageTransition>} />
                        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
                        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
                        <Route path="/checkout" element={user ? <PageTransition><Checkout /></PageTransition> : <Navigate to="/auth" />} />
                        <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />
                        <Route path="/dashboard" element={user ? <PageTransition><UserDashboard /></PageTransition> : <Navigate to="/auth" />} />
                        <Route path="/admin" element={user?.email === 'admin@velra.com' ? <PageTransition><AdminDashboard /></PageTransition> : <Navigate to="/" />} />
                        <Route path="/track/:id" element={<PageTransition><OrderTracking /></PageTransition>} />
                        <Route path="/legal" element={<PageTransition><Legal /></PageTransition>} />
                      </Routes>
                    </AnimatePresence>
                  </main>
                  <Footer />
                  <ChatAssistant />
                </div>
              </HashRouter>
            </CartContext.Provider>
          </AuthContext.Provider>
        </ProductContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';
import Legal from './pages/Legal';
