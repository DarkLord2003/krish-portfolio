import { useEffect, useRef } from "react";
import "./About.css";

const pillars = [
  {
    title: "Human-first UI",
    description:
      "Interfaces that feel intuitive, inclusive, and deliberate for every user.",
  },
  {
    title: "Fast, resilient builds",
    description:
      "Performance-minded engineering with attention to Core Web Vitals.",
  },
  {
    title: "Scalable systems",
    description:
      "Component libraries and patterns that grow with the product.",
  },
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("visible");
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-text">
          <span className="eyebrow">About</span>
          <h2>
            Building web experiences that feel <span>effortless</span>.
          </h2>
          <p>
            I’m a frontend developer who blends design sensitivity with clean,
            scalable code. I love shaping interfaces that move smoothly, tell a
            clear story, and hold up as products evolve.
          </p>
          <p>
            From landing pages to full applications, I focus on clarity,
            performance, and thoughtful interaction details that make products
            feel polished.
          </p>
          <div className="about-tags">
            <span>Design-to-code</span>
            <span>Accessibility</span>
            <span>Performance</span>
            <span>Frontend systems</span>
          </div>
        </div>

        <div className="about-pillars">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="pillar-card"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
