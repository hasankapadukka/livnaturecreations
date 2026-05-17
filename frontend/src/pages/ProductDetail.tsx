import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Product, Category } from '../types';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Check,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

import { useCart } from '../context/CartContext';
import { Minus, Plus as PlusIcon } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string>('Nature Creations');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(productData);

          // Fetch category name separately if category_id exists
          if (productData.category_id) {
            const catRef = doc(db, 'categories', productData.category_id);
            const catSnap = await getDoc(catRef);
            if (catSnap.exists()) {
              setCategoryName((catSnap.data() as Category).name);
            }
          }
        } else {
          console.error('No such product!');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product from Firestore:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
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

  if (!product) return null;

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
      <SEO 
        title={product.name} 
        description={product.description || `Premium quality ${product.name} from Liv Nature Creations. Hygienically cleaned and packed for the best experience.`}
        keywords={`${product.name}, ${categoryName}, Sri Lankan food, premium agro-product, Liv Nature`}
      />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-brand-green transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-brand-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl bg-white border border-gray-100">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.is_featured && (
              <div className="absolute top-8 left-8 bg-brand-gold text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Top Quality
              </div>
            )}
          </motion.div>

          {/* Right: Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <motion.div {...fadeInUp} className="mb-8">
              <p className="text-brand-green font-bold text-xs uppercase tracking-[0.3em] mb-4">
                {categoryName}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-6">
                <span className="text-3xl font-bold text-brand-dark">LKR {product.price?.toLocaleString()}</span>
                <span className="px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {product.unit || 'For one'}
                </span>
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="flex items-center space-x-6 mb-10">
              <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-brand-green hover:bg-brand-light rounded-xl transition-all"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-brand-dark">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-brand-green hover:bg-brand-light rounded-xl transition-all"
                >
                  <PlusIcon size={18} />
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Quantity</p>
            </motion.div>

            {/* Status Grid */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Stock?</p>
                  <p className="text-sm font-bold text-brand-dark uppercase tracking-tighter">
                    {product.stock_status === 'instock' ? 'In Stock' : 'Pre-Order Only'}
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center space-x-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grade</p>
                  <p className="text-sm font-bold text-brand-dark uppercase tracking-tighter">High Quality</p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="space-y-4 mb-12">
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`flex items-center justify-center space-x-3 w-full py-6 rounded-[24px] text-xs font-bold uppercase tracking-[0.3em] transition-all shadow-xl group ${
                  added ? 'bg-brand-green text-white' : 'bg-brand-green text-white hover:bg-brand-dark'
                }`}
              >
                <ShoppingBag size={20} className={added ? '' : 'group-hover:scale-110 transition-transform'} />
                <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center space-x-2 w-full bg-brand-dark text-white py-5 rounded-[24px] text-[10px] font-bold uppercase tracking-widest hover:bg-brand-green transition-all shadow-lg"
                >
                  <MessageSquare size={16} />
                  <span>Bulk Order</span>
                </Link>
                <Link 
                  to="/export" 
                  className="flex items-center justify-center space-x-2 w-full bg-transparent border border-brand-dark/10 text-brand-dark py-5 rounded-[24px] text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all"
                >
                  <Truck size={16} />
                  <span>Export</span>
                </Link>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="mb-12">
              <div className="flex space-x-8 border-b border-gray-100 mb-8">
                {['description', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === tab ? 'text-brand-green' : 'text-gray-400 hover:text-brand-dark'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="detailTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[100px]">
                {activeTab === 'description' ? (
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base italic">
                    {product.description || "Experience the best of nature with our high-quality products, sourced directly from Sri Lankan plantations."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Origin', value: 'Sri Lanka' },
                      { label: 'Processing', value: 'Natural' },
                      { label: 'Grade', value: 'Premium Export' },
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{spec.label}</span>
                        <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-gray-100">
               {[
                 { icon: <Truck size={18} />, label: 'Island-wide Delivery' },
                 { icon: <ShieldCheck size={18} />, label: 'Safe to Use' },
                 { icon: <Clock size={18} />, label: 'Always Fresh' }
               ].map((badge, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                    <div className="text-brand-green mb-2">{badge.icon}</div>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{badge.label}</span>
                 </div>
               ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
