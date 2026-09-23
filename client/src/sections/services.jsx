function Services() {
  const services = [
    {
      title: "Web development",
      desc: "MERN-stack sites and web apps built to handle real traffic, not just a demo.",
    },
    {
      title: "UI/UX design",
      desc: "Interfaces people can actually use, designed around how customers browse and buy.",
    },
    {
      title: "SEO optimization",
      desc: "Technical and on-page SEO so the site we built for you actually gets found.",
    },
    {
      title: "Maintenance",
      desc: "Bug fixes, dependency updates, and performance checks after launch.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        :root {
          --ink: #0d0f16;
          --paper: #f2eee4;
          --muted: #9398a8;
          --muted-2: #8b8ea1;
          --line: rgba(255, 255, 255, 0.1);
          --crimson: #d64545;
          --ember: #e06c3a;
          --orangered: #ff4500;
        }

        .services-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--ink);
          color: var(--paper);
          padding: 6rem 1.5rem;
        }

        .services-layout {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
          gap: 4rem;
          align-items: start;
        }

        .services-intro {
          position: sticky;
          top: 6rem;
        }

        .services-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(1.9rem, 3vw, 2.5rem);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--paper);
          margin: 0;
          max-width: 12ch;
          position: relative;
          display: inline-block;
        }

        /* Soft pulsing underline glow under the heading — all screens */
        .services-heading::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.5rem;
          height: 2px;
          width: 60%;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--orangered), transparent);
          animation: heading-glow 3.5s ease-in-out infinite;
        }

        @keyframes heading-glow {
          0%, 100% {
            opacity: 0.35;
            box-shadow: 0 0 6px 0 rgba(255, 69, 0, 0.3);
            width: 40%;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px 2px rgba(255, 69, 0, 0.7);
            width: 65%;
          }
        }

        .services-subtext {
          margin-top: 1.4rem;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--muted-2);
          max-width: 34ch;
        }

        .services-list {
          border-top: 1px solid var(--line);
        }

        .service-row {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 1.5rem;
          align-items: start;
          padding: 1.75rem 0;
          border-bottom: 1px solid var(--line);
          cursor: default;
          transition: transform 0.3s ease;
        }

        /* Subtle continuous left-edge glow strip — visible on all screens */
        .service-row::before {
          content: "";
          position: absolute;
          left: -1.5rem;
          top: 12%;
          bottom: 12%;
          width: 3px;
          border-radius: 3px;
          background: linear-gradient(
            180deg,
            transparent,
            var(--orangered),
            transparent
          );
          opacity: 0.25;
          animation: row-strip 3s ease-in-out infinite;
        }

        @keyframes row-strip {
          0%, 100% {
            opacity: 0.2;
            box-shadow: 0 0 6px 0 rgba(255, 69, 0, 0.25);
          }
          50% {
            opacity: 0.85;
            box-shadow: 0 0 14px 3px rgba(255, 69, 0, 0.65);
          }
        }

        /* Stagger each row's blink so they breathe independently */
        .service-row:nth-child(1)::before { animation-delay: 0s; }
        .service-row:nth-child(2)::before { animation-delay: 0.6s; }
        .service-row:nth-child(3)::before { animation-delay: 1.2s; }
        .service-row:nth-child(4)::before { animation-delay: 1.8s; }

        /* Continuous soft background wash that pulses */
        .service-row::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 69, 0, 0.06),
            transparent 65%
          );
          opacity: 0;
          pointer-events: none;
          animation: row-wash 4s ease-in-out infinite;
        }

        .service-row:nth-child(1)::after { animation-delay: 0s; }
        .service-row:nth-child(2)::after { animation-delay: 0.6s; }
        .service-row:nth-child(3)::after { animation-delay: 1.2s; }
        .service-row:nth-child(4)::after { animation-delay: 1.8s; }

        @keyframes row-wash {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }

        .service-window {
          margin-top: 0.3rem;
          width: 22px;
          height: 22px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
          flex-shrink: 0;
          z-index: 1;
        }

        /* Windows continuously blink orangered — no hover needed */
        .service-window span {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 1px;
          animation: window-blink 3s ease-in-out infinite;
        }

        @keyframes window-blink {
          0%, 100% {
            background: rgba(255, 69, 0, 0.15);
            box-shadow: 0 0 2px 0 rgba(255, 69, 0, 0.2);
          }
          50% {
            background: #ff4500;
            box-shadow: 0 0 8px 2px rgba(255, 69, 0, 0.85);
          }
        }

        /* Staggered delays per window pane for a "flicker" feel */
        .service-window span:nth-child(1) { animation-delay: 0s; }
        .service-window span:nth-child(2) { animation-delay: 0.25s; }
        .service-window span:nth-child(3) { animation-delay: 0.5s; }
        .service-window span:nth-child(4) { animation-delay: 0.75s; }

        .service-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1.2rem;
          color: var(--paper);
          margin: 0;
          z-index: 1;
          position: relative;
          animation: title-pulse 4s ease-in-out infinite;
        }

        @keyframes title-pulse {
          0%, 100% { color: var(--paper); }
          50%      { color: #ffb089; }
        }

        .service-row:nth-child(1) .service-title { animation-delay: 0s; }
        .service-row:nth-child(2) .service-title { animation-delay: 0.6s; }
        .service-row:nth-child(3) .service-title { animation-delay: 1.2s; }
        .service-row:nth-child(4) .service-title { animation-delay: 1.8s; }

        .service-desc {
          margin-top: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
          max-width: 46ch;
          z-index: 1;
          position: relative;
        }

        /* Gentle hover lift kept for desktop without removing continuous anim */
        .service-row:hover {
          transform: translateX(4px);
        }

        @media (max-width: 800px) {
          .services-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .services-intro {
            position: static;
          }
          .service-row::before {
            left: -1rem;
          }
        }

        @media (max-width: 640px) {
          .services-root {
            padding: 4.5rem 1.25rem;
          }
          .service-row {
            grid-template-columns: auto 1fr;
            gap: 1rem;
          }
          .service-row::before {
            left: -0.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-heading::after,
          .service-row::before,
          .service-row::after,
          .service-window span,
          .service-title {
            animation: none !important;
          }
          .service-row {
            transition: none !important;
          }
        }
      `}</style>

      <section className="services-root">
        <div className="services-layout">
          <div className="services-intro">
            <h2 className="services-heading">What we do</h2>
            <p className="services-subtext">
              Four services, one team — from writing the code to keeping
              it running after launch.
            </p>
          </div>

          <div className="services-list">
            {services.map((service, index) => (
              <div className="service-row" tabIndex={0} key={index}>
                <div className="service-window">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;