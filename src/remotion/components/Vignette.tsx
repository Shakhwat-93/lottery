import React from "react";
import { AbsoluteFill } from "remotion";

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 48%, rgba(2,4,10,0.55) 85%, rgba(0,0,0,0.85) 100%)",
    }}
  />
);
