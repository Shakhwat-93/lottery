import React, { useState } from 'react';

export default function FloatingContactButtons() {
  const [showImoModal, setShowImoModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const phoneNumber = '+8801309802224';
  const cleanPhone = '8801309802224';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি থাইল্যান্ড অফিশিয়াল লটারি (GLO) সম্পর্কে জানতে চাই।')}`;
  const imoAppUrl = `imo://chat?phone=${cleanPhone}`;
  const telUrl = `tel:${phoneNumber}`;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback copy
      const el = document.createElement('textarea');
      el.value = phoneNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleImoClick = (e) => {
    // If mobile, try opening app protocol; also show helper modal
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = imoAppUrl;
      // Show modal in case app is not installed
      setTimeout(() => {
        setShowImoModal(true);
      }, 500);
    } else {
      setShowImoModal(true);
    }
  };

  return (
    <>
      {/* Floating Action Buttons Container */}
      <aside className="floating-contact-container" aria-label="Customer Support Floating Shortcuts">
        {/* IMO Floating Button */}
        <div className="floating-contact-item">
          <button
            type="button"
            className="floating-btn floating-btn-imo"
            onClick={handleImoClick}
            aria-label="Contact on IMO: +8801309802224"
            title="IMO: +8801309802224"
          >
            <span className="floating-radar-wave wave-imo" aria-hidden="true" />
            <span className="floating-online-dot" aria-hidden="true" />
            
            {/* Official IMO Logo / Wordmark */}
            <span className="floating-imo-wordmark" aria-hidden="true">imo</span>
            <span className="floating-btn-label">IMO</span>
          </button>
        </div>

        {/* WhatsApp Floating Button */}
        <div className="floating-contact-item">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn floating-btn-wa"
            aria-label="Chat on WhatsApp: +8801309802224"
            title="WhatsApp: +8801309802224"
          >
            <span className="floating-radar-wave wave-wa" aria-hidden="true" />
            <span className="floating-online-dot" aria-hidden="true" />

            {/* Official WhatsApp Logo Icon */}
            <svg
              className="floating-btn-svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.61.737 5.05 2.012 7.127L2.83 28.77a.75.75 0 0 0 .937.938l5.807-1.688A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.5a10.93 10.93 0 0 1-5.408-1.428.75.75 0 0 0-.583-.065l-4.148 1.206 1.206-4.148a.75.75 0 0 0-.065-.583A10.93 10.93 0 0 1 5.08 16C5.08 9.97 9.97 5.08 16 5.08S26.92 9.97 26.92 16 22.03 27 16 27zm6.368-7.973c-.349-.175-2.065-1.018-2.385-1.135-.32-.116-.553-.175-.785.175-.233.35-.902 1.135-1.106 1.368-.204.233-.407.262-.756.087-.35-.175-1.474-.544-2.808-1.733-1.039-.926-1.741-2.07-1.945-2.42-.204-.35-.022-.538.153-.712.158-.157.35-.368.524-.553.175-.184.233-.314.35-.524.116-.21.058-.393-.03-.568-.087-.175-.785-1.892-1.077-2.592-.284-.68-.574-.588-.785-.598-.204-.01-.437-.012-.67-.012-.233 0-.612.087-.932.437-.32.35-1.223 1.194-1.223 2.912s1.252 3.378 1.427 3.61c.175.234 2.464 3.762 5.968 5.275.833.36 1.484.576 1.99.737.837.266 1.599.228 2.202.138.672-.1 2.065-.844 2.356-1.66.292-.816.292-1.515.204-1.66-.087-.146-.32-.233-.67-.408z" />
            </svg>
            <span className="floating-btn-label">WhatsApp</span>
          </a>
        </div>
      </aside>

      {/* IMO Quick Helper Modal */}
      {showImoModal && (
        <div
          className="imo-modal-backdrop"
          onClick={() => setShowImoModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="IMO Customer Support"
        >
          <div
            className="imo-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="imo-modal-header">
              <div className="imo-modal-title">
                <span className="imo-badge-icon" aria-hidden="true">💬</span>
                <div>
                  <strong>IMO OFFICIAL SUPPORT</strong>
                  <span>থাইল্যান্ড লটারি কাস্টমার সার্ভিস</span>
                </div>
              </div>
              <button
                type="button"
                className="imo-modal-close"
                onClick={() => setShowImoModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="imo-modal-body">
              <div className="imo-number-display">
                <span className="imo-number-label">IMO Number:</span>
                <span className="imo-number-val">{phoneNumber}</span>
              </div>

              <div className="imo-actions-grid">
                <a
                  href={imoAppUrl}
                  className="imo-action-btn imo-primary-action"
                >
                  <span aria-hidden="true">💬</span>
                  <span>IMO অ্যাপ ওপেন করুন</span>
                </a>

                <a
                  href={telUrl}
                  className="imo-action-btn imo-call-action"
                >
                  <span aria-hidden="true">📞</span>
                  <span>সরাসরি কল দিন</span>
                </a>

                <button
                  type="button"
                  className={`imo-action-btn imo-copy-action ${copied ? 'is-copied' : ''}`}
                  onClick={handleCopy}
                >
                  <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
                  <span>{copied ? 'নম্বর কপি হয়েছে!' : 'নম্বর কপি করুন'}</span>
                </button>
              </div>
            </div>

            <div className="imo-modal-footer">
              <span className="imo-footer-status-dot" aria-hidden="true" />
              <span>24/7 ইমো ও হোয়াটসঅ্যাপ সাপোর্ট একটিভ রয়েছে</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
