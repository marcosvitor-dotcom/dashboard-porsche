import type React from "react"

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"
  message?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full min-h-64 gap-5 ${className}`}>
      <div style={{ position: "relative", width: 120, height: 120, overflow: "hidden" }}>
        {/* Logo base */}
        <img
          src="/images/porsche_logo_brasão.png"
          alt="Porsche"
          style={{ width: 120, height: 120, objectFit: "contain", display: "block", opacity: 0.3 }}
          draggable={false}
        />
        {/* Faixa de luz que varre da esquerda para direita */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "100%",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
          animation: "porsche-shimmer 1.6s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        {/* Logo em cima da faixa, com mix-blend-mode para revelar só onde a logo existe */}
        <img
          src="/images/porsche_logo_brasão.png"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120,
            height: 120,
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
          draggable={false}
        />
        <style>{`
          @keyframes porsche-shimmer {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(280%); }
          }
        `}</style>
      </div>

      {message && (
        <p className="text-xs text-gray-400 font-medium tracking-wide">{message}</p>
      )}
    </div>
  )
}

export default Loading
