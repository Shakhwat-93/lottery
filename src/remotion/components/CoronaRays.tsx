import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const CoronaRays: React.FC<{ size?: number; delay?: number }> = ({
  size = 460,
  delay = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rays = 16;
  const rotation = (frame * 0.45) % 360;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: "none",
        filter: `drop-shadow(0 0 25px ${theme.colors.glow})`,
      }}
    >
      {Array.from({ length: rays }).map((_, i) => {
        const p = spring({
          frame: frame - delay - i * 0.8,
          fps,
          config: theme.spring.bouncy,
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size * 0.025,
              height: size * 0.48 * p,
              background: `linear-gradient(180deg, ${theme.colors.primary} 0%, rgba(255,215,0,0) 100%)`,
              borderRadius: size,
              transformOrigin: "50% 0%",
              transform: `translateX(-50%) rotate(${(360 / rays) * i}deg) translateY(${size * 0.22}px)`,
              opacity: p * 0.65,
            }}
          />
        );
      })}
    </div>
  );
};
