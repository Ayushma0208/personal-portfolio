import React from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Med-Minute",
      description: "A healthcare app that provides quick medical information and symptom checker",
      technologies: ["React", "CSS3", "JavaScript"],
      link: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with payment integration",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 3,
      title: "Task Manager App",
      description: "Productivity app for managing daily tasks and projects",
      technologies: ["React", "Firebase", "Material-UI"],
      link: "#"
    }
  ];

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <p className="projects-subtitle">Here are some of my recent works</p>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a href={project.link} className="project-link">View Project →</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
