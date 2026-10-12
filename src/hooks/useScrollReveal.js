import { useEffect } from 'react';

/**
 * Custom hook to initialize scroll-reveal animations using IntersectionObserver.
 * Observes all elements matching `.reveal-on-scroll` and adds `.is-revealed`
 * when they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    // If IntersectionObserver is not supported, reveal all immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing for high performance
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
