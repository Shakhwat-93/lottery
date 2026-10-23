import React from "react";
import { Composition } from "remotion";
import { LogoTransitionComp } from "./LogoTransitionComp";

export const Root: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Story / Mobile Composition */}
      <Composition
        id="LogoTransitionVertical"
        component={LogoTransitionComp}
        durationInFrames={54} // 1.8 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />
      {/* 16:9 Landscape Desktop Composition */}
      <Composition
        id="LogoTransitionDesktop"
        component={LogoTransitionComp}
        durationInFrames={54}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
