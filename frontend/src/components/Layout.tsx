import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let scroll: any;

    if (scrollRef.current) {
      scroll = new LocomotiveScroll();
    }

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  // Reset scroll on path change
  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]') as any;
    if (scrollEl && (window as any).locomotiveScroll) {
       (window as any).locomotiveScroll.scrollTo(0, { duration: 0, disableLerp: true });
    } else {
       window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-warm-white selection:bg-brand-green selection:text-white">
      <Header />
      <main ref={scrollRef} data-scroll-container className="flex-grow outline-none">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {children}
          <Footer />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
