
import React from 'react';
import { useAuth } from '../App';
import { CURRENCY, Icons } from '../constants';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, preferences, logout, orders } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-5xl text-burgundy-dark luxury-serif">Master Profile</h1>
          <p className="text-gold uppercase tracking-[0.2em] text-sm mt-2">Welcome back, {user?.email.split('@')[0]}</p>
        </div>
        <button onClick={logout} className="text-burgundy font-bold uppercase text-xs tracking-widest border-2 border-burgundy px-8 py-3 rounded-full hover:bg-burgundy hover:text-white transition-all">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-ivory rounded-3xl p-8 border border-gold-matte/10">
            <h3 className="uppercase tracking-widest text-xs font-bold text-burgundy mb-6">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-gold uppercase font-bold mb-1">Email Address</p>
                <p className="text-burgundy-dark font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gold uppercase font-bold mb-1">Preferred Style</p>
                <p className="text-burgundy-dark font-medium">{preferences?.style || 'Classic'}</p>
              </div>
              <div>
                <p className="text-[10px] text-gold uppercase font-bold mb-1">Language</p>
                <p className="text-burgundy-dark font-medium">{preferences?.language || 'English'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-burgundy text-beige-ivory rounded-3xl p-8 border border-gold-matte/20 leather-texture relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-6 relative z-10">Velra Privilege</h3>
            <p className="text-sm leading-relaxed mb-6 italic opacity-80 relative z-10">"You are currently a Gold Tier patron. Enjoy complimentary priority shipping on all handcrafted goods."</p>
            <button className="w-full bg-gold text-burgundy font-bold py-3 rounded-xl text-xs uppercase tracking-widest relative z-10 hover:brightness-110 transition-all">View Benefits</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl luxury-serif text-burgundy-dark mb-8">Artisanal Acquisitions</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-20 border border-gold-matte/10 text-center space-y-6">
                 <div className="w-16 h-16 bg-beige mx-auto rounded-full flex items-center justify-center text-burgundy/20">
                    <Icons.ShoppingCart className="w-8 h-8" />
                 </div>
                 <p className="text-gray-400 italic">No acquisitions found in your boutique history.</p>
                 <Link to="/products" className="text-gold font-bold uppercase text-[10px] tracking-[0.4em] border-b border-gold pb-1">Begin Discovery</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-6 border border-gold-matte/10 flex flex-col sm:flex-row justify-between items-center gap-6 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-4">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="w-16 h-16 rounded-xl border-2 border-white overflow-hidden shadow-sm bg-gray-50">
                            <img src={item.images[0]} className="w-full h-full object-cover" alt="" />
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="w-16 h-16 rounded-xl border-2 border-white bg-burgundy flex items-center justify-center text-gold text-xs font-black shadow-sm">
                            +{order.items.length - 2}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-burgundy-dark font-bold tracking-tight">{order.id}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                          {new Date(order.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-burgundy font-black mb-1">{CURRENCY}{order.totalAmount.toLocaleString('en-IN')}</p>
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-gold'}`}>
                        {order.status}
                      </span>
                    </div>
                    <Link to={`/track/${order.id}`} className="text-burgundy font-black uppercase text-[10px] tracking-widest border-b-2 border-gold/40 group-hover:border-burgundy transition-all">Track Journey</Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-ivory rounded-[2.5rem] p-10 border border-gold-matte/10 relative overflow-hidden">
            <div className="absolute inset-0 leather-texture opacity-[0.03] pointer-events-none"></div>
            <h2 className="text-2xl luxury-serif text-burgundy-dark mb-6 relative z-10">Bespoke Preferences</h2>
            <p className="text-gray-500 text-sm mb-8 relative z-10 max-w-lg">Update your concierge questionnaire to receive more accurate handcrafted recommendations tailored to your evolving style.</p>
            <Link to="/onboarding" className="lux-button px-10 py-4 inline-block relative z-10">Retake Experience Quiz</Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
