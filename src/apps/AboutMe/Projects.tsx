import styles from "./Projects.module.scss";
import PortfoliOSLogo from "./assets/portfolios.jpg";
import CodeLogoSvg from "./assets/code.svg";
import MyVocLogo from "./assets/myvoc.png";

type Project = {
  logo: string;
  link?: string;
  name: string;
  status: string;
  frontend: string[];
  backend: string[];
  description: string;
  sourceCode?: string;
};

const projects: Project[] = [
  {
    logo: PortfoliOSLogo,
    link: "https://portfolios.mark199850.workers.dev/",
    name: "PortfoliOS",
    status: "v0.7.0, WIP",
    frontend: ["TypeScript", "React", "Vite", "Redux", "Base UI"],
    backend: ["TBD"],
    description: "An OS-like web application",
    sourceCode: "https://github.com/mark199850/portfolios",
  },
  {
    logo: MyVocLogo,
    name: "MyVoc",
    status: "WIP",
    frontend: ["React"],
    backend: ["ASP.NET", "PostgreSQL"],
    sourceCode:
      "https://github.com/mark199850/myvoc-frontend/tree/feat/add-new-word",
    description:
      "Personal Vocabulary & PWA. It's a cross-browser extension and Progressive Web App (PWA). This tool helps language learners acquire vocabulary by highlighting unknown words directly on web pages and saving the sentence context.",
  },
];

export function Projects() {
  return (
    <ul className={styles.projectList}>
      {projects.map((project) => {
        return (
          <li key={project.name} className={styles.item}>
            <div
              className={`
                ${styles.logo} ${project.sourceCode ? styles.hasSourceCode : ""}
              `}
            >
              <img
                className={styles.img}
                src={project.logo}
                alt="project logo"
              />
              {project.sourceCode && (
                <>
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceCodeLink}
                  >
                    Source code
                  </a>
                  <img
                    className={styles.sourceCodeBg}
                    src={CodeLogoSvg}
                    alt="Source Code logo"
                  ></img>
                </>
              )}
            </div>
            <div className={styles.text}>
              <h3>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p className={styles.status}>[ {project.status} ]</p>
              <p>{project.description}</p>
              <p className={styles.techStack}>
                Frontend:
                <span>
                  {project.frontend.map((tech) => {
                    return (
                      <span key={tech} className={styles.tag}>
                        {tech}
                      </span>
                    );
                  })}
                </span>
              </p>
              <p className={styles.techStack}>
                Backend:
                <span>
                  {project.backend.map((tech) => {
                    return (
                      <span key={tech} className={styles.tag}>
                        {tech}
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
