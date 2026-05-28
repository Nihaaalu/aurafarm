import React from "react";
import { Compass, ShieldCheck, Heart, Sparkles, MapPin, Mail, Send, Award, Gift } from "lucide-react";
import { AurafarmLogoIcon, AurafarmLogoText } from "../components/AurafarmLogo";
import { motion } from "motion/react";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Brand visual header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <AurafarmLogoIcon size={80} />
            <AurafarmLogoText className="mt-4" />
          </motion.div>

          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-8 leading-tight max-w-2xl">
            A Premium Watch Store for Collectors
          </h1>
          <p className="font-mono text-[9px] text-[#BFC0C2]/40 uppercase mt-4 tracking-widest">
            Premium Online Watch Store
          </p>
        </div>

        {/* Aurafarm Introduction */}
        <div className="text-left mb-12">
          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            Welcome to <strong className="text-white font-medium">Aurafarm</strong> — a premium online watch store specializing in high-quality timepieces. We offer watch lovers select vintage references, automatic models, and casual movements.
          </p>
          <p className="font-sans text-xs text-zinc-500 leading-relaxed">
            By eliminating physical retail showrooms and boutique overheads, we operate an online-first model directly in Punjab, India. This enables us to focus our resources on product verification, safe packing, and offering great prices directly to our Indian watch collectors.
          </p>
        </div>

        {/* Core Guarantees grid bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
          {/* Authentic Guarantee */}
          <div className="p-6 md:p-8 rounded-xl bg-[#0D0D0E] border border-white/[0.03]">
            <span className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] inline-flex mb-4 text-[#BFC0C2]">
              <ShieldCheck size={18} />
            </span>
            <h3 className="text-base text-white font-medium mb-2">Authenticity Statement</h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-4">
              We stand firmly behind the authenticity of our watches. Every automatic movement, chronograph, and quartz watch listed on the Aurafarm store goes through a strict condition check before being cleared.
            </p>
            <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider block">
              ● 100% Genuine Guaranteed
            </span>
          </div>

          {/* Secure Packing & Shipping */}
          <div className="p-6 md:p-8 rounded-xl bg-[#0D0D0E] border border-white/[0.03]">
            <span className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] inline-flex mb-4 text-[#BFC0C2]">
              <Gift size={18} />
            </span>
            <h3 className="text-base text-white font-medium mb-2">Secure India Shipping</h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-4">
              Timepieces are precision instruments, and they deserve precise care in transit. All orders completed via our WhatsApp portal are hand-packed carefully in multi-layered safe transit cases and dispatched securely with tracking.
            </p>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
              ● Dispatched within 24–48 hours
            </span>
          </div>
        </div>

        {/* Dynamic Details Information */}
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#0D0D0E] to-transparent border border-white/[0.04] text-left">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="flex-1">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#BFC0C2]/40 block mb-3">
                Store Location
              </span>
              <h3 className="text-base text-white font-medium mb-4">Aurafarm Store</h3>
              
              <div className="flex flex-col gap-4 font-sans text-xs text-zinc-400">
                <div className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-[#BFC0C2] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-300 block mb-0.5">Address</strong>
                    <span>Aurafarm, Jalandhar - Delhi G.T. Road,<br />Phagwara, Punjab, India 144411</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail size={13} className="text-[#BFC0C2] shrink-0" />
                  <div>
                    <strong className="text-zinc-300 block mb-0.5">Official Gmail</strong>
                    <span>aurafarm.store@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 md:border-l border-white/[0.04] md:pl-6 flex flex-col justify-center">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider mb-2 block">Our Operations</span>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We are an <strong className="text-zinc-400">Online-Only Store</strong>. In order to offer our clients the best prices, we maintain our inventory in our Punjab warehouse and do <span className="italic font-medium text-zinc-400">NOT run standard physical showrooms</span> for walk-ins.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
