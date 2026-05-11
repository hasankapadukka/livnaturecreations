import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, ExternalLink, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { sendEmailVerification } from 'firebase/auth';

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "your inbox";
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (!auth.currentUser) return;
    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Error resending verification:', error);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-12 md:p-16 text-center border border-gray-100 relative overflow-hidden"
      >
        {/* Decorative Background Icon */}
        <div className="absolute -top-10 -right-10 opacity-5 text-brand-green">
          <Mail size={240} />
        </div>
 
        <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-10 relative z-10">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ShieldCheck size={48} />
          </motion.div>
        </div>
 
        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4 relative z-10">Verification Sent</h1>
        <p className="text-gray-500 mb-8 font-medium max-w-md mx-auto leading-relaxed relative z-10">
          A security link has been dispatched to <span className="text-brand-green font-bold">{email}</span>. 
          Please authorize your access to enter the collective.
        </p>
 
        <div className="flex flex-col space-y-4 max-w-sm mx-auto mb-12 relative z-10">
          <a 
            href="https://mail.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-dark text-white py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl flex items-center justify-center space-x-3"
          >
            <span>Open Mailbox</span>
            <ExternalLink size={16} />
          </a>
          <button 
            onClick={handleResend}
            disabled={resending || sent}
            className="flex items-center justify-center space-x-2 text-gray-400 hover:text-brand-dark transition-colors text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {resending ? <Loader2 className="animate-spin" size={12} /> : <RefreshCw size={12} />}
            <span>{sent ? 'Security link dispatched' : 'Resend security link'}</span>
          </button>
        </div>
 
        <div className="pt-8 border-t border-gray-50 relative z-10">
           <Link to="/login" className="text-brand-green font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all flex items-center justify-center space-x-2">
              <span>Back to Sign In</span>
              <ArrowRight size={14} />
           </Link>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-3 opacity-30 relative z-10">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Awaiting Authorization</span>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
