
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-9xl font-bold text-primary/10">404</h1>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
