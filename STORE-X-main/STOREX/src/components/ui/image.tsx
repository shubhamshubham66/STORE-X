
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function Image({ src, alt, className, fallback = "/placeholder.svg", ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(fallback);

  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setImgSrc(fallback);
        setIsLoading(false);
      };
    }
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt || "Image"}
      className={cn(
        "lazy-image object-contain transition-all duration-500 ease-in-out",
        isLoading && "loading",
        className
      )}
      {...props}
    />
  );
}
