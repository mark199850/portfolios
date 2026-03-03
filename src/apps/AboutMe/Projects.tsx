import './Projects.scss';
import PortfoliOSLogo from './assets/portfolios.jpg';
import PSHungaryLogo from './assets/pshungary.png';
import CodeLogoSvg from './assets/code.svg';
import MyVocLogo from './assets/myvoc.png';

type Project = {
    logo: string;
    link?: string;
    name: string;
    status: string;
    frontend: string[];
    backend: string[];
    description: string;
    sourceCode?: string;
}

const projects: Project[] = [
    {
        logo: PortfoliOSLogo,
        link: "portfolios.hu",
        name: "PortfoliOS",
        status: "v0.2.0, WIP",
        frontend: ["React", "Vite", "Redux"],
        backend: ["TBD"],
        description: "An OS-like web application",
        sourceCode: "https://github.com/mark199850/portfolios"
    },
    {
        logo: PSHungaryLogo,
        link: "https://www.perfectsystemhungary.hu",
        name: "PerfectSystemHungary.hu",
        status: "Legacy, Rework Planned",
        frontend: ["React"],
        backend: ["NodeJS", "MySQL"],
        description: "A landing page created together with my classmate back then, for his friend.",
    },
    {
        logo: MyVocLogo,
        name: "MyVoc",
        status: "WIP",
        frontend: ["React"],
        backend: ["ASP.NET", "PostgreSQL"],
        sourceCode: "https://github.com/mark199850/myvoc-frontend/tree/feat/add-new-word",
        description: "Personal Vocabulary & PWA. It's a cross-browser extension and Progressive Web App (PWA). This tool helps language learners acquire vocabulary by highlighting unknown words directly on web pages and saving the sentence context.",
    }

]

export function Projects() {
    return (
        <div className='about-me_projects-page_container'>
            {projects.map((project) => {
                return (
                    <div className='about-me_projects-page_project_item '>
                        <div className={`about-me_projects-page_project_item_logo ${project.sourceCode ? 'has-source-code' : ''}`}>
                            <img
                                className='about-me_projects-page_project_item_logo-img'
                                src={project.logo} alt='' />
                            {project.sourceCode &&
                                <>
                                    <a
                                        href={project.sourceCode}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='about-me_projects-page_project_item_source-code_link'
                                    >
                                        Source code
                                    </a>
                                    <img
                                        className='about-me_projects-page_project_item_source-code_bg'
                                        src={CodeLogoSvg}
                                    >
                                    </img>
                                </>
                            }
                        </div>
                        <div className='about-me_projects-page_project_item_text'>
                            <h3>
                                {project.link ?
                                    <a href={project.link}>{project.name}</a>
                                    :
                                    project.name
                                }
                            </h3>
                            <p className='about-me_projects-page_project_item_text_status'>[ {project.status} ]</p>
                            <p>{project.description}</p>
                            <p className='about-me_projects-page_project_item_text_techstack_container'>Frontend:
                                <span>
                                    {project.frontend.map((tech) => {
                                        return <span className='about-me_projects-page_project_item_text_techstack_tag'>{tech}</span>
                                    })}
                                </span>
                            </p>
                            <p className='about-me_projects-page_project_item_text_techstack_container'>Backend:
                                <span>
                                    {project.backend.map((tech) => {
                                        return <span className='about-me_projects-page_project_item_text_techstack_tag'>{tech}</span>
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
