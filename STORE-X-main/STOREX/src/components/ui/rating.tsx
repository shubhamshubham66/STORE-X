
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  count?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Rating({
  value,
  count,
  showCount = false,
  size = "md",
  className,
}: RatingProps) {
  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="text-amber-400">
            {i < fullStars ? (
              <Star className={sizeClasses[size]} fill="currentColor" />
            ) : i === fullStars && hasHalfStar ? (
              <StarHalf className={sizeClasses[size]} fill="currentColor" />
            ) : (
              <Star className={cn(sizeClasses[size], "text-muted-foreground/30")} />
            )}
          </span>
        ))}
      </div>
      
      {showCount && count !== undefined && (
        <span className={cn("text-muted-foreground ml-1", textSizes[size])}>
          ({count})
        </span>
      )}
    </div>
  );
}
