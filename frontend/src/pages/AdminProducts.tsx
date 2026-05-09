import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Product, Category } from '../types';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Package,
  Eye,
  Loader2,
  X,
  Check,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*')
    ]);
    
    if (prodRes.data) setProducts(prodRes.data);
    if (catRes.data) setCategories(catRes.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Confirm permanent deletion? This action cannot be undone.')) return;
    
    setActionLoading(true);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    }
    setActionLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct?.category_id) {
      alert('Please select a product category before saving.');
      return;
    }

    setActionLoading(true);
    
    try {
      // Clean up data before sending to Supabase
      const payload = {
        name: editingProduct.name,
        price: editingProduct.price,
        unit: editingProduct.unit,
        image_url: editingProduct.image_url,
        category_id: editingProduct.category_id,
        is_featured: editingProduct.is_featured || false,
        description: editingProduct.description,
        stock_status: editingProduct.stock_status || 'instock'
      };

      console.log('Sending payload to Supabase:', payload);
      
      if (editingProduct?.id) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([payload]);
        
        if (error) throw error;
      }

      setIsModalOpen(false);
      await fetchData();
      alert('SUCCESS: Asset has been integrated into the inventory.');
    } catch (error: any) {
      console.error('DATABASE ERROR:', error);
      alert(`DATABASE REJECTION: ${error.message || error.details || 'Check console for details.'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold font-serif text-white tracking-tight">Inventory Control</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Manage your nature catalog</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search assets..."
              className="w-full sm:w-64 pl-12 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-brand-green/30 text-xs text-white placeholder:text-gray-600 transition-all shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-brand-green text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-green text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <button 
            onClick={() => {
              setEditingProduct({ is_featured: false, stock_status: 'instock' });
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-brand-green text-white px-5 py-2.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-green/20"
          >
            <Plus size={18} />
            <span>Create Asset</span>
          </button>
        </div>
      </div>

      {/* 2. Content Display */}
      {viewMode === 'table' ? (
        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl flex-grow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Asset Details</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Classification</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Valuation</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Inventory Status</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-brand-green/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-brand-green rounded-full border-t-transparent animate-spin" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] animate-pulse">Syncing Database...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center text-gray-600 font-medium italic">No assets found in the current buffer.</td>
                  </tr>
                ) : filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-900 overflow-hidden border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-xl">
                          <img 
                            src={product.image_url || 'https://via.placeholder.com/150'} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-100 truncate group-hover:text-brand-green transition-colors">{product.name}</p>
                          <div className="flex items-center space-x-2">
                             <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{product.unit || 'Standard'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        {categories.find(c => c.id === product.category_id)?.name || 'Unsorted'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">LKR {product.price?.toLocaleString()}</span>
                        <span className="text-[8px] text-brand-green/60 font-bold uppercase tracking-tighter">Premium Grade</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg border ${
                        product.stock_status === 'instock' 
                        ? 'bg-brand-green/10 border-brand-green/20 text-brand-green' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${product.stock_status === 'instock' ? 'bg-brand-green' : 'bg-red-500'}`} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">
                          {product.stock_status === 'instock' ? 'In Stock' : 'Depleted'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="w-8 h-8 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all flex items-center justify-center border border-blue-500/20"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center border border-red-500/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden group hover:border-brand-green/30 transition-all shadow-2xl"
            >
              <div className="h-64 relative overflow-hidden">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60" />
                <div className="absolute top-6 right-6">
                   <span className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest backdrop-blur-md ${
                     product.stock_status === 'instock' ? 'bg-brand-green/80 text-white' : 'bg-red-500/80 text-white'
                   }`}>
                     {product.stock_status === 'instock' ? 'Ready' : 'Depleted'}
                   </span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.3em] mb-1">
                      {categories.find(c => c.id === product.category_id)?.name}
                    </p>
                    <h4 className="text-xl font-bold text-white leading-tight">{product.name}</h4>
                  </div>
                  <p className="text-xl font-bold text-brand-gold">LKR {product.price?.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                   <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                     <Package size={14} />
                     <span>{product.unit}</span>
                   </div>
                   <div className="flex space-x-2">
                     <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="p-3 bg-white/5 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all">
                       <Edit2 size={16} />
                     </button>
                     <button onClick={() => handleDelete(product.id)} className="p-3 bg-white/5 text-gray-400 hover:text-red-400 rounded-xl border border-white/5 transition-all">
                       <Trash2 size={16} />
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 3. Product Modal Redesign */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-brand-dark border border-white/10 w-full max-w-3xl rounded-[50px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {editingProduct?.id ? 'Refine Asset' : 'Integrate New Asset'}
                  </h3>
                  <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.3em] mt-1">Inventory Management Suite</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center border border-white/5">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[65vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Asset Designation</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner" value={editingProduct?.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Classification</label>
                    <select required className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner" value={editingProduct?.category_id || ''} onChange={(e) => setEditingProduct({...editingProduct, category_id: e.target.value})}>
                      <option value="" className="bg-brand-dark">Select Classification</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id} className="bg-brand-dark">{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Valuation (LKR)</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner" value={editingProduct?.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Weight Unit</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner" value={editingProduct?.unit || ''} onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})} placeholder="e.g. 100g" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Visual Reference (URL)</label>
                  <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner" value={editingProduct?.image_url || ''} onChange={(e) => setEditingProduct({...editingProduct, image_url: e.target.value})} />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">Asset Description</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/5 rounded-[32px] px-8 py-6 text-sm text-white focus:outline-none focus:border-brand-green/30 transition-all shadow-inner resize-none" value={editingProduct?.description || ''} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                </div>

                <div className="flex items-center space-x-10 pt-4">
                  <label className="flex items-center space-x-4 cursor-pointer group">
                    <div className={`w-12 h-7 rounded-full transition-all relative ${editingProduct?.is_featured ? 'bg-brand-green' : 'bg-gray-800'}`}>
                      <input type="checkbox" className="hidden" checked={editingProduct?.is_featured || false} onChange={(e) => setEditingProduct({...editingProduct, is_featured: e.target.checked})} />
                      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-lg ${editingProduct?.is_featured ? 'left-6' : 'left-1'}`} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-brand-green transition-colors">Featured Asset</span>
                  </label>

                  <div className="flex-grow flex items-center space-x-4">
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Inventory Status:</span>
                     <select className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-bold text-brand-green uppercase tracking-widest focus:outline-none" value={editingProduct?.stock_status || 'instock'} onChange={(e) => setEditingProduct({...editingProduct, stock_status: e.target.value as any})}>
                        <option value="instock" className="bg-brand-dark">Available</option>
                        <option value="outofstock" className="bg-brand-dark">Depleted</option>
                     </select>
                  </div>
                </div>

                <div className="flex gap-6 pt-10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 rounded-3xl font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:bg-white/5 transition-all border border-white/5">
                    Cancel Operation
                  </button>
                  <button type="submit" disabled={actionLoading} className="flex-grow py-5 bg-brand-green text-white rounded-3xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-dark transition-all shadow-2xl shadow-brand-green/20 disabled:opacity-50 flex items-center justify-center space-x-3">
                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    <span>{editingProduct?.id ? 'Commit Changes' : 'Confirm Integration'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
