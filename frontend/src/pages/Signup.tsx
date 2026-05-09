import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { Mail, Lock, User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          is_admin: false
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/verify-email', { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-dark mb-3">Join the Collective</h1>
          <p className="text-gray-400 text-sm font-medium">Create your private account today</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold mb-8 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl pl-16 pr-8 py-5 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nature@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl pl-16 pr-8 py-5 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl pl-16 pr-8 py-5 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-6 rounded-3xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark transition-all shadow-xl shadow-brand-green/10 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <>
                <span>Begin Journey</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-xs font-medium mb-4">Already a member?</p>
          <Link 
            to="/login" 
            className="text-brand-dark font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all"
          >
            Sign In to Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
