
import { NavLink } from "react-router-dom";
import { ShoppingBag, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Header() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
      isScrolled 
        ? "bg-background/80 backdrop-blur-md shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold tracking-tight">
          STORE<span className="text-primary font-bold">X</span>
        </NavLink>
        
        <div className="flex items-center gap-4">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-full transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
              )
            }
          >
            <Search className="h-5 w-5" />
          </NavLink>
          
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              cn(
                "p-2 rounded-full transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
              )
            }
          >
            <Heart className="h-5 w-5" />
          </NavLink>
          
          <NavLink to="/cart">
            {({ isActive }) => (
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs font-medium rounded-full"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
