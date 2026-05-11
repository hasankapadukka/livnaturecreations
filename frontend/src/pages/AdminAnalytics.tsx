import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users2, 
  FileText, 
  HelpCircle, 
  ArrowUpRight,
  TrendingUp,
  Globe2,
  Droplets,
  Wind,
  ShoppingCart,
  Package,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    ordersByStatus: {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [orderSnap, prodSnap] = await Promise.all([
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'products'))
      ]);

      let revenue = 0;
      const statusCounts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };

      orderSnap.forEach(doc => {
        const data = doc.data();
        revenue += data.total_amount || 0;
        const status = (data.status || 'pending') as keyof typeof statusCounts;
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        }
      });

      setAnalytics({
        totalRevenue: revenue,
        totalOrders: orderSnap.size,
        totalProducts: prodSnap.size,
        ordersByStatus: statusCounts
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F3] flex p-4 lg:p-6 font-sans">
      {/* 1. Main Analytics Canvas */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 px-4">
          <h1 className="text-3xl font-bold text-[#0A261D]">Business Intelligence</h1>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            <span>Firestore Live Stream</span>
          </div>
        </header>

        {/* Top Row: Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Total Revenue', value: `LKR ${analytics.totalRevenue.toLocaleString()}`, unit: 'Gross', change: 'Lifetime cumulative', icon: <DollarSign size={16} />, color: 'text-brand-green' },
            { label: 'Total Acquisitions', value: analytics.totalOrders.toString(), unit: 'Orders', change: 'Across all statuses', icon: <ShoppingCart size={16} />, color: 'text-brand-gold' },
            { label: 'Inventory Assets', value: analytics.totalProducts.toString(), unit: 'Items', change: 'Catalog depth', icon: <Package size={16} />, color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-[#0A261D]">{loading ? '...' : stat.value}</span>
                    <span className="text-xs font-bold text-gray-400">{stat.unit}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-[10px] font-medium text-gray-400 italic">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Row: Fulfillment & Logistics */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
          {/* Fulfillment Rate */}
          <div className="xl:col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full text-left">Fulfillment Velocity</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                <circle 
                  cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={440} 
                  strokeDashoffset={440 * (1 - (analytics.totalOrders > 0 ? analytics.ordersByStatus.delivered / analytics.totalOrders : 0))} 
                  className="text-brand-green" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-[#0A261D]">
                  {analytics.totalOrders > 0 ? Math.round((analytics.ordersByStatus.delivered / analytics.totalOrders) * 100) : 0}%
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Delivered</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 italic">Success rate of processed acquisitions</p>
          </div>

          {/* Logistics Pipeline */}
          <div className="xl:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logistics Pipeline Status</p>
                <p className="text-[9px] text-gray-400 mt-1">Real-time status breakdown of all order references</p>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-amber-500" />
                   <span className="text-[9px] font-bold text-gray-400 uppercase">Processing</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-brand-green" />
                   <span className="text-[9px] font-bold text-gray-400 uppercase">Delivered</span>
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
               {[
                 { label: 'Pending', val: analytics.ordersByStatus.pending, color: 'bg-amber-400' },
                 { label: 'Processing', val: analytics.ordersByStatus.processing, color: 'bg-blue-400' },
                 { label: 'Shipped', val: analytics.ordersByStatus.shipped, color: 'bg-purple-400' },
                 { label: 'Delivered', val: analytics.ordersByStatus.delivered, color: 'bg-brand-green' },
                 { label: 'Cancelled', val: analytics.ordersByStatus.cancelled, color: 'bg-red-400' },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <div className="w-full bg-gray-50 rounded-2xl h-32 relative overflow-hidden mb-4">
                       <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${analytics.totalOrders > 0 ? (item.val / analytics.totalOrders) * 100 : 0}%` }}
                        className={`absolute bottom-0 left-0 right-0 ${item.color} opacity-20`}
                       />
                       <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-[#0A261D]">
                          {item.val}
                       </div>
                    </div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Market Distribution Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#0A261D] p-8 rounded-[40px] shadow-2xl flex items-center space-x-6">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-gold">
                <Globe2 size={32} />
             </div>
             <div>
                <h4 className="text-white font-bold text-sm mb-1">Export Market Reach</h4>
                <p className="text-[10px] text-gray-400 leading-tight">Global distribution tracking via export inquiry module</p>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center space-x-6">
             <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green">
                <Users2 size={32} />
             </div>
             <div>
                <h4 className="text-[#0A261D] font-bold text-sm mb-1">Customer Collective</h4>
                <p className="text-[10px] text-gray-400 leading-tight">Growing network of nature-conscious consumers</p>
             </div>
          </div>

          <div className="bg-brand-green p-8 rounded-[40px] shadow-2xl flex flex-col justify-center">
             <h4 className="text-white font-bold text-lg leading-tight">Registry Integrity Active</h4>
             <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">All data synchronized with Firestore</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
