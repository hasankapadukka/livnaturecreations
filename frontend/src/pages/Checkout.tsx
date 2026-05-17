import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
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
  AlertCircle,
  MessageSquare
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
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || '',
          phone_number: data.phone_number || '',
          shipping_address: data.shipping_address || '',
          city: data.city || '',
          postal_code: data.postal_code || ''
        }));
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleWhatsAppConfirm = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '94706878899';
    const itemsText = cart.map(item => `• *${item.name}* (${item.quantity} x ${item.unit})`).join('%0A');
    const shippingCost = cartTotal > 5000 ? 0 : 450;
    const totalValuation = cartTotal + shippingCost;
    const trackingUrl = `https://liv-nature-creations-99.web.app/track-order?id=${orderId}`;
    
    const message = `*🌿 LIV NATURE CREATIONS - ORDER CONFIRMATION*%0A%0A` +
      `Hello! I would like to confirm my order ID: *#${orderId?.slice(0, 8).toUpperCase()}*%0A%0A` +
      `*📦 ORDER DETAILS*%0A${itemsText}%0A%0A` +
      `*💰 FINANCIAL SUMMARY*%0A` +
      `• Subtotal: LKR ${cartTotal.toLocaleString()}%0A` +
      `• Shipping: ${shippingCost === 0 ? 'FREE' : 'LKR ' + shippingCost}%0A` +
      `• *Total Payable: LKR ${totalValuation.toLocaleString()}*%0A%0A` +
      `*📍 DELIVERY TO*%0A` +
      `• Name: ${formData.full_name}%0A` +
      `• Address: ${formData.shipping_address}, ${formData.city}%0A` +
      `• Phone: ${formData.phone_number}%0A%0A` +
      `*🔗 TRACKING LINK*%0A${trackingUrl}%0A%0A` +
      `_Thank you for choosing Liv Nature Creations!_`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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
      // 1. Create the Order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        customer_id: user.uid,
        total_amount: cartTotal,
        shipping_address: formData.shipping_address,
        city: formData.city,
        postal_code: formData.postal_code,
        contact_phone: formData.phone_number,
        status: 'pending',
        payment_method: formData.payment_method,
        created_at: serverTimestamp(),
        items: cart.map(item => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit
        }))
      });

      // 2. Success!
      setOrderId(orderRef.id);
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
          className="max-w-2xl w-full bg-white rounded-[50px] shadow-2xl p-12 md:p-16 text-center border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-green" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />
          
          <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-10 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
            >
              <CheckCircle2 size={48} />
            </motion.div>
          </div>

          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4 relative z-10">Order Successful</h1>
          <p className="text-gray-500 mb-2 font-medium relative z-10">Your order has been placed successfully with Liv Nature.</p>
          <div className="bg-gray-50 rounded-2xl p-4 inline-block mb-12 relative z-10 border border-gray-100">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Order ID:</span>
             <span className="text-xs font-bold text-brand-green uppercase tracking-widest">{orderId?.slice(0, 8)}</span>
          </div>
          
          <div className="space-y-4 max-w-sm mx-auto relative z-10 mb-10">
            <button 
              onClick={handleWhatsAppConfirm}
              className="w-full bg-[#25D366] text-white py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all shadow-xl flex items-center justify-center space-x-3 group"
            >
              <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
              <span>Confirm via WhatsApp</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/profile" className="bg-brand-dark text-white py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-lg text-center">
                My Orders
              </Link>
              <Link to="/products" className="bg-transparent border border-brand-dark/10 text-brand-dark py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-dark hover:text-white transition-all text-center">
                Shopping
              </Link>
            </div>
          </div>

          <div className="bg-brand-light/30 rounded-3xl p-8 text-left relative z-10 border border-brand-green/5">
             <h4 className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em] mb-4">What's Next?</h4>
             <div className="space-y-4">
                {[
                  { title: 'Confirm via WhatsApp', desc: 'Click the button above to send your order details to us.' },
                  { title: 'Order Verification', desc: 'Our team will verify your details and start processing.' },
                  { title: 'Dispatch & Tracking', desc: 'You will receive a tracking number once shipped.' }
                ].map((step, i) => (
                  <div key={i} className="flex space-x-4">
                    <span className="text-xs font-bold text-brand-green">0{i+1}</span>
                    <div>
                      <p className="text-[11px] font-bold text-brand-dark">{step.title}</p>
                      <p className="text-[10px] text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-3 opacity-30 relative z-10">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Secured Order Record</span>
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
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Checkout</h1>
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
                  <h2 className="text-xl font-bold text-brand-dark font-serif">Delivery Information</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Full Name</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Phone Number</label>
                   <input 
                    required 
                    type="text" 
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-8 py-4 text-sm focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
                   />
                 </div>
               </div>

               <div className="mt-8 space-y-3">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Street Address</label>
                 <textarea 
                  required 
                  rows={3}
                  value={formData.shipping_address}
                  onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
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
                  <h2 className="text-xl font-bold text-brand-dark font-serif">Payment Method</h2>
               </div>

               <div className="space-y-4">
                  <label className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${formData.payment_method === 'cod' ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.payment_method === 'cod' ? 'border-brand-green' : 'border-gray-300'}`}>
                        {formData.payment_method === 'cod' && <div className="w-3 h-3 bg-brand-green rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-dark uppercase tracking-tight">Cash on Delivery</p>
                        <p className="text-[10px] font-medium text-gray-400">Pay when you receive your order</p>
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
               <h3 className="text-xl font-serif font-bold mb-8">Order Summary</h3>
               
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
                    <span>Place Order</span>
                    <ChevronRight size={18} />
                   </>
                 )}
               </button>

               <div className="mt-8 flex items-center justify-center space-x-3 opacity-40">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Secure Checkout</span>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
