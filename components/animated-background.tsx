"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WaveProps {
  delay: number;
  duration: number;
  opacity: number;
}

const AnimatedWave = ({ delay, duration, opacity }: WaveProps) => (
  <motion.div
    className="absolute inset-0"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity }}
    transition={{
      delay,
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
        fill="url(#waveGradient)"
        animate={{
          d: [
            "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z",
            "M0,350 Q300,250 600,350 T1200,350 V800 H0 Z",
            "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D43F52" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D43F52" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const FloatingDot = ({ index }: { index: number }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const size = Math.random() * 4 + 2;
  const initialX = Math.random() * windowSize.width;
  const initialY = Math.random() * windowSize.height;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: initialX,
        top: initialY,
        background: `radial-gradient(circle, #D43F52, transparent)`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -10, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5,
      }}
    />
  );
};

const GeometricLine = ({ index }: { index: number }) => {
  const angle = (index * 45) % 360;
  const length = Math.random() * 200 + 100;

  return (
    <motion.div
      className="absolute origin-center"
      style={{
        left: `${20 + ((index * 15) % 60)}%`,
        top: `${20 + ((index * 20) % 60)}%`,
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 0.1 }}
      transition={{
        duration: 3,
        delay: index * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div
        className="h-px bg-gradient-to-r from-transparent via-[#D43F52] to-transparent"
        style={{ width: `${length}px` }}
      />
    </motion.div>
  );
};

const PulsingCircle = ({ index }: { index: number }) => {
  const size = Math.random() * 300 + 150;
  const positions = [
    { left: "10%", top: "20%" },
    { right: "15%", top: "30%" },
    { left: "20%", bottom: "25%" },
    { right: "25%", bottom: "20%" },
  ];
  const position = positions[index % positions.length];

  return (
    <motion.div
      className="absolute rounded-full border border-[#D43F52]/10"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...position,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.15, 0.05],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 15 + index * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 2,
      }}
    />
  );
};

const MorphingBlob = ({ index }: { index: number }) => {
  const colors = [
    "rgba(212, 63, 82, 0.03)",
    "rgba(212, 63, 82, 0.05)",
    "rgba(212, 63, 82, 0.02)",
  ];

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: "400px",
        height: "400px",
        left: `${index * 30}%`,
        top: `${index * 25}%`,
        background: colors[index % colors.length],
      }}
      animate={{
        scale: [1, 1.3, 0.8, 1],
        x: [0, 50, -30, 0],
        y: [0, -40, 30, 0],
        borderRadius: ["50%", "40%", "60%", "50%"],
      }}
      transition={{
        duration: 20 + index * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 3,
      }}
    />
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(212, 63, 82, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(212, 63, 82, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(212, 63, 82, 0.02) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated waves */}
      {Array.from({ length: 3 }, (_, i) => (
        <AnimatedWave
          key={`wave-${i}`}
          delay={i * 2}
          duration={10 + i * 2}
          opacity={0.05 - i * 0.01}
        />
      ))}

      {/* Morphing blobs */}
      {Array.from({ length: 3 }, (_, i) => (
        <MorphingBlob key={`blob-${i}`} index={i} />
      ))}

      {/* Pulsing circles */}
      {Array.from({ length: 4 }, (_, i) => (
        <PulsingCircle key={`circle-${i}`} index={i} />
      ))}

      {/* Geometric lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <GeometricLine key={`line-${i}`} index={i} />
      ))}

      {/* Floating dots */}
      {Array.from({ length: 20 }, (_, i) => (
        <FloatingDot key={`dot-${i}`} index={i} />
      ))}

      {/* Subtle grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 63, 82, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 63, 82, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Radial light effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(212, 63, 82, 0.1) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
