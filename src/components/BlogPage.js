import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Microservices with gRPC",
      date: "February 10, 2026",
      excerpt: "Learn how to design and implement high-performance microservices using gRPC and protocol buffers for efficient service-to-service communication.",
      content: "In modern distributed systems, efficient communication between services is crucial. gRPC offers a robust framework for building scalable microservices with features like bi-directional streaming, load balancing, and language-agnostic interfaces. In this post, I'll walk through my experience implementing gRPC-based microservices and the performance gains we achieved.",
      tags: ["gRPC", "Microservices", "Backend"],
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Implementing Redis Caching Strategies for High Traffic Applications",
      date: "January 28, 2026",
      excerpt: "Explore different Redis caching patterns and strategies to reduce latency and improve application performance under heavy load.",
      content: "Caching is essential for high-performance applications. Redis provides multiple caching strategies including cache-aside, write-through, and write-behind patterns. I'll share real-world examples of how we reduced our API response times by 70% using intelligent Redis caching layers and how to avoid common pitfalls like cache stampede and stale data issues.",
      tags: ["Redis", "Caching", "Performance"],
      readTime: "10 min read"
    },
    {
      id: 3,
      title: "CI/CD Pipeline Implementation: Automating Software Delivery",
      date: "January 5, 2026",
      excerpt: "Learn how I transformed manual deployments into an automated CI/CD pipeline, reducing deployment time from 45 minutes to 5 minutes.",
      content: "When I first started deploying applications, the process was completely manual — build the project, test it locally, upload files to the server, fix errors, redeploy again. It was slow, repetitive, and stressful. After implementing CI/CD pipelines, deployments became faster, safer, and much more reliable. This article explains what CI/CD is, why it matters, and how to implement it.",
      tags: ["CI/CD", "DevOps", "Automation"],
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Razorpay Payment Gateway Integration",
      date: "December 20, 2025",
      excerpt: "Learn how to integrate Razorpay payment gateway in your web application with step-by-step implementation guide and best practices.",
      content: "While building modern web applications, one common requirement is handling online payments. When I worked on backend systems that required payment handling, I explored Razorpay because of its simple integration, good documentation, and support for Indian payment methods like UPI, cards, and net banking. This guide covers everything from setup to payment verification.",
      tags: ["Razorpay", "Payment Gateway", "Backend"],
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Implementing Role-Based Access Control (RBAC) in Modern Applications",
      date: "December 5, 2025",
      excerpt: "Learn how to implement RBAC for better security, easier permission management, and cleaner system design in your applications.",
      content: "While building backend systems, one of the most important things I realized early was that authentication alone is not enough. Just verifying who a user is doesn't mean they should be allowed to access everything in the system. This is where Role-Based Access Control (RBAC) becomes important. This article explains what RBAC is, why it matters, and how to implement it in real-world applications.",
      tags: ["RBAC", "Security", "Authorization"],
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Production Deployment using Nginx and PM2",
      date: "November 22, 2025",
      excerpt: "Learn how to deploy Node.js applications in production using PM2 for process management and Nginx as a reverse proxy for reliability and scalability.",
      content: "Building an application is only half the job. The real challenge begins when you want your app to run reliably in production — handling traffic, staying online, and recovering automatically if something breaks. This guide covers deploying applications with PM2 and Nginx to create a robust, production-ready system.",
      tags: ["Nginx", "PM2", "Deployment"],
      readTime: "11 min read"
    }
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">Thoughts on backend engineering, distributed systems, and software architecture</p>
      </div>

      <div className="blog-posts">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-post-card">
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
            </div>
            
            <p className="post-excerpt">{post.excerpt}</p>
            
            <p className="post-content">{post.content}</p>
            
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <button
              className="read-more-btn"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              Read Full Article →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
