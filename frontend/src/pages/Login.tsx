import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[50px] shadow-2xl p-12 text-center border border-gray-100"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-brand-dark">Customer Login</h1>
        <p className="text-gray-500 mb-10 font-medium">We are currently perfecting our loyalty and ordering system. Customer accounts will be available soon!</p>
        
        <div className="space-y-4">
          <Link to="/" className="block w-full bg-brand-green text-white py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-all shadow-lg">
            Back to Home
          </Link>
          <Link to="/contact" className="block text-brand-green font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
            Need Help? Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
