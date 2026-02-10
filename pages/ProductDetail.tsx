
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRENCY, Icons } from '../constants';
import { useCart, useProducts, useTheme } from '../App';
import { Review } from '../types';

const ReviewItem = ({ review }: { review: Review }) => {
  const { theme } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-3xl border transition-all ${theme === 'day' ? 'bg-white border-gold/5 shadow-sm' : 'bg-white/5 border-white/5'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`font-black uppercase tracking-widest text-xs ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{review.userName}</h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">{review.date}</p>
        </div>
        <div className="flex text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icons.Star key={i} className={`w-3 h-3 ${i < Math.floor(review.rating) ? 'fill-current' : 'opacity-20'}`} />
          ))}
        </div>
      </div>
      <p className={`text-sm italic leading-relaxed ${theme === 'day' ? 'text-gray-600' : 'text-gray-300'}`}>"{review.comment}"</p>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, isLoading } = useProducts();
  const { theme } = useTheme();
  const [activeImg, setActiveImg] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('heritage');
  
  // Review form state
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setNewReview({ rating: 5, comment: '' });
      alert("Thank you for your appraisal. It has been sent to our master curators for verification.");
    }, 1500);
  };

  if (isLoading) return <div className="py-40 text-center luxury-serif text-3xl text-gold animate-pulse italic">Opening Archives...</div>;
  if (!product) return <div className="py-40 text-center luxury-serif text-3xl">Creation not found</div>;

  return (
    <div className={`max-w-7xl mx-auto px-6 py-24 md:py-32 transition-colors duration-500`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 mb-32">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-lux border ${theme === 'day' ? 'bg-gray-50 border-gold/5' : 'bg-black/40 border-white/5'}`}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImg} 
                src={product.images[activeImg]} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className={`w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 ${theme === 'night' ? 'brightness-90 contrast-[1.1]' : ''}`} 
                alt={product.name} 
              />
            </AnimatePresence>
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)} 
              className={`absolute top-10 right-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lux transition-all z-20 backdrop-blur-md ${
                theme === 'day' ? 'bg-white/90 text-burgundy hover:bg-gold hover:text-white' : 'bg-burgundy/80 text-gold border border-white/10 hover:bg-gold hover:text-burgundy'
              }`}
            >
              <Icons.Heart className={`w-7 h-7 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-3 gap-8">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)} 
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImg === i 
                    ? theme === 'day' ? 'border-gold p-1 shadow-gold-glow' : 'border-gold p-1 shadow-[0_0_20px_rgba(166,124,0,0.4)]'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover rounded-xl" alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-black">{product.category}</span>
               <div className={`h-[1px] w-12 ${theme === 'day' ? 'bg-gold/30' : 'bg-white/20'}`}></div>
            </div>
            <h1 className={`text-6xl luxury-serif tracking-tight leading-tight ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>
              {product.name}
            </h1>
          </div>

          <div className={`text-4xl font-black flex items-baseline gap-2 ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>
            <span className="text-lg font-normal opacity-60">{CURRENCY}</span>
            {product.price.toLocaleString('en-IN')}
          </div>

          <p className={`leading-relaxed text-xl font-light italic ${theme === 'day' ? 'text-gray-600' : 'text-gray-300'}`}>
            "{product.description}"
          </p>

          <div className="flex flex-col sm:flex-row gap-8 pt-8">
            <button 
              onClick={() => { addToCart(product); navigate('/cart'); }} 
              className="flex-1 lux-button py-6 rounded-2xl text-[10px] shadow-gold-glow group"
            >
              <span>Add to Boutique Bag</span>
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-3 text-lg"
              >→</motion.span>
            </button>
          </div>

          <div className="space-y-10">
             <div className={`flex gap-10 border-b ${theme === 'day' ? 'border-gold/10' : 'border-white/10'}`}>
                {['heritage', 'craft', 'care'].map(tab => (
                   <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)} 
                    className={`pb-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all relative ${
                      activeTab === tab 
                        ? theme === 'day' ? 'text-burgundy' : 'text-gold'
                        : 'text-gray-300'
                    }`}
                   >
                     {tab}
                     {activeTab === tab && (
                       <motion.div 
                        layoutId="tab-underline" 
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'day' ? 'bg-gold' : 'bg-gold-bright'}`} 
                       />
                     )}
                   </button>
                ))}
             </div>
             <div className="min-h-[100px]">
                <motion.p key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm leading-relaxed italic ${theme === 'day' ? 'text-gray-500' : 'text-gray-400'}`}>
                   {activeTab === 'heritage' && "Chaptered from certified, high-end Indian hides. Ethically sourced and hand-selected."}
                   {activeTab === 'craft' && product.craftsmanship}
                   {activeTab === 'care' && product.careInstructions}
                </motion.p>
             </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <section className="border-t border-gold/10 pt-32 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-10">
          <div className="space-y-4">
            <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-black">Patron Appraisals</span>
            <h2 className={`text-6xl luxury-serif ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Artisan Feedback</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className={`text-4xl font-black ${theme === 'day' ? 'text-burgundy' : 'text-gold'}`}>{product.rating.toFixed(1)}</p>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Overall Rating</p>
            </div>
            <div className="flex text-gold">
               {Array.from({ length: 5 }).map((_, i) => (
                 <Icons.Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-20'}`} />
               ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map(review => <ReviewItem key={review.id} review={review} />)
            ) : (
              <p className="text-gray-500 italic py-20 text-center border-2 border-dashed border-gold/10 rounded-3xl">Be the first to appraisal this masterpiece.</p>
            )}
          </div>

          <div className={`p-10 rounded-[2.5rem] border sticky top-32 h-fit ${theme === 'day' ? 'bg-ivory border-gold/15' : 'bg-black/40 border-white/10'}`}>
            <h3 className={`text-2xl luxury-serif mb-8 ${theme === 'day' ? 'text-burgundy-dark' : 'text-beige-ivory'}`}>Leave Your Mark</h3>
            <form onSubmit={handleSubmitReview} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black tracking-widest text-gold block">Your Rating</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`transition-all transform hover:scale-125 ${newReview.rating >= star ? 'text-gold' : 'text-gray-300'}`}
                    >
                      <Icons.Star className={`w-8 h-8 ${newReview.rating >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black tracking-widest text-gold block">Appraisal Note</label>
                <textarea 
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience of the craft..."
                  className={`w-full min-h-[150px] p-5 rounded-2xl border outline-none transition-all text-sm italic ${theme === 'day' ? 'bg-white border-gold/10 focus:border-burgundy' : 'bg-white/5 border-white/10 text-white focus:border-gold'}`}
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || !newReview.comment.trim()}
                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-lux border-none ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : theme === 'day' ? 'bg-burgundy text-white hover:bg-gold' : 'bg-gold text-burgundy hover:bg-white'
                }`}
              >
                {isSubmitting ? "Submitting Appraisal..." : "Submit to Archives"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
