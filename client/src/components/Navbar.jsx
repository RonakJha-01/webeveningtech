import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Nav links with matching section IDs
  const navLinks = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Templates", target: "templates" },
    /*{ label: "Contact", target: "contact" },*/
  ];

  // Smooth scroll to the section, accounting for the fixed navbar height
  const scrollToSection = (id) => {
    const el =
      document.getElementById(id) ||
      document.querySelector(`.${id}-root`);
    if (!el) return;

    // Offset by the navbar height so the heading isn't hidden underneath
    const navHeight =
      document.querySelector(".nav-bar")?.offsetHeight ?? 64;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

    window.scrollTo({ top, behavior: "smooth" });

    // Close the mobile menu after navigation
    setIsOpen(false);
  };

  return (
    <>
      {/* Inject custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');

        .nav-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --orangered: #ff4500;
          --orangered-soft: rgba(255, 69, 0, 0.55);
          --crimson: #d64545;
        }

        /* Global smooth scroll fallback for anchor jumps */
        html {
          scroll-behavior: smooth;
          /* Ensures anchor targets aren't hidden behind the fixed navbar */
          scroll-padding-top: 80px;
        }

        /* Navbar base */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.4s cubic-bezier(0.2, 0.9, 0.4, 1),
                      border-color 0.4s cubic-bezier(0.2, 0.9, 0.4, 1),
                      box-shadow 0.4s cubic-bezier(0.2, 0.9, 0.4, 1);
        }

        .nav-bar.scrolled {
          background: rgba(6, 6, 12, 0.92);
          border-bottom: 1px solid rgba(255, 69, 0, 0.18);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                      0 0 24px rgba(255, 69, 0, 0.08);
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo — orangered gradient with continuous glow blink */
        .nav-logo {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.6rem;
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
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.4s ease, filter 0.4s ease;
          animation: logo-shift 6s ease infinite,
                     logo-blink 4s ease-in-out infinite;
          background-color: transparent;
          border: none;
          padding: 0;
          text-align: left;
        }

        @keyframes logo-shift {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        @keyframes logo-blink {
          0%, 100% {
            filter: drop-shadow(0 0 6px rgba(255, 69, 0, 0.35));
          }
          50% {
            filter: drop-shadow(0 0 22px rgba(255, 69, 0, 0.85));
          }
        }

        .nav-logo:hover {
          transform: scale(1.03);
          filter: drop-shadow(0 0 26px rgba(255, 69, 0, 0.9));
        }

        .nav-logo:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 4px;
          border-radius: 6px;
        }

        /* Desktop menu */
        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Links styled as buttons for clickability + focus */
        .desktop-menu button {
          position: relative;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          padding: 0.4rem 0;
          letter-spacing: 0.01em;
          background: transparent;
          border: none;
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .desktop-menu button::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            #ff4500,
            #ff8c42,
            #ff4500
          );
          background-size: 200% 100%;
          border-radius: 4px;
          transition: width 0.35s cubic-bezier(0.2, 0.9, 0.4, 1);
        }

        .desktop-menu button:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .desktop-menu button:hover::after {
          width: 100%;
          animation: shimmer 1.5s linear infinite;
        }

        .desktop-menu button:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 4px;
          border-radius: 4px;
        }

        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* Animated hamburger */
        .hamburger {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          position: relative;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
          animation: hamburger-glow 4s ease-in-out infinite;
        }

        @keyframes hamburger-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
          }
          50% {
            box-shadow: 0 0 14px 2px rgba(255, 69, 0, 0.35);
          }
        }

        .hamburger:hover {
          background: rgba(255, 69, 0, 0.12);
          border-color: rgba(255, 69, 0, 0.45);
        }

        .hamburger:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 3px;
        }

        .hamburger span {
          position: absolute;
          left: 50%;
          width: 20px;
          height: 2px;
          background: #ffffff;
          border-radius: 2px;
          transform: translateX(-50%);
          transition: all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1);
        }

        .hamburger span:nth-child(1) { top: 14px; }
        .hamburger span:nth-child(2) { top: 21px; }
        .hamburger span:nth-child(3) { top: 28px; }

        .hamburger.open span:nth-child(1) {
          top: 21px;
          transform: translateX(-50%) rotate(45deg);
          background: var(--orangered);
          box-shadow: 0 0 10px 2px rgba(255, 69, 0, 0.7);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: translateX(-50%) scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          top: 21px;
          transform: translateX(-50%) rotate(-45deg);
          background: var(--orangered);
          box-shadow: 0 0 10px 2px rgba(255, 69, 0, 0.7);
        }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          max-height: 0;
          opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.2, 0.9, 0.4, 1),
                      opacity 0.3s ease,
                      padding 0.3s ease;
        }

        .mobile-menu.open {
          max-height: 500px;
          opacity: 1;
          padding: 1.2rem 1.5rem 1.8rem;
        }

        .mobile-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mobile-menu button {
          width: 100%;
          text-align: left;
          font-family: inherit;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
          font-weight: 500;
          padding: 0.85rem 0.5rem;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: transparent;
          cursor: pointer;
          transform: translateX(-20px);
          opacity: 0;
          transition: color 0.25s, padding-left 0.25s,
                      transform 0.4s ease, opacity 0.4s ease,
                      border-color 0.25s;
        }

        .mobile-menu.open button {
          transform: translateX(0);
          opacity: 1;
        }

        /* Staggered animation delays */
        .mobile-menu.open li:nth-child(1) button { transition-delay: 0.05s; }
        .mobile-menu.open li:nth-child(2) button { transition-delay: 0.1s; }
        .mobile-menu.open li:nth-child(3) button { transition-delay: 0.15s; }
        .mobile-menu.open li:nth-child(4) button { transition-delay: 0.2s; }

        .mobile-menu button:hover {
          color: var(--orangered);
          padding-left: 12px;
          border-bottom-color: rgba(255, 69, 0, 0.25);
        }

        .mobile-menu button:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: -2px;
          border-radius: 6px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0.85rem 1.25rem;
          }
          .nav-logo {
            font-size: 1.35rem;
          }
          .desktop-menu {
            display: none;
          }
          .hamburger {
            display: block;
          }
          .mobile-menu {
            display: block;
          }
        }

        @media (max-width: 420px) {
          .nav-logo {
            font-size: 1.15rem;
          }
          .hamburger {
            width: 40px;
            height: 40px;
          }
          .hamburger span:nth-child(1) { top: 13px; }
          .hamburger span:nth-child(2) { top: 19px; }
          .hamburger span:nth-child(3) { top: 25px; }
          .hamburger.open span:nth-child(1),
          .hamburger.open span:nth-child(3) { top: 19px; }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .nav-logo,
          .hamburger {
            animation: none !important;
          }
          .desktop-menu button:hover::after {
            animation: none !important;
          }
        }
      `}</style>

      <nav className={`nav-root nav-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo — clicking it scrolls back to Home */}
          <button
            className="nav-logo"
            onClick={() => scrollToSection("home")}
            aria-label="Web Evening Tech — go to top"
          >
            Web Evening Tech
          </button>

          {/* Desktop Menu */}
          <ul className="desktop-menu">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Animated Hamburger */}
          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;