import React, { useState } from "react";
import { Menu, X, ShoppingBag, LogIn, LogOut, User } from "lucide-react";
import { AurafarmLogoFull } from "./AurafarmLogo";
import { PageType } from "../types";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  cartCount: number;
  onCartToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  cartCount: initialCartCount, // We'll delegate to central AppContext states
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { 
    user, 
    loginWithGoogle, 
    logout, 
    cartCount, 
    setIsCartOpen, 
    isCartOpen 
  } = useApp();

  const navItems: { label: string; page: PageType }[] = [
    { label: "Home", page: "home" },
    { label: "Collection", page: "collection" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const handleNavClick = (page: PageType) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoutClick = async () => {
    await logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 md:px-8 flex items-center justify-between">
        
        {/* Brand identity logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-1.5 cursor-pointer focus:outline-none rounded-lg p-1"
        >
          <AurafarmLogoFull iconSize={26} />
        </button>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive ? "text-white font-semibold" : "text-[#BFC0C2]/60 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions panel: Cart, Google login and mobile menu triggers */}
        <div className="flex items-center gap-3">
          
          {/* Cart triggers */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="group relative flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 cursor-pointer text-[#BFC0C2] hover:text-white focus:outline-none"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={13} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-white px-1 text-[8.5px] font-mono font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Sign-In or Profile dropdown */}
          <div className="relative">
            {user ? (
              <div className="relative flex items-center">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer focus:outline-none"
                  title={user.displayName || "Google Account"}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User Avatar"}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#161618] flex items-center justify-center">
                      <User size={12} className="text-[#BFC0C2]" />
                    </div>
                  )}
                </button>

                {/* Profile drop list actions menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <>
                      {/* Close click-out transparent background */}
                      <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-10 z-50 w-52 p-4 rounded-xl bg-[#0D0D0E] border border-white/[0.05] shadow-2xl text-left"
                      >
                        <p className="text-[9px] font-mono uppercase tracking-wider text-white/30">Logged in as</p>
                        <p className="text-xs text-white font-medium truncate mt-0.5">{user.displayName}</p>
                        <p className="text-[10px] text-[#BFC0C2]/45 truncate mt-0.5">{user.email}</p>
                        <div className="h-[1px] bg-white/[0.04] my-3" />
                        
                        <button
                          onClick={handleLogoutClick}
                          className="w-full flex items-center gap-2 text-left text-xs text-red-400 hover:text-red-300 transition-colors focus:outline-none hover:bg-white/[0.02] p-2 rounded-lg"
                        >
                          <LogOut size={12} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="hidden md:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-[#BFC0C2] hover:text-white transition-all cursor-pointer focus:outline-none"
              >
                <LogIn size={11} />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu trigger burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.05] bg-white/[0.01] text-[#BFC0C2]/80 hover:text-white cursor-pointer focus:outline-none"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-white/[0.04] bg-[#050505] overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-10 py-8 text-left">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`text-left text-xs uppercase tracking-widest py-2 border-b border-white/[0.02] ${
                      isActive ? "text-white font-medium pl-2 border-l-2 border-white" : "text-[#BFC0C2]/50 hover:text-[#BFC0C2]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Profile Actions block */}
              <div className="pt-4 border-t border-white/[0.03]">
                {user ? (
                  <div className="flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-3">
                      {user.photoURL && (
                        <img
                          src={user.photoURL}
                          alt="avatar"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full border border-white/10"
                        />
                      )}
                      <div>
                        <p className="text-xs text-white font-medium">{user.displayName}</p>
                        <p className="text-[10px] text-[#BFC0C2]/40">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300 uppercase tracking-widest"
                    >
                      <LogOut size={12} />
                      Logout info
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      loginWithGoogle();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white uppercase tracking-widest py-2"
                  >
                    <LogIn size={13} />
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
