import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Order } from '../types';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck,
  Clock,
  ExternalLink
} from 'lucide-react';

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('id')) {
      handleTrack(searchParams.get('id')!);
    }
  }, []);

  const handleTrack = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, 'orders', id.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() } as any);
      } else {
        setError('Order identification failed. Please check the ID and try again.');
        setOrder(null);
      }
    } catch (err) {
      console.error('Error tracking order from Firestore:', err);
      setError('An error occurred while attempting to locate the record.');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'pending', icon: <Clock />, label: 'Order Registered', desc: 'Acquisition request received' },
    { key: 'processing', icon: <Package />, label: 'In Preparation', desc: 'Curating your nature artifacts' },
    { key: 'shipped', icon: <Truck />, label: 'In Transit', desc: 'Dispatched to logistics carrier' },
    { key: 'delivered', icon: <CheckCircle2 />, label: 'Delivered', desc: 'Arrival at destination target' }
  ];

  const currentStatusIndex = order ? statusSteps.findIndex(s => s.key === order.status) : -1;

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Link to="/orders" className="text-gray-400 hover:text-brand-dark transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Track Acquisition</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-12 border border-gray-100 mb-12">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">Digital Tracking Protocol</p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-brand-green" size={24} />
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Registry ID..."
              className="w-full bg-gray-50 border border-gray-100 rounded-full pl-20 pr-40 py-6 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-brand-green/30 transition-all shadow-inner"
            />
            <button 
              onClick={() => handleTrack(orderId)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-dark text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-brand-green transition-all shadow-lg flex items-center space-x-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <span>Locate</span>}
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-500 p-8 rounded-[32px] text-center font-bold text-xs uppercase tracking-widest border border-red-100 mb-12"
          >
            {error}
          </motion.div>
        )}

        {order && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Tracking Timeline */}
            <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-16 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck size={120} />
               </div>
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 space-y-4 md:space-y-0">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Shipment</p>
                    <h2 className="text-2xl font-serif font-bold text-brand-dark">#{order.id.slice(0, 8).toUpperCase()}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Arrival</p>
                    <p className="text-lg font-bold text-brand-green">3-5 Business Days</p>
                  </div>
               </div>

               {/* Timeline UI */}
               <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100 hidden md:block">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                        className="h-full bg-brand-green"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = idx <= currentStatusIndex;
                      const isCurrent = idx === currentStatusIndex;
                      
                      return (
                        <div key={idx} className="flex md:flex-col items-center md:text-center space-x-6 md:space-x-0">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 mb-4 ${
                             isCompleted ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-gray-50 text-gray-300'
                           } ${isCurrent ? 'scale-125' : ''}`}>
                             {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                           </div>
                           <div>
                             <p className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-brand-dark' : 'text-gray-300'}`}>
                               {step.label}
                             </p>
                             <p className="text-[9px] font-medium text-gray-400 uppercase tracking-tighter mt-1 hidden md:block">
                               {step.desc}
                             </p>
                           </div>
                        </div>
                      );
                    })}
                  </div>
               </div>
            </div>

            {/* Logistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[40px] shadow-xl p-10 border border-gray-100">
                  <h3 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-6 flex items-center space-x-3">
                    <MapPin size={18} className="text-brand-green" />
                    <span>Deployment Target</span>
                  </h3>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-brand-dark">{order.shipping_address}</p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{order.city}, {order.postal_code}</p>
                  </div>
               </div>

               <div className="bg-brand-dark rounded-[40px] shadow-xl p-10 text-white relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Truck size={60} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Logistics Partner</h3>
                  <div className="space-y-4">
                     <div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Tracking Number</p>
                        <p className="text-lg font-bold text-brand-gold">{order.tracking_number || 'Awaiting Dispatch'}</p>
                     </div>
                     {order.tracking_number && (
                        <a href="#" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brand-green hover:text-white transition-colors">
                           <span>Carrier Website</span>
                           <ExternalLink size={12} />
                        </a>
                     )}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
