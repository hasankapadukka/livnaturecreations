import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { Order } from '../types';
import { Package, Truck, CheckCircle2, Clock, XCircle, ChevronRight, Loader2, Search, ArrowLeft, Heart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('customer_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Are you certain you wish to abort this acquisition?')) return;
    
    setCancellingId(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .eq('status', 'pending'); // Safety check

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' as any } : o));
    }
    setCancellingId(null);
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'pending': return { icon: <Clock size={16} />, color: 'bg-amber-50 text-amber-600', label: 'Pending Acceptance' };
      case 'processing': return { icon: <Loader2 size={16} className="animate-spin" />, color: 'bg-blue-50 text-blue-600', label: 'In Preparation' };
      case 'shipped': return { icon: <Truck size={16} />, color: 'bg-purple-50 text-purple-600', label: 'In Transit' };
      case 'delivered': return { icon: <CheckCircle2 size={16} />, color: 'bg-green-50 text-green-600', label: 'Successfully Delivered' };
      case 'cancelled': return { icon: <XCircle size={16} />, color: 'bg-red-50 text-red-600', label: 'Acquisition Cancelled' };
      default: return { icon: <Clock size={16} />, color: 'bg-gray-50 text-gray-600', label: status };
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-gray-400 hover:text-brand-dark transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-serif font-bold text-brand-dark">Order History</h1>
              <p className="text-gray-400 text-sm font-medium mt-1">Review your nature acquisition records</p>
            </div>
          </div>
          <Link to="/track-order" className="flex items-center space-x-3 bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100 text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all group">
            <Search size={18} className="text-brand-green group-hover:text-white" />
            <span>Track specific Order</span>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[40px] shadow-xl p-20 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-8">
              <Package size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">No acquisitions found</h3>
            <p className="text-gray-400 mb-10 max-w-md mx-auto">Your nature collective journey hasn't started yet. Explore our products to begin.</p>
            <Link to="/products" className="inline-block bg-brand-dark text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const status = getStatusDetails(order.status);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={order.id}
                  className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden group"
                >
                  {/* Order Header */}
                  <div className="px-10 py-8 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-dark shadow-sm">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Reference</p>
                        <p className="text-sm font-bold text-brand-dark uppercase tracking-widest">#{order.id.slice(0, 8)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Acquired On</p>
                        <p className="text-sm font-bold text-brand-dark">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valuation</p>
                        <p className="text-sm font-bold text-brand-green">LKR {order.total_amount.toLocaleString()}</p>
                      </div>
                      <div className={`flex items-center space-x-2 px-5 py-3 rounded-full ${status.color}`}>
                        {status.icon}
                        <span className="text-[10px] font-bold uppercase tracking-widest">{status.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Acquired Artifacts</p>
                        <div className="space-y-4">
                          {order.order_items?.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                                <img src={item.product?.image_url} alt={item.product?.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-brand-dark leading-tight">{item.product?.name}</p>
                                <p className="text-[10px] text-gray-400 font-medium tracking-widest">QTY: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50/50 rounded-[32px] p-8 border border-gray-100 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Logistics Target</p>
                          <div className="flex items-start space-x-3 text-gray-500">
                             <Truck size={16} className="mt-1 flex-shrink-0" />
                             <p className="text-xs font-medium leading-relaxed italic">"{order.shipping_address}, {order.city}"</p>
                          </div>
                        </div>
                        
                        {order.tracking_number && (
                          <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tracking Protocol</p>
                            <p className="text-sm font-bold text-brand-dark uppercase tracking-widest">{order.tracking_number}</p>
                          </div>
                        )}

                        {order.status === 'pending' && (
                          <div className="mt-8 pt-8 border-t border-gray-100">
                             <button 
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={cancellingId === order.id}
                              className="w-full flex items-center justify-center space-x-2 text-red-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] transition-all bg-red-50/50 py-4 rounded-2xl border border-red-100/50"
                             >
                               {cancellingId === order.id ? <Loader2 size={14} className="animate-spin" /> : <AlertTriangle size={14} />}
                               <span>Abort Acquisition</span>
                             </button>
                          </div>
                        )}

                        <div className="mt-8">
                           <Link 
                            to={`/track-order?id=${order.id}`}
                            className="flex items-center justify-between w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl text-[10px] font-bold text-brand-dark uppercase tracking-widest hover:border-brand-green hover:text-brand-green transition-all"
                           >
                             <span>Detailed Tracking Status</span>
                             <ChevronRight size={16} />
                           </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
