import { useEffect, useRef } from "react";
import "./Projects.css";

const projects = [
  {
    title: "AI Auction Platform",
    subtitle: "Smart bidding system with price prediction",
    category: "Full-stack product",
    accent: "sunset",
    description:
      "A full-stack auction platform where users can list items, place bids, and receive AI-powered price recommendations.",
    problem:
      "Manual price estimation leads to underpricing or low bidding activity.",
    solution:
      "Built an AI model to suggest optimal starting prices based on item details.",
    highlights: [
      "AI-based starting price prediction",
      "Live bidding workflow",
      "Clean and responsive UI",
    ],
    tech: ["React", "Node.js", "MongoDB", "TensorFlow.js"],
    glanceImages: [
      {
        src: "/projects/auction-overview.svg",
        label: "Auction Overview",
        alt: "Auction platform dashboard overview",
      },
      {
        src: "/projects/auction-bidding.svg",
        label: "Live Bidding",
        alt: "Live bidding interface preview",
      },
      {
        src: "/projects/auction-pricing.svg",
        label: "AI Price Insights",
        alt: "AI price prediction panel preview",
      },
    ],
    repoUrl: "https://github.com/DarkLord2003",
    demoUrl: "",
  },
  {
    title: "Smart Expense Tracker",
    subtitle: "Personal finance tracking web app",
    category: "Analytics dashboard",
    accent: "ocean",
    description:
      "A web app to track expenses with category-wise insights and date-based filtering.",
    problem:
      "Users struggle to understand where their money goes month-to-month.",
    solution:
      "Designed intuitive expense categorization with weekly and monthly summaries.",
    highlights: [
      "CRUD expense management",
      "Date-based analytics",
      "Minimal UX focused on clarity",
    ],
    tech: ["React", "Node.js", "MongoDB"],
    glanceImages: [
      {
        src: "/projects/expense-dashboard.svg",
        label: "Overview",
        alt: "Expense tracker overview dashboard",
      },
      {
        src: "/projects/expense-categories.svg",
        label: "Categories",
        alt: "Category spending breakdown chart",
      },
      {
        src: "/projects/expense-timeline.svg",
        label: "Timeline",
        alt: "Expense timeline and trends chart",
      },
    ],
    repoUrl: "https://github.com/DarkLord2003",
    demoUrl: "",
  },
];

const buildDiscussionLink = (title) =>
  `mailto:krishp744@gmail.com?subject=${encodeURIComponent(
    `Let's discuss ${title}`
  )}`;

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("visible");
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">

        {/* HEADER */}
        <div className="projects-header">
          <h2>
            Projects & <span>Case Studies</span>
          </h2>
          <p>Hover or tap a project to explore the full case study.</p>
        </div>

        {/* PROJECT LIST */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card"
              style={{ transitionDelay: `${i * 0.15}s` }}
              tabIndex={0}
            >
              <div className="project-flip">
                {/* FRONT FACE */}
                <article className="project-face project-front">
                  <div className="project-text">
                    <span className="project-eyebrow">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <p className="project-summary">{project.description}</p>
                  </div>

                  <ul className="project-highlights">
                    {project.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>

                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span key={idx}>{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.demoUrl ? (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    ) : null}

                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        Source Code
                      </a>
                    ) : null}

                    <a href={buildDiscussionLink(project.title)}>Discuss Project</a>
                  </div>
                </article>

                {/* BACK FACE */}
                <article className="project-face project-back">
                  <span className="project-eyebrow">Project At A Glance</span>
                  <h4>{project.title}</h4>
                  <p className="project-back-copy">
                    Hover unlocked a quick visual snapshot of key product views.
                  </p>

                  <div className="glance-grid">
                    {project.glanceImages.map((image) => (
                      <figure key={image.src} className="glance-tile">
                        <img src={image.src} alt={image.alt} loading="lazy" />
                        <figcaption>{image.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
