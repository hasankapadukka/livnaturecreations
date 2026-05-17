import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Order } from '../types';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowLeft, 
  Printer, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Calendar,
  CreditCard,
  MapPin,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'orders', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setOrder({
            id: docSnap.id,
            ...data,
            created_at: data.created_at?.toDate().toISOString() || new Date().toISOString()
          } as Order);
        } else {
          navigate('/orders');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const getStatusStep = (status: string) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIdx = steps.indexOf(status);
    return currentIdx;
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { icon: <Clock size={20} />, label: 'Pending Confirmation', color: 'text-amber-500', bg: 'bg-amber-50' };
      case 'processing': return { icon: <Package size={20} />, label: 'In Preparation', color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'shipped': return { icon: <Truck size={20} />, label: 'Dispatched', color: 'text-purple-500', bg: 'bg-purple-50' };
      case 'delivered': return { icon: <CheckCircle2 size={20} />, label: 'Delivered', color: 'text-green-500', bg: 'bg-green-50' };
      case 'cancelled': return { icon: <XCircle size={20} />, label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50' };
      default: return { icon: <Clock size={20} />, label: status, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-brand-green/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-green rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!order) return null;

  const statusInfo = getStatusInfo(order.status);
  const currentStep = getStatusStep(order.status);

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header - Hidden on Print */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0 print:hidden">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-brand-dark transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-serif font-bold text-brand-dark">Order Details</h1>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">View your order info</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrint}
              className="flex items-center space-x-3 bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100 text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all"
            >
              <Printer size={18} />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[50px] shadow-2xl border border-gray-100 overflow-hidden print:shadow-none print:border-none">
          {/* Top Banner */}
          <div className="bg-brand-dark p-10 md:p-16 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
               <div>
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="px-4 py-1.5 bg-brand-green/20 rounded-full border border-brand-green/30">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">Order ID</span>
                   </div>
                   <h2 className="text-2xl font-serif font-bold">#{order.id.toUpperCase()}</h2>
                 </div>
                 <div className="flex items-center space-x-6 text-white/60">
                   <div className="flex items-center space-x-2">
                     <Calendar size={16} />
                     <span className="text-xs font-medium">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <ShoppingBag size={16} />
                     <span className="text-xs font-medium">{order.items.length} Items</span>
                   </div>
                 </div>
               </div>
               
               <div className={`px-8 py-5 rounded-[24px] ${statusInfo.bg} ${statusInfo.color} border border-white/10 flex flex-col items-center shadow-2xl`}>
                 <div className="mb-2">{statusInfo.icon}</div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{statusInfo.label}</span>
               </div>
             </div>
          </div>

          {/* Status Progress - Hidden on Print */}
          {order.status !== 'cancelled' && (
            <div className="px-10 py-12 border-b border-gray-100 bg-gray-50/30 print:hidden">
              <div className="flex items-center justify-between relative max-w-3xl mx-auto">
                {/* Connector Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / 3) * 100}%` }}
                    className="h-full bg-brand-green"
                  />
                </div>
                
                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((label, idx) => (
                  <div key={label} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                      idx <= currentStep ? 'bg-brand-green border-brand-green text-white' : 'bg-white border-gray-200 text-gray-300'
                    }`}>
                      {idx < currentStep ? <CheckCircle2 size={16} /> : (idx === currentStep ? <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> : <div className="w-2 h-2 bg-gray-200 rounded-full" />)}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest mt-4 ${idx <= currentStep ? 'text-brand-dark' : 'text-gray-300'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Items Table */}
              <div className="lg:col-span-7">
                <h3 className="text-sm font-bold text-brand-dark uppercase tracking-[0.2em] mb-8 flex items-center">
                  <Package size={18} className="mr-3 text-brand-green" />
                  Items Ordered
                </h3>
                
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-green border border-gray-100 group-hover:bg-brand-green group-hover:text-white transition-all">
                          <ShoppingBag size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-dark leading-tight">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">QTY: {item.quantity} x {item.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-brand-dark">LKR {(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 font-medium tracking-widest">LKR {item.price.toLocaleString()} / Unit</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</p>
                     <div className="flex items-center space-x-3 text-brand-dark">
                        <CreditCard size={18} className="text-brand-green" />
                        <span className="text-xs font-bold uppercase tracking-widest">{order.payment_method?.replace('-', ' ') || 'Cash on Delivery'}</span>
                     </div>
                   </div>
                   {order.tracking_number && (
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Tracking Protocol</p>
                       <div className="flex items-center space-x-3 text-brand-dark">
                          <Truck size={18} className="text-brand-green" />
                          <span className="text-xs font-bold uppercase tracking-widest">{order.tracking_number}</span>
                       </div>
                     </div>
                   )}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-5 space-y-12">
                <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100">
                  <h3 className="text-sm font-bold text-brand-dark uppercase tracking-[0.2em] mb-8">Order Summary</h3>
                  
                  <div className="space-y-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">Subtotal</span>
                      <span className="text-brand-dark font-bold">LKR {order.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">Delivery (Shipping)</span>
                      <span className="text-brand-dark font-bold">
                        {order.total_amount > 5000 ? 'FREE' : 'LKR 450'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">Grand Total</span>
                    <span className="text-3xl font-serif font-bold text-brand-green">
                      LKR {(order.total_amount > 5000 ? order.total_amount : order.total_amount + 450).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="px-6">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Delivery Address</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin size={18} className="text-brand-green shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-brand-dark leading-relaxed italic">"{order.shipping_address}"</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{order.city}, {order.postal_code}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone size={18} className="text-brand-green shrink-0" />
                      <p className="text-xs font-bold text-brand-dark">{order.contact_phone}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex items-center justify-between opacity-50 px-6 print:hidden">
                   <div className="flex items-center space-x-2">
                     <ShieldCheck size={14} className="text-brand-green" />
                     <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Verified Secure Entry</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <Package size={14} className="text-brand-green" />
                     <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Eco-Safe Packaging</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section - Hidden on Print */}
        <div className="mt-12 bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between print:hidden">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
             <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green">
               <ShieldCheck size={32} />
             </div>
             <div>
               <h4 className="text-lg font-bold text-brand-dark">Need Assistance?</h4>
               <p className="text-sm text-gray-400 font-medium">Our curators are available to guide your acquisition.</p>
             </div>
          </div>
          <Link 
            to="/contact" 
            className="flex items-center space-x-3 bg-brand-dark text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg"
          >
            <span>Ask via WhatsApp</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
