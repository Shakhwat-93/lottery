import { useEffect, useRef } from 'react';

export function useMediaCoordinator() {
  const heroVideoRef = useRef(null);
  const reviewVideoRef = useRef(null);

  const handleReviewVideoPlay = () => {
    const reviewVideo = reviewVideoRef.current;
    const heroVideo = heroVideoRef.current;
    if (reviewVideo) reviewVideo.volume = 1;
    if (heroVideo && !heroVideo.paused) heroVideo.pause();
  };

  const handleHeroVideoPlay = () => {
    const heroVideo = heroVideoRef.current;
    const reviewVideo = reviewVideoRef.current;
    if (heroVideo) heroVideo.volume = 1;
    if (reviewVideo && !reviewVideo.paused) reviewVideo.pause();
  };

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    if (!heroVideo) return undefined;
    heroVideo.addEventListener('play', handleHeroVideoPlay);
    return () => heroVideo.removeEventListener('play', handleHeroVideoPlay);
  }, []);

  const handleHeroClick = () => {
    const heroVideo = heroVideoRef.current;
    if (!heroVideo) return;
    if (heroVideo.paused) {
      heroVideo.muted = false;
      heroVideo.volume = 1.0;
      heroVideo.play().catch((err) => {
        console.warn('Hero video play error:', err);
      });
    } else {
      heroVideo.pause();
    }
  };

  return {
    heroVideoRef,
    reviewVideoRef,
    handleHeroClick,
    handleReviewVideoPlay
  };
}
