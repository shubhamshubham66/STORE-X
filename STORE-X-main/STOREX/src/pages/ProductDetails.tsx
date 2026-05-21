
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { fetchProductById } from "@/api/products";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { Rating } from "@/components/ui/rating";
import { Image } from "@/components/ui/image";
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      const data = await fetchProductById(parseInt(id));
      setProduct(data);
      setLoading(false);
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto pt-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse mt-4" />
              <div className="space-y-2 mt-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900/50 rounded-2xl p-8 flex items-center justify-center overflow-hidden"
          >
            <div className="relative w-full h-full max-h-[400px]">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-block bg-secondary px-3 py-1 rounded-full text-xs text-muted-foreground mb-3">
                {product.category}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Rating value={product.rating.rate} showCount count={product.rating.count} />
              </div>
            </div>
            
            <PriceTag price={product.price} size="lg" />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-l-md rounded-r-none"
                >
                  -
                </Button>
                <div className="h-10 px-6 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  className="h-10 w-10 rounded-r-md rounded-l-none"
                >
                  +
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={cn(
                    "w-full",
                    inWishlist && "bg-red-50 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4 mr-2", 
                      inWishlist && "fill-current"
                    )} 
                  />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
