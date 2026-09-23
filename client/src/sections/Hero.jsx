import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  const buildings = [
    { width: 30, height: 92, windows: 6, lit: [1, 4] },
    { width: 44, height: 138, windows: 9, lit: [2, 5, 7] },
    { width: 26, height: 74, windows: 4, lit: [3] },
    { width: 52, height: 168, windows: 12, lit: [1, 3, 8, 10] },
    { width: 34, height: 106, windows: 6, lit: [0, 4] },
    { width: 24, height: 64, windows: 4, lit: [2] },
  ];

  // Rotating terminal messages — a nod to the "evening build" theme
  const terminalMessages = [
    {
      cmd: "npm run build",
      result: "✓ compiled in 1.4s",
    },
    {
      cmd: "npm run deploy",
      result: "✓ deployed to production",
    },
    {
      cmd: "npm test",
      result: "✓ 42 tests passed",
    },
    {
      cmd: "git push origin main",
      result: "✓ pushed 3 commits",
    },
    {
      cmd: "npm run dev",
      result: "✓ server ready on :3000",
    },
    {
      cmd: "npm run lint",
      result: "✓ no errors found",
    },
  ];

  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % terminalMessages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [terminalMessages.length]);

  // WhatsApp deep link — same as the floating button
  const phoneNumber = "919XXXXXXXXX";
  const waMessage = "Hi, I want to build a website for my business";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    waMessage
  )}`;

  // Smooth scroll to Templates section
  const scrollToTemplates = () => {
    const el =
      document.getElementById("templates") ||
      document.querySelector(".templates-root");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const copyItem = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

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

        html, body {
          width: 100%;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .hero-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--ink);
          color: var(--paper);
          padding: 6rem 1.5rem;
          width: 100%;
          min-height: 100vh;
        }

        .hero-grid-layout {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
          grid-template-areas:
            "top    visual"
            "bottom visual";
          gap: 4rem;
          align-items: center;
        }

        .hero-copy-top {
          grid-area: top;
        }

        .hero-copy-bottom {
          grid-area: bottom;
        }

        @media (max-width: 900px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            grid-template-areas:
              "top"
              "visual"
              "bottom";
            gap: 3rem;
          }
        }

        /* --- Left column --- */
        .hero-status {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.85rem;
          color: var(--muted-2);
          margin-bottom: 1.75rem;
        }

        .hero-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--orangered);
          flex-shrink: 0;
          animation: dot-pulse 2.4s ease-in-out infinite;
        }

        @keyframes dot-pulse {
          0%, 100% {
            box-shadow: 0 0 4px 0 rgba(255, 69, 0, 0.4);
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 14px 4px rgba(255, 69, 0, 0.9);
            opacity: 1;
            transform: scale(1.35);
          }
        }

        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(2.15rem, 4.2vw, 3.4rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--paper);
          margin: 0;
          max-width: 15ch;
          position: relative;
        }

        .hero-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.6rem;
          height: 2px;
          width: 45%;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--orangered), transparent);
          animation: title-underline 4s ease-in-out infinite;
        }

        @keyframes title-underline {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 0 0 6px 0 rgba(255, 69, 0, 0.25);
            width: 35%;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 18px 3px rgba(255, 69, 0, 0.7);
            width: 60%;
          }
        }

        .hero-subtext {
          margin-top: 1.9rem;
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--muted-2);
          max-width: 46ch;
          font-weight: 400;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          margin-top: 2.25rem;
        }

        .btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.8rem 1.4rem;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, border-color 0.2s ease,
            transform 0.15s ease;
        }

        .btn:active {
          transform: translateY(1px);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--orangered), var(--crimson));
          color: #fff;
          border: 1px solid var(--orangered);
          animation: btn-glow 3s ease-in-out infinite;
        }

        @keyframes btn-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 22px 5px rgba(255, 69, 0, 0.65);
            filter: brightness(1.15);
          }
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #ff5c1a, #e05050);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--paper);
          border: 1px solid var(--line);
          position: relative;
          overflow: hidden;
          animation: secondary-glow 4.5s ease-in-out infinite;
        }

        @keyframes secondary-glow {
          0%, 100% {
            border-color: var(--line);
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
          }
          50% {
            border-color: rgba(255, 69, 0, 0.5);
            box-shadow: 0 0 12px 2px rgba(255, 69, 0, 0.2);
          }
        }

        .btn-secondary:hover {
          border-color: rgba(255, 69, 0, 0.7);
        }

        .btn:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 2px;
        }

        /* --- Right column: dusk panel --- */
        .hero-panel {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #171425 0%,
            #35263c 38%,
            #6a4a4c 62%,
            #a04040 78%,
            #d96a3a 88%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: panel-glow 6s ease-in-out infinite;
        }

        @keyframes panel-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
            border-color: rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow: 0 0 40px 4px rgba(255, 69, 0, 0.22);
            border-color: rgba(255, 69, 0, 0.35);
          }
        }

        /* --- Evening clouds --- */
        .hero-clouds {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .cloud-track {
          position: absolute;
          left: 0;
          width: 200%;
          height: 120px;
          display: flex;
        }

        .cloud-track-1 { animation: drift-slow 75s linear infinite; top: 4%; }
        .cloud-track-2 { animation: drift-medium 55s linear infinite; top: 20%; }
        .cloud-track-3 { animation: drift-fast 40s linear infinite; top: 36%; }

        @keyframes drift-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes drift-medium {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes drift-fast {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .cloud {
          position: relative;
          flex: none;
          width: 50%;
          height: 100%;
        }

        .cloud::before,
        .cloud::after {
          content: "";
          position: absolute;
          border-radius: 50%;
        }

        .cloud::before {
          width: 140px;
          height: 52px;
          left: 8%;
          top: 30px;
          background: rgba(255, 190, 145, 0.55);
          filter: blur(16px);
          box-shadow:
            40px -14px 40px 6px rgba(255, 210, 175, 0.5),
            90px -6px 44px 10px rgba(240, 150, 120, 0.45),
            150px 4px 50px 12px rgba(220, 130, 110, 0.4);
        }

        .cloud::after {
          width: 180px;
          height: 60px;
          left: 42%;
          top: 22px;
          background: rgba(235, 150, 120, 0.5);
          filter: blur(20px);
          box-shadow:
            -50px 10px 44px 8px rgba(255, 195, 155, 0.45),
            60px -8px 48px 10px rgba(225, 140, 115, 0.42),
            130px 8px 52px 12px rgba(200, 115, 105, 0.38);
        }

        .cloud-track-1 .cloud::before { background: rgba(255, 205, 170, 0.5); }
        .cloud-track-1 .cloud::after  { background: rgba(245, 175, 145, 0.45); }
        .cloud-track-2 .cloud::before { background: rgba(235, 150, 140, 0.55); }
        .cloud-track-2 .cloud::after  { background: rgba(205, 120, 135, 0.5); }
        .cloud-track-3 .cloud::before { background: rgba(245, 155, 115, 0.5); }
        .cloud-track-3 .cloud::after  { background: rgba(220, 125, 105, 0.45); }

        .cloud:nth-child(1)::before { left: 4%; }
        .cloud:nth-child(1)::after  { left: 30%; }
        .cloud:nth-child(2)::before { left: 12%; top: 40px; }
        .cloud:nth-child(2)::after  { left: 50%; top: 32px; }

        .cloud-track-1 .cloud { animation: float 9s ease-in-out infinite; }
        .cloud-track-2 .cloud { animation: float 11s ease-in-out infinite reverse; }
        .cloud-track-3 .cloud { animation: float 8s ease-in-out infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }

        .hero-sun {
          position: absolute;
          left: 50%;
          top: 58%;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffd0b0, #ff4500 70%);
          transform: translate(-50%, -50%);
          animation: sun-blink 4s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes sun-blink {
          0%, 100% {
            box-shadow: 0 0 30px 4px rgba(255, 69, 0, 0.35);
            filter: brightness(0.95);
          }
          50% {
            box-shadow: 0 0 65px 16px rgba(255, 69, 0, 0.8);
            filter: brightness(1.25);
          }
        }

        .hero-skyline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 46%;
          display: flex;
          align-items: flex-end;
          gap: 5px;
          padding: 0 1rem;
          z-index: 3;
        }

        .building {
          flex: none;
          background: #0a0810;
          border-top: 1px solid rgba(0, 0, 0, 0.4);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 5px;
          padding: 6px;
          align-content: start;
        }

        .window {
          width: 100%;
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.045);
          border-radius: 1px;
          animation: window-shimmer 6s ease-in-out infinite;
        }

        @keyframes window-shimmer {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }

        .window.lit {
          background: #ff6a3a;
          animation: window-glow 3.5s ease-in-out infinite;
        }

        @keyframes window-glow {
          0%, 100% {
            box-shadow: 0 0 3px 0 rgba(255, 69, 0, 0.5);
            opacity: 0.85;
          }
          50% {
            box-shadow: 0 0 10px 3px rgba(255, 69, 0, 0.95);
            opacity: 1;
          }
        }

        .window:nth-child(odd)  { animation-delay: 0s; }
        .window:nth-child(even) { animation-delay: 1.2s; }

        .hero-terminal {
          position: absolute;
          left: 1.25rem;
          bottom: 1.25rem;
          right: 1.25rem;
          max-width: 240px;
          background: #0c0a12;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 0.7rem 0.85rem;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.78rem;
          line-height: 1.6;
          color: #d8d4e6;
          z-index: 4;
          animation: terminal-glow 5s ease-in-out infinite;
        }

        @keyframes terminal-glow {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.12);
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
          }
          50% {
            border-color: rgba(255, 69, 0, 0.6);
            box-shadow: 0 0 16px 2px rgba(255, 69, 0, 0.25);
          }
        }

        .hero-terminal .ok {
          color: #a3d9a5;
        }

        .hero-terminal .prompt {
          color: var(--orangered);
          animation: prompt-blink 2s steps(2, start) infinite;
        }

        @keyframes prompt-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        /* Message swap animation — old fades/slides out, new fades/slides in */
        .terminal-line {
          display: block;
          animation: msg-swap 3.2s ease-in-out infinite;
        }

        @keyframes msg-swap {
          0%, 4% {
            opacity: 0;
            transform: translateY(6px);
          }
          8%, 88% {
            opacity: 1;
            transform: translateY(0);
          }
          92%, 100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }

        /* ============ MOBILE POLISH ============ */
        @media (max-width: 640px) {
          .hero-root {
            padding: 5rem 1.15rem 4rem;
            min-height: auto;
          }

          .hero-grid-layout {
            gap: 2.25rem;
          }

          .hero-status {
            font-size: 0.78rem;
            margin-bottom: 1.35rem;
          }

          .hero-title {
            font-size: clamp(1.85rem, 8vw, 2.4rem);
            max-width: 100%;
            line-height: 1.18;
          }

          .hero-title::after {
            bottom: -0.5rem;
            height: 1.5px;
          }

          .hero-subtext {
            margin-top: 1.55rem;
            font-size: 0.98rem;
            line-height: 1.6;
            max-width: 100%;
          }

          .hero-ctas {
            margin-top: 1.75rem;
            gap: 0.7rem;
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            width: 100%;
            padding: 0.9rem 1.2rem;
            font-size: 0.95rem;
          }

          .hero-panel {
            aspect-ratio: 5 / 4;
            border-radius: 16px;
          }

          .hero-sun {
            left: auto;
            right: 12%;
            top: 62%;
            width: 52px;
            height: 52px;
            transform: translateY(-50%);
            background: radial-gradient(circle at 35% 30%, #ffd0b0, #ff4500 70%);
          }

          .cloud::before { width: 100px; height: 40px; filter: blur(12px); }
          .cloud::after  { width: 130px; height: 46px; filter: blur(15px); }
          .cloud-track { height: 90px; }

          /* Smaller terminal on phones */
          .hero-terminal {
            left: 0.75rem;
            bottom: 0.75rem;
            right: auto;
            max-width: 180px;
            padding: 0.5rem 0.65rem;
            font-size: 0.62rem;
            line-height: 1.5;
            border-radius: 6px;
          }
        }

        @media (max-width: 380px) {
          .hero-title {
            font-size: 1.7rem;
          }
          .hero-subtext {
            font-size: 0.92rem;
          }
          .hero-terminal {
            max-width: 155px;
            font-size: 0.56rem;
            padding: 0.45rem 0.55rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-sun,
          .cloud-track-1,
          .cloud-track-2,
          .cloud-track-3,
          .cloud,
          .hero-status-dot,
          .btn-primary,
          .btn-secondary,
          .hero-panel,
          .hero-title::after,
          .window,
          .window.lit,
          .hero-terminal,
          .hero-terminal .prompt,
          .terminal-line {
            animation: none !important;
          }
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-grid-layout">
          <motion.div
            className="hero-copy-top"
            variants={copyContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-status" variants={copyItem}>
              <span className="hero-status-dot"></span>
              Taking on new projects this quarter
            </motion.div>

            <motion.h1 className="hero-title" variants={copyItem}>
              We build the web app your business runs on.
            </motion.h1>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-clouds" aria-hidden="true">
              <div className="cloud-track cloud-track-1">
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
              <div className="cloud-track cloud-track-2">
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
              <div className="cloud-track cloud-track-3">
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
            </div>

            <motion.div
              className="hero-sun"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="hero-skyline">
              {buildings.map((b, i) => (
                <div
                  key={i}
                  className="building"
                  style={{ width: b.width, height: b.height }}
                >
                  {Array.from({ length: b.windows }).map((_, w) => (
                    <div
                      key={w}
                      className={`window ${b.lit.includes(w) ? "lit" : ""}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            <div className="hero-terminal">
              <div key={msgIndex} className="terminal-line">
                <div>
                  <span className="prompt">$</span>{" "}
                  {terminalMessages[msgIndex].cmd}
                </div>
                <div className="ok">
                  {terminalMessages[msgIndex].result}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-copy-bottom"
            variants={copyContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="hero-subtext" variants={copyItem}>
              Web Evening Tech designs, builds, and ships MERN-stack
              products end to end — from the first commit to the release
              your customers actually use.
            </motion.p>

            <motion.div className="hero-ctas" variants={copyItem}>
              {/* Start a project → opens WhatsApp with prefilled message */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Start a project
              </a>

              {/* View Templates → smooth scroll to Templates section */}
              <button
                type="button"
                onClick={scrollToTemplates}
                className="btn btn-secondary"
              >
                View Templates
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Hero;
