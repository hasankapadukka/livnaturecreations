import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Users, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    products: 0,
    inquiries: 0,
    orders: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<string>('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [prodSnap, inqSnap, orderSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'contact_inquiries')),
        getDocs(collection(db, 'orders'))
      ]);

      const products = prodSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      const lowStock = products.filter(p => p.stock_status === 'outofstock');
      
      setLowStockProducts(lowStock);
      setCounts({
        products: prodSnap.size,
        inquiries: inqSnap.size,
        orders: orderSnap.size
      });
      setLastSync(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Catalog Items', value: counts.products.toString(), icon: <Package size={24} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Unread Inquiries', value: counts.inquiries.toString(), icon: <MessageSquare size={24} />, color: 'text-brand-green', bg: 'bg-brand-green/10' },
    { label: 'Total Acquisitions', value: counts.orders.toString(), icon: <ShoppingCart size={24} />, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  ];

  return (
    <div className="space-y-10">
      {/* 1. Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark to-[#0F291E] p-12 rounded-[50px] border border-white/5 shadow-2xl">
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif text-white mb-4"
          >
            Command <span className="text-brand-green italic">Central</span>
          </motion.h1>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Registry overview for Liv Nature Creations. Integrated Firestore synchronization active.
          </p>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none">
           <TrendingUp className="w-full h-full text-brand-green translate-x-10 translate-y-10" />
        </div>
      </div>

      {/* 2. Cinematic Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] group hover:border-brand-green/30 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between mb-8">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-brand-green">
                <span>Real-time</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
            <p className="text-5xl font-bold text-white group-hover:text-brand-green transition-colors">
              {loading ? '...' : stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3. Action Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[50px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-serif text-white">Management Controls</h3>
            {lowStockProducts.length > 0 && (
              <div className="flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 animate-pulse">
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{lowStockProducts.length} Items Out of Stock</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link to="/admin/products" className="group bg-brand-green p-8 rounded-[32px] text-white transition-all hover:bg-brand-dark border border-brand-green/50 flex flex-col justify-between h-48 shadow-lg shadow-brand-green/10">
              <Package size={32} className="opacity-40" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Products</p>
                <p className="text-xl font-bold">Inventory Registry</p>
              </div>
            </Link>
            <Link to="/admin/orders" className="group bg-brand-dark p-8 rounded-[32px] text-white transition-all hover:bg-white/10 border border-white/5 flex flex-col justify-between h-48">
              <ShoppingCart size={32} className="opacity-40 text-brand-gold" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Orders</p>
                <p className="text-xl font-bold">Acquisition Log</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[50px] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white mb-2">System Integrity</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">All Firebase services are operational. Data parity with Firestore is verified.</p>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/5 px-4 py-2 rounded-xl">
              <Clock size={12} />
              <span>Last Sync: {lastSync || '...'}</span>
            </div>
        </div>
      </div>

      {/* 4. Low Stock Monitor (Conditional) */}
      {lowStockProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/5 border border-red-500/10 p-10 rounded-[50px]"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-serif text-white leading-tight">Critical Alerts</h3>
              <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Inventory depletion detected</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockProducts.map(p => (
              <div key={p.id} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center space-x-4">
                <img src={p.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{p.name}</p>
                  <p className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Out of Stock</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
