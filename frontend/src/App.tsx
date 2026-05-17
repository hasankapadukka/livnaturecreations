import { BrowserRouter as Router, Routes, Route, useLocation, Link, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Export from './pages/Export';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminProducts from './pages/AdminProducts';
import AdminInquiries from './pages/AdminInquiries';
import AdminOrders from './pages/AdminOrders';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import VerifyEmail from './pages/VerifyEmail';
import OrderDetail from './pages/OrderDetail';

// Placeholder components for other pages
const Shop = () => <div className="py-20 text-center text-4xl font-serif">Shop Page Coming Soon</div>;

// Admin Page Components
const AdminSettings = () => <div className="py-20 text-center font-bold text-gray-500 uppercase tracking-widest bg-white/5 rounded-[40px] border border-white/5">System Settings Coming Soon</div>;

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes - Wrapped in Storefront Layout */}
        <Route element={<Layout><AnimatedRoutesWrapper /></Layout>}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/export" element={<Export />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoute><Layout><AnimatedRoutesWrapper /></Layout></ProtectedRoute>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>

        {/* Admin Routes (Private) - No Storefront Layout */}
        <Route path="/admin/portal" element={<AdminLogin />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="inquiries" element={<AdminInquiries />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

// Helper to allow Layout to wrap nested routes
const AnimatedRoutesWrapper = () => {
  return <Outlet />;
};

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <AnimatedRoutes />
          </Router>
        </WishlistProvider>
      </AuthProvider>
    </CartProvider>
  );
}
