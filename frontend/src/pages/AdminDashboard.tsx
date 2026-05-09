import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Users, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { label: 'Inventory Items', value: '24', change: '+2 new', icon: <Package size={24} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Unread Inquiries', value: '7', change: '3 urgent', icon: <MessageSquare size={24} />, color: 'text-brand-green', bg: 'bg-brand-green/10' },
    { label: 'Active Subscribers', value: '1,284', change: '+12% month', icon: <Users size={24} />, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  ];

  const recentActivities = [
    { type: 'inquiry', title: 'New Export Lead', desc: 'From "Green Valley Spices" (UK)', time: '2 hours ago', status: 'pending' },
    { type: 'product', title: 'Product Updated', desc: 'Ceylon Cinnamon Powder (100g)', time: '5 hours ago', status: 'success' },
    { type: 'contact', title: 'Contact Message', desc: 'Inquiry regarding bulk discounts', time: '1 day ago', status: 'resolved' },
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
            Welcome back, <span className="text-brand-green italic">Rishanthan</span>
          </motion.h1>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Your nature creations are thriving. Here is a cinematic overview of your business performance today.
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
                <span>{stat.change}</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
            <p className="text-5xl font-bold text-white group-hover:text-brand-green transition-colors">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. Action & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Quick Commands */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[50px]">
          <h3 className="text-2xl font-bold font-serif text-white mb-8">Management Controls</h3>
          <div className="grid grid-cols-2 gap-6">
            <Link to="/admin/products" className="group bg-brand-green p-8 rounded-[32px] text-white transition-all hover:bg-brand-dark border border-brand-green/50 flex flex-col justify-between h-48 shadow-lg shadow-brand-green/10">
              <Package size={32} className="opacity-40" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Products</p>
                <p className="text-xl font-bold">Manage Inventory</p>
              </div>
            </Link>
            <Link to="/admin/inquiries" className="group bg-brand-dark p-8 rounded-[32px] text-white transition-all hover:bg-white/10 border border-white/5 flex flex-col justify-between h-48">
              <MessageSquare size={32} className="opacity-40 text-brand-gold" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Leads</p>
                <p className="text-xl font-bold">Review Inquiries</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-10 rounded-[50px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-serif text-white">Security Timeline</h3>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <Clock size={14} />
              <span>Real-time Sync</span>
            </div>
          </div>
          <div className="space-y-6 flex-grow">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start space-x-6 group">
                <div className={`mt-1.5 w-2 h-2 rounded-full ${
                  activity.status === 'pending' ? 'bg-brand-gold animate-pulse' : 
                  activity.status === 'success' ? 'bg-brand-green' : 'bg-blue-400'
                }`} />
                <div className="flex-grow pb-6 border-b border-white/5 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-brand-green transition-colors">{activity.title}</h4>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 border border-white/5 rounded-2xl text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] hover:bg-white/5 transition-all">View All Logs</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
