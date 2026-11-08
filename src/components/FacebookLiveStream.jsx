import React from 'react';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';

/**
 * Resolves raw user input (full <iframe> HTML, YouTube URL, Facebook URL, etc.)
 * into a clean, embeddable iframe src.
 */
export function resolveEmbedUrl(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // 1. If user pasted a full <iframe src="..."> embed tag, extract src
  if (trimmed.includes('<iframe')) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return match[1];
    }
  }

  // 2. YouTube watch, live, shorts, or youtu.be link
  const ytWatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytWatch && ytWatch[1]) {
    return `https://www.youtube.com/embed/${ytWatch[1]}`;
  }

  // 3. Facebook video link
  if (trimmed.includes('facebook.com') && !trimmed.includes('facebook.com/plugins/video.php')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false&t=0`;
  }

  // 4. Default: clean URL
  return trimmed;
}

export default function FacebookLiveStream() {
  const settings = useVipCodeSettings();
  const rawEmbed = settings.liveStreamUrl;
  const parsedSrc = resolveEmbedUrl(rawEmbed);
  const defaultSrc = 'https://www.youtube.com/embed/Emnh_bS2PIo?si=MQ4Vz9En5A2-vuxO';
  const videoSrc = parsedSrc || defaultSrc;

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
