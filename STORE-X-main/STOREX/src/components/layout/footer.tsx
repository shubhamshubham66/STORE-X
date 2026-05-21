
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto py-6 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-lg font-semibold mb-2">
              STORE<span className="text-primary font-bold">X</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} StoreX. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Wishlist
            </Link>
            <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
