import { useEffect, useRef } from 'react';

export function useMediaCoordinator() {
  const heroVideoRef = useRef(null);
  const reviewVideoRef = useRef(null);

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    const reviewVideo = reviewVideoRef.current;

    // --- PLAYBACK COORDINATION BETWEEN HERO AND REVIEW VIDEOS ---
    const handleReviewPlay = () => {
      if (reviewVideo) {
        reviewVideo.muted = false;
        reviewVideo.volume = 1.0;
      }
      if (heroVideo && !heroVideo.paused) {
        heroVideo.pause();
      }
    };

    const handleHeroPlay = () => {
      if (heroVideo) {
        heroVideo.muted = false;
        heroVideo.volume = 1.0;
      }
      if (reviewVideo && !reviewVideo.paused) {
        reviewVideo.pause();
      }
    };

    if (reviewVideo) {
      reviewVideo.addEventListener('play', handleReviewPlay);
    }
    if (heroVideo) {
      heroVideo.addEventListener('play', handleHeroPlay);
    }

    return () => {
      if (reviewVideo) {
        reviewVideo.removeEventListener('play', handleReviewPlay);
      }
      if (heroVideo) {
        heroVideo.removeEventListener('play', handleHeroPlay);
      }
    };
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
    handleHeroClick
  };
}
