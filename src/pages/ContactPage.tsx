import React from "react";
import { Mail, MapPin, Send, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export const ContactPage: React.FC = () => {
  const whatsappNum = "919110242527";
  const supportEmail = "aurafarm.store@gmail.com";
  const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello Aurafarm, I have a inquiry about buying a watch.")}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 md:px-8 selection:bg-white selection:text-black text-left">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-left mb-10 border-b border-white/[0.04] pb-6">
          <span className="font-mono text-[9px] tracking-wider uppercase text-[#BFC0C2]/60 block mb-1">
            Store Contact
          </span>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Contact Support
          </h1>
          <p className="text-xs text-[#BFC0C2]/60 mt-2 max-w-xl leading-relaxed">
            Reach out to our team directly. We are online only and provide direct assistance over Gmail and WhatsApp.
          </p>
        </div>

        {/* Contact Grid blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Block: Communication Coordinates */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Address */}
            <div className="p-6 md:p-8 rounded-xl bg-[#0D0D0E] border border-white/[0.03] text-left">
              <div className="flex items-center gap-3 text-[#BFC0C2] mb-4">
                <span className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <MapPin size={14} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Store Address</span>
              </div>
              <h3 className="text-base text-white font-medium mb-2">Location</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Aurafarm,<br />
                Jalandhar - Delhi G.T. Road,<br />
                Phagwara, Punjab, India 144411
              </p>
              <div className="h-[1px] bg-white/[0.03] my-4" />
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                Note: Online-only store. No physical showroom.
              </span>
            </div>

            {/* Email Contact Block */}
            <div className="p-6 md:p-8 rounded-xl bg-[#0D0D0E] border border-white/[0.03] text-left">
              <div className="flex items-center gap-3 text-[#BFC0C2] mb-4">
                <span className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <Mail size={14} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Email Contact</span>
              </div>
              <h3 className="text-base text-white font-medium mb-2">Official Gmail</h3>
              <a 
                href={`mailto:${supportEmail}`}
                className="font-mono text-xs text-zinc-300 hover:text-white hover:underline transition-all inline-block break-all"
              >
                {supportEmail}
              </a>
              <div className="h-[1px] bg-white/[0.03] my-4" />
              <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider leading-relaxed">
                Send us your custom order details. Responses expected within 12 hours.
              </p>
            </div>

          </div>

          {/* Right Block: Direct Connection Guide */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Direct WhatsApp Call to Action */}
            <div className="p-6 md:p-8 rounded-xl bg-[#0D0D0E] border border-white/[0.04] text-left flex flex-col gap-4">
              <span className="text-[8px] font-mono uppercase tracking-wider text-[#BFC0C2]/50">
                Support
              </span>
              <h3 className="text-base text-white font-medium">
                Chat on WhatsApp
              </h3>
              <p className="font-sans text-xs text-[#BFC0C2]/60 leading-relaxed">
                The fastest way to buy watches or ask questions is through our verified WhatsApp support line.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider rounded-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Send size={11} />
                Open WhatsApp Chat
              </a>
            </div>

            {/* Verification assurance banner */}
            <div className="p-6 bg-[#09090A] border border-white/5 rounded-xl text-left flex flex-col gap-3">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#BFC0C2]/50 bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 self-start">
                <ShieldCheck size={9} className="text-emerald-400" /> Secure Purchases
              </span>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                To guarantee safety, all order fulfillments are handled strictly via our official WhatsApp support number: +91 9110242527.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
