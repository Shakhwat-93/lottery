import { useEffect, useRef } from 'react';

export function useMediaCoordinator() {
  const heroVideoRef = useRef(null);
  const reviewVideoRef = useRef(null);

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    const reviewVideo = reviewVideoRef.current;

    // --- 1. HERO VIDEO UNMUTED AUTOPLAY WITH GESTURE UNLOCK ---
    if (heroVideo) {
      heroVideo.muted = false;
      heroVideo.volume = 1.0;

      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: browser blocked unmuted autoplay, mute momentarily and wait for first interaction
          heroVideo.muted = true;
          heroVideo.play().catch(() => {});

          const unlockSound = () => {
            if (!heroVideo) return;
            heroVideo.muted = false;
            heroVideo.volume = 1.0;
            if (heroVideo.currentTime < 2.8) {
              heroVideo.currentTime = 2.8;
            }
            heroVideo.play().catch(() => {});

            ['pointerdown', 'touchstart', 'scroll', 'wheel', 'mousemove', 'click', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, unlockSound, true);
              document.removeEventListener(evt, unlockSound, true);
            });
          };

          ['pointerdown', 'touchstart', 'scroll', 'wheel', 'mousemove', 'click', 'keydown'].forEach((evt) => {
            window.addEventListener(evt, unlockSound, { once: true, passive: true, capture: true });
            document.addEventListener(evt, unlockSound, { once: true, passive: true, capture: true });
          });
        });
      }
    }

    // --- 2. REVIEW VIDEO & HERO VIDEO PLAYBACK COORDINATION ---
    const handleReviewPlay = () => {
      if (reviewVideo) {
        reviewVideo.muted = false;
        reviewVideo.volume = 1.0;
      }
      if (heroVideo && !heroVideo.paused) {
        heroVideo.pause();
      }
    };

    const handleReviewEnded = () => {
      if (heroVideo && heroVideo.paused) {
        heroVideo.muted = false;
        heroVideo.volume = 1.0;
        heroVideo.play().catch(() => {});
      }
    };

    if (reviewVideo) {
      reviewVideo.addEventListener('play', handleReviewPlay);
      reviewVideo.addEventListener('ended', handleReviewEnded);
    }

    return () => {
      if (reviewVideo) {
        reviewVideo.removeEventListener('play', handleReviewPlay);
        reviewVideo.removeEventListener('ended', handleReviewEnded);
      }
    };
  }, []);

  const handleHeroClick = () => {
    const heroVideo = heroVideoRef.current;
    if (!heroVideo) return;
    if (heroVideo.paused) {
      heroVideo.muted = false;
      heroVideo.volume = 1.0;
      heroVideo.play().catch(() => {});
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
