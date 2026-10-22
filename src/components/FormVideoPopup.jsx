import React, { useState, useEffect, useRef } from 'react';

export default function FormVideoPopup({ videoSrc = '/form-intro-video.mp4' }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmuteBtn, setShowUnmuteBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt automatic playback as soon as the modal mounts
    const video = videoRef.current;
    if (!video) return;

    const attemptAutoplay = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsPlaying(true);
        setShowUnmuteBtn(false);
      } catch (err) {
        // Browser autoplay policy blocked unmuted playback
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
          setIsPlaying(true);
          setShowUnmuteBtn(true);
        } catch (silentErr) {
          setIsPlaying(false);
          setShowUnmuteBtn(true);
        }
      }
    };

    attemptAutoplay();
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 320);
  };

  const handleVideoEnded = () => {
    // "then video ta sesh hole auto popup sore jabe"
    handleClose();
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowUnmuteBtn(nextMuted);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleManualPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    setShowUnmuteBtn(false);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (!duration && videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  if (!isOpen) return null;

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`form-video-modal-backdrop ${isClosing ? 'is-closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Official Video Guide"
    >
      <div className="form-video-modal-container">
        {/* Top Header Bar */}
        <div className="form-video-modal-header">
          <div className="form-video-modal-title">
            <span className="form-video-badge-icon" aria-hidden="true">👑</span>
            <div className="form-video-title-wrap">
              <strong>OFFICIAL GLO VIDEO GUIDE</strong>
              <span>অফিসিয়াল ফর্ম নির্দেশিকা</span>
            </div>
          </div>
          <button
            type="button"
            className="form-video-close-btn"
            onClick={handleClose}
            aria-label="Skip to form"
            title="Skip video and open form"
          >
            <span>ফর্ম পূরণ করুন</span>
            <span className="form-video-close-x" aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Video Player Box */}
        <div className="form-video-player-wrap">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            preload="auto"
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                  setIsPlaying(true);
                } else {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              }
            }}
            className="form-popup-video-element"
          />

          {/* Sound Toggle Floating Button */}
          {showUnmuteBtn && (
            <button
              type="button"
              className="form-video-unmute-floating-btn"
              onClick={toggleSound}
              aria-label="Enable Audio"
            >
              <span className="unmute-sound-icon" aria-hidden="true">🔊</span>
              <span>সাউন্ড অন করতে ক্লিক করুন</span>
            </button>
          )}

          {/* Play/Pause Overlay if paused */}
          {!isPlaying && (
            <button
              type="button"
              className="form-video-play-center-btn"
              onClick={handleManualPlay}
              aria-label="Play video"
            >
              <span className="play-triangle" aria-hidden="true">▶</span>
            </button>
          )}

          {/* Progress Bar Line */}
          <div className="form-video-progress-line-track">
            <div
              className="form-video-progress-line-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Bottom Status & Quick Action Bar */}
        <div className="form-video-modal-footer">
          <div className="form-video-auto-notice">
            <span className="auto-pulse-dot" aria-hidden="true" />
            <span>ভিডিও শেষ হলে স্বয়ংক্রিয়ভাবে ফর্ম ওপেন হবে</span>
          </div>
          <button
            type="button"
            className="form-video-skip-action-btn"
            onClick={handleClose}
          >
            <span>সরাসরি ফর্ম পূরণ করুন ✍️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
