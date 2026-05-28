import React from "react";
import { X, Trash2, ShieldCheck, ShoppingBag, Send } from "lucide-react";
import { CartItem } from "../types";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (watchId: string, quantity: number) => void;
  onRemoveItem: (watchId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { cartTotal, triggerCheckoutWhatsApp } = useApp();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlays */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm"
          />

          {/* Cart Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-101 w-full max-w-md bg-[#0A0A0B] border-l border-white/[0.04] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col selection:bg-white selection:text-black"
          >
            {/* Drawer Header */}
            <div className="p-6 md:p-8 border-b border-white/[0.04] flex items-center justify-between text-left">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Shopping Cart
                </h2>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#BFC0C2]/45 mt-1">
                  Aurafarm Store
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-white/10 transition-all cursor-pointer focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cart Items Stage Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/20 mb-4">
                    <ShoppingBag size={18} />
                  </div>
                  <p className="font-serif text-lg text-white/50 font-light">
                    Your Cart is Empty
                  </p>
                  <p className="text-xs text-white/30 leading-relaxed max-w-[240px] mt-2 font-sans">
                    Choose from our quality watch selection to initiate order verification over WhatsApp.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex h-9 px-4 items-center justify-center rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#BFC0C2] transition-colors cursor-pointer focus:outline-none hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 text-left">
                  <p className="text-[9px] font-mono text-[#BFC0C2]/45 tracking-wider uppercase bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Orders are verified and completed securely via WhatsApp.
                  </p>

                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.watch.id}
                        className="flex gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] text-left"
                      >
                        {item.watch.image ? (
                          <img
                            src={item.watch.image}
                            alt={`${item.watch.brand} ${item.watch.name}`}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 object-contain self-center bg-black/20 rounded-lg p-1 border border-white/[0.02]"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-[#111] flex items-center justify-center text-[10px] text-zinc-600 font-mono">
                            N/A
                          </div>
                        )}

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans text-sm font-medium text-white leading-tight">
                              {item.watch.name}
                            </h4>
                            <p className="font-mono text-[9px] text-[#BFC0C2]/50 uppercase mt-0.5 leading-none">
                              {item.watch.brand}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="font-mono text-xs text-[#BFC0C2] font-semibold">
                              ₹{item.watch.price.toLocaleString("en-IN")}
                            </span>

                            {/* Quantity Adjustment Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.watch.id, item.quantity - 1)
                                }
                                className="w-6 h-6 rounded border border-white/5 flex items-center justify-center text-xs text-white/40 hover:text-white cursor-pointer focus:outline-none"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.watch.id, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded border border-white/5 flex items-center justify-center text-xs text-white/40 hover:text-white cursor-pointer focus:outline-none"
                              >
                                +
                              </button>

                              <button
                                onClick={() => onRemoveItem(item.watch.id)}
                                className="ml-2 text-white/25 hover:text-red-400 p-1 cursor-pointer transition-colors"
                                title="Remove listing"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Manual Clear option */}
                  <button
                    onClick={onClearCart}
                    className="self-end text-[9px] font-mono uppercase tracking-wider text-red-400/50 hover:text-red-400 transition-colors focus:outline-none p-1"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Total Summary Frame and Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 bg-[#060607] border-t border-white/[0.04] flex flex-col gap-6 text-left">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs text-[#BFC0C2]/50 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-lg text-white font-bold tracking-tight">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={triggerCheckoutWhatsApp}
                  className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send size={12} />
                  Checkout on WhatsApp
                </button>

                <span className="inline-flex justify-center items-center gap-1.5 text-[9px] text-[#BFC0C2]/35 font-mono uppercase tracking-wider text-center">
                  <ShieldCheck size={11} className="text-[#BFC0C2]/40" /> Hand-packed securely and shipped within 24-48 hours.
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
