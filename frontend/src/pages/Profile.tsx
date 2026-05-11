import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Profile as ProfileType } from '../types';
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Loader2, CheckCircle2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'wishlist'>('info');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setWishlistProducts([]);
    }
  }, [wishlist]);

  const fetchWishlistProducts = async () => {
    if (wishlist.length === 0) return;
    try {
      // Firestore doesn't have an 'in' operator for document IDs easily in a simple query without collection ref
      // but we can query the 'products' collection
      const q = query(collection(db, 'products'), where('__name__', 'in', wishlist));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlistProducts(products);
    } catch (err) {
      console.error('Error fetching wishlist products:', err);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data() as ProfileType);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        shipping_address: profile.shipping_address,
        city: profile.city,
        postal_code: profile.postal_code,
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <Loader2 className="animate-spin text-brand-green" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[40px] shadow-xl p-10 text-center border border-gray-100 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-green" />
              <div className="w-24 h-24 bg-brand-green/10 rounded-3xl flex items-center justify-center text-brand-green mx-auto mb-6 group-hover:scale-110 transition-transform">
                <User size={40} />
              </div>
              <h2 className="text-xl font-serif font-bold text-brand-dark">{profile?.full_name || 'Valued Member'}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Liv Nature Collective</p>
            </div>

            <nav className="bg-white rounded-[32px] shadow-lg border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center space-x-4 px-8 py-5 font-bold text-xs uppercase tracking-widest transition-all ${
                  activeTab === 'info' ? 'bg-brand-green text-white' : 'text-gray-500 hover:text-brand-green hover:bg-gray-50'
                }`}
              >
                <Settings size={18} />
                <span>Account Info</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-4 px-8 py-5 font-bold text-xs uppercase tracking-widest transition-all ${
                  activeTab === 'wishlist' ? 'bg-brand-green text-white' : 'text-gray-500 hover:text-brand-green hover:bg-gray-50'
                }`}
              >
                <Heart size={18} />
                <span>My Wishlist ({wishlist.length})</span>
              </button>
              <Link to="/orders" className="flex items-center space-x-4 px-8 py-5 text-gray-500 hover:text-brand-green hover:bg-gray-50 font-bold text-xs uppercase tracking-widest transition-all">
                <Package size={18} />
                <span>My Orders</span>
              </Link>
              <button 
                onClick={() => signOut()}
                className="w-full flex items-center space-x-4 px-8 py-6 text-red-400 hover:text-red-500 hover:bg-red-50 font-bold text-xs uppercase tracking-widest transition-all border-t border-gray-50"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-brand-dark">
                    {activeTab === 'info' ? 'Account Details' : 'Nature Wishlist'}
                  </h1>
                  <p className="text-gray-400 text-sm font-medium mt-1">
                    {activeTab === 'info' 
                      ? 'Manage your delivery and contact information' 
                      : 'Your curated selection of favorited nature creations'}
                  </p>
                </div>
                {message && activeTab === 'info' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest ${
                      message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {message.type === 'success' && <CheckCircle2 size={14} />}
                    <span>{message.text}</span>
                  </motion.div>
                )}
              </div>

              {activeTab === 'info' ? (
                <form onSubmit={handleUpdateProfile} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Legal Name</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          required
                          type="text" 
                          value={profile?.full_name || ''}
                          onChange={(e) => setProfile({...profile!, full_name: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          disabled
                          type="email" 
                          value={user?.email || ''}
                          className="w-full bg-gray-100 border border-transparent rounded-2xl pl-16 pr-8 py-4 text-sm text-gray-400 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Contact Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          type="text" 
                          value={profile?.phone_number || ''}
                          onChange={(e) => setProfile({...profile!, phone_number: e.target.value})}
                          placeholder="+94 7X XXX XXXX"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Primary Shipping Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-8 text-gray-300" size={18} />
                      <textarea 
                        rows={3}
                        value={profile?.shipping_address || ''}
                        onChange={(e) => setProfile({...profile!, shipping_address: e.target.value})}
                        placeholder="Street address, apartment, suite..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-[32px] pl-16 pr-8 py-6 text-sm focus:outline-none focus:border-brand-green/30 transition-all resize-none shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">City / Region</label>
                      <input 
                        type="text" 
                        value={profile?.city || ''}
                        onChange={(e) => setProfile({...profile!, city: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Postal Code</label>
                      <input 
                        type="text" 
                        value={profile?.postal_code || ''}
                        onChange={(e) => setProfile({...profile!, postal_code: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={saving}
                    className="bg-brand-dark text-white px-12 py-5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl shadow-brand-dark/10 flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <span>Update Profile</span>}
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {wishlistProducts.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                      <Heart className="mx-auto text-gray-200 mb-6" size={48} />
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No favorites identified yet</p>
                      <Link to="/products" className="mt-6 inline-flex items-center space-x-2 text-brand-green font-bold text-[10px] uppercase tracking-widest hover:underline decoration-2 underline-offset-8">
                        <span>Explore Catalog</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    wishlistProducts.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-50 rounded-[32px] p-6 flex items-center space-x-6 group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-white overflow-hidden shrink-0 shadow-sm">
                          <img src={product.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-brand-dark text-sm truncate">{product.name}</h4>
                          <p className="text-[10px] font-bold text-brand-green mt-1">LKR {product.price.toLocaleString()}</p>
                          <div className="mt-4 flex items-center space-x-4">
                             <Link to={`/products/${product.id}`} className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark transition-colors">Details</Link>
                             <button 
                               onClick={() => toggleWishlist(product.id)}
                               className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors"
                             >
                                Remove
                             </button>
                          </div>
                        </div>
                        <div className="shrink-0">
                           <button className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center hover:bg-brand-green transition-all shadow-lg">
                              <ShoppingBag size={16} />
                           </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
