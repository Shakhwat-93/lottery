import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#050814",
    bgAlt: "#0A1124",
    primary: "#FFD700", // Royal Gold
    accent: "#E60000",  // Official Thailand GLO Red
    verified: "#1D9BF0",// Royal Blue
    text: "#FFFFFF",
    textDim: "#CBD5E1",
    glow: "rgba(255, 215, 0, 0.55)",
    glowRed: "rgba(230, 0, 0, 0.45)",
  },
  fonts: {
    display: "'Cinzel', 'Playfair Display', -apple-system, system-ui, sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "monospace, 'Courier New', sans-serif",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;
