
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { FilterSidebar } from "@/components/filters/filter-sidebar";
import { FilterOptions, Product } from "@/types";
import { fetchProducts } from "@/api/products";
import { Search as SearchIcon, Filter } from "lucide-react";
import { motion } from "framer-motion";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
      setAllProducts(data);
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
    let result = [...allProducts];
    
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
  }, [allProducts, searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is applied reactively, so this function just prevents form submission
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Search Products
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by product name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </form>
        </motion.div>
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">
            {filteredProducts.length} results
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

export default Search;
