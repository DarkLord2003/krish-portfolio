import { useEffect, useRef } from "react";
import "./Experience.css";

const timelineItems = [
  {
    period: "2025 - Present",
    role: "Frontend Developer",
    context: "Independent Portfolio Work",
    summary:
      "Designing and shipping polished React interfaces with strong focus on responsiveness, animation, and clear UX flows.",
    wins: [
      "Built a modular multi-section portfolio architecture",
      "Implemented reusable UI sections with consistent styling tokens",
      "Added navigation states, accessibility labels, and mobile behavior",
    ],
  },
  {
    period: "2024 - 2025",
    role: "AI Auction Platform",
    context: "Case Study Project",
    summary:
      "Developed a full-stack auction experience with AI-assisted pricing recommendations to improve bid quality.",
    wins: [
      "Integrated model-assisted starting price recommendations",
      "Shaped a clean bidding flow with clear project storytelling",
      "Documented problem-solution-impact structure for recruiters",
    ],
  },
  {
    period: "2024",
    role: "Smart Expense Tracker",
    context: "Case Study Project",
    summary:
      "Created a personal finance dashboard for category insights and date-based tracking.",
    wins: [
      "Implemented expense CRUD and category-level analytics",
      "Designed simplified UI focused on daily usability",
      "Mapped key features into a concise portfolio case study",
    ],
  },
];

const proofItems = [
  { value: "2", label: "Featured Case Studies" },
  { value: "9+", label: "Core Technologies Used" },
  { value: "100%", label: "Responsive-first Layouts" },
  { value: "Open", label: "To Frontend Opportunities" },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <div className="experience-header">
          <h2>
            Experience & <span>Proof</span>
          </h2>
          <p>
            A quick view of recent work, delivery focus, and the kinds of
            frontend outcomes I prioritize.
          </p>
        </div>

        <div className="experience-grid">
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <article
                key={item.role}
                className="timeline-item"
                style={{ transitionDelay: `${index * 0.12}s` }}
              >
                <span className="timeline-period">{item.period}</span>
                <h3>{item.role}</h3>
                <h4>{item.context}</h4>
                <p>{item.summary}</p>
                <ul>
                  {item.wins.map((win) => (
                    <li key={win}>{win}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="proof-panel">
            <h3>Credibility Snapshot</h3>
            <p>
              Structured case studies, modern frontend stack usage, and delivery
              quality that maps to product teams.
            </p>
            <div className="proof-grid">
              {proofItems.map((item) => (
                <div key={item.label} className="proof-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Experience;

