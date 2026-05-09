import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight, ShieldCheck, Zap, Award, Globe, Leaf, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { Category, Product } from '../types';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        supabase.from('categories').select('*').limit(4),
        supabase.from('products').select('*').eq('is_featured', true).limit(4)
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (prodRes.data) setFeaturedProducts(prodRes.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) throw error;
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubscribeStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-warm-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://i.pinimg.com/736x/53/b6/e4/53b6e4181790beb6618696a0d063a2c3.jpg"
            alt="Nature Background"
            className="w-full h-full object-cover brightness-[0.65]"
          />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase block mb-4 md:mb-6"
          >
            Agro Processing | Value Addition
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white mb-6 md:mb-10 leading-[1.1] tracking-tight"
          >
            Transforming <span className="text-brand-gold italic">Nature</span> <br className="hidden md:block" /> into Value
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed px-4"
          >
            Liv Nature Creations is a Sri Lanka-based powerhouse, transforming bulk food commodities into hygienically packed, premium branded products for local and global markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/products" className="w-full sm:w-auto bg-brand-green text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-brand-dark transition-all shadow-2xl block text-center">
                Shop Products
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/export" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 md:px-12 py-4 md:py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-brand-dark transition-all block text-center">
                Export Enquiries
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0"></div>
        </motion.div>
      </section>

      {/* 2. Category Scroll */}
      <motion.section
        {...fadeInUp}
        className="py-12 md:py-24 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-dark mb-4 md:mb-6">Explore Our Range</h2>
            <p className="text-gray-500 font-medium leading-relaxed">From essential pulses to aromatic spices, we bring the best of nature to your kitchen.</p>
          </div>
          <Link to="/products" className="group text-brand-green font-bold text-xs tracking-widest uppercase flex items-center">
            View All Categories <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex space-x-4 md:space-x-8 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        >
          {loading ? (
            <div className="w-full py-20 flex items-center justify-center">
              <Loader2 className="animate-spin text-brand-green" size={40} />
            </div>
          ) : categories.length > 0 ? (
            categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={{
                  initial: { opacity: 0, x: 50 },
                  whileInView: { opacity: 1, x: 0 }
                }}
                className="min-w-[260px] md:min-w-[380px] group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative aspect-[4/5] rounded-[30px] md:rounded-[50px] overflow-hidden mb-6 md:mb-8 shadow-xl"
                >
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 text-white">
                    <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2">{cat.product_count_display}</p>
                    <h3 className="text-xl md:text-2xl font-bold font-serif">{cat.name}</h3>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="w-full py-10 text-center text-gray-400 font-medium">No categories found.</div>
          )}
        </motion.div>
      </motion.section>

      {/* 3. Why Choose Us */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-brand-dark text-white rounded-[40px] md:rounded-[100px] mx-4 md:mx-8 mb-20 md:mb-32">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase block mb-4 md:mb-6">The Liv Nature Difference</span>
            <h2 className="text-3xl md:text-6xl font-bold font-serif leading-tight">Why Industry Leaders <br /> Trust Our Products</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20"
          >
            {[
              { icon: <ShieldCheck size={32} />, title: 'Hygienically Packed', desc: 'State-of-the-art cleaning and packaging systems ensure zero contamination and long shelf life.' },
              { icon: <Zap size={32} />, title: 'Value Addition', desc: 'We bridge the gap between bulk imports and premium, consumer-ready retail products.' },
              { icon: <Award size={32} />, title: 'Export Quality', desc: 'Every product is processed to meet international standards for supermarkets and global retail.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-3xl flex items-center justify-center text-brand-gold mb-8 md:mb-10 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-4 md:mb-6">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm md:text-base font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Products Spotlight */}
      <motion.section
        {...fadeInUp}
        className="py-12 md:py-24 px-4 md:px-8 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-dark">Featured Products</h2>
          <div className="flex space-x-4 md:space-x-8 text-[10px] md:text-xs font-bold tracking-widest uppercase overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0">
            {['All Products', 'Pulses', 'Spices', 'Grains'].map((filter, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                className={`${i === 0 ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400 hover:text-brand-green'} pb-2 shrink-0 transition-colors`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10"
        >
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-[40px] aspect-square"></div>
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                variants={fadeInUp}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative aspect-square rounded-[30px] md:rounded-[40px] overflow-hidden mb-6 bg-white shadow-lg"
                >
                  <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex items-center space-x-2 whitespace-nowrap"
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </motion.button>
                </motion.div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg mb-1">{prod.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{prod.weight}</p>
                  </div>
                  <p className="text-brand-green font-bold text-lg font-serif">{prod.price}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-400 font-medium">No featured products available.</div>
          )}
        </motion.div>
      </motion.section>

      {/* 5. Export Portal CTA */}
      <section className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto bg-brand-light/40 rounded-[40px] md:rounded-[80px] overflow-hidden flex flex-col lg:flex-row items-center border border-brand-green/10">
          <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 order-2 lg:order-1">
            <Globe className="text-brand-gold mb-6 md:mb-8" size={40} />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-brand-dark mb-6 md:mb-8 leading-tight">Global Export Excellence</h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12 font-medium leading-relaxed">
              We specialize in bulk agro-processing and value-added packaging for international distributors and retail chains. Our facility is designed to meet global food safety standards.
            </p>
            <Link to="/export" className="inline-flex items-center space-x-4 bg-brand-dark text-white px-10 md:px-12 py-4 md:py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl group">
              <span>Export Portal</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 h-[300px] md:h-[500px] lg:h-[750px] order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80" alt="Export Facility" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 6. Purity Banner */}
      <section className="py-20 md:py-32 bg-white text-center px-4">
        <Leaf className="text-brand-green mx-auto mb-8 md:mb-10 animate-pulse" size={48} />
        <h2 className="text-3xl md:text-6xl font-bold font-serif text-brand-dark max-w-4xl mx-auto leading-tight mb-8 md:mb-12">
          Committed to Purity, Dedicated to Quality
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-400">
          <span>100% Natural</span>
          <span className="hidden sm:inline">|</span>
          <span>No Additives</span>
          <span className="hidden sm:inline">|</span>
          <span>SLS Standards</span>
          <span className="hidden sm:inline">|</span>
          <span>Local Sourcing</span>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-brand-dark mb-6 md:mb-8">Stay Updated</h2>
          <p className="text-gray-500 mb-10 md:mb-16 font-medium text-base md:text-lg">Subscribe to get updates on new product arrivals and export news.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border border-gray-100 rounded-full px-8 py-5 text-sm md:text-base focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm"
            />
            <button 
              disabled={submitting}
              className="bg-brand-green text-white px-10 md:px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-all shadow-lg whitespace-nowrap disabled:opacity-50 flex items-center justify-center min-w-[150px]"
            >
              {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Subscribe'}
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <p className="mt-4 text-brand-green font-bold text-sm">Thank you for subscribing!</p>
          )}
          {subscribeStatus === 'error' && (
            <p className="mt-4 text-red-500 font-bold text-sm">Subscription failed. Please try again.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
