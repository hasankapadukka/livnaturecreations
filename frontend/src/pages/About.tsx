import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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

const About = () => {
  return (
    <div className="bg-warm-white">
      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80" 
            alt="Agriculture Field" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-brand-dark/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-7xl font-bold font-serif mb-6 md:mb-8"
          >
            About Liv Nature
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-xl opacity-90 max-w-2xl mx-auto font-medium"
          >
            Bridging the gap between bulk commodities and consumer-ready excellence.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div 
          {...fadeInUp}
          className="bg-white p-8 md:p-12 rounded-[30px] md:rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center"
        >
           <motion.div 
             whileHover={{ rotate: 360, scale: 1.1 }}
             transition={{ duration: 0.8, type: "spring" }}
             className="w-14 h-14 md:w-16 md:h-16 bg-brand-light rounded-full flex items-center justify-center text-brand-green mb-6"
           >
             <Target size={32} />
           </motion.div>
           <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-brand-dark">Our Mission</h2>
           <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
             To transform bulk food commodities into hygienically processed, premium branded products that deliver superior value to local and global consumers while empowering local farming communities.
           </p>
        </motion.div>
        <motion.div 
          {...fadeInUp}
          className="bg-brand-dark p-8 md:p-12 rounded-[30px] md:rounded-[40px] shadow-xl flex flex-col items-center text-center text-white"
        >
           <motion.div 
             whileHover={{ rotate: -360, scale: 1.1 }}
             transition={{ duration: 0.8, type: "spring" }}
             className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center text-brand-gold mb-6"
           >
             <Eye size={32} />
           </motion.div>
           <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">Our Vision</h2>
           <p className="text-white/70 leading-relaxed text-sm md:text-base font-medium">
             To be the leading Sri Lankan agro-processing powerhouse, recognized globally for purity, innovation, and sustainable value addition in the food industry.
           </p>
        </motion.div>
      </section>

      {/* Detailed Story */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl h-[300px] md:h-[500px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80" 
              alt="Food Processing" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-brand-dark leading-tight">Bridging the <br /> Bulk-to-Brand Gap</h2>
            <div className="space-y-6 text-gray-500 font-medium text-sm md:text-base leading-relaxed mb-8">
              <p>Liv Nature Creations (Pvt) Ltd was born from a simple yet powerful observation: a significant gap existed between the import of bulk agro-commodities and the availability of hygienically packed, high-quality consumer-ready food products in Sri Lanka.</p>
              <p>Based in Sri Lanka, we have established ourselves as a purpose-built agro-processing and value addition company. We specialize in transforming essential food items into premium brands that meet international standards.</p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-gray-100 pt-8">
               <div>
                  <div className="text-brand-green font-bold text-2xl md:text-4xl mb-1 font-serif">100%</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hygienic Process</p>
               </div>
               <div>
                  <div className="text-brand-green font-bold text-2xl md:text-4xl mb-1 font-serif">SLS</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compliant Standards</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Principles</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-dark">Core Values</h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { icon: <ShieldCheck />, title: 'Quality First', desc: 'Uncompromising standards in every pack.' },
            { icon: <Heart />, title: 'Purity', desc: '100% natural, no harmful additives.' },
            { icon: <Users />, title: 'Community', desc: 'Supporting local growers and farmers.' },
            { icon: <TrendingUp />, title: 'Innovation', desc: 'Leading with modern processing tech.' }
          ].map((val, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-lg border border-gray-50 hover:border-brand-green transition-all group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-white transition-all">
                {val.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif mb-2 text-brand-dark">{val.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default About;
