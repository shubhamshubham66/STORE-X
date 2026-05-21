
import { Product } from "@/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
