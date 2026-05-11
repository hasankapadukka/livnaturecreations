import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: string[]; // Array of product IDs
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setWishlist(userDoc.data().wishlist || []);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) return;

    const isItemInWishlist = wishlist.includes(productId);
    const userRef = doc(db, 'users', user.uid);

    try {
      if (isItemInWishlist) {
        // Remove
        setWishlist(prev => prev.filter(id => id !== productId));
        await updateDoc(userRef, {
          wishlist: arrayRemove(productId)
        });
      } else {
        // Add
        setWishlist(prev => [...prev, productId]);
        await updateDoc(userRef, {
          wishlist: arrayUnion(productId)
        });
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      // Revert local state on error
      fetchWishlist();
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
