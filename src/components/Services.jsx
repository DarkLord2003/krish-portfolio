import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    title: "UI Engineering",
    description:
      "Pixel-precise interfaces that translate design intent into resilient, accessible UI.",
    points: [
      "Design-to-code execution",
      "Responsive layouts & motion",
      "Accessible component patterns",
    ],
  },
  {
    title: "Frontend Architecture",
    description:
      "Scalable foundations that keep products fast, maintainable, and easy to evolve.",
    points: [
      "Component systems & tokens",
      "Performance tuning",
      "State & data flow strategy",
    ],
  },
  {
    title: "Product Prototyping",
    description:
      "Rapid iteration from idea to clickable prototype with clear user journeys.",
    points: [
      "MVP feature planning",
      "Interactive prototypes",
      "User-focused refinements",
    ],
  },
];

const Services = () => {
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
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <h2>
            What I <span>Do</span>
          </h2>
          <p>
            I help teams build crisp, modern web experiences that feel effortless
            for users and dependable for developers.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card"
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <div className="service-top">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services-footer">
          <p>Need a frontend partner for a launch, redesign, or new product?</p>
          <a href="#contact" className="services-cta">
            Let’s Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
