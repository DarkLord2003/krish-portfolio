import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/profile.jpg";
import resumePdf from "../assets/Krish-Patel-Resume.pdf";
import "./Hero.css";

const ROLES = [
  "Frontend Developer",
  "UI / UX Engineer",
  "React Developer",
  "AI-powered Web Builder",
  "Social Media Manager",
];

const Hero = () => {
  const heroRef = useRef(null);

  /* ===============================
     HERO ENTRANCE ANIMATION
  ================================ */
  useEffect(() => {
    const timer = setTimeout(() => {
      heroRef.current?.classList.add("animate");
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     TYPEWRITER LOGIC
  ================================ */
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      className="hero-wrapper"
      id="home"
      ref={heroRef}
    >
      <div className="hero-card">
        <div className="hero-content">

          {/* LEFT CONTENT */}
          <div className="hero-text">
            <h4>Hello, It’s Me</h4>

            <h1 className="hero-name">Krish Patel</h1>

            {/* TYPEWRITER ROLE */}
            <h3 className="hero-role">
              And I’m a <span>{displayText}</span>
              <span className="cursor">|</span>
            </h3>

            <p className="hero-message">
              I craft intuitive user interfaces, build modern web applications,
              and create digital experiences that feel effortless and impactful.
            </p>

            {/* ACTIONS */}
            <div className="hero-actions">
              <div className="socials">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/krish-patel-2725231a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.1c.5-.9 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6v9.5h-4v-8.4c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.4V24h-4V8.5z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/DarkLord2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.2 2.9 1.6.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:krishp744@gmail.com"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>

              {/* RESUME BUTTON */}
              <a
                href={resumePdf}
                className="cta"
                download="Krish-Patel-Resume.pdf"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hero-image">
            <div className="hero-image-stack">
              <span className="hero-ring ring-one" aria-hidden="true" />
              <span className="hero-ring ring-two" aria-hidden="true" />
              <span className="hero-ring ring-three" aria-hidden="true" />

              <div className="hex">
                <img
                  src={profileImage}
                  alt="Krish Patel"
                  width="1024"
                  height="1024"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
