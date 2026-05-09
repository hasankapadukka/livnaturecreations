import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, Send, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([formData]);

      if (error) throw error;
      setStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-warm-white pb-16 md:pb-24">
      {/* Header */}
      <section className="bg-brand-dark py-20 md:py-32 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center"
        ></motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-8xl font-bold font-serif mb-6 md:mb-10 leading-tight"
          >
            Get in <span className="text-brand-gold italic">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            Have questions about our products or want to discuss a partnership? We're here to help.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-16 md:-mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Info Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            {[
              { icon: <Phone size={24} />, title: 'Call Us', detail: '+94 77 XXX XXXX', sub: 'Direct support for orders.', link: 'tel:+9477XXXXXXX' },
              { icon: <Mail size={24} />, title: 'Email Us', detail: 'info@livnature.com', sub: '24/7 Response time.', link: 'mailto:info@livnature.com' },
              { icon: <Clock size={24} />, title: 'Working Hours', detail: 'Mon - Fri: 9am - 6pm', sub: 'Sat: 9am - 2pm', link: null }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10, borderColor: '#2d6a4f' }}
                className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 group transition-all duration-500"
              >
                 <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green mb-8 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                   {item.icon}
                 </div>
                 <h3 className="text-2xl font-bold font-serif mb-2 text-brand-dark">{item.title}</h3>
                 <p className="text-gray-400 mb-6 text-sm font-medium">{item.sub}</p>
                 {item.link ? (
                   <a href={item.link} className="text-lg font-bold text-brand-dark hover:text-brand-green transition-colors break-all underline decoration-brand-gold decoration-2 underline-offset-8">{item.detail}</a>
                 ) : (
                   <p className="text-lg font-bold text-brand-dark">{item.detail}</p>
                 )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white rounded-[50px] md:rounded-[70px] shadow-2xl p-10 md:p-20 border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 text-brand-dark">Send a Message</h2>
               <p className="text-gray-500 mb-12 md:mb-16 text-lg leading-relaxed font-medium">Whether you're interested in retail or bulk ordering, our team is ready to assist you.</p>
               
               <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" 
                        />
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-warm-white border border-gray-200 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all appearance-none shadow-sm cursor-pointer"
                        >
                           <option>General Enquiry</option>
                           <option>Retail Order Support</option>
                           <option>Bulk/Wholesale Inquiry</option>
                           <option>Partnership Proposal</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Message</label>
                     <textarea 
                        rows={6} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-warm-white border border-gray-200 rounded-[32px] px-8 py-6 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm"
                     ></textarea>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={submitting}
                      className="bg-brand-green text-white px-16 md:px-20 py-5 md:py-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-all shadow-2xl flex items-center justify-center space-x-3 group w-full sm:w-auto disabled:opacity-50 min-w-[250px]"
                    >
                       {submitting ? (
                         <Loader2 className="animate-spin" size={20} />
                       ) : (
                         <>
                           <span>Send Message</span>
                           <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         </>
                       )}
                    </motion.button>

                    <AnimatePresence>
                      {status === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-2 text-brand-green font-bold text-sm"
                        >
                          <CheckCircle size={20} />
                          <span>Message sent successfully!</span>
                        </motion.div>
                      )}
                      {status === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-500 font-bold text-sm"
                        >
                          Something went wrong. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
               </form>
             </div>
          </motion.div>

        </div>
      </div>

      {/* Map Section */}
      <section className="mt-24 md:mt-40 px-4 md:px-8">
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="max-w-[1400px] mx-auto flex flex-col lg:flex-row bg-white rounded-[60px] md:rounded-[80px] shadow-2xl overflow-hidden border border-gray-100"
         >
            <div className="flex-1 h-[400px] md:h-[600px] bg-gray-200 flex items-center justify-center relative overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Colombo City" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3000ms]" />
               <motion.div 
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 transition={{ delay: 0.5, type: "spring" }}
                 className="relative z-10 bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center"
               >
                  <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green mb-4">
                    <MapPin size={32} />
                  </div>
                  <span className="font-bold text-brand-dark text-xl font-serif">Headquarters</span>
                  <span className="text-sm font-medium text-gray-500">Colombo, Sri Lanka</span>
               </motion.div>
            </div>
            <div className="lg:w-1/3 p-12 md:p-20 flex flex-col justify-center text-center lg:text-left bg-warm-white/50">
               <h3 className="text-3xl md:text-4xl font-bold font-serif mb-8 text-brand-dark">Visit Our Office</h3>
               <p className="text-gray-500 mb-12 leading-relaxed text-lg font-medium">
                  Located in the heart of Colombo, our corporate office manages global operations and retail distribution. Visit us for partnership discussions and product sampling.
               </p>
               <div className="flex items-center justify-center lg:justify-start space-x-6">
                  <motion.a whileHover={{ scale: 1.1, y: -5 }} href="#" className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-md"><Instagram size={24} /></motion.a>
                  <motion.a whileHover={{ scale: 1.1, y: -5 }} href="#" className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-md"><Facebook size={24} /></motion.a>
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Contact;
