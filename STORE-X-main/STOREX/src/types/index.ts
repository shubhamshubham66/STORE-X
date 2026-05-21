
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export type FilterOptions = {
    category: string | null;
    priceRange: [number, number] | null;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | null;
  };
  