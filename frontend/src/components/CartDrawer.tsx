import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-brand-green" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-brand-dark font-serif">Shopping Bag</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cartCount} items selected</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-dark transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-dark">Your bag is empty</p>
                    <p className="text-sm text-gray-400">Start adding nature's best creations to your collection.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-8 py-3 bg-brand-dark text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-green transition-all"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 pb-6 border-b border-gray-50 last:border-0 group">
                    <div className="w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <img 
                        src={item.image_url || 'https://via.placeholder.com/150'} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-brand-dark text-sm leading-tight mb-1 group-hover:text-brand-green transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.unit}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-gray-50 rounded-lg p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white rounded-md transition-all shadow-sm"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-brand-dark">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white rounded-md transition-all shadow-sm"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-bold text-brand-dark text-sm">LKR {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Valuation</span>
                  <span className="text-2xl font-bold text-brand-dark font-serif">LKR {cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    to="/checkout" 
                    onClick={onClose}
                    className="flex items-center justify-center space-x-3 w-full bg-brand-green text-white py-5 rounded-[20px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-dark transition-all shadow-xl group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart"
                    onClick={onClose}
                    className="block text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark transition-colors py-2"
                  >
                    View Selection Details
                  </Link>
                  <p className="text-[9px] text-center text-gray-400 font-medium uppercase tracking-[0.1em]">
                    Free shipping on orders above LKR 5,000
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
