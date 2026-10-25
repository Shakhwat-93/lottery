import React from 'react';

/**
 * ============================================================================
 * OFFICIAL LIVE VIDEO STREAM (YouTube Broadcast Embed)
 * ============================================================================
 * Clean, high-definition official live video broadcast from the Government
 * Lottery Office draw. Replaces former Facebook Live stream.
 * ============================================================================
 */

export default function FacebookLiveStream() {
  return (
    <div className="pure-live-video-card" aria-label="Thailand Lottery Official Live Video">
      <div className="pure-live-video-wrapper">
        <iframe
          className="pure-live-video-iframe"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3I-4SUZ5VBA?si=CJkfUhrPh4i1xe5T&amp;start=5"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="eager"
        />
      </div>
    </div>
  );
}
