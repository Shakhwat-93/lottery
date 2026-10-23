import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import { BgMesh } from "./components/BgMesh";
import { CoronaRays } from "./components/CoronaRays";
import { Grade } from "./components/Grade";
import { Grain } from "./components/Grain";
import { Vignette } from "./components/Vignette";

export const LogoTransitionComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Logo Spring Entrance (opacity + translateY + scale)
  const logoSpring = spring({
    frame: frame - 6,
    fps,
    config: theme.spring.bouncy,
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoY = interpolate(logoSpring, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Idle breathing (Rule 7: sin-wave micro-motion)
  const breathe = 1 + Math.sin(frame / 20) * 0.018;

  // 2. Shimmer Light Sweep across the logo
  const shimmerProgress = interpolate(frame, [16, 36], [-120, 220], {
    easing: theme.ease.inOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Staggered Typography Entrance
  const titleSpring = spring({
    frame: frame - 16,
    fps,
    config: theme.spring.snappy,
  });

  const subSpring = spring({
    frame: frame - 22,
    fps,
    config: theme.spring.snappy,
  });

  const progressSpring = spring({
    frame: frame - 26,
    fps,
    config: theme.spring.smooth,
  });

  // Progress counter value (0% -> 100%)
  const progressPct = interpolate(
    frame,
    [24, durationInFrames - 12],
    [0, 100],
    {
      easing: theme.ease.inOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 4. Energetic Exit (Rule 4: faster than entrance, 10 frames)
  const exitFrames = 10;
  const exitStart = durationInFrames - exitFrames;

  const exitScale = interpolate(frame, [exitStart, durationInFrames], [1, 1.45], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBloom = interpolate(frame, [exitStart, durationInFrames], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.bg,
        opacity: exitOpacity,
        filter: `blur(${exitBloom}px)`,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Layer 1: Background Mesh */}
      <BgMesh />

      {/* Layer 2: Radial Corona Rays */}
      <CoronaRays size={580} delay={6} />

      {/* Layer 3: Central Hero Logo with Shimmer */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 200,
            height: 200,
            opacity: logoSpring,
            transform: `translateY(${logoY}px) scale(${logoScale * breathe})`,
            filter: `drop-shadow(0 15px 45px rgba(0,0,0,0.8)) drop-shadow(0 0 40px ${theme.colors.glow})`,
          }}
        >
          {/* Logo Glow Ring */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              border: `2px solid ${theme.colors.primary}`,
              opacity: 0.45 * logoSpring,
              boxShadow: `0 0 35px ${theme.colors.glow}, inset 0 0 25px ${theme.colors.glow}`,
            }}
          />

          {/* Logo Image */}
          <Img
            src={staticFile("assets/logo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Shimmer Sweep Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: `${shimmerProgress}%`,
                width: "45%",
                height: "200%",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                transform: "skewX(-28deg)",
                opacity: 0.85,
              }}
            />
          </div>
        </div>

        {/* Layer 4: Brand Typography & Status Pill */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          {/* Title */}
          <div
            style={{
              opacity: titleSpring,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: `linear-gradient(90deg, ${theme.colors.primary} 0%, #FFF3B0 50%, ${theme.colors.primary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: theme.fonts.body,
              textShadow: `0 4px 20px ${theme.colors.glow}`,
            }}
          >
            👑 THAILAND OFFICIAL LOTTERY
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: subSpring,
              transform: `translateY(${interpolate(subSpring, [0, 1], [25, 0])}px)`,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: theme.colors.textDim,
              fontFamily: theme.fonts.body,
            }}
          >
            OFFICIAL MEMBER REGISTRATION PORTAL 2026
          </div>

          {/* Loading Progress Bar & Percentage */}
          <div
            style={{
              marginTop: 18,
              opacity: progressSpring,
              transform: `translateY(${interpolate(progressSpring, [0, 1], [20, 0])}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              width: 320,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 5,
                background: "rgba(255, 255, 255, 0.12)",
                borderRadius: 999,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(255, 215, 0, 0.25)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.primary})`,
                  borderRadius: 999,
                  boxShadow: `0 0 12px ${theme.colors.glow}`,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                fontSize: 13,
                fontWeight: 700,
                color: theme.colors.primary,
                fontFamily: theme.fonts.mono,
              }}
            >
              <span>CONNECTING SECURE GLO SERVER...</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {Math.floor(progressPct)}%
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Layer 5: Color Grade, Film Grain, Vignette */}
      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
