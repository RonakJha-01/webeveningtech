import { useEffect, useRef, useState } from "react";

function Templates() {
  const categories = [
    {
      name: "Restaurant Websites",
      desc: "Menus, table booking, food gallery, and location-based design.",
      pdf: "/pdfs/restaurant.pdf",
    },
    {
      name: "Hotel and Rooms Websites",
      desc: "Room listings, booking system, gallery, and pricing sections.",
      pdf: "/pdfs/hotel.pdf",
    },
    {
      name: "Clothing Stores",
      desc: "Product catalog, filters, size options, and modern UI layouts.",
      pdf: "/pdfs/clothing.pdf",
    },
    {
      name: "Bakery and Chocolates Shop Websites",
      desc: "Showcase products, custom cake orders, and daily specials.",
      pdf: "/pdfs/bakery.pdf",
    },
    {
      name: "Mattress Shops",
      desc: "Comparison pages and trust-focused layouts.",
      pdf: "/pdfs/mattress.pdf",
    },
    {
      name: "Shoe Stores",
      desc: "Product grids, size filters, and category browsing.",
      pdf: "/pdfs/shoes.pdf",
    },
    {
      name: "Stationery & Book Shops",
      desc: "Catalog UI for books, stationery, and small items.",
      pdf: "/pdfs/stationery.pdf",
    },
    {
      name: "Toys & Gift Shops",
      desc: "Fun and colorful layouts for gifting businesses.",
      pdf: "/pdfs/toys.pdf",
    },
    {
      name: "Cafes",
      desc: "Minimal, aesthetic and menu-focused designs.",
      pdf: "/pdfs/cafe.pdf",
    },
    {
      name: "Other Shops",
      desc: "Flexible layouts for any small business.",
      pdf: "/pdfs/general.pdf",
    },
  ];

  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef([]);

  // Intersection Observer: reveal each card when it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.index;
            setVisibleCards((prev) => ({ ...prev, [idx]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

        .templates-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--ink);
          color: var(--paper);
          padding: 6rem 1.5rem;
          width: 100%;
          overflow-x: hidden;
        }

        .templates-layout {
          max-width: 1180px;
          margin: 0 auto;
        }

        .templates-heading-wrap {
          text-align: center;
          margin-bottom: 4.5rem;
        }

        .templates-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--paper);
          margin: 0 auto;
          position: relative;
          display: inline-block;
        }

        .templates-heading::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -0.7rem;
          height: 2px;
          width: 45%;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--orangered),
            transparent
          );
          animation: heading-glow 4s ease-in-out infinite;
        }

        @keyframes heading-glow {
          0%, 100% {
            opacity: 0.35;
            box-shadow: 0 0 8px 0 rgba(255, 69, 0, 0.3);
            width: 35%;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px 3px rgba(255, 69, 0, 0.75);
            width: 60%;
          }
        }

        .templates-subtext {
          margin-top: 1.6rem;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--muted-2);
          max-width: 52ch;
          margin-left: auto;
          margin-right: auto;
        }

        /* Two columns on desktop */
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.75rem;
        }

        @media (max-width: 720px) {
          .templates-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .templates-root {
            padding: 4.5rem 1.25rem;
          }
          .templates-heading-wrap {
            margin-bottom: 3rem;
          }
        }

        /* --- Template card --- */
        .template-card {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 2rem 1.75rem;
          background: linear-gradient(
            180deg,
            rgba(23, 20, 30, 0.92) 0%,
            rgba(12, 10, 18, 0.96) 100%
          );
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px) scale(0.94);
          filter: blur(6px);
          transition:
            opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease;
          will-change: opacity, transform, filter;
        }

        /* Pop-in state when scrolled into view */
        .template-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
          animation: card-breathe 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes card-breathe {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
            border-color: rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow: 0 0 26px 2px rgba(255, 69, 0, 0.22);
            border-color: rgba(255, 69, 0, 0.4);
          }
        }

        /* Continuous top edge glow strip */
        .template-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--orangered),
            transparent
          );
          opacity: 0.3;
          animation: card-strip 3.5s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes card-strip {
          0%, 100% {
            opacity: 0.25;
            box-shadow: 0 0 6px 0 rgba(255, 69, 0, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px 3px rgba(255, 69, 0, 0.75);
          }
        }

        /* Soft radial wash */
        .template-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 80% 0%,
            rgba(255, 69, 0, 0.12),
            transparent 60%
          );
          opacity: 0;
          pointer-events: none;
          animation: card-wash 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes card-wash {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }

        .template-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: rgba(255, 69, 0, 0.6);
        }

        .template-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--paper);
          margin: 0;
          position: relative;
          z-index: 1;
          animation: title-shift 4s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes title-shift {
          0%, 100% { color: var(--paper); }
          50%      { color: #ffb089; }
        }

        .template-card-desc {
          margin-top: 0.8rem;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--muted);
          position: relative;
          z-index: 1;
        }

        .template-card-cta-wrap {
          margin-top: 1.75rem;
          position: relative;
          z-index: 1;
        }

        .template-cta {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.7rem 1.4rem;
          border-radius: 40px;
          color: #fff;
          background: linear-gradient(
            135deg,
            var(--orangered),
            var(--crimson)
          );
          border: 1px solid var(--orangered);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
          animation: cta-glow 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes cta-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 20px 4px rgba(255, 69, 0, 0.6);
            filter: brightness(1.15);
          }
        }

        .template-cta:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #ff5c1a, #e05050);
        }

        .template-cta:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .templates-heading::after,
          .template-card,
          .template-card.is-visible,
          .template-card::before,
          .template-card::after,
          .template-card-title,
          .template-cta {
            animation: none !important;
          }
          .template-card {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section className="templates-root">
        <div className="templates-layout">

          {/* Heading */}
          <div className="templates-heading-wrap">
            <h2 className="templates-heading">
              Business Website Templates
            </h2>
            <p className="templates-subtext">
              Explore premium website designs crafted for different industries.
              Choose your business type and view ready-to-use templates.
            </p>
          </div>

          {/* Cards */}
          <div className="templates-grid">
            {categories.map((cat, index) => {
              const isVisible = visibleCards[index];
              // slight stagger inside the same row so paired cards don't pop together identically
              const delay = (index % 2) * 0.15;

              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`template-card ${isVisible ? "is-visible" : ""}`}
                  style={{ "--delay": `${delay}s` }}
                >
                  <h3 className="template-card-title">{cat.name}</h3>
                  <p className="template-card-desc">{cat.desc}</p>

                  <div className="template-card-cta-wrap">
                    <a
                      href={cat.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="template-cta"
                    >
                      Explore Templates →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

export default Templates;