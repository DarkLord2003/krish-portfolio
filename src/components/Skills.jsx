import { useEffect, useRef } from "react";
import htmlIcon from "../assets/html.svg";
import cssIcon from "../assets/css.svg";
import jsIcon from "../assets/js.svg";
import reactIcon from "../assets/react.svg";
import nodeIcon from "../assets/node.svg";
import mongoIcon from "../assets/mongodb.svg";
import firebaseIcon from "../assets/firebase.svg";
import githubIcon from "../assets/github.svg";
import dockerIcon from "../assets/docker.svg";
import "./Skills.css";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: "Advanced", icon: htmlIcon },
      { name: "CSS3", level: "Advanced", icon: cssIcon },
      { name: "JavaScript", level: "Advanced", icon: jsIcon },
      { name: "React", level: "Intermediate", icon: reactIcon },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: "Intermediate", icon: nodeIcon },
      { name: "MongoDB", level: "Intermediate", icon: mongoIcon },
      { name: "Firebase", level: "Intermediate", icon: firebaseIcon },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", level: "Advanced", icon: githubIcon },
      { name: "Docker", level: "Beginner", icon: dockerIcon },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("visible");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">

        <div className="skills-header">
          <h2>
            Skills & <span>Expertise</span>
          </h2>
          <p>
            Technologies I use to design, build, and ship reliable,
            scalable web applications.
          </p>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group, i) => (
            <div key={i} className="skills-group">
              <h3>{group.title}</h3>

              <div className="skills-grid">
                {group.skills.map((skill, idx) => (
                  <div key={idx} className="skill-card">
                    <img src={skill.icon} alt={skill.name} />
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
