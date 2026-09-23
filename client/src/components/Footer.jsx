import { useEffect, useRef, useState } from "react";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  // Scroll-triggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const columns = [
    {
      title: "Company",
      links: ["Home", "Services", "Templates", "Contact"],
    },
    {
      title: "Services",
      links: [
        "Web Development",
        "UI/UX Design",
        "SEO Optimization",
        "Maintenance",
      ],
    },
    {
      title: "Business Types",
      links: [
        "Restaurant",
        "Hotel",
        "Clothes Shop",
        "Bakery",
        "Mattress Shop",
        "Shoes Shop",
        "Stationery & Books Shop",
        "Toys & Gift Shop",
        "Cafe",
        "Other Ordinary Shops",
      ],
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

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .footer-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          background: var(--ink);
          color: var(--paper);
          padding: 3.5rem 1.5rem 1.5rem;
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--line);
        }

        /* Continuous moving orangered beam along the top edge */
        .footer-root::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--orangered) 50%,
            transparent 100%
          );
          background-size: 50% 100%;
          background-repeat: no-repeat;
          animation: beam 6s linear infinite;
          pointer-events: none;
        }

        @keyframes beam {
          0%   { background-position: -50% 0; }
          100% { background-position: 150% 0; }
        }

        /* Soft ambient orangered glow behind the footer */
        .footer-root::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 900px;
          height: 200px;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 69, 0, 0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
          animation: ambient 8s ease-in-out infinite;
        }

        @keyframes ambient {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }

        .footer-layout {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* --- Reveal wrapper --- */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 3rem;
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          filter: blur(4px);
          transition:
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-grid.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.25rem;
          }
        }

        @media (max-width: 560px) {
          .footer-root {
            padding: 3rem 1.25rem 1.25rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        /* --- Brand block --- */
        .footer-brand {
          max-width: 34ch;
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #ffb089 40%,
            #ff4500 75%,
            #d64545 100%
          );
          background-size: 220% 220%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
          animation: logo-shift 6s ease infinite,
                     logo-blink 4s ease-in-out infinite;
        }

        @keyframes logo-shift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        @keyframes logo-blink {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 69, 0, 0.35)); }
          50%      { filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.8)); }
        }

        .footer-tagline {
          margin-top: 1rem;
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--muted-2);
        }

        /* --- Link columns --- */
        .footer-col-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--paper);
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
          padding-bottom: 0.45rem;
        }

        .footer-col-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 60%;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--orangered), transparent);
          animation: col-underline 4s ease-in-out infinite;
        }

        @keyframes col-underline {
          0%, 100% {
            opacity: 0.35;
            width: 30%;
            box-shadow: 0 0 6px 0 rgba(255, 69, 0, 0.25);
          }
          50% {
            opacity: 1;
            width: 60%;
            box-shadow: 0 0 12px 2px rgba(255, 69, 0, 0.7);
          }
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer-links a {
          display: inline-block;
          font-size: 0.9rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
          position: relative;
          padding-left: 0;
        }

        .footer-links a::before {
          content: "→";
          position: absolute;
          left: -18px;
          opacity: 0;
          color: var(--orangered);
          transition: opacity 0.25s ease, left 0.25s ease;
        }

        .footer-links a:hover {
          color: var(--paper);
          transform: translateX(6px);
        }

        .footer-links a:hover::before {
          opacity: 1;
          left: -14px;
        }

        /* --- Bottom bar --- */
        .footer-bottom {
          margin-top: 2.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          text-align: center;
        }

        .footer-copyright {
          font-size: 0.82rem;
          color: var(--muted-2);
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-root::before,
          .footer-root::after,
          .footer-logo,
          .footer-col-title::after {
            animation: none !important;
          }
          .footer-grid {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-layout">
          <div
            ref={footerRef}
            className={`footer-grid ${isVisible ? "is-visible" : ""}`}
          >
            {/* Brand block */}
            <div className="footer-brand">
              <span className="footer-logo">Web Evening Tech</span>
              <p className="footer-tagline">
                We design, build, and ship MERN-stack products for local
                businesses — from the first commit to launch day.
              </p>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="footer-col-title">{col.title}</h3>
                <ul className="footer-links">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar — copyright only */}
          <div className="footer-bottom">
            <span className="footer-copyright">
              © {new Date().getFullYear()} Web Evening Tech. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;