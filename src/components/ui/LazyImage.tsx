import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * <img> with native lazy-loading plus a soft fade-in once the asset arrives,
 * so off-screen/slow images don't pop in abruptly.
 */
export function LazyImage({
  className,
  onLoad,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      loading="lazy"
      decoding="async"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        'bg-forest-100 transition-opacity duration-700 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...rest}
    />
  );
}
