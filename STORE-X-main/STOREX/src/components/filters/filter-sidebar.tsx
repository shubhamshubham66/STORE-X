
import { useState, useEffect } from "react";
import { X, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FilterOptions } from "@/types";
import { fetchCategories } from "@/api/products";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  maxPrice: number;
}

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange,
  maxPrice = 1000
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, maxPrice]
  );

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange(filters.priceRange || [0, maxPrice]);
  }, [filters, maxPrice]);

  const handleApplyFilters = () => {
    onFilterChange({
      ...localFilters,
      priceRange: priceRange[0] === 0 && priceRange[1] === maxPrice ? null : priceRange
    });
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: null,
      priceRange: null,
      sortBy: null
    };
    setLocalFilters(clearedFilters);
    setPriceRange([0, maxPrice]);
    onFilterChange(clearedFilters);
  };

  const handleCategoryChange = (category: string | null) => {
    setLocalFilters(prev => ({
      ...prev,
      category
    }));
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    setLocalFilters(prev => ({
      ...prev,
      sortBy
    }));
  };

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background shadow-lg border-l transform transition-transform duration-300 ease-in-out overflow-y-auto",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm justify-start h-8 px-2 font-normal",
                    localFilters.category === null && "bg-secondary"
                  )}
                  onClick={() => handleCategoryChange(null)}
                >
                  All Categories
                </Button>
              </div>
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm justify-start h-8 px-2 font-normal",
                      localFilters.category === category && "bg-secondary"
                    )}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <div className="pt-2 pb-6">
              <Slider
                value={priceRange}
                min={0}
                max={maxPrice}
                step={1}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-4"
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="min-price" className="sr-only">
                    Min Price
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="h-9"
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div className="text-center">-</div>
                <div className="flex-1">
                  <Label htmlFor="max-price" className="sr-only">
                    Max Price
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="h-9"
                    min={priceRange[0]}
                    max={maxPrice}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-sm font-medium mb-3">Sort By</h3>
            <RadioGroup
              value={localFilters.sortBy || ""}
              onValueChange={(value) => 
                handleSortChange(value as FilterOptions['sortBy'])
              }
              className="space-y-1.5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="sort-default" />
                <Label htmlFor="sort-default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-asc" id="sort-price-asc" />
                <Label htmlFor="sort-price-asc">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-desc" id="sort-price-desc" />
                <Label htmlFor="sort-price-desc">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="sort-rating" />
                <Label htmlFor="sort-rating">Rating</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 flex gap-3">
            <Button variant="outline" onClick={handleClearFilters} className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
