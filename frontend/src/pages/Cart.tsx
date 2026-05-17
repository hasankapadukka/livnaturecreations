import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = cartTotal || 0;
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mx-auto mb-8">
            <ShoppingCart size={48} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-12 font-medium">Add some of our natural products to your cart to get started.</p>
          <Link to="/products" className="inline-block bg-brand-dark text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 bg-brand-dark text-white rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-dark">My Shopping Cart</h1>
            <p className="text-gray-400 text-sm font-medium mt-1">{cart.length} items in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[40px] p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative group"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-bold text-brand-dark mb-1">{item.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{item.unit || 'Standard Unit'}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-6">
                       <p className="text-lg font-bold text-brand-green font-serif">LKR {item.price.toLocaleString()}</p>
                       <div className="h-4 w-px bg-gray-100" />
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Stock</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-dark transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-brand-dark text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-dark transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex flex-col items-center md:items-end justify-between self-stretch py-2">
                    <p className="text-xl font-bold text-brand-dark font-serif">LKR {(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-500 transition-colors p-3 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8">Summary</h2>
              
              <div className="space-y-6 mb-10 pb-8 border-b border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Total Item Price</span>
                  <span className="text-brand-dark font-bold">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Delivery Charge</span>
                  <span className={shipping === 0 ? "text-brand-green font-bold" : "text-brand-dark font-bold"}>
                    {shipping === 0 ? "Free" : `LKR ${shipping.toLocaleString()}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest text-right animate-pulse">
                    Spend LKR { (5000 - subtotal).toLocaleString() } more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-12">
                <span className="text-lg font-serif font-bold text-brand-dark">Total Price</span>
                <span className="text-3xl font-serif font-bold text-brand-green">LKR {total.toLocaleString()}</span>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-brand-dark text-white py-6 rounded-3xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-green transition-all shadow-xl flex items-center justify-center space-x-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
                <Link to="/products" className="block text-center text-gray-400 hover:text-brand-dark text-[10px] font-bold uppercase tracking-widest py-4 transition-colors">
                  Continue Exploring
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-3xl border border-gray-100">
                  <ShieldCheck size={20} className="text-brand-green mb-2" />
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-3xl border border-gray-100">
                  <Truck size={20} className="text-brand-green mb-2" />
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Island-wide Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
