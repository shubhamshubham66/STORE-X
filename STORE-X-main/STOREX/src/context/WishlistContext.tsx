
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "../components/types";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems;
      }
      
      toast.success(`Added ${product.title} to wishlist`);
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.title} from wishlist`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
