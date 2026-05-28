import React, { useState } from "react";
import { ArrowRight, Sparkles, Navigation, Shield, Award, Clock } from "lucide-react";
import { AurafarmLogoIcon, AurafarmLogoText } from "../components/AurafarmLogo";
import { InteractiveViewer } from "../components/InteractiveViewer";
import { WatchCard } from "../components/WatchCard";
import { watches, getFeaturedWatches } from "../data/watchesLoader";
import { PageType, Watch } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface HomePageProps {
  onPageChange: (page: PageType) => void;
  onViewDetails: (id: string) => void;
  onAddToCart: (watch: Watch) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onPageChange,
  onViewDetails,
  onAddToCart,
}) => {
  const featured = getFeaturedWatches().length > 0 ? getFeaturedWatches() : watches;
  const [newsEmail, setNewsEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setIsSubscribed(true);
      setNewsEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black">
      
      {/* 1. LANDING HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
        {/* Slow ambient moving background cinematic picture */}
        <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none scale-105 animate-slow-pan">
          <img
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000"
            alt="Cinematic watch dial details"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none filter brightness-50 contrast-110"
          />
        </div>

        {/* Floating light reflection overlay highlights */}
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 150, -50, 0],
              y: [0, -100, 100, 0],
              opacity: [0.2, 0.5, 0.3, 0.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full w-[500px] h-[500px] bg-gradient-to-r from-white/[0.015] to-transparent blur-[120px] top-[10%] left-[20%]"
          />
        </div>

        {/* Shading covers to blend corners with dark frame */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-1 pointer-events-none" />

        {/* Centered Content block */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl pt-16">
          {/* Logo element animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <AurafarmLogoIcon size={84} className="hover:scale-105 transition-all duration-700" />
            <AurafarmLogoText className="mt-4" />
          </motion.div>

          {/* Core Applet Tagline Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.15] mb-6 max-w-3xl font-sans"
          >
            Authentic Timepieces <span className="italic block mt-1 text-[#BFC0C2]/80 font-normal">Shipped Across India</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs tracking-wider text-[#BFC0C2]/50 max-w-lg uppercase mb-12"
          >
            Direct Online Watch Store. 100% Genuine checked watches dispatched from Punjab, India.
          </motion.p>

          {/* Call-to-actions buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <button
              onClick={() => onPageChange("collection")}
              className="w-full sm:w-auto h-12 px-8 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-[#BFC0C2] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-xl focus:outline-none"
            >
              Explore Collection
              <ArrowRight size={13} />
            </button>

            <button
              onClick={() => onPageChange("about")}
              className="w-full sm:w-auto h-12 px-8 rounded-lg bg-transparent hover:bg-white/[0.03] text-white font-medium text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 border border-white/[0.08] hover:border-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Our Store Story
            </button>
          </motion.div>
        </div>

        {/* Scrolling help indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-40 select-none">
          <span className="font-mono text-[7px] tracking-wider uppercase text-[#BFC0C2]">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-[#BFC0C2]/30 rounded-full flex justify-center p-[2px]"
          >
            <div className="w-[1px] h-[2px] rounded-full bg-white" />
          </motion.div>
        </div>
      </section>

      {/* 2. CURATED WATCH PORTFOLIO GRID */}
      <section className="relative py-20 px-4 md:px-8 bg-[#050505] border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="text-left">
              <span className="font-mono text-[9px] tracking-wider uppercase text-[#BFC0C2]/60 block mb-1">
                Featured Highlights
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Featured Collection
              </h2>
            </div>
            <p className="font-mono text-[9px] text-[#BFC0C2]/40 max-w-sm text-left md:text-right uppercase tracking-wider leading-relaxed">
              Exceptional watch selection currently in stock and ready to ship.
            </p>
          </div>

          {/* Cards Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {featured.slice(0, 3).map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE 3D WATCH LAB */}
      <InteractiveViewer />

      {/* 4. BRAND ABOUT STORY PROMINENT SECTION */}
      <section className="relative py-20 md:py-24 px-6 md:px-12 bg-black overflow-hidden border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#BFC0C2]/50 block mb-2">
            Store Info
          </span>
          <h2 className="text-2xl sm:text-3xl font-regular text-white tracking-tight mb-6">
            About Aurafarm
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Aurafarm is an online watch store focused on curated timepieces from multiple brands. We operate entirely online with direct customer communication through WhatsApp.
          </p>

          <div className="h-[1px] w-full bg-white/[0.05] mb-10" />

          {/* Small store info cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 block mb-1">Operational Model</span>
              <span className="text-xs sm:text-sm text-white font-semibold">Online Store Only</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 block mb-1">Fulfillment Base</span>
              <span className="text-xs sm:text-sm text-white font-semibold flex items-center gap-1">Punjab, India</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 block mb-1">Direct Support</span>
              <span className="text-xs sm:text-sm text-white font-semibold">WhatsApp Portal</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#BFC0C2]/40 block mb-1">Catalog Variety</span>
              <span className="text-xs sm:text-sm text-white font-semibold">Multi-Brand Collection</span>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => onPageChange("about")}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white hover:text-[#BFC0C2] hover:translate-x-0.5 transition-all cursor-pointer focus:outline-none"
            >
              Learn More about our Operations
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY AURAFARM SERVICES PILLARS */}
      <section className="relative py-16 px-4 md:px-8 bg-[#050505] border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#BFC0C2]/50 block mb-1.5">
              Service Pillars
            </span>
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Why Aurafarm
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-emerald-400 block mb-1.5">01 / Selection</span>
              <h3 className="text-sm text-white font-medium mb-1">Curated Watches</h3>
              <p className="font-sans text-[11px] text-zinc-500 leading-normal">
                Every model is hand-picked for quality condition, timeless styling, and perfect movement performance.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-emerald-400 block mb-1.5">02 / Seamless Order</span>
              <h3 className="text-sm text-white font-medium mb-1">Direct WhatsApp Orders</h3>
              <p className="font-sans text-[11px] text-zinc-500 leading-normal">
                Skip complex signups. Speak directly with us via WhatsApp to complete your order details securely.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0D0D0E] border border-white/[0.03] hover:border-white/[0.08] transition-all">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-emerald-400 block mb-1.5">03 / Quick Delivery</span>
              <h3 className="text-sm text-white font-medium mb-1">Simple Buying Experience</h3>
              <p className="font-sans text-[11px] text-zinc-500 leading-normal">
                Transparent flat pricing, standard Indian post or courier deliveries, and secure multi-layer product packing.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. MAILING LIST STOCK ALERTS */}
      <section className="relative py-20 px-4 md:px-8 bg-black border-t border-white/[0.03] overflow-hidden">
        {/* Ambient bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-white/[0.015] to-transparent rounded-full blur-[80px] pointer-events-none select-none" />

        <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.04] bg-gradient-to-tr from-[#0C0C0D] to-[#111112] p-8 md:p-14 text-center relative z-10">
          
          <div className="flex items-center justify-center gap-1.5 mb-5 text-[#BFC0C2]">
            <Sparkles size={13} className="animate-pulse" />
            <span className="font-mono text-[9px] tracking-wider uppercase text-[#BFC0C2]/60 block animate-pulse">
              Aurafarm Watch Alert
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-4">
            Stock Alerts
          </h2>
          
          <p className="font-sans text-xs md:text-sm text-[#BFC0C2]/60 leading-relaxed max-w-lg mx-auto mb-8">
            Get early alerts on newly-listed watches, automatic models, and inventory price drops sent directly to your email.
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="alert-form"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onSubmit={handleSubscribeSubmit}
                className="flex flex-col sm:flex-row items-stretch justify-center gap-2.5 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="flex-1 px-4 h-11 bg-black border border-white/[0.06] rounded-lg text-xs font-sans text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/15"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#BFC0C2] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
                >
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="alert-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-300 text-xs font-mono inline-flex items-center gap-2"
              >
                <span>✔ Secure Registration Completed. Mailing alert is active!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="inline-flex justify-center items-center gap-1.5 font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider mt-5">
            <Clock size={10} /> Zero newsletter spam. Unsubscribe in one click at any time.
          </span>
        </div>
      </section>

    </div>
  );
};
