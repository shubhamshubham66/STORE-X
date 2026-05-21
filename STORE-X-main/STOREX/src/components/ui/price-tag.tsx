
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({ price, size = "md", className }: PriceTagProps) {
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base font-medium",
    lg: "text-xl font-semibold",
  };

  return (
    <span className={cn(sizeClasses[size], "text-primary", className)}>
      {formatPrice}
    </span>
  );
}
