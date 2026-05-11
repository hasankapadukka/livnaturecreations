import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Order } from '../types';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  MoreVertical,
  Loader2,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Using onSnapshot for real-time updates in admin panel
    const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate().toISOString() || new Date().toISOString()
      } as any));
      setOrders(orderList);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to orders:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const updateTrackingNumber = async (orderId: string, trackingNum: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { tracking_number: trackingNum });
    } catch (err) {
      console.error('Error updating tracking number:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filteredOrders = orders.filter(o => 
    (o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     o.contact_phone?.includes(searchTerm)) &&
    (statusFilter === 'all' || o.status === statusFilter)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Orders</p>
           <p className="text-3xl font-bold text-white">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pending acceptance</p>
           <p className="text-3xl font-bold text-amber-500">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Valuation</p>
           <p className="text-3xl font-bold text-green-500">LKR {orders.reduce((acc, o) => acc + (o.total_amount || 0), 0).toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Completed</p>
           <p className="text-3xl font-bold text-purple-500">{orders.filter(o => o.status === 'delivered').length}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-8 py-4 text-sm text-white focus:outline-none focus:border-brand-green/30"
          />
        </div>
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-2">
          <Filter size={16} className="text-gray-500" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-sm text-white focus:outline-none py-2"
          >
            <option value="all" className="bg-brand-dark">All Statuses</option>
            <option value="pending" className="bg-brand-dark">Pending</option>
            <option value="processing" className="bg-brand-dark">Processing</option>
            <option value="shipped" className="bg-brand-dark">Shipped</option>
            <option value="delivered" className="bg-brand-dark">Delivered</option>
            <option value="cancelled" className="bg-brand-dark">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Details</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Info</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valuation</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipment Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="animate-spin text-brand-green mx-auto mb-4" size={32} />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Syncing Registry...</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <AlertCircle className="text-gray-600 mx-auto mb-4" size={32} />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">No matching acquisitions found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white mb-1 uppercase tracking-widest">#{order.id.slice(0, 8)}</span>
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">
                          {new Date(order.created_at).toLocaleString()}
                        </span>
                        <div className="mt-2 flex -space-x-2">
                          {order.items?.map((item: any, i: number) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-dark bg-white flex items-center justify-center overflow-hidden" title={item.name}>
                              <ShoppingBag size={12} className="text-brand-green" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white mb-1">{order.contact_phone}</span>
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tight line-clamp-1 italic">
                          {order.city}, {order.postal_code}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-brand-green">LKR {order.total_amount?.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                          {order.items?.length} Items
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col space-y-2">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border focus:outline-none transition-all ${getStatusColor(order.status)}`}
                        >
                          <option value="pending" className="bg-brand-dark">Pending</option>
                          <option value="processing" className="bg-brand-dark">Processing</option>
                          <option value="shipped" className="bg-brand-dark">Shipped</option>
                          <option value="delivered" className="bg-brand-dark">Delivered</option>
                          <option value="cancelled" className="bg-brand-dark">Cancelled</option>
                        </select>
                        <input 
                          type="text" 
                          placeholder="Add Tracking #"
                          value={order.tracking_number || ''}
                          onChange={(e) => updateTrackingNumber(order.id, e.target.value)}
                          className="bg-transparent border-b border-white/10 text-[10px] text-gray-400 py-1 focus:outline-none focus:border-brand-green/30"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
