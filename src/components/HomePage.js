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
          <h1 className="name">Ayushma</h1>
          <p className="tagline">Full Stack Developer | Tech Enthusiast | Problem Solver</p>
          <div className="cta-buttons">
            <a href="#about" className="btn btn-primary">About Me</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Me</h2>
        <p className="about-text">
          I'm a passionate developer with expertise in creating modern web applications.
          I love building intuitive user interfaces and solving complex problems with elegant solutions.
        </p>
      </section>

      <section className="skills-section">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Frontend</h3>
            <ul>
              <li>React.js</li>
              <li>JavaScript/TypeScript</li>
              <li>HTML5 & CSS3</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>RESTful APIs</li>
              <li>Database Design</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Tools & Others</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>VS Code</li>
              <li>Problem Solving</li>
              <li>Team Collaboration</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Let's Connect</h2>
        <p>Feel free to reach out for collaborations or just a friendly hello!</p>
        <div className="social-links">
          <a href="https://github.com" className="social-link">GitHub</a>
          <a href="https://linkedin.com" className="social-link">LinkedIn</a>
          <a href="mailto:your.email@example.com" className="social-link">Email</a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
