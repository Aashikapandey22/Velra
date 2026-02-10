
import React from 'react';
import { CURRENCY } from '../constants';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h1 className="text-5xl text-burgundy-dark luxury-serif">Boutique Command</h1>
        <p className="text-gold uppercase tracking-[0.2em] text-sm mt-2">Executive Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { label: 'Revenue', value: `₹24.8L`, trend: '+12%' },
          { label: 'Orders', value: '482', trend: '+5%' },
          { label: 'Patrons', value: '1,204', trend: '+18%' },
          { label: 'Waitlist', value: '42', trend: 'N/A' },
        ].map((stat, i) => (
          <div key={i} className="bg-ivory p-8 rounded-2xl border border-gold-matte/20">
            <p className="text-[10px] text-gold uppercase font-bold tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl text-burgundy font-bold">{stat.value}</p>
            <p className="text-xs text-green-600 mt-2 font-bold">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl border border-gold-matte/10">
          <h3 className="text-2xl luxury-serif text-burgundy-dark mb-8">Pending Mastercrafting</h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-gold-matte/10 last:border-0">
                <div>
                  <p className="text-burgundy font-bold uppercase tracking-widest text-xs">ORD-000{i}</p>
                  <p className="text-sm text-gray-500">2 Items • S. Sharma</p>
                </div>
                <button className="bg-burgundy text-gold px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Update Status</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gold-matte/10">
          <h3 className="text-2xl luxury-serif text-burgundy-dark mb-8">Inventory Status</h3>
          <div className="space-y-6">
            {[
              { name: 'Heritage Tote - Cognac', stock: 4 },
              { name: 'Bespoke Oxford - Black', stock: 12 },
              { name: 'Artisan Belt - Tan', stock: 2 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-burgundy">
                  <span>{item.name}</span>
                  <span className={item.stock < 5 ? 'text-red-500' : 'text-gray-400'}>{item.stock} Units</span>
                </div>
                <div className="w-full h-1 bg-beige rounded-full overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${(item.stock / 20) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
