import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 40) * 45;
  const d2 = Math.cos(frame / 50) * 35;

  return (
    <AbsoluteFill style={{ background: theme.colors.bg, overflow: "hidden" }}>
      {/* Top Gold Radial Orb */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          top: -300,
          left: `calc(50% - 450px + ${d1}px)`,
          filter: "blur(90px)",
          background: `radial-gradient(circle, ${theme.colors.primary}28, transparent 65%)`,
        }}
      />
      {/* Center Red Royal Orb */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          top: `calc(50% - 400px + ${d2}px)`,
          left: `calc(50% - 400px - ${d1 * 0.5}px)`,
          filter: "blur(110px)",
          background: `radial-gradient(circle, ${theme.colors.accent}20, transparent 68%)`,
        }}
      />
      {/* Subtle Star Particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, rgba(255,215,0,0.8), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, rgba(255,215,0,0.6), rgba(0,0,0,0))",
          backgroundSize: "200px 200px",
          opacity: 0.22,
        }}
      />
    </AbsoluteFill>
  );
};
