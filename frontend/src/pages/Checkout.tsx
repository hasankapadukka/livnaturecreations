import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    shipping_address: '',
    city: '',
    postal_code: '',
    payment_method: 'cod'
  });

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate('/products');
    }
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setFormData(prev => ({
        ...prev,
        full_name: data.full_name || '',
        phone_number: data.phone_number || '',
        shipping_address: data.shipping_address || '',
        city: data.city || '',
        postal_code: data.postal_code || ''
      }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create the Order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          total_amount: cartTotal,
          shipping_address: formData.shipping_address,
          city: formData.city,
          postal_code: formData.postal_code,
          contact_phone: formData.phone_number,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Success!
      setOrderId(orderData.id);
      setOrderComplete(true);
      clearCart();
    } catch (err: any) {
      console.error('Order Submission Error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-12 md:p-16 text-center border border-gray-100"
        >
          <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-10">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Order Confirmed</h1>
          <p className="text-gray-500 mb-2 font-medium">Thank you for your integration into nature's journey.</p>
          <div className="bg-gray-50 rounded-2xl p-4 inline-block mb-12">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Order Tracking ID:</span>
             <span className="text-xs font-bold text-brand-green uppercase tracking-widest">{orderId?.slice(0, 8)}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/orders" className="bg-brand-dark text-white py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl">
              Track My Order
            </Link>
            <Link to="/products" className="bg-transparent border-2 border-brand-dark/10 text-brand-dark py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-dark hover:text-white transition-all">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Link to="/products" className="text-gray-400 hover:text-brand-dark transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Complete Acquisition</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Shipping Section */}
            <section className="bg-white rounded-[40px] shadow-xl p-10 md:p-14 border border-gray-100">
               <div className="flex items-center space-x-4 mb-10">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
                    <MapPin size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark font-serif">Shipping Registry</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Consignee Name</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    placeholder="Legal name for delivery"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Contact Protocol (Phone)</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    placeholder="+94 7X XXX XXXX"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
               </div>

               <div className="mt-8 space-y-3">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Destination Address</label>
                 <textarea 
                  required 
                  rows={3}
                  value={formData.shipping_address}
                  onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
                  placeholder="Precise location for delivery"
                  className="w-full bg-gray-50 border border-gray-100 rounded-[32px] px-8 py-6 text-sm focus:outline-none focus:border-brand-green/30 transition-all resize-none shadow-inner"
                 />
               </div>

               <div className="grid grid-cols-2 gap-8 mt-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">City</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Postal Code</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.postal_code}
                    onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
               </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white rounded-[40px] shadow-xl p-10 md:p-14 border border-gray-100">
               <div className="flex items-center space-x-4 mb-10">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark font-serif">Settlement Strategy</h2>
               </div>

               <div className="space-y-4">
                  <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.payment_method === 'cod' ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.payment_method === 'cod' ? 'border-brand-green' : 'border-gray-300'}`}>
                        {formData.payment_method === 'cod' && <div className="w-3 h-3 bg-brand-green rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-dark uppercase tracking-tight">Cash on Delivery</p>
                        <p className="text-[10px] font-medium text-gray-400">Settle your valuation upon physical arrival</p>
                      </div>
                    </div>
                    <input type="radio" className="hidden" checked={formData.payment_method === 'cod'} onChange={() => setFormData({...formData, payment_method: 'cod'})} />
                  </label>

                  <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-not-allowed opacity-50 border-gray-100`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center" />
                      <div>
                        <p className="text-sm font-bold text-brand-dark uppercase tracking-tight">Digital Transfer (Card)</p>
                        <p className="text-[10px] font-medium text-gray-400">Integration coming in the next release</p>
                      </div>
                    </div>
                  </label>
               </div>
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-dark rounded-[40px] shadow-2xl p-10 text-white sticky top-32">
               <h3 className="text-xl font-serif font-bold mb-8">Acquisition Summary</h3>
               
               <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                 {cart.map((item) => (
                   <div key={item.id} className="flex justify-between items-center">
                     <div>
                       <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                       <p className="text-[10px] text-white/50 font-medium uppercase tracking-widest">{item.quantity} x {item.unit}</p>
                     </div>
                     <p className="text-sm font-bold">LKR {(item.price * item.quantity).toLocaleString()}</p>
                   </div>
                 ))}
               </div>

               <div className="border-t border-white/10 pt-8 space-y-4">
                 <div className="flex justify-between text-white/60 text-[10px] font-bold uppercase tracking-widest">
                   <span>Subtotal</span>
                   <span>LKR {cartTotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-white/60 text-[10px] font-bold uppercase tracking-widest">
                   <span>Logistics (Shipping)</span>
                   <span>{cartTotal > 5000 ? 'Complimentary' : 'LKR 450'}</span>
                 </div>
                 <div className="flex justify-between text-xl font-bold pt-4">
                   <span>Total Valuation</span>
                   <span className="text-brand-gold">LKR {(cartTotal > 5000 ? cartTotal : cartTotal + 450).toLocaleString()}</span>
                 </div>
               </div>

               {error && (
                  <div className="mt-8 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center space-x-3 text-red-400">
                    <AlertCircle size={16} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                  </div>
               )}

               <button 
                type="submit"
                disabled={loading}
                className="w-full bg-brand-green text-white py-6 rounded-3xl text-xs font-bold tracking-[0.2em] uppercase mt-10 hover:bg-white hover:text-brand-dark transition-all shadow-xl shadow-brand-green/20 flex items-center justify-center space-x-3 disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={18} /> : (
                   <>
                    <span>Commit Acquisition</span>
                    <ChevronRight size={18} />
                   </>
                 )}
               </button>

               <div className="mt-8 flex items-center justify-center space-x-3 opacity-40">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Encrypted Checkout Protocol</span>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
