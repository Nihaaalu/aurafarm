import React from "react";
import { Compass, Mail, Send, ShieldCheck } from "lucide-react";
import { AurafarmLogoFull } from "./AurafarmLogo";
import { PageType } from "../types";

interface FooterProps {
  onPageChange: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const currentYear = new Date().getFullYear();
  const whatsappNum = "919110242527";
  const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello Aurafarm, I am looking for watch models in your store.")}`;

  const handleNavClick = (page: PageType) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/[0.04] pt-16 pb-12 px-6 md:px-12 text-left relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper Column Stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.04]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <button
              onClick={() => handleNavClick("home")}
              className="self-start text-left cursor-pointer focus:outline-none"
            >
              <AurafarmLogoFull iconSize={36} />
            </button>
            <p className="font-sans text-xs text-[#BFC0C2]/50 leading-relaxed max-w-sm">
              Aurafarm is a premium watch store. We focus on genuine watch quality checks, competitive pricing, and secure shipping to collectors across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4 text-left">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#BFC0C2]/60 font-semibold">
              Store Sitemap
            </h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-zinc-400">
              <button
                onClick={() => handleNavClick("home")}
                className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("collection")}
                className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
              >
                Collection
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
              >
                About Store
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Location and Contact details */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#BFC0C2]/60 font-semibold">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-sans text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <Compass size={12} className="text-[#BFC0C2] shrink-0 mt-0.5" />
                <span>
                  <strong>Address:</strong><br />
                  Aurafarm Store, Punjab, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={12} className="text-[#BFC0C2] shrink-0" />
                <span>
                  <strong>Official Gmail:</strong> <a href="mailto:aurafarm.store@gmail.com" className="text-zinc-300 hover:text-white hover:underline transition-colors">aurafarm.store@gmail.com</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Send size={12} className="text-[#BFC0C2] shrink-0" />
                <span>
                  <strong>WhatsApp:</strong> <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono hover:underline transition-colors">+91 9110242527</a>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest text-center sm:text-left">
            © {currentYear} Aurafarm Store. All rights reserved. Operating online across India.
          </span>

          <div className="flex gap-4 font-mono text-[8.5px] uppercase tracking-widest text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck size={10} className="text-emerald-500" /> Authenticity Assured
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
