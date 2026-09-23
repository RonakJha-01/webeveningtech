function WhatsAppButton() {
  const phoneNumber = "919408715355";
  const message = "Hi, I want to build a website for my business";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap');

        /* Fixed wrapper — stays glued to bottom-right on all scroll positions */
        .wa-fab {
          position: fixed;
          right: 1.25rem;
          bottom: 1.5rem;
          z-index: 9999;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          /* Ensures it survives backdrop-filter layers on other components */
          isolation: isolate;
        }

        .wa-fab-inner {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 1.05rem;
          border-radius: 999px;
          color: #fff;
          background: linear-gradient(135deg, #25d366, #128c7e);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.35),
            0 0 0 0 rgba(37, 211, 102, 0);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1),
                      box-shadow 0.25s ease,
                      background 0.25s ease;
          animation: wa-float 4s ease-in-out infinite,
                     wa-glow 3s ease-in-out infinite;
        }

        /* Gentle vertical bob so the button feels alive */
        @keyframes wa-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }

        /* Continuous pulsing green glow — all screens, no hover needed */
        @keyframes wa-glow {
          0%, 100% {
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.35),
              0 0 0 0 rgba(37, 211, 102, 0.55);
          }
          50% {
            box-shadow:
              0 10px 28px rgba(0, 0, 0, 0.4),
              0 0 22px 6px rgba(37, 211, 102, 0.55);
          }
        }

        /* Expanding ring halo behind the button */
        .wa-fab-inner::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(37, 211, 102, 0.35) 0%,
            transparent 70%
          );
          animation: wa-halo 2.6s ease-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes wa-halo {
          0% {
            opacity: 0.75;
            transform: scale(0.9);
          }
          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }

        /* Icon subtle wiggle */
        .wa-fab-icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: wa-wiggle 3.5s ease-in-out infinite;
        }

        @keyframes wa-wiggle {
          0%, 100% { transform: rotate(0deg); }
          10%      { transform: rotate(-12deg); }
          20%      { transform: rotate(10deg); }
          30%      { transform: rotate(-8deg); }
          40%      { transform: rotate(6deg); }
          50%, 100% { transform: rotate(0deg); }
        }

        /* Label — hidden on mobile, shown from sm breakpoint */
        .wa-fab-label {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .wa-fab {
            right: 1rem;
            bottom: 1rem;
          }
          .wa-fab-label {
            display: none;
          }
          .wa-fab-inner {
            padding: 0.85rem;
            border-radius: 50%;
          }
        }

        .wa-fab-inner:hover {
          transform: translateY(-6px) scale(1.04);
          background: linear-gradient(135deg, #2ee878, #0f7a6d);
          box-shadow:
            0 14px 34px rgba(0, 0, 0, 0.45),
            0 0 28px 8px rgba(37, 211, 102, 0.6);
          animation-play-state: paused, paused;
        }

        .wa-fab-inner:active {
          transform: translateY(-2px) scale(0.98);
        }

        .wa-fab-inner:focus-visible {
          outline: 2px solid #25d366;
          outline-offset: 4px;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .wa-fab-inner,
          .wa-fab-inner::before,
          .wa-fab-icon {
            animation: none !important;
          }
        }
      `}</style>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="wa-fab-inner">
          <span className="wa-fab-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.854 7.854 0 0 0 8.016 0C3.58 0 .002 3.58.002 8.016c0 1.414.37 2.795 1.073 4.013L0 16l4.094-1.064a7.987 7.987 0 0 0 3.922 1.006h.003c4.437 0 8.015-3.58 8.015-8.016a7.94 7.94 0 0 0-2.433-5.6zM8.019 14.5a6.45 6.45 0 0 1-3.285-.9l-.235-.14-2.43.633.65-2.37-.153-.243a6.45 6.45 0 1 1 5.453 2.98zm3.606-4.842c-.197-.099-1.17-.577-1.352-.643-.182-.066-.314-.099-.446.099-.132.197-.512.643-.628.776-.116.132-.231.148-.428.05-.197-.099-.832-.306-1.586-.975-.586-.522-.982-1.166-1.097-1.364-.116-.198-.012-.305.087-.404.089-.089.197-.231.296-.347.099-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.446-1.074-.611-1.471-.161-.387-.324-.334-.446-.34l-.38-.007c-.132 0-.347.05-.528.248-.182.197-.694.678-.694 1.652 0 .975.711 1.917.81 2.05.099.132 1.398 2.136 3.386 2.996.473.204.842.326 1.129.417.474.151.906.13 1.248.079.38-.056 1.17-.479 1.336-.941.165-.462.165-.859.116-.941-.05-.083-.182-.132-.38-.231z" />
            </svg>
          </span>

          <span className="wa-fab-label">Chat with us</span>
        </div>
      </a>
    </>
  );
}

export default WhatsAppButton;