
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PriceTag } from "@/components/ui/price-tag";
import { Rating } from "@/components/ui/rating";
import { Image } from "@/components/ui/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/product/${product.id}`}
        className={cn(
          "group block relative rounded-2xl overflow-hidden bg-white dark:bg-card shadow-sm border hover:shadow-md transition-all duration-300",
          className
        )}
      >
        <div className="aspect-square overflow-hidden relative bg-gray-50 dark:bg-gray-900/50">
          <Image
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
          
          <Button
            size="icon"
            variant="ghost"
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border hover:bg-white dark:hover:bg-gray-900 transition-colors z-10"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
              )}
            />
          </Button>
          
          <div className="absolute bottom-2 left-2">
            <div className="text-xs bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-muted-foreground px-2 py-1 rounded-full">
              {product.category}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="mt-1 mb-2">
            <Rating value={product.rating.rate} size="sm" />
          </div>
          
          <PriceTag price={product.price} />
        </div>
      </Link>
    </motion.div>
  );
}
