import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 md:pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* Logo & About */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="mb-6 md:mb-8">
              <span className="text-xl md:text-2xl font-bold tracking-[0.2em] font-heading block">LIV NATURE</span>
              <span className="text-[10px] tracking-[0.4em] font-light opacity-60 uppercase">Creations</span>
            </Link>
            <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-xs">
              Transforming nature's best into premium products. Sourced locally, processed hygienically, and delivered globally.
            </p>
            <div className="flex space-x-5">
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all shadow-sm"><Instagram size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all shadow-sm"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-6 md:mb-8">Navigation</h4>
            <nav className="flex flex-col space-y-3 md:space-y-4 text-white/60 font-medium text-sm">
              <Link to="/products" className="hover:text-brand-gold transition-colors">Products</Link>
              <Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
              <Link to="/export" className="hover:text-brand-gold transition-colors">Export Portal</Link>
              <Link to="/shop" className="hover:text-brand-gold transition-colors">Online Shop</Link>
              <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-6 md:mb-8">Categories</h4>
            <nav className="flex flex-col space-y-3 md:space-y-4 text-white/60 font-medium text-sm">
              <a href="#" className="hover:text-brand-gold transition-colors">Pulses & Legumes</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Spices & Herbs</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Grains & Rice</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Specialty Foods</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-6 md:mb-8">Head Office</h4>
            <div className="space-y-4 md:space-y-6 text-white/60 font-medium text-sm">
              <div className="flex items-start justify-center sm:justify-start space-x-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+94 77 XXX XXXX</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span className="break-all">info@livnature.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase text-center md:text-left">
          <p className="mb-4 md:mb-0 px-4">© 2025 Liv Nature Creations (Pvt) Ltd. All rights reserved.</p>
          <div className="flex space-x-6 md:space-x-8 px-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
