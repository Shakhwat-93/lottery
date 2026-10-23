import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";

export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primary,
        mixBlendMode: "soft-light",
        opacity: 0.16,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(5,8,20,0.45) 0%, transparent 28%, transparent 72%, rgba(5,8,20,0.65) 100%)",
      }}
    />
  </AbsoluteFill>
);
