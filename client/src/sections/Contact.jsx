import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll-triggered reveal for the form block
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
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong!");
    }
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

        .contact-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--ink);
          color: var(--paper);
          padding: 6rem 1.5rem;
          width: 100%;
          overflow-x: hidden;
        }

        .contact-layout {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-heading {
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

        /* Continuous pulsing underline glow — matching Templates section */
        .contact-heading::after {
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

        .contact-subtext {
          margin-top: 1.6rem;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--muted-2);
          max-width: 46ch;
          margin-left: auto;
          margin-right: auto;
        }

        /* --- Form --- */
        .contact-form {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          filter: blur(6px);
          transition:
            opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-form.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: var(--paper);
          background: linear-gradient(
            180deg,
            rgba(23, 20, 30, 0.9) 0%,
            rgba(12, 10, 18, 0.95) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1rem 1.15rem;
          outline: none;
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.25s ease;
          animation: input-glow 5s ease-in-out infinite;
        }

        /* Stagger the input glow so fields breathe independently */
        .contact-input:nth-child(1) { animation-delay: 0s; }
        .contact-input:nth-child(2) { animation-delay: 0.5s; }
        .contact-input:nth-child(3) { animation-delay: 1s; }
        .contact-textarea          { animation-delay: 1.5s; }

        @keyframes input-glow {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
          }
          50% {
            border-color: rgba(255, 69, 0, 0.35);
            box-shadow: 0 0 14px 1px rgba(255, 69, 0, 0.15);
          }
        }

        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: var(--muted-2);
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: var(--orangered);
          box-shadow: 0 0 22px 3px rgba(255, 69, 0, 0.35);
          transform: translateY(-1px);
          animation-play-state: paused;
        }

        .contact-textarea {
          height: 9rem;
          resize: vertical;
          line-height: 1.6;
        }

        /* --- Submit button --- */
        .contact-submit {
          align-self: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.85rem 2rem;
          margin-top: 0.75rem;
          border-radius: 40px;
          color: #fff;
          background: linear-gradient(
            135deg,
            var(--orangered),
            var(--crimson)
          );
          border: 1px solid var(--orangered);
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
          animation: btn-glow 3s ease-in-out infinite;
        }

        @keyframes btn-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 24px 5px rgba(255, 69, 0, 0.65);
            filter: brightness(1.15);
          }
        }

        .contact-submit:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #ff5c1a, #e05050);
        }

        .contact-submit:active {
          transform: translateY(0) scale(0.98);
        }

        .contact-submit:focus-visible {
          outline: 2px solid var(--orangered);
          outline-offset: 3px;
        }

        @media (max-width: 640px) {
          .contact-root {
            padding: 4.5rem 1.25rem;
          }
          .contact-form {
            margin-top: 2.5rem;
          }
          .contact-input,
          .contact-textarea {
            padding: 0.9rem 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-heading::after,
          .contact-input,
          .contact-textarea,
          .contact-submit {
            animation: none !important;
          }
          .contact-form {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
          .contact-input:focus,
          .contact-textarea:focus {
            transform: none !important;
          }
        }
      `}</style>

      <section className="contact-root">
        <div className="contact-layout">

          <h2 className="contact-heading">Contact Us</h2>
          <p className="contact-subtext">
            Have a project in mind? Let's build something amazing.
          </p>

          <form
            ref={sectionRef}
            onSubmit={handleSubmit}
            className={`contact-form ${isVisible ? "is-visible" : ""}`}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact-input"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="contact-input"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="contact-textarea"
            />

            <button type="submit" className="contact-submit">
              Send Message
            </button>

          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;