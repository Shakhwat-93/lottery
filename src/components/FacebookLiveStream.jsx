import React from 'react';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';

/**
 * ============================================================================
 * OFFICIAL LIVE VIDEO STREAM (YouTube Broadcast Embed)
 * ============================================================================
 * Clean, high-definition official live video broadcast from the Government
 * Lottery Office draw. Replaces former Facebook Live stream.
 * ============================================================================
 */

export default function FacebookLiveStream() {
  const settings = useVipCodeSettings();
  const videoSrc = settings.liveStreamUrl || 'https://www.youtube.com/embed/Emnh_bS2PIo?si=MQ4Vz9En5A2-vuxO';

  return (
    <div className="pure-live-video-card" aria-label="Thailand Lottery Official Live Video">
      <div className="pure-live-video-wrapper">
        <iframe
          className="pure-live-video-iframe"
          width="560"
          height="315"
          src={videoSrc}
          title="Thailand Lottery Official Live Broadcast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="eager"
        />
      </div>
    </div>
  );
}
