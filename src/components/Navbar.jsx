import { useEffect, useMemo, useRef, useState } from "react";
import "./Navbar.css";

const ROLES = [
  "Frontend Developer",
  "UI / UX Engineer",
  "React Developer",
  "AI-powered Web Builder",
  "Social Media Manager",
];

const Navbar = () => {
  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const navRef = useRef(null);
  const pillRef = useRef(null);

  const movePillToActive = (current) => {
    if (!navRef.current || !pillRef.current) return;

    const activeLink = navRef.current.querySelector(`a[href="#${current}"]`);
    if (!activeLink) return;

    const { offsetLeft, offsetWidth } = activeLink;
    pillRef.current.style.transform = `translateX(${offsetLeft}px)`;
    pillRef.current.style.width = `${offsetWidth}px`;
  };

  /* ===============================
     ACTIVE LINK ON SCROLL
  ================================ */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const onScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===============================
     ACTIVE LINK ON HASH CHANGE
  ================================ */
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setActive(hash);
    };

    onHashChange();
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* ===============================
     MOVE PILL TO ACTIVE LINK
  ================================ */
  useEffect(() => {
    movePillToActive(active);
  }, [active]);

  useEffect(() => {
    const onResize = () => movePillToActive(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  /* ===============================
     TYPEWRITER LOGIC
  ================================ */
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

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a className="nav-logo" href="#home">
          <span className="logo-mark">KP</span>
          <span className="logo-copy">
            <strong>Krish Patel</strong>
            <small>
              <span className="logo-typed-text">{displayText}</span>
              <span className="logo-typed-cursor">|</span>
            </small>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="nav-links" ref={navRef}>
          <span className="nav-pill" ref={pillRef} />

          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "active" : ""}
              aria-current={active === link.id ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Start a Project
        </a>

        {/* MOBILE TOGGLE */}
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        id="mobile-menu"
        className={`nav-drawer ${isOpen ? "open" : ""}`}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? "active" : ""}
            aria-current={active === link.id ? "page" : undefined}
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        ))}

        <a className="nav-drawer-cta" href="#contact" onClick={handleNavClick}>
          Start a Project
        </a>
      </div>
    </header>
  );
};

export default Navbar;
