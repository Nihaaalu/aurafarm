import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const AurafarmLogoIcon: React.FC<LogoProps> = ({ className = "", size = 48 }) => {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError) {
    return (
      <img
        src="/logo/aura.png"
        alt="Aurafarm"
        width={size}
        height={size}
        onError={() => setImgError(true)}
        className={`object-contain select-none ${className}`}
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Brushed metallic silver linear gradient representing watch steel steel finish */}
        <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7F8082" />
          <stop offset="25%" stopColor="#D8D9DB" />
          <stop offset="50%" stopColor="#BFC0C2" />
          <stop offset="75%" stopColor="#EAEAEC" />
          <stop offset="100%" stopColor="#555658" />
        </linearGradient>

        {/* Soft luxury glow */}
        <radialGradient id="luxuryGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle background glow */}
      <circle cx="50%" cy="50%" r="46" fill="url(#luxuryGlow)" />

      {/* Outer bezel with precision notches */}
      <circle
        cx="50%"
        cy="50%"
        r="38"
        stroke="url(#metallicSilver)"
        strokeWidth="1.5"
        strokeDasharray="2 4"
        className="opacity-60"
      />

      {/* Primary geometric gear-like bezel ring */}
      <circle
        cx="50%"
        cy="50%"
        r="34"
        stroke="url(#metallicSilver)"
        strokeWidth="2"
      />

      {/* Hour indexes around bezel */}
      <line x1="50%" y1="18%" x2="50%" y2="24%" stroke="url(#metallicSilver)" strokeWidth="1.5" />
      <line x1="50%" y1="76%" x2="50%" y2="82%" stroke="url(#metallicSilver)" strokeWidth="1.5" />
      <line x1="18%" y1="50%" x2="24%" y2="50%" stroke="url(#metallicSilver)" strokeWidth="1.5" />
      <line x1="76%" y1="50%" x2="82%" y2="50%" stroke="url(#metallicSilver)" strokeWidth="1.5" />

      {/* Inner tourbillon ring */}
      <circle
        cx="50%"
        cy="50%"
        r="22"
        stroke="url(#metallicSilver)"
        strokeWidth="1"
        strokeDasharray="1 3"
        className="opacity-80"
      />

      {/* Stylized mechanical "A" and crown */}
      <path
        d="M50 32 L35 68 H42 L50 48 L58 68 H65 Z"
        fill="url(#metallicSilver)"
        className="transition-all duration-700 hover:scale-105"
      />

      {/* Chronograph center pin */}
      <circle cx="50%" cy="50%" r="4" fill="#FFFFFF" />
      <circle cx="50%" cy="50%" r="2" fill="#111111" />

      {/* Fine second-hand point accent */}
      <line x1="50" y1="50" x2="62" y2="38" stroke="url(#metallicSilver)" strokeWidth="0.75" />
    </svg>
  );
};

export const AurafarmLogoText: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center tracking-[0.35em] ${className}`}>
      <span className="font-sans font-light text-2xl tracking-[0.4em] text-white">
        AURAFARM
      </span>
      <span className="text-[9px] font-mono uppercase text-[#BFC0C2] tracking-[0.3em] mt-1">
        Watch Store
      </span>
    </div>
  );
};

export const AurafarmLogoFull: React.FC<{ className?: string; iconSize?: number }> = ({
  className = "",
  iconSize = 34,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AurafarmLogoIcon size={iconSize} />
      <div className="flex flex-col text-left">
        <span className="font-sans font-light text-lg tracking-[0.2em] text-white leading-none">
          AURAFARM
        </span>
        <span className="text-[7.5px] font-mono uppercase text-[#BFC0C2] tracking-[0.2em] mt-1 leading-none">
          Watch Store
        </span>
      </div>
    </div>
  );
};
