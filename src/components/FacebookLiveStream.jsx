import React, { useRef, useState, useEffect } from 'react';

/**
 * ============================================================================
 * PURE LIVE VIDEO STREAM COMPONENT
 * ============================================================================
 * Clean, distraction-free official live video stream.
 * Displays only the high-definition live video broadcast.
 * ============================================================================
 */

export default function FacebookLiveStream() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="pure-live-video-card" aria-label="Thailand Lottery Official Live Video">
      <div className="pure-live-video-wrapper" onClick={handleTogglePlay}>
        <video
          ref={videoRef}
          className="pure-live-video-element"
          playsInline
          autoPlay
          muted={isMuted}
          loop
          poster="/assets/site/hero-video-poster.jpg"
        >
          <source src="/hero-section.mp4" type="video/mp4" />
        </video>

        {/* Live Badge in Corner */}
        <div className="pure-live-tag">
          <span className="pure-live-dot" aria-hidden="true" />
          <span>LIVE</span>
        </div>

        {/* Audio Sound Toggle */}
        <button
          type="button"
          className="pure-live-audio-btn"
          onClick={handleToggleMute}
          aria-label={isMuted ? 'সাউন্ড চালু করুন (Unmute)' : 'সাউন্ড বন্ধ করুন (Mute)'}
          title={isMuted ? 'সাউন্ড চালু করুন (Unmute)' : 'সাউন্ড বন্ধ করুন (Mute)'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {/* Center Play Overlay Indicator (only shows if paused) */}
        {!isPlaying && (
          <div className="pure-live-play-overlay">
            <div className="pure-live-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path fill="#FFD700" d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
