
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icons, CURRENCY } from '../constants';
import { useCart, useTranslation, useProducts, useTheme, useAuth } from '../App';
import { Category } from '../types';

export const CategoryCard = ({ title, subtitle, image, link, label }: { title: string, subtitle: string, image: string, link: string, label?: string }) => {
  const { theme } = useTheme();
  return (
    <Link to={link} className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg transition-all duration-700 hover:-translate-y-2 ${theme === 'day' ? 'bg-burgundy-deep hover:shadow-gold-glow' : 'bg-black hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]'}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-60"></div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100" 
      />
      {label && (
        <div className="absolute top-0 right-0 z-30 overflow-hidden w-32 h-32 pointer-events-none">
          <div className="absolute top-8 right-[-42px] w-[140%] py-2 bg-gradient-to-r from-gold-matte via-gold to-gold-matte text-white text-[10px] font-black uppercase tracking-[0.25em] text-center rotate-45 shadow-2xl border-y border-white/20">
            {label}
          </div>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-10 z-20 flex flex-col gap-3">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold uppercase tracking-[0.5em] text-[11px] font-black drop-shadow-md"
        >
          {subtitle}
        </motion.span>
        <h3 className="text-white text-3xl lg:text-4xl luxury-serif tracking-tight leading-none group-hover:text-gold transition-colors duration-500 mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
          <span className="text-white/90 text-[10px] uppercase tracking-[0.4em] font-black border-b border-gold/40 pb-1">
            Explore Collection
          </span>
          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
            <Icons.ChevronRight className="w-4 h-4 text-gold" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border border-white/5 rounded-2xl z-40 pointer-events-none group-hover:border-gold/20 transition-colors duration-700"></div>
    </Link>
  );
};

export const TrustBadge = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => {
  const { theme } = useTheme();
  return (
    <div className={`flex flex-col items-center text-center p-10 rounded-[2rem] border transition-all hover:shadow-lux ${theme === 'day' ? 'bg-white/50 backdrop-blur-sm border-gold/5 hover:border-gold/20' : 'bg-white/5 backdrop-blur-md border-white/10 hover:border-gold'}`}>
      <div className="text-gold mb-8 scale-150">{icon}</div>
      <h4 className={`font-black uppercase tracking-[0.3em] text-[11px] mb-3 ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>{title}</h4>
      <p className="text-gray-500 text-xs italic leading-relaxed">{text}</p>
    </div>
  );
};

export const ProductCard = ({ product }: { product: any, key?: React.Key }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group lux-shimmer"
    >
      <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm border transition-all ${theme === 'day' ? 'bg-gray-100 border-gold/5' : 'bg-black/20 border-white/5 group-hover:border-gold/30'}`}>
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${theme === 'night' ? 'brightness-90 contrast-[1.1] sepia-[0.1]' : 'contrast-[1.05]'}`} 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
        </Link>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className={`w-full py-4 rounded-full text-[10px] font-extrabold uppercase tracking-[0.3em] shadow-2xl transition-all border ${theme === 'day' ? 'bg-white/95 text-burgundy border-gold/10 hover:bg-gold hover:text-white' : 'bg-gold text-burgundy border-gold/10 hover:bg-beige-ivory hover:text-burgundy'}`}
          >
            {t('buy_now')}
          </button>
        </div>
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-gold text-white text-[9px] font-black px-3 py-1.5 tracking-widest uppercase rounded-full shadow-lg">New Release</span>
          </div>
        )}
      </div>
      <div className="mt-6 space-y-2 text-center">
        <p className="text-[10px] text-gold-matte uppercase tracking-[0.5em] font-extrabold">{product.category}</p>
        <h3 className={`luxury-serif text-xl font-bold leading-tight group-hover:text-gold transition-colors ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>{product.name}</h3>
        <p className={`font-black text-base tracking-tighter ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>
          {CURRENCY}{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle, link, linkText }: any) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8 px-6 max-w-7xl mx-auto">
      <div className="space-y-3">
        <span className="text-gold uppercase tracking-[0.8em] text-[11px] font-black block">{subtitle}</span>
        <h2 className={`text-6xl md:text-8xl luxury-serif tracking-tighter leading-none ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>{title}</h2>
      </div>
      {link && (
        <Link to={link} className={`text-[11px] font-black uppercase tracking-[0.5em] border-b-2 pb-3 hover:text-gold hover:border-burgundy transition-all ${theme === 'day' ? 'text-burgundy border-gold' : 'text-gold border-gold/30'}`}>
          {linkText || "Enter Gallery"}
        </Link>
      )}
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const { products, isLoading } = useProducts();
  const { theme } = useTheme();
  const { user } = useAuth();

  const arrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className={`transition-colors duration-500 -mt-[88px] lg:-mt-[116px] ${theme === 'day' ? 'bg-beige' : 'bg-burgundy-deep'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 mix-blend-overlay scale-150 leather-texture"></div>
        <div className={`absolute inset-0 z-[2] bg-gradient-to-b pointer-events-none ${theme === 'day' ? 'from-burgundy/20 via-transparent to-beige' : 'from-black/60 via-transparent to-burgundy-deep'}`}></div>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop" 
            className={`w-full h-full object-cover transition-all duration-[2s] ${theme === 'day' ? 'brightness-[0.7] contrast-[1.05]' : 'brightness-[0.4] contrast-[1.2] grayscale-[0.3]'}`} 
            alt="Hero Background" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          className="relative z-10 text-center space-y-12 max-w-6xl px-6"
        >
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className={`text-[10px] font-black uppercase tracking-[0.6em] italic mb-8 ${theme === 'day' ? 'text-beige-ivory/80' : 'text-gold/80'}`}
            >
              {user 
                ? `May your journey be as resilient and refined as our full-grain hides, ${user.email.split('@')[0]}.`
                : "Welcome to the Chapter of Excellence."}
            </motion.p>
            <h1 className={`text-8xl md:text-[14rem] luxury-serif tracking-tighter leading-[0.7] ${theme === 'day' ? 'text-beige-ivory' : 'text-white'}`}>
              VELRA <br/> <span className="text-gold italic uppercase">STUDIO</span>
            </h1>
            <p className="text-gold uppercase tracking-[1.2em] text-[12px] font-black drop-shadow-lg pt-8">Artisanal Leather Mastery • Est. 1984</p>
          </div>
          <div className="flex gap-8 justify-center items-center flex-wrap">
            <Link to="/products" className={`group relative overflow-hidden px-16 py-8 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl scale-110 transition-all duration-500 hover:scale-[1.15] hover:shadow-gold-glow ${theme === 'day' ? 'bg-burgundy text-gold' : 'bg-gold text-burgundy'}`}>
              <span className="relative z-10">{t('explore_edits')}</span>
            </Link>
            <Link to="/onboarding" className={`text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-gold/50 pb-2 hover:border-gold transition-all ${theme === 'day' ? 'text-white' : 'text-beige-ivory'}`}>
              Bespoke Concierge
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 -mt-20 relative z-20">
        <TrustBadge 
          icon={<Icons.Star className="w-8 h-8" />} 
          title="Pure Full-Grain" 
          text="The highest tier of leather, sourced ethically from certified tanneries in Uttar Pradesh."
        />
        <TrustBadge 
          icon={<Icons.Globe className="w-8 h-8" />} 
          title="Artisan Heritage" 
          text="Every stitch tells a story of generations of master craftsmen preserving ancient techniques."
        />
        <TrustBadge 
          icon={<Icons.ShoppingCart className="w-8 h-8" />} 
          title="Priority Concierge" 
          text="White-glove delivery service across major Indian cities including same-day master fitting."
        />
      </section>

      {/* Category Section */}
      <section className="py-40 max-w-[1440px] mx-auto px-6">
        <SectionHeader title={t('the_collections')} subtitle={t('legacy_works')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard title={t('jackets')} subtitle="Chapter 01" image="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop" link="/category/Jackets" label="Hand-cut" />
          <CategoryCard title={t('shoes')} subtitle="Chapter 02" image="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop" link="/category/Shoes" label="Benchmade" />
          <CategoryCard title={t('bags')} subtitle="Chapter 03" image="https://i.pinimg.com/1200x/cf/0d/a5/cf0da5a74a31839aa594a149ac99e5e1.jpg" link="/category/Bags" label="Artisan" />
          <CategoryCard title={t('watches')} subtitle="Chapter 04" image="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop" link="/category/Watches" label="Precision" />
        </div>
      </section>

      {/* Craftsmanship Spotlight */}
      <section className={`py-60 transition-colors duration-500 relative overflow-hidden ${theme === 'day' ? 'bg-burgundy-deep text-beige-ivory' : 'bg-black text-beige-ivory'}`}>
        <div className="absolute inset-0 leather-texture opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
            <span className="text-gold uppercase tracking-[1em] text-[11px] font-black">Craftsmanship</span>
            <h2 className="text-7xl md:text-9xl luxury-serif tracking-tighter leading-[0.8]">The Hand of the <br/> <span className="text-gold italic">Artisan</span></h2>
            <p className={`text-lg font-light leading-relaxed max-w-xl italic opacity-80 ${theme === 'day' ? 'text-beige-ivory' : 'text-gray-300'}`}>
              "We don't manufacture products; we chapter legacies. Each piece spends 48 hours in the hands of a single master, ensuring that no two VELRA creations are ever identical."
            </p>
            <div className="flex gap-10 border-t border-gold/20 pt-12">
               <div>
                 <p className="text-4xl text-gold luxury-serif">14</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold">Points of Quality Appraisal</p>
               </div>
               <div>
                 <p className="text-4xl text-gold luxury-serif">Lifetime</p>
                 <p className="text-[10px] uppercase tracking-widest font-bold">Stitch & Grain Warranty</p>
               </div>
            </div>
          </div>
          <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border ${theme === 'day' ? 'border-gold/10' : 'border-gold/30'}`}>
             <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop" className={`w-full h-full object-cover ${theme === 'night' ? 'brightness-75' : ''}`} alt="Artisan Process" />
             <div className="absolute inset-0 bg-gradient-to-t from-burgundy/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={`py-40 border-y transition-colors duration-500 ${theme === 'day' ? 'bg-white border-gold/5' : 'bg-burgundy-deep border-white/5'}`}>
        <SectionHeader title={t('new_arrivals')} subtitle="The Fresh Edit" link="/products" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {isLoading ? <div className="col-span-4 text-center py-20 luxury-serif text-2xl text-gold animate-pulse">Curating Catalog...</div> : arrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-60 text-center space-y-16 relative overflow-hidden">
        <div className="absolute inset-0 leather-texture opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-12">
           <h2 className={`text-7xl md:text-9xl luxury-serif tracking-tighter leading-none ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Gift a <br/> <span className="text-gold italic text-8xl md:text-[10rem]">Masterwork</span></h2>
           <p className={`uppercase tracking-[1em] text-[12px] font-black ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>Complimentary Luxury Wrapping On All Orders</p>
           <Link to="/onboarding" className="lux-button px-24 py-10 inline-block scale-125 shadow-xl gold-glow border-none">{t('start_concierge')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
