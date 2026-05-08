import React from 'react';
import { Globe, ShieldCheck, Zap, Ship, BarChart3, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Export = () => {
  return (
    <div className="bg-warm-white">
      {/* Hero Section */}
      <section className="bg-brand-dark py-20 md:py-32 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center"
        ></motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold font-serif mb-6 md:mb-8 leading-tight"
          >
            Global <span className="text-brand-gold italic">Export</span> Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            Empowering international brands with premium Sri Lankan agro-products, processed to global retail standards.
          </motion.p>
        </div>
      </section>

      {/* Global Presence Snapshot */}
      <section className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            <div>
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6">Our Reach</span>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-dark mb-8 leading-tight">Serving Global Markets from Sri Lanka</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Liv Nature Creations is a purpose-built export partner. We specialize in transforming raw agricultural wealth into retail-ready, branded products for supermarkets and food distributors worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
               <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green shrink-0">
                    <Ship size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg mb-2">Efficient Logistics</h4>
                    <p className="text-gray-400 text-sm font-medium">Seamless shipping and documentation for global delivery.</p>
                  </div>
               </div>
               <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green shrink-0">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg mb-2">Market Insights</h4>
                    <p className="text-gray-400 text-sm font-medium">Data-driven product selection for regional market demands.</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative z-10 border-[12px] md:border-[20px] border-white">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80" alt="Shipping Container" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-brand-gold/10 rounded-full blur-3xl z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase block mb-6">Partner With Us</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-dark mb-6">Export Inquiry Portal</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Discuss bulk orders, private labeling, or international distribution partnerships with our export specialists.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 md:space-y-12" 
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <input type="text" className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Company Name</label>
                <input type="text" className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <input type="email" className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Destination Country</label>
                <input type="text" className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Requirement Details</label>
              <textarea rows={6} className="w-full bg-warm-white border border-gray-200 rounded-[32px] px-8 py-6 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm"></textarea>
            </div>

            <div className="flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-green text-white px-12 md:px-16 py-5 md:py-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-all shadow-2xl flex items-center space-x-3 group"
              >
                <span>Submit Export Inquiry</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Export;
