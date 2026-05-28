import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PageType } from "./types";
import { getWatchById } from "./data/watchesLoader";
import { useApp } from "./context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedWatchId, setSelectedWatchId] = useState<string | null>(null);
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen,
    addToCart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartCount
  } = useApp();

  // Sync scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleViewDetails = (watchId: string) => {
    setSelectedWatchId(watchId);
    setCurrentPage("details");
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            onAddToCart={addToCart}
          />
        );
      case "collection":
        return (
          <CollectionPage
            onBackToHome={() => setCurrentPage("home")}
            onViewDetails={handleViewDetails}
            onAddToCart={addToCart}
          />
        );
      case "details":
        if (selectedWatchId) {
          const watch = getWatchById(selectedWatchId);
          if (watch) {
            return (
              <ProductDetailsPage
                watch={watch}
                onBackToCollection={() => setCurrentPage("collection")}
                onAddToCart={addToCart}
              />
            );
          }
        }
        // Fallback if id invalid
        setCurrentPage("collection");
        return null;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-white selection:text-black">
      {/* 1. STICKY NAVIGATION BAR */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartCount={cartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      {/* 2. SLIDING DRAWER CART OVERLAY */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* 3. TRANSITIONING VIEW STAGE CONTENT PANEL */}
      <main className="flex-1 w-full bg-[#050505] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedWatchId || "")}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. FOOTER COLUMNS */}
      <Footer onPageChange={setCurrentPage} />
    </div>
  );
}
