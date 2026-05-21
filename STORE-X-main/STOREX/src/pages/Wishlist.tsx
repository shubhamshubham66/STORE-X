
import { Layout } from "@/components/layout/layout";
import { useWishlist } from "@/context/WishlistContext";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="rounded-full bg-red-50 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Discover products you love and add them to your wishlist to save them for later.
            </p>
            <Button asChild>
              <Link to="/">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold"
          >
            Your Wishlist ({wishlistItems.length})
          </motion.h1>
          
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="text-muted-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>
        
        <ProductGrid products={wishlistItems} />
      </div>
    </Layout>
  );
};

export default Wishlist;
