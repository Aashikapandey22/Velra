
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CURRENCY, Icons } from '../constants';
import { Category, Product } from '../types';
import { useCart, useTranslation, useProducts } from '../App';
import { ProductCard } from './Home';
import { AnimatePresence, motion } from 'framer-motion';

const FilterGroup = ({ title, children, defaultOpen = true }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gold/10 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full group"
      >
        <h3 className="uppercase tracking-[0.3em] text-[10px] font-black text-gold-matte transition-colors group-hover:text-burgundy">{title}</h3>
        <Icons.ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductListing = () => {
  const { cat } = useParams();
  const { t } = useTranslation();
  const { products, isLoading } = useProducts();
  
  const [filterPrice, setFilterPrice] = useState(100000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(cat ? [cat] : []);
  const [selectedLeathers, setSelectedLeathers] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (cat) setSelectedCategories([cat]);
    else setSelectedCategories([]);
  }, [cat]);

  const toggleFilter = (list: any[], setFn: (l: any[]) => void, val: any) => {
    setFn(list.includes(val) ? list.filter(i => i !== val) : [...list, val]);
  };

  const filteredProducts = useMemo(() => {
    let prods = [...products];
    if (selectedCategories.length > 0) prods = prods.filter(p => selectedCategories.includes(p.category));
    if (selectedLeathers.length > 0) prods = prods.filter(p => selectedLeathers.includes(p.leatherType));
    if (selectedBrands.length > 0) prods = prods.filter(p => selectedBrands.includes(p.brand));
    prods = prods.filter(p => p.price <= filterPrice);
    
    if (sortBy === 'price-low') prods.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') prods.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') prods.sort((a, b) => b.rating - a.rating);
    return prods;
  }, [products, selectedCategories, selectedLeathers, selectedBrands, filterPrice, sortBy]);

  const TopShowcaseBar = () => {
    const categories = Object.values(Category);
    return (
      <div className="sticky top-[88px] lg:top-[116px] z-50 bg-white/95 backdrop-blur-3xl border-b border-gold/10 py-5 overflow-x-auto no-scrollbar shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center gap-4 lg:gap-8 justify-center min-w-max">
          <button 
            onClick={() => setSelectedCategories([])}
            className={`whitespace-nowrap px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategories.length === 0 ? 'bg-burgundy text-gold shadow-gold-glow' : 'bg-beige/50 text-burgundy/40 hover:bg-beige'}`}
          >
            All Masterworks
          </button>
          {categories.map(category => {
            const isActive = selectedCategories.includes(category) && selectedCategories.length === 1;
            return (
              <button 
                key={category} 
                onClick={() => setSelectedCategories([category])} 
                className={`whitespace-nowrap px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isActive ? 'bg-burgundy text-gold shadow-gold-glow' : 'bg-beige/50 text-burgundy/40 hover:bg-beige'}`}
              >
                {t(category.toLowerCase()) || category}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const FilterSidebarContent = () => (
    <div className="space-y-4">
      <FilterGroup title={t('price_range')}>
        <div className="px-1 py-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black text-burgundy/40 tracking-widest uppercase italic">Investment Cap</span>
            <span className="text-burgundy bg-gold/10 px-4 py-1.5 rounded-full text-[12px] font-black shadow-sm">{CURRENCY}{filterPrice.toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" min="2000" max="100000" step="1000" 
            value={filterPrice} 
            onChange={(e) => setFilterPrice(parseInt(e.target.value))} 
            className="w-full accent-burgundy h-1.5 bg-gold/10 rounded-full appearance-none cursor-pointer" 
          />
        </div>
      </FilterGroup>
      <FilterGroup title={t('category')}>
        {Object.values(Category).map(c => (
          <label key={c} className="flex items-center gap-4 group cursor-pointer py-1.5">
            <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${selectedCategories.includes(c) ? 'bg-burgundy border-burgundy' : 'border-gold/20'}`}>
               <input 
                type="checkbox" 
                checked={selectedCategories.includes(c)} 
                onChange={() => toggleFilter(selectedCategories, setSelectedCategories, c)} 
                className="hidden" 
               />
               {selectedCategories.includes(c) && <div className="w-2 h-2 bg-gold rounded-full"></div>}
            </div>
            <span className={`text-[11px] uppercase tracking-widest font-bold transition-colors ${selectedCategories.includes(c) ? 'text-burgundy' : 'text-burgundy-dark/40 group-hover:text-gold'}`}>{c}</span>
          </label>
        ))}
      </FilterGroup>
      <div className="pt-10">
        <button 
          onClick={() => { setSelectedCategories([]); setFilterPrice(100000); }} 
          className="w-full text-gold text-[10px] font-black uppercase tracking-[0.4em] py-4 rounded-2xl border-2 border-gold/20 hover:bg-gold hover:text-white transition-all shadow-sm"
        >
          {t('clear_all')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-beige min-h-screen">
      <TopShowcaseBar />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="space-y-6 flex-1">
            <nav className="text-[11px] uppercase tracking-[0.6em] text-gold font-black mb-4 flex items-center gap-3">
                <Link to="/" className="hover:text-burgundy transition-colors">Atelier</Link> 
                <span className="opacity-30">/</span> 
                <span className="text-burgundy-dark opacity-40">{cat || "The Master Selection"}</span>
            </nav>
            <h1 className="text-7xl md:text-9xl text-burgundy-dark luxury-serif tracking-tighter leading-[0.8]">{cat || "Collection"}</h1>
          </div>
          <div className="flex items-center gap-10">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="bg-white border border-gold/10 text-burgundy-dark font-black uppercase tracking-[0.2em] text-[10px] px-8 py-5 rounded-full outline-none focus:border-gold shadow-sm appearance-none cursor-pointer"
            >
              <option value="featured">The Artisan Choice</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated Patronage</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-[220px] max-h-[calc(100vh-280px)] overflow-y-auto pr-8 custom-scrollbar pb-20">
              <FilterSidebarContent />
            </div>
          </aside>
          <div className="flex-1">
              {isLoading ? (
                <div className="py-48 text-center luxury-serif text-3xl text-gold animate-pulse italic">Retrieving Archives...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24">
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map(p => (
                        <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <ProductCard product={p} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                </div>
              )}
              {!isLoading && filteredProducts.length === 0 && (
                <div className="py-40 text-center">
                  <h3 className="text-3xl luxury-serif text-burgundy-dark mb-4">No creations found.</h3>
                  <p className="text-gray-500 italic">Adjust your filters to reveal our other artisan works.</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
