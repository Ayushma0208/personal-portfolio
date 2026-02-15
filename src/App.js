import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import BlogPostDetail from './components/BlogPostDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
