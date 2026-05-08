import React, { useState } from 'react';
import { Search, ChevronDown, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tickerItems = [
    "Free shipping on orders above LKR 5,000",
    "100% Hygienically Packed & Sealed",
    "Export-Ready Quality Guaranteed",
    "Sourced directly from local farmers"
  ];

  return (
    <>
      {/* 1. Main Header */}
      <header className="relative flex items-center justify-between px-4 md:px-8 h-[4.5rem] md:h-[5.5rem] border-b border-gray-100 bg-white shadow-sm z-50">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-heading font-medium text-gray-800">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <div className="relative group">
            <Link to="/products" className="flex items-center hover:text-brand-green transition-colors">
              Products <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform"/>
            </Link>
          </div>
          <Link to="/shop" className="hover:text-brand-green transition-colors">Shop</Link>
          <Link to="/export" className="hover:text-brand-green transition-colors">Export</Link>
          <Link to="/about" className="hover:text-brand-green transition-colors">About</Link>
        </nav>
        
        {/* Centered Logo Block */}
        <Link to="/" className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-brand-dark text-white px-4 md:px-8 h-full flex flex-col justify-center items-center shadow-lg hover:bg-brand-green transition-colors min-w-[140px]">
          <div className="flex flex-col items-center">
            <span className="text-base md:text-[22px] font-bold tracking-[0.15em] md:tracking-[0.2em] font-heading leading-tight uppercase">LIV NATURE</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-light opacity-80 uppercase">Creations</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-3 md:space-x-5 text-sm font-heading font-medium z-10">
          <button className="hidden sm:block text-gray-800 hover:text-brand-green transition-colors"><Search size={18} strokeWidth={2.5} /></button>
          <Link to="/contact" className="hidden lg:block hover:text-brand-green transition-colors">Contact</Link>
          
          <button className="hidden sm:flex bg-brand-dark text-white px-4 py-[10px] rounded-full items-center space-x-2 hover:bg-brand-green transition-all text-[10px] font-bold shadow-sm">
            <ShoppingBag size={14} strokeWidth={2.5} className="mr-1"/>
            <span className="hidden xl:inline">0 items in cart</span>
            <span className="xl:hidden">0</span>
          </button>

          <a href="#" className="bg-brand-green text-white px-4 md:px-6 py-[10px] rounded-full hover:bg-brand-dark transition-all transform hover:scale-105 shadow-md text-xs md:text-sm">Sign In</a>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`fixed inset-0 bg-brand-dark z-[60] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-12">
               <div className="text-white">
                 <span className="text-xl font-bold tracking-widest font-heading block">LIV NATURE</span>
                 <span className="text-[10px] tracking-[0.4em] font-light opacity-60 uppercase">Creations</span>
               </div>
               <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                 <X size={32} />
               </button>
            </div>
            
            <nav className="flex flex-col space-y-8 text-2xl font-serif text-white">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Home</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Products</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Shop</Link>
              <Link to="/export" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Export</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Contact</Link>
            </nav>

            <div className="mt-auto pt-12 border-t border-white/10">
               <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Connect With Us</p>
               <div className="flex space-x-6 text-brand-gold">
                 <a href="#" className="text-sm font-bold">INSTAGRAM</a>
                 <a href="#" className="text-sm font-bold">FACEBOOK</a>
                 <a href="#" className="text-sm font-bold">WHATSAPP</a>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker Bar - Marquee Implementation */}
      <div className="w-full flex items-center h-10 border-b border-gray-100 bg-brand-light/30 overflow-hidden text-brand-dark text-[10px] font-bold tracking-[0.15em] uppercase" aria-hidden="true">
        <div className="flex w-max items-center whitespace-nowrap animate-marquee">
          {/* First set */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`set1-${i}`}>
              <span className="px-8">{item}</span>
              <span className="text-brand-gold text-lg">/</span>
            </React.Fragment>
          ))}
          {/* Second set (duplicate for seamless loop) */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`set2-${i}`}>
              <span className="px-8">{item}</span>
              <span className="text-brand-gold text-lg">/</span>
            </React.Fragment>
          ))}
          {/* Third set (extra buffer for wider screens) */}
          {tickerItems.map((item, i) => (
            <React.Fragment key={`set3-${i}`}>
              <span className="px-8">{item}</span>
              <span className="text-brand-gold text-lg">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
