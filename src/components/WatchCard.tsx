import React from "react";
import { ShoppingCart, Send } from "lucide-react";
import { Watch } from "../types";
import { useApp } from "../context/AppContext";

interface WatchCardProps {
  watch: Watch;
  onViewDetails: (id: string) => void;
  onAddToCart: (watch: Watch) => void;
}

export const WatchCard: React.FC<WatchCardProps> = ({
  watch,
  onViewDetails,
  onAddToCart,
}) => {
  const { triggerSingleWatchWhatsApp } = useApp();

  // Price formatting support for backward compatibility and dynamic sales badges
  const showDiscountPrice = watch.originalPrice !== undefined && watch.discountedPrice !== undefined && watch.originalPrice > watch.discountedPrice;
  const discountedPrice = watch.discountedPrice !== undefined ? watch.discountedPrice : watch.price;
  const originalPrice = watch.originalPrice;
  
  const formattedDiscounted = `₹${discountedPrice.toLocaleString("en-IN")}`;
  const formattedOriginal = originalPrice ? `₹${originalPrice.toLocaleString("en-IN")}` : "";
  
  const discountPercentage = showDiscountPrice 
    ? Math.round(((originalPrice! - discountedPrice) / originalPrice!) * 100) 
    : 0;

  return (
    <div
      className="group relative flex flex-col justify-between h-full bg-[#0D0D0E] border border-white/[0.04] hover:border-white/10 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-[#121214] select-none text-left"
    >
      {/* Small subtle Stock Badge at top-right of card */}
      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none">
        {watch.stock ? (
          <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 sm:px-2 rounded">
            In Stock
          </span>
        ) : (
          <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-900/30 px-1.5 py-0.5 sm:px-2 rounded">
            Sold Out
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <div
        onClick={() => onViewDetails(watch.id)}
        className="relative aspect-[4/5] w-full flex items-center justify-center cursor-pointer mb-3 rounded-lg bg-black/20 border border-white/[0.02] overflow-hidden group-hover:bg-black/30 transition-colors"
      >
        {watch.image ? (
          <img
            src={watch.image}
            alt={`${watch.brand} ${watch.name}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              // Standard minimal fallback if image not found
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentNode;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-16 h-16 rounded-full border border-white/5 bg-[#161618] flex items-center justify-center opacity-60';
                fallback.innerHTML = `<span class="text-[8px] font-mono text-zinc-500 uppercase">AURA</span>`;
                parent.appendChild(fallback);
              }
            }}
            className="max-w-[75%] max-h-[75%] object-contain select-none pointer-events-none transform group-hover:scale-105 transition-transform duration-300 filter brightness-95"
          />
        ) : (
          <div className="w-16 h-16 rounded-full border border-white/5 bg-[#121214] flex items-center justify-center">
            <span className="text-[8px] font-mono text-zinc-500">NO IMAGE</span>
          </div>
        )}
      </div>

      {/* Watch Info Details */}
      <div className="flex flex-col flex-1 text-left mb-4">
        {/* Brand Name */}
        <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider text-[#BFC0C2]/50 block mb-0.5">
          {watch.brand}
        </span>

        {/* Watch Name and Category Tag */}
        <div className="flex items-start justify-between gap-1.5 mb-1">
          <h3
            onClick={() => onViewDetails(watch.id)}
            className="font-sans text-xs sm:text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors cursor-pointer line-clamp-1 flex-1"
          >
            {watch.name}
          </h3>
          <span className="shrink-0 font-mono text-[7px] text-[#BFC0C2]/40 tracking-wider uppercase border border-white/[0.05] bg-white/[0.01] px-1 py-0.5 rounded leading-none mt-0.5">
            {watch.category}
          </span>
        </div>

        {/* Price Tag with Dynamic original/discounted prices */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="font-mono text-xs sm:text-sm text-white font-medium block">
            {formattedDiscounted}
          </span>
          {showDiscountPrice && (
            <>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#BFC0C2]/40 line-through">
                {formattedOriginal}
              </span>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/20 px-1.5 py-0.5 rounded leading-none shrink-0 font-medium">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description Snippet */}
        <p className="text-[10px] sm:text-[11px] text-[#BFC0C2]/60 leading-relaxed font-sans line-clamp-2 mt-0.5 description-clamp">
          {watch.description}
        </p>
      </div>

      {/* Buttons Action Wrapper (Aligned and touch-friendly targets) */}
      <div className="flex flex-col gap-1.5 mt-auto w-full">
        {watch.stock ? (
          <>
            <div className="flex flex-col sm:flex-row gap-1.5 w-full">
              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(watch);
                }}
                className="w-full sm:flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-white/[0.05] hover:bg-white text-[#BFC0C2] hover:text-black border border-white/[0.08] hover:border-transparent transition-all cursor-pointer focus:outline-none"
              >
                <ShoppingCart size={13} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Add to Cart</span>
              </button>

              {/* Buy Now Button (Optimized inline desktop size) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerSingleWatchWhatsApp(watch);
                }}
                className="hidden sm:inline-flex w-full sm:flex-1 min-h-[44px] items-center justify-center gap-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none"
              >
                <Send size={12} />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Stacked Buy Now for Mobile Screens to prevent horizontal squishing */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerSingleWatchWhatsApp(watch);
              }}
              className="sm:hidden w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none focus:ring-0"
            >
              <Send size={12} />
              <span>Buy Now on WhatsApp</span>
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-[#111112] text-[#BFC0C2]/30 border border-white/[0.03] cursor-not-allowed text-[10px] uppercase font-bold tracking-wider"
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
};
