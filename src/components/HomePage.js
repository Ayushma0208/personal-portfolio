import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="home-container">
      <div className="time-location">
        {formatTime(currentTime)}(GMT+5:30) Indore, India
      </div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="name">Ayushma Tripathi</h1>
          <p className="tagline">Software Engineer — I build backend systems, real-time apps, and RESTful APIs.</p>
          
          <div className="social-icons">
            <a href="https://github.com/Ayushma0208" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ayusmatripathi/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Resume">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </a>
            <a href="mailto:ayushma@example.com" className="social-icon" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <p className="about-text">
          I'm a backend engineer who builds scalable, resilient systems designed to handle real-world load. I specialize in designing RESTful and gRPC-based APIs, architecting pub/sub systems with Kafka and Redis Streams, and optimizing data flow with asynchronous patterns.
        </p>
        <p className="about-text">
          I've worked across both SQL (PostgreSQL) and NoSQL (MongoDB) databases, tuned queries for performance, and implemented caching layers using Redis to reduce latency and offload load from primary datastores.
        </p>
        <p className="about-text">
          Beyond the basics, I've implemented reverse proxies with NGINX, designed fault-tolerant service meshes, and built modular microservices that communicate over protocol buffers. I'm comfortable with concepts like CAP theorem, distributed tracing, rate-limiting, horizontal scaling, idempotency, circuit breakers, and eventual consistency.
        </p>
        <p className="about-text">
          Every service I write is built with observability in mind — logs, metrics, alerts, and structured tracing included from day one.
        </p>
      </section>

      <section className="skills-section">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Backend & APIs</h3>
            <ul>
              <li>Node.js & Express.js</li>
              <li>RESTful & gRPC APIs</li>
              <li>Microservices Architecture</li>
              <li>WebSocket & Real-time Systems</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Databases & Caching</h3>
            <ul>
              <li>MongoDB & PostgreSQL</li>
              <li>Redis (Caching & Pub/Sub)</li>
              <li>Query Optimization</li>
              <li>Database Design</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>DevOps & Tools</h3>
            <ul>
              <li>Docker & Kubernetes</li>
              <li>Kafka & Message Queues</li>
              <li>NGINX & Load Balancing</li>
              <li>Git & CI/CD</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Let's Connect</h2>
        <p>Feel free to reach out for collaborations or just a friendly hello!</p>
        <div className="social-links">
          <a href="https://github.com/Ayushma0208" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/ayusmatripathi/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="mailto:ayushma@example.com" className="social-link">Email</a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
