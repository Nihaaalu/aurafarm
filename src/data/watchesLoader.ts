import { Watch } from "../types";

interface WatchModule {
  watch: Watch;
}

// Automatically glob files inside /src/data/watches with eager option
const modules = (import.meta as any).glob('/src/data/watches/*.ts', { eager: true });

export const watches: Watch[] = Object.values(modules)
  .map((m: any) => {
    const w = { ...m.watch } as Watch;
    
    // Set images array if empty or missing
    if (!w.images || w.images.length === 0) {
      w.images = w.image ? [w.image] : ["/images/sample.png"];
    }
    
    // Ensure we have a main image fallback
    if (!w.image) {
      w.image = w.images[0] || "/images/sample.png";
    }

    // Handle price structure and backward compatibility
    if (w.discountedPrice !== undefined) {
      w.price = w.discountedPrice;
    } else if (w.price !== undefined) {
      w.discountedPrice = w.price;
    }
    
    return w;
  })
  .filter((w) => w.id !== "sample-watch");

export const getWatchById = (id: string): Watch | undefined => {
  return watches.find((w) => w.id === id);
};

export const getFeaturedWatches = (): Watch[] => {
  return watches.filter((w) => w.featured);
};
