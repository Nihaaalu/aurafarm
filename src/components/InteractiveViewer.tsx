import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftRight, HelpCircle, Shield, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export const InteractiveViewer: React.FC = () => {
  // Mechanical hands clock calculations
  const [time, setTime] = useState(new Date());
  const [activeFaceColor, setActiveFaceColor] = useState<"obsidian" | "silver" | "ocean">("obsidian");
  const [isWinding, setIsWinding] = useState(false);
  const [calibrationMs, setCalibrationMs] = useState(28800); // Chrono sweep metrics
  const [powerReserve, setPowerReserve] = useState(100);
  
  // Mouse tracking position for dial reflections
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<number | null>(null);

  useEffect(() => {
    // Dynamic continuous sweeping hands update
    const updateTime = () => {
      setTime(new Date());
      sweepRef.current = requestAnimationFrame(updateTime);
    };
    sweepRef.current = requestAnimationFrame(updateTime);

    return () => {
      if (sweepRef.current) cancelAnimationFrame(sweepRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Coordinates normalized within standard (-1 to 1) ranges
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    setMousePos({ x, y, normalizedX, normalizedY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  };

  // Turn crown winding wheel simulation
  const handleWindCrown = () => {
    setIsWinding(true);
    setPowerReserve((prev) => Math.min(prev + 5, 100));
    setCalibrationMs((prev) => Math.max(prev - 2, 28790));
    setTimeout(() => setIsWinding(false), 800);
  };

  // Convert time to exact clock degree indices
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Fine sweep values
  const secondDegrees = (seconds * 6) + (milliseconds * 0.006);
  const minuteDegrees = (minutes * 6) + (seconds * 0.1);
  const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);

  const themeColors = {
    obsidian: {
      faceBg: "#0B0C0E",
      accent: "#BFC0C2",
      ringBorder: "#1C1D21",
      glowing: "#FFFFFF",
      title: "Obsidian Slate"
    },
    silver: {
      faceBg: "#E0E1E4",
      accent: "#444547",
      ringBorder: "#88898C",
      glowing: "#7F8082",
      title: "Sunburst Silver"
    },
    ocean: {
      faceBg: "#0C1322",
      accent: "#BFC0C2",
      ringBorder: "#192841",
      glowing: "#5D81A8",
      title: "Oceanic Blue"
    }
  };

  const currentTheme = themeColors[activeFaceColor];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-black via-[#0B0B0C] to-black overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Header titles */}
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] tracking-wider uppercase text-[#BFC0C2]/60 block mb-1">
            Movement Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Mechanical Sweep Simulator
          </h2>
          <p className="text-xs text-[#BFC0C2]/60 mt-2 max-w-xl mx-auto leading-relaxed">
            Observe how smooth, continuous automatic movements sweep in comparison to ticking quartz watches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column Controls */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-6">
            <div className="bg-[#111111]/30 border border-white/[0.04] rounded-xl p-6 backdrop-blur-md text-left">
              <h3 className="font-serif text-base text-zinc-200 mb-1.5 font-light">Dial Face Selection</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans mb-5">
                Cycle through standard face configurations present across modern mechanical references featured in the Aurafarm catalog.
              </p>

              <div className="flex gap-3">
                {(["obsidian", "silver", "ocean"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveFaceColor(color)}
                    className={`flex-1 flex flex-col items-center gap-2 p-2.5 rounded-lg border text-center transition-all duration-200 cursor-pointer focus:outline-none ${
                      activeFaceColor === color
                        ? "bg-white/[0.03] border-white/20 text-white"
                        : "bg-transparent border-white/[0.03] text-zinc-500 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-inner"
                      style={{
                        background:
                          color === "obsidian"
                            ? "#0B0C0E"
                            : color === "silver"
                            ? "#D1D2D5"
                            : "#0C1322",
                      }}
                    />
                    <span className="text-[9px] uppercase font-mono tracking-widest leading-none mt-1">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live telemetry metrics representation */}
            <div className="bg-[#111111]/30 border border-white/[0.04] rounded-xl p-6 backdrop-blur-md text-left">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-serif text-base text-zinc-200 font-light">Calibre Mechanics</h3>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-widest bg-emerald-950/30 text-emerald-400 border border-emerald-900/30 px-2.5 py-0.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Calibrated
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-left mb-5">
                <div className="border-b border-white/[0.02] pb-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Frequence</span>
                  <span className="text-xs text-zinc-300 mt-1 block font-medium">4 Hz ({calibrationMs} vph)</span>
                </div>
                <div className="border-b border-white/[0.02] pb-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Reserve Level</span>
                  <span className="text-xs text-zinc-300 mt-1 block font-medium">{powerReserve}% (Hybrid)</span>
                </div>
                <div className="border-b border-white/[0.02] pb-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Hands Tension</span>
                  <span className="text-xs text-zinc-300 mt-1 block font-medium">Continuous Sweep</span>
                </div>
                <div className="border-b border-white/[0.02] pb-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Escapement Jewels</span>
                  <span className="text-xs text-zinc-300 mt-1 block font-medium">27 Synthetic Rubies</span>
                </div>
              </div>

              <button
                onClick={handleWindCrown}
                disabled={isWinding}
                className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white text-black font-semibold text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer focus:outline-none hover:bg-[#BFC0C2] hover:scale-[1.01] active:scale-[0.99]"
              >
                {isWinding ? "Winding Mainspring..." : "Wind Mechanical Crown"}
              </button>
            </div>
          </div>

          {/* Center Column Interactive Canvas face */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative w-full aspect-square max-w-[380px] flex items-center justify-center bg-transparent cursor-crosshair rounded-3xl"
              style={{
                perspective: "1200px",
              }}
            >
              {/* Reflected glare spotlight overlay */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100 z-10 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle 180px at ${
                    mousePos.x !== 0 ? mousePos.x : 190
                  }px ${
                    mousePos.y !== 0 ? mousePos.y : 190
                  }px, rgba(235, 237, 240, 0.1) 0%, rgba(255, 255, 255, 0) 100%)`,
                }}
              />

              {/* Tilting frame */}
              <motion.div
                className="relative w-11/12 h-11/12 flex items-center justify-center select-none"
                animate={{
                  rotateX: -mousePos.normalizedY * 12,
                  rotateY: mousePos.normalizedX * 12,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Backdrop flat dark shadows */}
                <div className="absolute inset-8 rounded-full bg-black/80 blur-xl scale-95 select-none pointer-events-none" />

                {/* Metallic bezel border frame */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1D1E20] via-[#48494C] to-[#1D1E20] p-[3px] shadow-[0_20px_45px_rgba(0,0,0,0.8)] border border-white/5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#121213] via-[#2F3032] to-[#121213] p-[8px] flex items-center justify-center relative">
                    
                    {/* Dial Container */}
                    <div
                      className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: currentTheme.faceBg,
                        border: `1px solid ${currentTheme.ringBorder}`,
                      }}
                    >
                      {/* Darkening polaroid shadow mask */}
                      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 opacity-80" />

                      {/* Sheen beam reflection */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-transform duration-300 mix-blend-soft-light opacity-50 z-20"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
                          transform: `translate(${mousePos.normalizedX * 15}px, ${mousePos.normalizedY * 15}px)`,
                        }}
                      />

                      {/* Elegant Hour numbers dial indices */}
                      {Array.from({ length: 12 }).map((_, index) => {
                        const angle = index * 30;
                        const tickValue = index === 0 ? 12 : index;
                        const isPrimary = tickValue % 3 === 0;
                        return (
                          <div
                            key={index}
                            className="absolute"
                            style={{
                              transform: `rotate(${angle}deg)`,
                              height: "90%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-start",
                            }}
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className="w-[1.2px] rounded-full transition-all duration-300"
                                style={{
                                  height: isPrimary ? "10px" : "5px",
                                  backgroundColor: isPrimary ? currentTheme.accent : "rgba(255,255,255,0.12)",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* Brand Label Header */}
                      <div className="absolute top-[28%] flex flex-col items-center z-12 text-center">
                        <span className="text-[11px] font-sans font-light tracking-[0.25em] text-white">
                          AURAFARM
                        </span>
                        <span className="text-[6px] font-mono tracking-[0.2em] text-white/30 uppercase mt-0.5 font-semibold">
                          CLASSIC SWEEP
                        </span>
                      </div>

                      {/* Central Pin Axis */}
                      <div className="absolute w-[8px] h-[8px] rounded-full bg-[#111] border border-white/20 z-30 shadow" />

                      {/* HOUR HAND */}
                      <div
                        className="absolute h-[68%] w-1 z-20 flex justify-center"
                        style={{
                          transform: `rotate(${hourDegrees}deg)`,
                          transformOrigin: "center 50%",
                        }}
                      >
                        <div className="w-[2.5px] h-[60px] bg-white rounded-full relative" />
                      </div>

                      {/* MINUTE HAND */}
                      <div
                        className="absolute h-[85%] w-1 z-21 flex justify-center"
                        style={{
                          transform: `rotate(${minuteDegrees}deg)`,
                          transformOrigin: "center 50%",
                        }}
                      >
                        <div className="w-[1.5px] h-[85px] bg-zinc-300 rounded-full" />
                      </div>

                      {/* CONTINUOUS SWEEPING SECOND HAND */}
                      <div
                        className="absolute h-[92%] w-0.5 z-22 flex justify-center"
                        style={{
                          transform: `rotate(${secondDegrees}deg)`,
                          transformOrigin: "center 50%",
                        }}
                      >
                        <div className="w-[0.5px] h-[100px] bg-[#BFC0C2] rounded-full relative">
                          <div className="absolute bottom-1.5 l-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#BFC0C2]" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Winding Crown Protruding Side Button */}
                <motion.div
                  onClick={handleWindCrown}
                  className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-[12px] h-[24px] bg-gradient-to-r from-[#222] via-[#BBB] to-[#222] rounded-l-md border border-white/5 cursor-pointer z-35 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  animate={isWinding ? { rotate: [0, 90, 180, 270, 360] } : {}}
                  transition={{ duration: 0.8 }}
                  title="Winding Crown"
                >
                  <div className="w-[1px] h-3/4 bg-black/40 mx-auto" />
                </motion.div>
              </motion.div>
            </div>

            <span className="inline-flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-[#BFC0C2]/30 uppercase mt-4">
              <ArrowLeftRight size={9} /> Drag cursor or turn mechanical crown
            </span>
          </div>

          {/* Right Column Pillars */}
          <div className="lg:col-span-3 order-3 flex flex-col gap-6 md:gap-7 justify-center text-left">
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/[0.05] text-[#BFC0C2]">
                <Shield size={14} />
              </div>
              <div>
                <h4 className="text-sm text-white font-semibold tracking-tight">Secure Guarantee</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-1">
                  Backed by a standard product quality guarantee ensuring proper mechanical operation of all watches.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/[0.05] text-[#BFC0C2]">
                <Award size={14} />
              </div>
              <div>
                <h4 className="text-sm text-white font-semibold tracking-tight">Safe packing</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-1">
                  Each watch is insulated in safe transition boxes with generous bubble sheets to arrive pristine on your doorstep.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/[0.05] text-[#BFC0C2]">
                <Sparkles size={14} />
              </div>
              <div>
                <h4 className="text-sm text-white font-semibold tracking-tight">Accuracy Checked</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-1">
                  Movements are individually wound and verified of correct time-keeping before dispatching from our Punjab warehouse.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
