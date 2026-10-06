/**
 * Thailand Lottery 2026 - Direct Unmuted Audio Controller
 * Ensures audio plays unmuted automatically as soon as the site reloads.
 */

(function () {
  function initMediaAudio() {
    const heroVideo = document.getElementById('hero-video');
    const reviewVideo = document.getElementById('review-video');

    if (heroVideo) {
      // Force unmuted state and full volume
      heroVideo.muted = false;
      heroVideo.volume = 1.0;

      const triggerUnmutedPlay = () => {
        heroVideo.muted = false;
        heroVideo.volume = 1.0;
        return heroVideo.play();
      };

      // Attempt immediate unmuted playback on page load
      const startPromise = triggerUnmutedPlay();

      if (startPromise !== undefined) {
        startPromise.catch(() => {
          // If browser policy temporarily holds audio until first interaction,
          // play video smoothly and unlock unmuted sound on the very first micro-gesture
          heroVideo.muted = true;
          heroVideo.play().catch(() => {});

          const unlockSoundInstantly = () => {
            heroVideo.muted = false;
            heroVideo.volume = 1.0;
            // Jump directly to the Thai greeting voice so speech is heard immediately
            if (heroVideo.currentTime < 2.8) {
              heroVideo.currentTime = 2.8;
            }
            heroVideo.play().catch(() => {});

            // Clean up all one-time unlock listeners
            ['pointerdown', 'touchstart', 'scroll', 'wheel', 'mousemove', 'click', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, unlockSoundInstantly, true);
              document.removeEventListener(evt, unlockSoundInstantly, true);
            });
          };

          ['pointerdown', 'touchstart', 'scroll', 'wheel', 'mousemove', 'click', 'keydown'].forEach((evt) => {
            window.addEventListener(evt, unlockSoundInstantly, { once: true, passive: true, capture: true });
            document.addEventListener(evt, unlockSoundInstantly, { once: true, passive: true, capture: true });
          });
        });
      }

      // Allow clicking hero video to pause/play with sound
      heroVideo.addEventListener('click', () => {
        if (heroVideo.paused) {
          heroVideo.muted = false;
          heroVideo.volume = 1.0;
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    }

    if (reviewVideo) {
      // Ensure customer review video is unmuted and at 100% volume
      reviewVideo.muted = false;
      reviewVideo.volume = 1.0;

      reviewVideo.addEventListener('play', () => {
        reviewVideo.muted = false;
        reviewVideo.volume = 1.0;

        // Automatically pause hero video while review video is playing
        if (heroVideo && !heroVideo.paused) {
          heroVideo.pause();
        }
      });

      reviewVideo.addEventListener('ended', () => {
        // Resume hero video when review video completes
        if (heroVideo && heroVideo.paused) {
          heroVideo.muted = false;
          heroVideo.volume = 1.0;
          heroVideo.play().catch(() => {});
        }
      });
    }

    // --- 3. LIVE DISCOUNT COUNTDOWN TIMER (PERSISTENT & REAL-TIME) ---
    function initOfferCountdown() {
      const hoursEl = document.getElementById('timer-hours');
      const minutesEl = document.getElementById('timer-minutes');
      const secondsEl = document.getElementById('timer-seconds');

      if (!hoursEl || !minutesEl || !secondsEl) return;

      const STORAGE_KEY = 'thai_lottery_vip_deadline';
      let deadline = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      const DURATION = (3 * 3600 + 48 * 60 + 20) * 1000;

      if (!deadline || parseInt(deadline, 10) <= now) {
        deadline = now + DURATION;
        localStorage.setItem(STORAGE_KEY, deadline.toString());
      } else {
        deadline = parseInt(deadline, 10);
      }

      function updateTimer() {
        const currentTime = Date.now();
        let diff = Math.max(0, Math.floor((deadline - currentTime) / 1000));

        if (diff <= 0) {
          deadline = Date.now() + (2 * 3600 + 45 * 60 + 15) * 1000;
          localStorage.setItem(STORAGE_KEY, deadline.toString());
          diff = Math.floor((deadline - Date.now()) / 1000);
        }

        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;

        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
      }

      updateTimer();
      setInterval(updateTimer, 1000);
    }

    initOfferCountdown();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMediaAudio);
  } else {
    initMediaAudio();
  }
})();
