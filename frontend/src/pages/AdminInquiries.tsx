import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { 
  Mail, 
  MessageSquare, 
  User, 
  Clock, 
  Loader2,
  Trash2,
  CheckCircle2,
  Globe,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminInquiries = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'export' | 'newsletter'>('contact');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [activeTab]);

  const fetchInquiries = async () => {
    setLoading(true);
    let tableName = '';
    switch (activeTab) {
      case 'contact': tableName = 'contact_inquiries'; break;
      case 'export': tableName = 'export_inquiries'; break;
      case 'newsletter': tableName = 'newsletter_subscriptions'; break;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setData(data || []);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredData = data.filter(item => 
    (item.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.company?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      {/* 1. Header & Strategy */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-white mb-2">Communications Command</h2>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em]">Intercept & manage global interest</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..."
              className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-xs text-white focus:outline-none focus:border-brand-green/30 w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 bg-white/5 p-1.5 rounded-[24px] border border-white/5 shadow-xl">
            {[
              { id: 'contact', label: 'Inquiries', icon: <MessageSquare size={16} /> },
              { id: 'export', label: 'Export Leads', icon: <Globe size={16} /> },
              { id: 'newsletter', label: 'Sync', icon: <Mail size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-[20px] text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab.id 
                  ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' 
                  : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Unified Inbox Grid */}
      <div className="space-y-6">
        {loading ? (
          <div className="bg-white/5 backdrop-blur-2xl rounded-[50px] p-32 flex flex-col items-center justify-center border border-white/5 shadow-2xl">
            <div className="relative w-16 h-16 mb-8">
               <div className="absolute inset-0 border-4 border-brand-green/10 rounded-full" />
               <div className="absolute inset-0 border-4 border-brand-green rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] animate-pulse">Decrypting Communication Buffers...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-2xl rounded-[50px] p-32 text-center border border-white/5 shadow-2xl">
            <ShieldCheck className="text-gray-800 mx-auto mb-6" size={64} />
            <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.3em]">Communication Channel Secure (Empty)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, i) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white/5 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl hover:border-brand-green/30 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                    <button className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
                       <CheckCircle2 size={20} />
                    </button>
                    <button className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all">
                       <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                    <div className="space-y-8 flex-grow">
                      {/* Identity Row */}
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-dark to-brand-green/20 rounded-[24px] flex items-center justify-center text-brand-green border border-white/10 shadow-xl shadow-black/40">
                          <User size={28} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-1">{item.full_name || item.name || 'Anonymous Intelligence'}</h4>
                          <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <Clock size={12} className="text-brand-green" />
                            <span>Received {formatDate(item.created_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Channels */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                          <Mail size={14} className="text-brand-green" />
                          <a href={`mailto:${item.email}`} className="text-xs font-bold text-gray-300 hover:text-white transition-colors">{item.email}</a>
                        </div>
                        {item.phone && (
                          <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                            <span className="w-4 h-4 flex items-center justify-center text-[10px] text-brand-gold font-bold border border-brand-gold/30 rounded">P</span>
                            <span className="text-xs font-bold text-gray-300">{item.phone}</span>
                          </div>
                        )}
                        {item.country && (
                          <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                            <Globe size={14} className="text-blue-400" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{item.country}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Buffer */}
                      {item.message && (
                        <div className="relative mt-8">
                           <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-green/20 rounded-full" />
                           <p className="text-lg text-gray-300 font-serif leading-relaxed italic opacity-80 pl-4">
                             "{item.message}"
                           </p>
                        </div>
                      )}
                      
                      {item.company && (
                        <div className="inline-flex items-center space-x-3 bg-brand-dark/40 px-6 py-3 rounded-2xl border border-brand-green/20">
                           <ShieldCheck size={14} className="text-brand-green" />
                           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                              Organization: <span className="text-brand-green">{item.company}</span>
                           </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center lg:items-end justify-between lg:justify-end lg:h-full">
                       <button className="flex items-center space-x-3 px-8 py-4 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">
                          <span>Respond to Inquiry</span>
                          <ArrowRight size={14} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
