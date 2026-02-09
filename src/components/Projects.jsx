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

              {/* BASE CARD */}
              <div className="project-base">
                <div className="project-text">
                  <span className="project-eyebrow">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>

                <div
                  className={`project-accent accent-${project.accent}`}
                  aria-hidden="true"
                />
              </div>

              {/* HOVER OVERLAY */}
              <div className="project-overlay">
                <h4>{project.title}</h4>
                <p className="overlay-desc">{project.description}</p>

                <div className="overlay-block">
                  <strong>Problem</strong>
                  <p>{project.problem}</p>
                </div>

                <div className="overlay-block">
                  <strong>Solution</strong>
                  <p>{project.solution}</p>
                </div>

                <ul className="overlay-highlights">
                  {project.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>

                <div className="overlay-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>

                <div className="overlay-actions">
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
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
