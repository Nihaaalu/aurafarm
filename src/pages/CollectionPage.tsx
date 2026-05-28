import React, { useState, useMemo } from "react";
import { Search, RefreshCw, ArrowLeft } from "lucide-react";
import { WatchCard } from "../components/WatchCard";
import { watches } from "../data/watchesLoader";
import { Watch } from "../types";

interface CollectionPageProps {
  onBackToHome: () => void;
  onViewDetails: (id: string) => void;
  onAddToCart: (watch: Watch) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onBackToHome,
  onViewDetails,
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  // Sort methods
  type SortKey = "low-to-high" | "high-to-low" | "discount-high-to-low" | "name-az" | "latest";
  const [sortBy, setSortBy] = useState<SortKey>("latest");

  // Dynamic Filters Generation
  const availableBrands = useMemo(() => {
    const brands = watches.map(w => w.brand);
    return Array.from(new Set(brands)).sort();
  }, [watches]);

  const availableCategories = useMemo(() => {
    const categories = watches.map(w => w.category);
    return Array.from(new Set(categories)).sort();
  }, [watches]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setInStockOnly(false);
    setSortBy("latest");
  };

  // Perform filtering and sorting
  const filteredAndSortedWatches = useMemo(() => {
    let result = [...watches];

    // Search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        w => w.name.toLowerCase().includes(query) ||
             w.brand.toLowerCase().includes(query) ||
             w.description.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(w => w.brand === selectedBrand);
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(w => w.category === selectedCategory);
    }

    // In Stock filter
    if (inStockOnly) {
      result = result.filter(w => w.stock === true);
    }

    // Sorting
    switch (sortBy) {
      case "low-to-high":
        result.sort((a, b) => {
          const valA = a.discountedPrice !== undefined ? a.discountedPrice : a.price;
          const valB = b.discountedPrice !== undefined ? b.discountedPrice : b.price;
          return valA - valB;
        });
        break;
      case "high-to-low":
        result.sort((a, b) => {
          const valA = a.discountedPrice !== undefined ? a.discountedPrice : a.price;
          const valB = b.discountedPrice !== undefined ? b.discountedPrice : b.price;
          return valB - valA;
        });
        break;
      case "discount-high-to-low":
        result.sort((a, b) => {
          const originalA = a.originalPrice || (a.discountedPrice !== undefined ? a.discountedPrice : a.price);
          const currentA = a.discountedPrice !== undefined ? a.discountedPrice : a.price;
          const pctA = originalA > currentA ? ((originalA - currentA) / originalA) : 0;

          const originalB = b.originalPrice || (b.discountedPrice !== undefined ? b.discountedPrice : b.price);
          const currentB = b.discountedPrice !== undefined ? b.discountedPrice : b.price;
          const pctB = originalB > currentB ? ((originalB - currentB) / originalB) : 0;

          return pctB - pctA; // Sort descending
        });
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedBrand, selectedCategory, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 px-4 md:px-8 selection:bg-white selection:text-black text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumbs heading */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={onBackToHome}
            className="text-[10px] font-mono uppercase tracking-wider text-[#BFC0C2]/50 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            ← Home
          </button>
          <span className="text-white/10 font-light font-mono text-[10px]">/</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/80">Collection</span>
        </div>

        {/* Small clean Header: Title & Subtext */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Collection
          </h1>
          <p className="text-xs text-[#BFC0C2]/60 mt-0.5">
            Explore available watches.
          </p>
        </div>

        {/* Compact Inline Filters Menu BAR */}
        <div className="flex flex-col gap-3 mb-6 bg-[#0D0D0E]/60 p-3 rounded-lg border border-white/[0.03]">
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Direct Search Input */}
            <div className="relative w-full sm:w-60">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30">
                <Search size={12} />
              </span>
              <input
                type="text"
                placeholder="Search watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-md text-xs font-sans text-white focus:outline-none focus:border-white/10 placeholder:text-white/20 transition-all"
              />
            </div>

            {/* inline Pill Brands */}
            <div className="flex flex-wrap items-center gap-1">
              <button
                onClick={() => setSelectedBrand("all")}
                className={`h-8 px-2.5 rounded-md text-xs transition-colors focus:outline-none cursor-pointer border ${
                  selectedBrand === "all"
                    ? "bg-white text-black border-transparent font-medium"
                    : "bg-white/[0.02] text-[#BFC0C2]/60 hover:text-white border-white/[0.04]"
                }`}
              >
                All
              </button>
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`h-8 px-2.5 rounded-md text-xs transition-colors focus:outline-none cursor-pointer border ${
                    selectedBrand === brand
                      ? "bg-white text-black border-transparent font-medium"
                      : "bg-white/[0.02] text-[#BFC0C2]/60 hover:text-white border-white/[0.04]"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Price sort drop layout */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-8 px-2.5 bg-black border border-white/[0.05] rounded-md text-xs font-sans text-zinc-300 focus:outline-none focus:border-white/10 transition-colors cursor-pointer"
            >
              <option value="latest">Sort: Latest</option>
              <option value="discount-high-to-low">Discount: High to Low</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="name-az">A-Z</option>
            </select>

            {/* In Stock toggle checkbox trigger */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`h-8 px-2.5 rounded-md text-xs transition-colors focus:outline-none cursor-pointer border ${
                inStockOnly
                  ? "bg-white text-black border-transparent font-medium"
                  : "bg-white/[0.02] text-[#BFC0C2]/60 hover:text-white border-white/[0.04]"
              }`}
            >
              In Stock
            </button>

            {/* Quick reset toggle */}
            {(searchTerm || selectedBrand !== "all" || selectedCategory !== "all" || inStockOnly || sortBy !== "latest") && (
              <button
                onClick={handleClearFilters}
                className="h-8 px-2 rounded-md text-xs font-sans text-[#BFC0C2]/50 hover:text-white transition-colors inline-flex items-center gap-1 focus:outline-none border border-dashed border-white/[0.08]"
              >
                <RefreshCw size={10} /> Reset
              </button>
            )}

          </div>

          {/* Quick inline categories check */}
          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.03] pt-2 max-h-12 overflow-y-auto">
            <span className="text-[10px] font-mono text-[#BFC0C2]/45 tracking-wider pr-1">
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors focus:outline-none cursor-pointer border ${
                selectedCategory === "all"
                  ? "bg-white/10 text-white border-transparent"
                  : "bg-transparent text-[#BFC0C2]/50 hover:text-white border-transparent"
              }`}
            >
              All Categories
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors focus:outline-none cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-white/10 text-white border-transparent"
                    : "bg-transparent text-[#BFC0C2]/50 hover:text-white border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic products list grid */}
        {filteredAndSortedWatches.length === 0 ? (
          <div className="py-20 border border-dashed border-white/[0.04] rounded-lg bg-white/[0.01] flex flex-col items-center justify-center text-center px-4">
            <p className="font-sans text-sm text-white/50">
              No products found matching filters of search
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 inline-flex h-8 px-4 items-center justify-center rounded-md bg-white text-black text-xs font-semibold hover:bg-[#BFC0C2] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredAndSortedWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
