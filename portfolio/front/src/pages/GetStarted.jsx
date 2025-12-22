import "./styles/GetStarted.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

function GetStarted() {
  const [cookie] = useCookies(["userId"]);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme || "light";
  });

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const examplePortfolios = [
    {
      id: 1,
      title: "Minimalist Developer",
      description: "Clean code-focused layout with project showcases",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "GitHub", "Light"],
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Creative Artist",
      description: "Visual portfolio with gallery and client testimonials",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80",
      tags: ["Gallery", "Testimonials", "Dark"],
      color: "#8B5CF6",
    },
    {
      id: 3,
      title: "Professional Executive",
      description: "Corporate layout with experience timeline",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      tags: ["Resume", "Contact", "Blue"],
      color: "#10B981",
    },
    {
      id: 4,
      title: "UX/UI Designer",
      description: "Interactive design portfolio with case studies",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Figma", "Case Studies", "Modern"],
      color: "#EC4899",
    },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Quick Setup",
      description: "Go live in minutes with our templates",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "💼",
      title: "Professional Design",
      description: "Impress employers with modern designs",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Premium quality at accessible prices",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "⚡",
      title: "High Performance",
      description: "Lightning fast loading times",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { value: "2,500+", label: "Portfolios Created" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "1h", label: "Average Setup Time" },
    { value: "50+", label: "Template Designs" },
  ];

  return (
    <div className="home-container">
      {/* Animated background elements */}
      <div className="animated-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      {/* Navigation */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <span className="logo-icon">✨</span>
            Portfolio<span className="logo-highlight">Pro</span>
          </div>
          
          <div className="nav-links">
            {cookie.userId ? (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
            
            {/* Theme Toggle */}
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
            </button>
            
            <Link to="/portfolio/buy" className="cta-button glow-effect">
              <span className="text-hover-group">
                <span className="first-text">Get Started</span>
                <span className="sec-text">Start Building →</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="main-content">
        <section className="hero-section fade-in">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">🎯 Trusted Payments</span>
            </div>
            
            <h1 className="hero-title">
              <span className="hero-gradient">Build Your</span>
              <br />
              <span className="typewriter">Digital Identity</span>
            </h1>
            
            <p className="hero-subtitle">
              Create a stunning portfolio that showcases your work, attracts opportunities, 
              and tells your unique story — all in one place.
            </p>
            
            <div className="hero-buttons">
              <Link to="/login">
                <button className="primary-button pulse-effect">
                  <span className="button-content">
                    Start Free Trial
                    <span className="button-arrow">→</span>
                  </span>
                </button>
              </Link>
              <Link to="/portfolio/buy">
                <button className="secondary-button">
                  <span className="button-content">
                    View Pricing
                    <span className="button-icon">💳</span>
                  </span>
                </button>
              </Link>
            </div>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hero-illustration">
            <div className="floating-card card-1"></div>
            <div className="floating-card card-2"></div>
            <div className="floating-card card-3"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to <span className="highlight">Shine</span>
            </h2>
            <p className="section-subtitle">
              Powerful features designed to make your portfolio stand out
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card hover-lift">
                <div className={`feature-icon-bg gradient-${index}`}>
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Portfolios Section */}
        <section className="portfolios-section">
          <div className="section-header">
            <h2 className="section-title">
              Portfolio <span className="highlight">Showcase</span>
            </h2>
            <p className="section-subtitle">
              Explore templates that have helped professionals land their dream jobs
            </p>
          </div>
          
          <div className="portfolio-grid">
            {examplePortfolios.map((portfolio) => (
              <div 
                key={portfolio.id} 
                className="portfolio-card hover-scale"
                style={{ '--card-color': portfolio.color }}
              >
                <div className="portfolio-image-container">
                  <img
                    src={portfolio.image}
                    alt={portfolio.title}
                    className="portfolio-image"
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <h3 className="portfolio-overlay-title">
                        {portfolio.title}
                      </h3>
                      <p className="portfolio-overlay-description">
                        {portfolio.description}
                      </p>
                      <div className="portfolio-tags">
                        {portfolio.tags.map((tag, index) => (
                          <span key={index} className="portfolio-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="portfolio-content">
                  <div className="portfolio-header">
                    <h3 className="portfolio-title">{portfolio.title}</h3>
                    <span className="portfolio-price">$49</span>
                  </div>
                  <p className="portfolio-description">
                    {portfolio.description}
                  </p>
                  <div className="portfolio-actions">
                    <button className="preview-button">Preview</button>
                    <button className="select-button">Select</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="testimonial-section">
          <div className="testimonial-container">
            <div className="testimonial-header">
              <div className="testimonial-quote-mark">"</div>
              <h2 className="testimonial-title">
                Loved by <span className="highlight">Creatives</span> Worldwide
              </h2>
            </div>
            
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">
                    PortfolioPro helped me land 3x more interviews. The clean design impressed every recruiter who saw it.
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">SR</div>
                  <div className="author-info">
                    <div className="author-name">Suriyaprakash Raja</div>
                    <div className="author-role">Full Stack Developer</div>
                  </div>
                </div>
              </div>
           </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to <span className="highlight">Elevate</span> Your Career?
              </h2>
              <p className="cta-subtitle">
                Join thousands of professionals who've transformed their job search with PortfolioPro
              </p>
              <div className="cta-buttons">
                <Link to="/login">
                  <button className="cta-primary-button">
                    Start Free Trial
                  </button>
                </Link>
                <Link to="/portfolio/buy">
                  <button className="cta-secondary-button">
                    View All Templates
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">PortfolioPro</div>
              <p className="footer-tagline">
                Building digital identities that open doors
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Product</h4>
                <a href="#" className="footer-link">Templates</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">Features</a>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <a href="#" className="footer-link">About</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Blog</a>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-heading">Support</h4>
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Contact</a>
                <a href="#" className="footer-link">FAQ</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} PortfolioPro. All rights reserved.</p>
            <div className="theme-toggle-small" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GetStarted;