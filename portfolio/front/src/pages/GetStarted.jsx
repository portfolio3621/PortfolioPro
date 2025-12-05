import "./styles/GetStarted.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
function GetStarted() {
  const [cookie] = useCookies(["userId"]);
  // Example portfolio data
  const examplePortfolios = [
    {
      id: 1,
      title: "Minimalist Developer",
      description: "Clean code-focused layout with project showcases",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "GitHub", "Light"],
    },
    {
      id: 2,
      title: "Creative Artist",
      description: "Visual portfolio with gallery and client testimonials",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80",
      tags: ["Gallery", "Testimonials", "Dark"],
    },
    {
      id: 3,
      title: "Professional Executive",
      description: "Corporate layout with experience timeline",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      tags: ["Resume", "Contact", "Blue"],
    },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Quick Setup",
      description: "Go live in minutes with our templates",
    },
    {
      icon: "💼",
      title: "Professional Design",
      description: "Impress employers with modern designs",
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Premium quality at accessible prices",
    },
  ];

  return (
    <div className="home-container">
      {/* Decorative circles */}
      <div className="circle-decoration circle-1"></div>
      <div className="circle-decoration circle-2"></div>

      {/* Navigation */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo">PortfolioPro</div>
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
            <Link to="/portfolio/buy" className="cta-button">
              <span className="text-hover-group">
                <span className="first-text">Buy a portfolio</span>
                <span className="sec-text">Get Started</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="main-content">
        <section className="hero-section fade-in">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="highlight">Showcase</span> your work with a
              professional portfolio
            </h1>
            <p className="hero-subtitle">
              Stand out from the crowd with a custom portfolio at an unbeatable
              price
            </p>
            <div className="hero-buttons">
              <Link to="/login">
                <button className="primary-button">Get Started</button>
              </Link>
              <Link to="/portfolio/buy">
                <button className="secondary-button">Buy a Portfolio</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Example Portfolios Section */}
        <section className="portfolios-section">
          <h2 className="section-title">
            <span className="highlight">Inspired?</span> See What's Possible
          </h2>

          <div className="portfolio-grid">
            {examplePortfolios.map((portfolio) => (
              <div key={portfolio.id} className="portfolio-card">
                <div className="portfolio-image-container">
                  <img
                    src={portfolio.image}
                    alt={portfolio.title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay">
                    <div className="bg-slate-600 p-3 rounded-xl">
                      <h3 className="portfolio-overlay-title">
                        {portfolio.title}
                      </h3>
                      <p className="m-0 text-slate-200">
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
                  <h3 className="text-black portfolio-title">
                    {portfolio.title}
                  </h3>
                  <p className="portfolio-description">
                    {portfolio.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="testimonial-section">
          <div className="testimonial-content">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              PortfolioPro helped me land 3x more interviews. The clean design
              impressed every recruiter who saw it - worth every penny!
            </p>
            <div className="testimonial-author">
              Suriyaprakash Raja, Full stack Developer
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} PortfolioPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default GetStarted;
