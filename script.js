/**
 * Thailand Lottery 2026 - Official Audio & Video Controller
 * Ensures cross-browser unmuting, high-fidelity sound playback,
 * mutual exclusivity between media streams, and royal UI feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements: Hero Video
  const heroVideo = document.getElementById('hero-video');
  const heroSoundBtn = document.getElementById('hero-sound-btn');
  const heroSoundLabel = document.getElementById('hero-sound-label');
  const heroSoundHint = document.getElementById('hero-sound-hint');

  // Elements: Customer Review Video
  const reviewVideo = document.getElementById('review-video');
  const reviewSoundBtn = document.getElementById('review-sound-btn');
  const reviewSoundLabel = document.getElementById('review-sound-label');
  const reviewSoundIcon = document.getElementById('review-sound-icon');
  const reviewPlayBtn = document.getElementById('review-play-btn');
  const reviewPlayLabel = document.getElementById('review-play-label');
  const reviewPlayIcon = document.getElementById('review-play-icon');

  /* ==========================================================================
     1. HERO VIDEO AUDIO MANAGEMENT
     ========================================================================== */

  function updateHeroSoundUI(isUnmuted) {
    if (!heroSoundBtn) return;
    if (isUnmuted) {
      heroSoundBtn.classList.add('active');
      if (heroSoundLabel) {
        heroSoundLabel.textContent = '🔊 সাউন্ড চলছে (মিউট করতে ক্লিক করুন)';
      }
      if (heroSoundHint) {
        heroSoundHint.classList.add('hidden');
      }
    } else {
      heroSoundBtn.classList.remove('active');
      if (heroSoundLabel) {
        heroSoundLabel.textContent = '🔊 সাউন্ড চালু করুন (অডিও শুনুন)';
      }
      if (heroSoundHint) {
        heroSoundHint.classList.remove('hidden');
      }
    }
  }

  function toggleHeroSound() {
    if (!heroVideo) return;

    if (heroVideo.muted) {
      // Pause or mute review video so audio doesn't collide
      if (reviewVideo && !reviewVideo.paused) {
        reviewVideo.pause();
      }

      heroVideo.muted = false;
      heroVideo.volume = 1.0;

      // If video is still within initial silent segment (0 - 2.8s), skip right to speech
      if (heroVideo.currentTime < 2.8) {
        heroVideo.currentTime = 2.8;
      }

      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback, keep muted fallback
          heroVideo.muted = true;
          updateHeroSoundUI(false);
        });
      }
      updateHeroSoundUI(true);
    } else {
      heroVideo.muted = true;
      updateHeroSoundUI(false);
    }
  }

  if (heroSoundBtn) {
    heroSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleHeroSound();
    });
  }

  if (heroVideo) {
    heroVideo.addEventListener('click', () => {
      toggleHeroSound();
    });
  }

  /* ==========================================================================
     2. CUSTOMER REVIEW VIDEO AUDIO MANAGEMENT
     ========================================================================== */

  function updateReviewSoundUI(isActive) {
    if (!reviewSoundBtn || !reviewVideo) return;
    const hasSound = isActive && !reviewVideo.muted && reviewVideo.volume > 0;

    if (hasSound) {
      reviewSoundBtn.classList.add('active');
      if (reviewSoundIcon) reviewSoundIcon.textContent = '🔊';
      if (reviewSoundLabel) reviewSoundLabel.textContent = 'সাউন্ড চালু আছে (১০০% ভলিউম)';
    } else {
      reviewSoundBtn.classList.remove('active');
      if (reviewSoundIcon) reviewSoundIcon.textContent = '🔇';
      if (reviewSoundLabel) reviewSoundLabel.textContent = 'সাউন্ড চালু করুন (১০০% ভলিউম)';
    }
  }

  function forceUnmuteReview() {
    if (!reviewVideo) return;
    reviewVideo.muted = false;
    reviewVideo.volume = 1.0;
    updateReviewSoundUI(true);
  }

  if (reviewSoundBtn) {
    reviewSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!reviewVideo) return;

      if (reviewVideo.muted || reviewVideo.volume === 0) {
        // Mute hero video to prevent dual audio
        if (heroVideo && !heroVideo.muted) {
          heroVideo.muted = true;
          updateHeroSoundUI(false);
        }
        forceUnmuteReview();
        if (reviewVideo.paused) {
          reviewVideo.play().catch(err => console.log('Review play err:', err));
        }
      } else {
        reviewVideo.muted = true;
        updateReviewSoundUI(false);
      }
    });
  }

  if (reviewPlayBtn) {
    reviewPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!reviewVideo) return;

      if (reviewVideo.paused) {
        // Mute hero video
        if (heroVideo && !heroVideo.muted) {
          heroVideo.muted = true;
          updateHeroSoundUI(false);
        }
        forceUnmuteReview();
        reviewVideo.play().catch(err => console.log('Play err:', err));
      } else {
        reviewVideo.pause();
      }
    });
  }

  if (reviewVideo) {
    // When review video plays from ANY source (native controls or button), guarantee audio is unmuted & volume 1.0
    reviewVideo.addEventListener('play', () => {
      forceUnmuteReview();

      // Mute hero video
      if (heroVideo && !heroVideo.muted) {
        heroVideo.muted = true;
        updateHeroSoundUI(false);
      }

      if (reviewPlayLabel) reviewPlayLabel.textContent = 'পজ করুন';
      if (reviewPlayIcon) reviewPlayIcon.textContent = '⏸';
    });

    reviewVideo.addEventListener('pause', () => {
      if (reviewPlayLabel) reviewPlayLabel.textContent = 'প্লে করুন';
      if (reviewPlayIcon) reviewPlayIcon.textContent = '▶';
    });

    reviewVideo.addEventListener('volumechange', () => {
      updateReviewSoundUI(!reviewVideo.muted && reviewVideo.volume > 0);
    });

    reviewVideo.addEventListener('ended', () => {
      if (reviewPlayLabel) reviewPlayLabel.textContent = 'আবার দেখুন';
      if (reviewPlayIcon) reviewPlayIcon.textContent = '↺';
    });
  }

  /* ==========================================================================
     3. UNIVERSAL FIRST-GESTURE UNLOCK
     ========================================================================== */
  const unlockAudioContext = () => {
    // Allows seamless Web Audio policy transition
    window.removeEventListener('click', unlockAudioContext);
    window.removeEventListener('touchstart', unlockAudioContext);
  };
  window.addEventListener('click', unlockAudioContext, { passive: true });
  window.addEventListener('touchstart', unlockAudioContext, { passive: true });
});
