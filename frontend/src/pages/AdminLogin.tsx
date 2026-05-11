import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../assets/Liv Nature Creations Logo.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is actually an admin
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (!userDoc.exists()) {
        throw new Error('User profile not found in secure registry.');
      }

      if (!userData?.is_admin) {
        await signOut(auth);
        throw new Error('Access denied. This portal is for administrators only.');
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      let message = 'Authentication failed';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Invalid administrative credentials';
      } else {
        message = err.message || message;
      }
      setError(message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">
          <div className="bg-brand-green p-8 text-center text-white">
            <div className="h-16 flex items-center justify-center mx-auto mb-4">
              <img src={Logo} alt="Liv Nature Creations" className="h-full w-auto object-contain brightness-0 invert" />
            </div>
            <h1 className="text-2xl font-bold font-serif uppercase tracking-widest">Admin Portal</h1>
            <p className="text-white/60 text-xs font-medium mt-2">Liv Nature Creations Management</p>
          </div>

          <div className="p-8 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-center">
                <span className="mr-2">!</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-warm-white border border-gray-100 rounded-full pl-14 pr-8 py-4 text-sm focus:outline-none focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-warm-white border border-gray-100 rounded-full pl-14 pr-8 py-4 text-sm focus:outline-none focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-brand-dark text-white py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl flex items-center justify-center space-x-3 group disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <p className="text-center text-white/30 text-[10px] font-bold tracking-widest uppercase mt-8">
          Authorized Personnel Only &copy; 2025 Risolveit
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
