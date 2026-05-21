
import { Layout } from "@/components/layout/layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { Image } from "@/components/ui/image";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Your Cart
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-card rounded-lg border shadow-sm"
              >
                <div className="relative h-20 w-20 flex-shrink-0 bg-gray-50 dark:bg-gray-900/50 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                  <div className="text-sm text-muted-foreground">{item.category}</div>
                  <PriceTag price={item.price} className="mt-1" />
                </div>
                
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-6 text-center">{item.quantity}</span>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="h-8 w-8"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    <PriceTag price={item.price * item.quantity} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 h-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-muted-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-card rounded-lg border shadow p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <PriceTag price={totalPrice} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <PriceTag price={totalPrice} size="lg" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Including VAT
                </div>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Checkout
            </Button>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">We Accept</h3>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-8 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
