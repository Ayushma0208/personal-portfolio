import React, { useState } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "RentGrids — Property Rental Platform",
      description: "A backend-driven property rental platform that allows users to search, filter, and manage rental properties based on location, budget, and amenities. The platform focuses on efficient property discovery, optimized search performance, and scalable API architecture.",
      technologies: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
      link: "https://www.rentgrids.com/",
      details: {
        architecture: [
          "Built scalable backend services with Node.js and Express.js",
          "Implemented efficient search algorithms with MongoDB aggregation",
          "Optimized database queries for performance at scale",
          "RESTful API design with proper error handling and validation"
        ],
        techStack: "Node.js, Express, MongoDB, JWT, RESTful APIs, Redis, Docker",
        features: "Property search & filtering, location-based search, budget optimization, amenity matching, user authentication",
        goal: "Develop efficient backend systems for property rental discovery"
      }
    },
    {
      id: 2,
      title: "UpRides — Real-Time Ride-Hailing Backend at Scale",
      description: "A fully decoupled, event-driven backend inspired by ride-hailing giants like Uber and Lyft. The system prioritizes scalability, resilience, and real-time performance.",
      technologies: ["TypeScript", "Node.js", "Kafka", "MongoDB", "Redis", "WebSocket"],
      link: "#",
      details: {
        architecture: [
          "Kafka-based message queues and gRPC for service communication",
          "MongoDB as operational datastore for schema flexibility and write throughput",
          "Redis for caching, pub/sub messaging, and ephemeral state (e.g. driver locations)",
          "WebSocket layer for real-time client updates like driver pings and ETAs",
          "Eventual consistency in the dispatch layer",
          "Clean separation of control and data planes",
          "Minimal latency and maximum uptime"
        ],
        techStack: "Node.js, Express, MongoDB, Socket.io, JWT, TypeScript, Kafka, gRPC, Redis, Docker, GitHub Actions",
        features: "Real-time driver-passenger matching, booking, fare calculation, JWT auth",
        goal: "A scalable backend like Uber/Lyft"
      }
    },
    {
      id: 3,
      title: "Dirext — Real-Time Chat Application at Scale",
      description: "A distributed messaging platform inspired by Facebook Messenger and WhatsApp, designed to handle billions of users sending millions of messages daily. The system prioritizes real-time message delivery, cross-device synchronization, and efficient message routing with minimal client connections.",
      technologies: ["Node.js", "WebSocket", "Redis", "MongoDB", "Kafka"],
      link: "#",
      details: {
        architecture: [
          "Distributed microservices architecture for horizontal scalability",
          "WebSocket connections for real-time bidirectional communication",
          "Redis pub/sub for message routing and delivery",
          "MongoDB for persistent message storage",
          "Kafka for event streaming and message queuing",
          "Load balancing for optimal server distribution"
        ],
        techStack: "Node.js, Express, WebSocket, Redis, MongoDB, Kafka, JWT, Docker, Kubernetes",
        features: "Real-time messaging, cross-device sync, group chats, message status tracking, typing indicators",
        goal: "Build a messaging platform handling billions of users at scale"
      }
    }
  ];

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>
      <p className="projects-subtitle">A showcase of my backend engineering work, focusing on scalable systems and real-time applications.</p>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            {expandedProject === project.id && project.details && (
              <div className="project-details">
                <div className="detail-section">
                  <h4>Architecture</h4>
                  <p className="architecture-intro">
                    {project.title.includes("UpRides") && "Built with TypeScript and Node.js, using stateless, containerized microservices connected via:"}
                    {project.title.includes("Dirext") && "Built with distributed architecture focusing on:"}
                    {project.title.includes("RentGrids") && "Backend architecture highlights:"}
                  </p>
                  <ul>
                    {project.details.architecture.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <p><strong className="detail-label">Tech Stack:</strong> {project.details.techStack}</p>
                  <p><strong className="detail-label">Features:</strong> {project.details.features}</p>
                  <p><strong className="detail-label">Goal:</strong> {project.details.goal}</p>
                </div>
              </div>
            )}
            
            <div className="project-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-actions">
              <button 
                onClick={() => toggleExpand(project.id)} 
                className="read-more-btn"
              >
                {expandedProject === project.id ? 'Read Less' : 'Read More'}
              </button>
              {project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
