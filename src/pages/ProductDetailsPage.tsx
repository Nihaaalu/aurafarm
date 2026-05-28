import React, { useState, useRef } from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Send, 
  ShoppingCart, 
  Check, 
  Minus, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Award, 
  ShieldAlert 
} from "lucide-react";
import { Watch } from "../types";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailsPageProps {
  watch: Watch;
  onBackToCollection: () => void;
  onAddToCart: (watch: Watch, qty?: number) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  watch,
  onBackToCollection,
  onAddToCart,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  // Interactive hover magnifier & lighting states
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe gesture support states for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { triggerSingleWatchWhatsApp } = useApp();

  // Standard images list guarantee fallback
  const imagesList = watch.images && watch.images.length > 0 
    ? watch.images 
    : [watch.image || "/images/sample.png"];

  const activeImage = imagesList[activeImageIndex] || watch.image || "/images/sample.png";

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Convert to percentage coordinates for fine-grain transform origin
    const pctX = Math.max(0, Math.min(100, (x / width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / height) * 100));
    
    setLightPos({ x, y });
    setZoomStyle({
      transformOrigin: `${pctX}% ${pctY}%`,
    });
  };

  const handleAddToCartClick = () => {
    setIsAdding(true);
    // Use newly upgraded addToCart signature that supports high quantity items
    onAddToCart(watch, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleBuyNowWhatsApp = () => {
    // Custom formatted WhatsApp message supporting multi-quantity total directly
    const whatsappNum = "919110242527"; 
    const unitPrice = watch.discountedPrice !== undefined ? watch.discountedPrice : watch.price;
    const totalPrice = unitPrice * quantity;
    const quantityText = quantity > 1 ? ` (Quantity: ${quantity})` : "";
    
    const text = `Interested to buy:\n\n${watch.brand} ${watch.name}${quantityText}\nPrice - ₹${unitPrice.toLocaleString("en-IN")}\nTotal Value - ₹${totalPrice.toLocaleString("en-IN")}\n\nPlease share availability status.`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const showDiscountPrice = watch.originalPrice !== undefined && watch.discountedPrice !== undefined && watch.originalPrice > watch.discountedPrice;
  const discountedPrice = watch.discountedPrice !== undefined ? watch.discountedPrice : watch.price;
  const originalPrice = watch.originalPrice;
  
  const discountPercentage = showDiscountPrice 
    ? Math.round(((originalPrice! - discountedPrice) / originalPrice!) * 100) 
    : 0;

  const totalSavedValue = showDiscountPrice
    ? (originalPrice! - discountedPrice) * quantity
    : 0;

  const formattedUnitPrice = `₹${discountedPrice.toLocaleString("en-IN")}`;
  const formattedTotalPrice = `₹${(discountedPrice * quantity).toLocaleString("en-IN")}`;
  
  const formattedOriginalUnitPrice = originalPrice ? `₹${originalPrice.toLocaleString("en-IN")}` : "";
  const formattedOriginalTotalPrice = originalPrice ? `₹${(originalPrice * quantity).toLocaleString("en-IN")}` : "";
  const formattedSavings = `₹${totalSavedValue.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 md:px-8 text-left selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2.5 mb-8 text-[10px] font-mono uppercase tracking-wider text-[#BFC0C2]/50">
          <button
            onClick={onBackToCollection}
            className="group flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
            Collection
          </button>
          <span className="text-white/10 select-none">/</span>
          <span className="text-white/40">{watch.brand}</span>
          <span className="text-white/10 select-none">/</span>
          <span className="text-[#BFC0C2]">{watch.name}</span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Visual Showcase Section */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Main Interactive Stage with Touch & Hover Effects */}
            <div 
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setZoomStyle({});
              }}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/5] w-full rounded-2xl bg-[#0D0D0E] border border-white/[0.04] p-8 sm:p-12 overflow-hidden flex items-center justify-center cursor-crosshair select-none"
            >
              {/* Dynamic mouse spotlighting */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle 140px at ${lightPos.x}px ${lightPos.y}px, rgba(255, 255, 255, 0.055) 0%, transparent 100%)`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Central Premium Image Display */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: isHovered ? 1.45 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.35, ease: "easeOut" },
                    opacity: { duration: 0.25 }
                  }}
                  style={isHovered ? zoomStyle : undefined}
                  src={activeImage}
                  alt={`${watch.brand} ${watch.name}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentNode;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-32 h-32 rounded-full border border-white/5 bg-[#141416] flex items-center justify-center opacity-70 flex-col';
                      fallback.innerHTML = `<span class="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">AURA PREVIEW</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                  className="max-w-[80%] max-h-[80%] object-contain filter brightness-95"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slider Quick Nav Indicator Buttons (Visible on hover on desktop) */}
              {imagesList.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="w-9 h-9 rounded-full bg-black/65 backdrop-blur border border-white/[0.08] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="w-9 h-9 rounded-full bg-black/65 backdrop-blur border border-white/[0.08] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Category Spec Unit */}
              <div className="absolute bottom-4 left-4 font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 bg-black/45 border border-white/[0.05] px-2.5 py-0.5 rounded">
                Category: {watch.category}
              </div>

              {/* Dynamic Image Swipe Hint for Mobile */}
              {imagesList.length > 1 && (
                <div className="absolute bottom-4 right-4 text-[7px] font-mono text-[#BFC0C2]/30 uppercase tracking-widest select-none pointer-events-none sm:hidden">
                  Swipe to browse ({activeImageIndex + 1}/{imagesList.length})
                </div>
              )}
            </div>

            {/* Thumbnail Scrollable Tracker Gallery */}
            {imagesList.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-white/10 select-none max-w-full">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-[#0D0D0E] border flex items-center justify-center shrink-0 transition-all cursor-pointer focus:outline-none overflow-hidden p-2 ${
                      idx === activeImageIndex 
                        ? "border-white/50 bg-[#121214]" 
                        : "border-white/[0.04] hover:border-white/10"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="max-w-[85%] max-h-[85%] object-contain select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Specifications & Operation CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Primary Header specs */}
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#BFC0C2]/40 block">
                {watch.brand} Genuine Segment
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 leading-tight">
                {watch.name}
              </h1>

              {/* Interactive pricing with direct savings info */}
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xl text-white font-semibold animate-none">
                    {quantity > 1 ? formattedTotalPrice : formattedUnitPrice}
                  </span>
                  
                  {showDiscountPrice && (
                    <>
                      <span className="font-mono text-xs text-[#BFC0C2]/40 line-through">
                        {quantity > 1 ? formattedOriginalTotalPrice : formattedOriginalUnitPrice}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-0.5 rounded uppercase font-medium leading-none">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                  
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/10 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Free India Courier
                  </span>
                </div>
                
                {showDiscountPrice && (
                  <p className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider mt-1.5">
                    You save {formattedSavings} ({discountPercentage}% discount)
                  </p>
                )}
                
                {quantity > 1 && (
                  <span className="text-[9px] font-mono text-[#BFC0C2]/40 uppercase mt-0.5 block">
                    Base unit: {formattedUnitPrice} each
                  </span>
                )}
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/[0.04]" />

            {/* Model Summary & Highlighted Characteristics */}
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 font-semibold mb-0.5">
                Description & Detail
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                {watch.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 mt-2">
                <div className="p-2.5 bg-[#0D0D0E] border border-white/[0.02] rounded-lg">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase block">Brand</span>
                  <span className="text-[11px] font-sans text-white font-semibold block mt-0.5 truncate">{watch.brand}</span>
                </div>
                <div className="p-2.5 bg-[#0D0D0E] border border-white/[0.02] rounded-lg">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase block">Calibre / Engine</span>
                  <span className="text-[11px] font-sans text-white font-semibold block mt-0.5 truncate">{watch.category}</span>
                </div>
                <div className="p-2.5 bg-[#0D0D0E] border border-white/[0.02] rounded-lg">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase block">Shipment Origin</span>
                  <span className="text-[11px] font-sans text-white font-semibold block mt-0.5">Punjab, India</span>
                </div>
                <div className="p-2.5 bg-[#0D0D0E] border border-white/[0.02] rounded-lg">
                  <span className="text-[7.5px] font-mono text-white/30 uppercase block">Availability Unit</span>
                  <span className="text-[11px] font-sans text-emerald-400 font-semibold block mt-0.5">
                    {watch.stock ? "In Stock" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/[0.04]" />

            {/* Quantity Selector Layout & Actions */}
            <div className="flex flex-col gap-4">
              
              {watch.stock && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D0E] border border-white/[0.03]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#BFC0C2]/60">
                    Order Quantity
                  </span>

                  {/* Quantity adjustment button set with minimum touch boundaries */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded bg-white/[0.04] text-white flex items-center justify-center border border-white/[0.03] hover:bg-white/[0.1] active:scale-95 transition-all cursor-pointer focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="font-mono text-xs font-semibold text-white w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                      disabled={quantity >= 10}
                      className="w-8 h-8 rounded bg-white/[0.04] text-white flex items-center justify-center border border-white/[0.03] hover:bg-white/[0.1] active:scale-95 transition-all cursor-pointer focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!watch.stock ? (
                <div className="h-11 rounded-lg border border-white/[0.03] bg-white/[0.01] text-zinc-500 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider select-none pointer-events-none">
                  <ShieldAlert size={14} />
                  Currently Out of Stock
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 items-stretch">
                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCartClick}
                    disabled={isAdding}
                    className="w-full h-11 rounded-lg bg-white hover:bg-[#BFC0C2] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
                  >
                    {isAdding ? (
                      <>
                        <Check size={14} className="text-black" />
                        <span>Added {quantity > 1 ? `(${quantity})` : ""}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} />
                        <span>Add To Cart {quantity > 1 ? `(${quantity})` : ""}</span>
                      </>
                    )}
                  </button>

                  {/* Buy Now WhatsApp with quantity calculation mapping directly */}
                  <button
                    onClick={handleBuyNowWhatsApp}
                    className="w-full h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
                  >
                    <Send size={12} />
                    <span>Buy Now on WhatsApp</span>
                  </button>
                </div>
              )}

              {/* Express packing guarantee terms */}
              <div className="flex gap-2 items-start py-2.5 px-3 rounded-xl bg-[#0D0D0E] border border-white/[0.03]">
                <ShieldCheck size={13} className="text-[#BFC0C2]/80 mt-0.5 shrink-0" />
                <p className="font-mono text-[8px] text-[#BFC0C2]/50 uppercase tracking-wide leading-normal">
                  Authentic Check Guaranteed: Core calibre tested for rate variation. Bubble layered secure packaging dispatched directly from Punjab warehouse.
                </p>
              </div>
            </div>

            {/* Dynamic Store Support Policies */}
            <div className="p-3.5 rounded-xl bg-gradient-to-tr from-[#0D0D0E] to-[#121213] border border-white/[0.03] text-left border-dashed">
              <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#BFC0C2]/70 font-semibold mb-1 flex items-center gap-1.5">
                <Award size={12} />
                Aurafarm Guarantee
              </h4>
              <p className="font-sans text-[11px] text-zinc-500 leading-normal">
                By operating solely as an online warehouse direct distributor, we exclude standard commercial retail showrooms and middlemen overheads, translating direct discounts onto your checkout.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
