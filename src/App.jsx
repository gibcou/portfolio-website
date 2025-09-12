import React, { Suspense } from 'react';
import SpinningGlobe from './components/SpinningGlobe';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('3D Globe Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '300px', 
          height: '300px', 
          background: 'linear-gradient(45deg, #ff0000, #ff6b6b)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white', 
          fontSize: '16px',
          textAlign: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          Interactive 3D Globe<br/>Loading...
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div className="App">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Gibson Coutley</h1>
          <p className="hero-subtitle">Front End Developer</p>
          <p className="hero-description">
            Passionate about creating innovative web solutions with modern technologies
          </p>
        </div>
        <div className="globe-section">
          <ErrorBoundary>
            <Suspense fallback={
              <div style={{
                width: '300px', 
                height: '300px', 
                background: 'linear-gradient(45deg, #ff0000, #ff6b6b)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '16px'
              }}>
                Loading 3D Globe...
              </div>
            }>
              <SpinningGlobe />
            </Suspense>
          </ErrorBoundary>
        </div>
      </header>
      
      <main className="main-content">
        <section className="about-section">
          <div className="container">
            <h2>About Me</h2>
            <p>
              I'm a passionate front-end developer with expertise in modern web technologies. 
              I love building interactive applications and solving complex problems through code.
            </p>
          </div>
        </section>
        
        <section className="projects-section">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Movie Discovery App</h3>
                <p>Discover amazing movies, search through thousands of titles, and filter by year with detailed information</p>
                <a href="https://gibcou.github.io/MS-3/" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
              </div>
              <div className="project-card">
                <h3>Subscription Marketplace</h3>
                <p>A subscription-based marketplace where sellers pay monthly fees, not per transaction. Buy and sell with confidence across multiple categories!</p>
                <a href="https://gibcou.github.io/subscription-marketplace/" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
              </div>
              <div className="project-card">
                <h3>Project 3</h3>
                <p>Yet another impressive project in your portfolio</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="contact-section">
          <div className="container">
            <h2>Contact</h2>
            <p>Let's connect and build something amazing together!</p>
            <div className="contact-links">
              <a href="mailto:gibcoutley@gmail.com" className="contact-link">Email</a>
              <a href="https://github.com/gibcou" className="contact-link">GitHub</a>
              <a href="https://linkedin.com/in/yourusername" className="contact-link">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
