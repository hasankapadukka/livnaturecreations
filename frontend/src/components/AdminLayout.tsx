import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: 'Overview', path: '/admin/dashboard', desc: 'Performance & Stats' },
    { icon: <Package size={22} />, label: 'Products', path: '/admin/products', desc: 'Inventory Control' },
    { icon: <MessageSquare size={22} />, label: 'Inquiries', path: '/admin/inquiries', desc: 'Customer Leads' },
    { icon: <Settings size={22} />, label: 'Settings', path: '/admin/settings', desc: 'System Config' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/portal');
  };

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-gray-300 font-sans selection:bg-brand-green/30 selection:text-white">
      {/* 1. Ambient Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px]" />
      </div>

      {/* 2. Full-Height Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 left-0 z-40">
        <div className="bg-[#050A09] border-r border-white/5 h-full flex flex-col shadow-2xl overflow-hidden">
          {/* Logo Section */}
          <div className="p-8 border-b border-white/5">
            <Link to="/" className="group block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-green/20">L</div>
                <div>
                  <span className="text-sm font-bold tracking-[0.2em] text-white block leading-tight uppercase">LIV NATURE</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                  location.pathname === item.path 
                  ? 'bg-white/5 text-white' 
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.02]'
                }`}
              >
                <div className={`${location.pathname === item.path ? 'text-brand-green' : 'group-hover:text-white'} transition-colors mr-3 shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold tracking-wide truncate">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* User & Footer */}
          <div className="p-6 border-t border-white/5">
            <div className="flex items-center space-x-3 mb-6 overflow-hidden">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                <UserIcon size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-white truncate uppercase tracking-tighter">{user?.email}</p>
                <p className="text-[8px] text-brand-green font-bold uppercase tracking-widest">Master Admin</p>
              </div>
            </div>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Main Workspace - Edge to Edge */}
      <main className="flex-grow lg:ml-72 min-h-screen flex flex-col">
        {/* Top Header Bar - Minimal */}
        <header className="flex items-center justify-between mb-6 h-12 px-4">
          <div className="flex items-center">
            <button 
              className="lg:hidden w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[50] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-brand-dark z-[60] lg:hidden flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white font-bold text-xl">L</div>
                  <span className="text-white font-bold tracking-widest text-sm uppercase">Admin Console</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X size={28} />
                </button>
              </div>
              <nav className="space-y-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-6 py-5 rounded-3xl transition-all ${
                      location.pathname === item.path 
                      ? 'bg-brand-green text-white shadow-xl shadow-brand-green/20' 
                      : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-bold tracking-widest text-xs uppercase">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
