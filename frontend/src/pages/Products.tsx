import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Info, CheckCircle2, Loader2, Filter } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { Category, Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('products').select('*')
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (prodRes.data) setProducts(prodRes.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category_id === activeCategory);

  // Group products by category
  const groupedProducts = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.category_id === cat.id)
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="bg-warm-white pb-16 md:pb-24">
      {/* Header */}
      <section className="bg-brand-dark py-12 md:py-24 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-bold font-serif mb-6 md:mb-8"
          >
            Our Product Range
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto font-medium"
          >
            Discover the purest ingredients, processed with care and delivered with integrity.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="relative z-30 bg-white border-b border-gray-100 py-4 md:py-6 px-4">
        <div className="max-w-[1400px] mx-auto flex items-center">
          <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar w-full">
            <div className="flex items-center space-x-3 shrink-0 text-brand-dark/50 font-bold text-[11px] uppercase tracking-[0.25em] border-r border-gray-200 pr-6 h-10">
              <Filter size={14} className="text-brand-green" />
              <span>Filter Catalog</span>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-4">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-7 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === 'all' 
                  ? 'bg-brand-green border-brand-green text-white shadow-lg' 
                  : 'bg-warm-white border-gray-100 text-gray-500 hover:border-brand-green/30 hover:text-brand-dark'
                }`}
              >
                All Items
              </button>

              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-7 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 whitespace-nowrap border ${
                    activeCategory === cat.id 
                    ? 'bg-brand-green border-brand-green text-white shadow-lg' 
                    : 'bg-warm-white border-gray-100 text-gray-500 hover:border-brand-green/30 hover:text-brand-dark'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12 md:mt-16 min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-brand-light rounded-full"></div>
              <div className="w-16 h-16 border-4 border-brand-green rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-brand-dark/40 font-bold text-[10px] uppercase tracking-[0.3em] animate-pulse">Initializing Collection</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeCategory === 'all' ? (
              groupedProducts.map((cat) => (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-20 md:mb-32"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 border-b border-gray-200 pb-8 gap-6">
                    <div className="max-w-xl">
                      <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-dark mb-4">{cat.name}</h2>
                      <p className="text-gray-500 text-sm md:text-lg font-medium">Hygienically cleaned and packed premium selection.</p>
                    </div>
                    <div className="flex items-center space-x-3 text-brand-green font-bold text-xs tracking-widest uppercase bg-brand-light px-6 py-3 rounded-2xl shadow-sm">
                       <CheckCircle2 size={16} />
                       <span>Hygienically Packed</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {cat.items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Quality Banner */}
      <section className="px-4 md:px-8 mt-12 md:mt-20">
        <div className="bg-brand-light/50 rounded-[40px] md:rounded-[80px] p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark mb-6 md:mb-8">Uncompromising Quality Standards</h2>
            <div className="space-y-4 md:space-y-6">
              {[
                "Multiple rounds of cleaning and sorting to ensure 100% purity.",
                "State-of-the-art packaging technology to preserve freshness and aroma.",
                "Regular quality audits and laboratory testing for food safety."
              ].map((text, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-green text-white flex items-center justify-center mt-1 shrink-0"><CheckCircle2 size={12} /></div>
                  <p className="text-gray-600 font-medium text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
             <div className="bg-white p-8 rounded-[30px] md:rounded-[32px] shadow-lg border border-gray-50">
                <h4 className="text-brand-dark font-bold font-serif mb-2 text-lg">Bulk Orders?</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">We provide special pricing for restaurants, retail chains, and distributors.</p>
                <button className="text-brand-green font-bold text-xs uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
                  Enquire Now <Info size={14} className="ml-2"/>
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const activeWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden mb-6 bg-white shadow-xl">
          <img 
            src={product.image_url || 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80'} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-brand-dark/20 transition-all duration-500 flex flex-col items-center justify-center gap-4">
             <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
               <div className="bg-white text-brand-dark px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center space-x-2">
                  <span>View Details</span>
                  <Info size={14} />
               </div>
             </div>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-6 right-6 z-20">
            <button 
              onClick={handleAdd}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ${
                added ? 'bg-brand-green text-white scale-110' : 'bg-white text-brand-dark hover:bg-brand-dark hover:text-white'
              }`}
            >
              {added ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />}
            </button>
          </div>
          
          {product.is_featured && (
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <div className="bg-brand-gold text-white px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] shadow-lg">
                Featured
              </div>
            </div>
          )}

          {/* Wishlist Button */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <button 
              onClick={handleWishlist}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg border ${
                activeWishlist ? 'bg-white text-red-500 border-red-100' : 'bg-white/90 text-gray-400 border-transparent hover:text-red-400'
              }`}
            >
              <Heart size={16} fill={activeWishlist ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-start px-2">
        <Link to={`/products/${product.id}`} className="hover:text-brand-green transition-colors flex-grow mr-4">
          <h3 className="font-bold text-brand-dark text-base md:text-xl mb-1 leading-tight">{product.name}</h3>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{product.unit || 'Standard'}</p>
        </Link>
        <div className="text-right">
          <p className="text-brand-green font-bold text-base md:text-xl font-serif whitespace-nowrap">
            {typeof product.price === 'number' ? `LKR ${product.price.toLocaleString()}` : product.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
