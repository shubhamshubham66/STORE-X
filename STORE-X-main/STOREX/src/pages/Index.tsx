
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { fetchProducts } from "@/api/products";
import { ProductGrid } from "@/components/products/product-grid";
import { Product, FilterOptions } from "@/types";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterSidebar } from "@/components/filters/filter-sidebar";
import { motion } from "framer-motion";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    sortBy: null
  });
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      
      // Calculate max price for filter slider
      if (data.length > 0) {
        const highest = Math.ceil(Math.max(...data.map(p => p.price)));
        setMaxPrice(highest + 10); // Add some buffer
      }
      
      setLoading(false);
    };
    
    loadProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      result = result.filter(
        product => 
          product.price >= filters.priceRange![0] && 
          product.price <= filters.priceRange![1]
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, filters]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Discover Quality Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated selection of premium items, designed with you in mind.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">
            {filteredProducts.length} Products
          </h2>
        </div>

        <ProductGrid products={filteredProducts} loading={loading} />
        
        <FilterSidebar
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          maxPrice={maxPrice}
        />
      </div>
    </Layout>
  );
};

export default Index;
