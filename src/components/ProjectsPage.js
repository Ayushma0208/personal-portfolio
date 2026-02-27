import React, { useState } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "RentGrids - Property Rental Platform",
      description: "A backend-driven property rental platform that allows users to search, filter, and manage rental properties based on location, budget, and amenities. The platform focuses on efficient property discovery, optimized search performance, and scalable API architecture.",
      technologies: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
      link: "https://www.rentgrids.com/",
      details: {
        architectureIntro: "Backend architecture highlights:",
        architecture: [
          "Built scalable backend services with Node.js and Express.js",
          "Implemented efficient search algorithms with MongoDB aggregation",
          "Optimized database queries for performance at scale",
          "RESTful API design with proper error handling and validation"
        ],
        scalability: [
          "Horizontal scaling with load balancing",
          "Database indexing for optimized query performance",
          "Caching layer for frequently accessed data"
        ],
        resilience: [
          "Error handling and validation middleware",
          "Database connection pooling",
          "Graceful error responses"
        ],
        reliability: [
          "Consistent API responses",
          "Data validation and sanitization",
          "Logging and monitoring"
        ],
        techStack: "Node.js, Express, MongoDB, JWT, RESTful APIs, Redis, Docker",
        features: "Property search & filtering, location-based search, budget optimization, amenity matching, user authentication",
        goal: "Develop efficient backend systems for property rental discovery"
      }
    },
    {
      id: 2,
      title: "UpRides - Real-Time Ride-Hailing Backend at Scale",
      description: "A fully decoupled, event-driven backend inspired by ride-hailing giants like Uber and Lyft. The system prioritizes scalability, resilience, and real-time performance.",
      technologies: ["TypeScript", "Node.js", "Kafka", "MongoDB", "Redis", "WebSocket"],
      link: "#",
      details: {
        architectureIntro: "Built with TypeScript and Node.js, using stateless, containerized microservices connected via:",
        architecture: [
          "Kafka-based message queues and gRPC for service communication",
          "MongoDB as operational datastore for schema flexibility and write throughput",
          "Redis for caching, pub/sub messaging, and ephemeral state (e.g. driver locations)",
          "WebSocket layer for real-time client updates like driver pings and ETAs"
        ],
        scalability: [
          "Horizontal scaling of stateless microservices",
          "Kafka partitioning for distributed event processing",
          "Redis clustering for high-throughput caching",
          "MongoDB sharding for write-heavy workloads"
        ],
        resilience: [
          "Circuit breakers and retry logic in service-to-service calls",
          "Kafka consumer groups for fault-tolerant message processing",
          "Health checks and auto-restart policies in Docker"
        ],
        reliability: [
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
      title: "Med-Minutes - Real-Time Healthcare Appointment System",
      description: "A distributed messaging platform inspired by Facebook Messenger and WhatsApp, designed to handle billions of users sending millions of messages daily. The system prioritizes real-time message delivery, cross-device synchronization, and efficient message routing with minimal client connections.",
      technologies: ["Node.js", "WebSocket", "Redis", "MongoDB", "Kafka"],
      link: "#",
      details: {
        architectureIntro: "Built with distributed architecture focusing on:",
        architecture: [
          "Distributed microservices architecture for horizontal scalability",
          "WebSocket connections for real-time bidirectional communication",
          "Redis pub/sub for message routing and delivery",
          "MongoDB for persistent message storage",
          "Kafka for event streaming and message queuing"
        ],
        scalability: [
          "Microservices that scale independently based on load",
          "Redis clustering for distributed message routing",
          "MongoDB sharding for handling billions of messages",
          "Load balancing across WebSocket servers"
        ],
        resilience: [
          "Message queue persistence with Kafka",
          "WebSocket reconnection with exponential backoff",
          "Redundant message storage"
        ],
        reliability: [
          "Cross-device message synchronization",
          "Delivery acknowledgments and read receipts",
          "Message ordering guarantees"
        ],
        techStack: "Node.js, Express, WebSocket, Redis, MongoDB, Kafka, JWT, Docker, Kubernetes",
        features: "Real-time messaging, cross-device sync, group chats, message status tracking, typing indicators",
        goal: "Build a messaging platform handling billions of users at scale"
      }
    },
    {
      id: 4,
      title: "EventHub - Scalable Event Booking Platform",
      description: "A cloud-native event booking system built on AWS infrastructure, enabling users to discover, book, and manage event tickets seamlessly. The platform leverages containerization with Docker, automated CI/CD pipelines, and PostgreSQL for transactional data integrity.",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Docker", "AWS", "CI/CD"],
      link: "#",
      details: {
        architectureIntro: "Cloud-native architecture deployed on AWS with automated DevOps practices:",
        architecture: [
          "Containerized Node.js/Express.js microservices with Docker",
          "PostgreSQL for ACID-compliant transactional operations",
          "AWS ECS/EKS for container orchestration and auto-scaling",
          "AWS RDS for managed PostgreSQL with multi-AZ deployment",
          "AWS S3 for event media storage and CloudFront for CDN"
        ],
        scalability: [
          "Horizontal scaling with AWS Auto Scaling Groups",
          "Elastic Load Balancing for traffic distribution",
          "PostgreSQL read replicas for query performance",
          "Redis caching layer with AWS ElastiCache",
          "Serverless functions (AWS Lambda) for background tasks"
        ],
        resilience: [
          "Multi-AZ RDS deployment for database high availability",
          "Automated backups and point-in-time recovery",
          "Health checks and automatic container restarts",
          "Circuit breakers for dependent service failures",
          "AWS CloudWatch monitoring and alerting"
        ],
        reliability: [
          "CI/CD pipeline with GitHub Actions for automated testing and deployment",
          "Blue-green deployments for zero-downtime releases",
          "Database migrations with version control",
          "Comprehensive logging with AWS CloudWatch Logs",
          "Infrastructure as Code with AWS CloudFormation/Terraform"
        ],
        techStack: "Node.js, Express.js, PostgreSQL, Docker, AWS (ECS, RDS, S3, CloudFront, Lambda), GitHub Actions, Redis, JWT, Nginx",
        features: "Event discovery & search, secure ticket booking, payment processing, QR code generation, user authentication, email notifications",
        goal: "Build a production-ready event booking platform with DevOps best practices"
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
          <div key={project.id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
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
                Read More
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

      {expandedProject !== null && (
        <div className="modal-overlay" onClick={() => setExpandedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {projects.filter(p => p.id === expandedProject).map(project => (
              <div key={project.id} className="modal-project-details">
                <h2 className="modal-title">{project.title}</h2>
                <p className="modal-description">{project.description}</p>

                <div className="modal-section">
                  <h3 className="section-title">Architecture</h3>
                  <p className="section-intro">{project.details.architectureIntro}</p>
                  <ul className="section-list">
                    {project.details.architecture.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Scalability</h3>
                  <ul className="section-list">
                    {project.details.scalability.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Resilience</h3>
                  <ul className="section-list">
                    {project.details.resilience.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Reliability</h3>
                  <ul className="section-list">
                    {project.details.reliability.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <p className="modal-info"><strong className="info-label">Tech Stack:</strong> {project.details.techStack}</p>
                  <p className="modal-info"><strong className="info-label">Features:</strong> {project.details.features}</p>
                  <p className="modal-info"><strong className="info-label">Goal:</strong> {project.details.goal}</p>
                </div>

                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-project-link">
                    View Project →
                  </a>
                )}

                <button 
                  onClick={() => setExpandedProject(null)} 
                  className="modal-close-btn"
                >
                  Read Less
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default ProjectsPage;
