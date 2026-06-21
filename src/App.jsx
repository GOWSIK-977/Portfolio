import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const fullText = 'MERN Stack Developer | IoT Enthusiast | AI Explorer';
  const [textIndex, setTextIndex] = useState(0);

  // Particle background effect
  useEffect(() => {
    const particleCount = 50;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect with loop
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      // Reset typing after delay
      const resetTimeout = setTimeout(() => {
        setTypedText('');
        setTextIndex(0);
        setIsTypingComplete(false);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [textIndex, fullText]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="portfolio-wrapper">
      {/* Particle Background */}
      <div className="particles-container">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float-particle ${10 + Math.random() * 20}s infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">G<span className="logo-highlight">.</span></span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? 'nav-link active' : 'nav-link'}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
              >
                <span className="nav-number">0{['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].indexOf(item) + 1}.</span>
                {item}
              </a>
            ))}
          </div>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="home-container">
          <div className="home-content">
            <div className="home-badge animate-on-scroll">
              <span className="badge-dot"></span>
              Available for opportunities
              <span className="badge-pulse"></span>
            </div>
            
            <h1 className="home-title animate-on-scroll">
              Hi, I'm <span className="gradient-text">Gowsik B</span>
            </h1>
            
            <div className="home-subtitle animate-on-scroll">
              <span className="typing-text">{typedText}</span>
              <span className={`typing-cursor ${isTypingComplete ? 'blink-fast' : ''}`}>|</span>
            </div>
            
            <p className="home-description animate-on-scroll">
              Enthusiastic IT undergraduate passionate about building scalable applications, 
              solving real-world problems through full-stack development, IoT, and AI.
            </p>

            <div className="home-actions animate-on-scroll">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                <i className="fas fa-paper-plane"></i> Let's Connect
              </button>
              <button className="btn-secondary" onClick={() => window.open('#', '_blank')}>
                <i className="fas fa-download"></i> Resume
              </button>
            </div>

            <div className="home-social animate-on-scroll">
              <a href="https://github.com/gowsik" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/gowsik" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://leetcode.com/u/Gowsik_977/" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fas fa-code"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="home-image animate-on-scroll">
            <div className="profile-image-wrapper">
              <div className="profile-image" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}>
                <img 
                  src="/profile.png" 
                  alt="Gowsik B"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<i class="fas fa-user-circle"></i>';
                  }}
                />
              </div>
              <div className="floating-badge badge-1" style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}>
                <i className="fas fa-code"></i>
                <span>Full Stack</span>
              </div>
              <div className="floating-badge badge-2" style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.2}px)` }}>
                <i className="fas fa-robot"></i>
                <span>AI/ML</span>
              </div>
              <div className="floating-badge badge-3" style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.4}px)` }}>
                <i className="fas fa-microchip"></i>
                <span>IoT</span>
              </div>
              <div className="profile-ring"></div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <span className="section-number">01</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line"></div>
          </div>

          <div className="about-grid">
            <div className="about-content animate-on-scroll">
              <h3>Passionate Developer & Problem Solver</h3>
              <p>
                I'm a B.Tech Information Technology student at Kongu Engineering College 
                with a strong foundation in full-stack development, IoT, and artificial intelligence.
              </p>
              <p>
                My journey in tech is driven by curiosity and the desire to create solutions 
                that make a difference. From building smart blind stick systems to developing 
                mental wellness platforms, I believe in using technology for social good.
              </p>
              
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">4+</span>
                  <span className="stat-label">Hackathons</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">8.71</span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Certifications</span>
                </div>
              </div>

              <div className="about-details">
                <div className="detail-item">
                  <i className="fas fa-envelope"></i>
                  <span>gowsik977@gmail.com</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 8754912296</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Karaikudi, Tamilnadu</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Kongu Engineering College</span>
                </div>
              </div>
            </div>

            <div className="about-education animate-on-scroll">
              <div className="edu-card">
                <div className="edu-icon">
                  <i className="fas fa-university"></i>
                </div>
                <div className="edu-content">
                  <h4>B.Tech Information Technology</h4>
                  <p className="edu-institute">Kongu Engineering College</p>
                  <p className="edu-period">2024 - 2028</p>
                  <p className="edu-score">CGPA: 8.71</p>
                </div>
              </div>

              <div className="edu-card">
                <div className="edu-icon">
                  <i className="fas fa-school"></i>
                </div>
                <div className="edu-content">
                  <h4>Higher Secondary</h4>
                  <p className="edu-institute">Sahayamatha Matric Hr.Sec School</p>
                  <p className="edu-period">2022 - 2024</p>
                  <p className="edu-score">88%</p>
                </div>
              </div>

              <div className="edu-card">
                <div className="edu-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="edu-content">
                  <h4>Certifications</h4>
                  <p className="edu-institute">Power BI - Non-Formal Course</p>
                  <p className="edu-period">2025-26 · 30 Hours</p>
                  <p className="edu-institute">Typewriting English Senior - First Class</p>
                  <p className="edu-period">Govt of Tamil Nadu · Aug 2023</p>
                </div>
              </div>

              <div className="edu-card">
                <div className="edu-icon">
                  <i className="fab fa-leetcode"></i>
                </div>
                <div className="edu-content">
                  <h4>LeetCode Profile</h4>
                  <a href="https://leetcode.com/u/Gowsik_977/" target="_blank" rel="noopener noreferrer" className="edu-link">
                    <i className="fas fa-external-link-alt"></i> View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <span className="section-number">02</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-line"></div>
          </div>

          <div className="skills-grid">
            <div className="skill-category animate-on-scroll">
              <div className="skill-category-header">
                <i className="fas fa-code"></i>
                <h3>Programming Languages</h3>
              </div>
              <div className="skill-items">
                {['Java', 'C', 'Python'].map((skill, index) => (
                  <div key={skill} className="skill-item">
                    <span>{skill}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ 
                        width: `${skill === 'Java' ? 85 : skill === 'Python' ? 80 : 75}%`,
                        animationDelay: `${index * 0.2}s`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <div className="skill-category-header">
                <i className="fas fa-laptop"></i>
                <h3>Frontend</h3>
              </div>
              <div className="skill-items">
                {['React.js', 'React Native', 'HTML/CSS'].map((skill, index) => (
                  <div key={skill} className="skill-item">
                    <span>{skill}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ 
                        width: `${skill === 'React.js' ? 80 : skill === 'React Native' ? 75 : 90}%`,
                        animationDelay: `${index * 0.2}s`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <div className="skill-category-header">
                <i className="fas fa-server"></i>
                <h3>Backend & Database</h3>
              </div>
              <div className="skill-items">
                {['Node.js', 'Express', 'FastAPI', 'MongoDB', 'PostgreSQL'].map((skill, index) => (
                  <div key={skill} className="skill-item">
                    <span>{skill}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ 
                        width: `${skill === 'Node.js' ? 75 : skill === 'MongoDB' ? 70 : 65}%`,
                        animationDelay: `${index * 0.1}s`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <div className="skill-category-header">
                <i className="fas fa-tools"></i>
                <h3>Tools & Others</h3>
              </div>
              <div className="skill-tags">
                {['Git', 'VS Code', 'Vercel', 'Render', 'Three.js', 'Docker', 'AWS'].map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <span className="section-number">03</span>
            <h2 className="section-title">Projects</h2>
            <div className="section-line"></div>
          </div>

          <div className="projects-grid">
            {[
              {
                title: "Smart Blind Stick System",
                icon: "fa-eye",
                description: "Advanced IoT system with Edge AI object detection (YOLOv8), text-to-speech, haptic alerts, and React Native app with GPS & SOS.",
                tags: ["IoT", "YOLOv8", "React Native"],
                color: "#2563eb",
                link: "https://github.com/gowsik/smart-blind-stick"
              },
              {
                title: "Virtual Herbal Garden",
                icon: "fa-leaf",
                description: "Educational platform for AYUSH systems with product purchasing, shop mapping, and AI chatbot for medicinal plant information.",
                tags: ["React", "AI Chatbot", "Maps"],
                color: "#10b981",
                link: "https://github.com/gowsik/virtual-herbal-garden"
              },
              {
                title: "CivicConnect - SIH 2025",
                icon: "fa-city",
                description: "Civic issue resolution platform using AI and data analytics. Selected among 600+ teams at Smart India Hackathon 2025.",
                tags: ["AI", "Analytics", "SIH"],
                color: "#f59e0b",
                link: "https://github.com/gowsik/civicconnect"
              },
              {
                title: "MindBlossom",
                icon: "fa-brain",
                description: "Mental wellness platform for anonymous emotional expression with AI support, stress-relief guidance, and mood-based Tamil songs.",
                tags: ["AI", "Privacy", "React"],
                color: "#8b5cf6",
                link: "https://github.com/gowsik/mindblossom"
              }
            ].map((project, index) => (
              <div key={index} className="project-card animate-on-scroll" style={{ '--project-color': project.color, animationDelay: `${index * 0.1}s` }}>
                <div className="project-card-inner">
                  <div className="project-icon" style={{ background: project.color }}>
                    <i className={`fas ${project.icon}`}></i>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag" style={{ borderColor: project.color, color: project.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className="fas fa-external-link-alt"></i> View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section achievements-section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <span className="section-number">04</span>
            <h2 className="section-title">Achievements</h2>
            <div className="section-line"></div>
          </div>

          <div className="achievements-grid">
            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="achievement-content">
                <h3>SIH 2025</h3>
                <p>College Level · Among 600+ teams</p>
                <span className="achievement-date">2025</span>
              </div>
            </div>

            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="achievement-content">
                <h3>BALANCE-BYTES 7H Hackathon</h3>
                <p>Gender Equality Club, KEC</p>
                <span className="achievement-date">Jan 2026</span>
              </div>
            </div>

            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="achievement-content">
                <h3>Byte-Rush 2K'25 8H</h3>
                <p>Dept of IT, Kongu Engineering College</p>
                <span className="achievement-date">Aug 2025</span>
              </div>
            </div>

            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="achievement-content">
                <h3>Madathon 8H</h3>
                <p>Mobile App Club, KEC</p>
                <span className="achievement-date">Dec 2025</span>
              </div>
            </div>

            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="achievement-content">
                <h3>Technical Events</h3>
                <p>Paper & Project Presentation</p>
                <span className="achievement-date">GCE Salem · Mar 2026</span>
              </div>
            </div>

            <div className="achievement-card animate-on-scroll">
              <div className="achievement-icon">
                <i className="fab fa-leetcode"></i>
              </div>
              <div className="achievement-content">
                <h3>LeetCode</h3>
                <p>Active Problem Solver</p>
                <a href="https://leetcode.com/u/Gowsik_977/" target="_blank" rel="noopener noreferrer" className="achievement-link">
                  <i className="fas fa-external-link-alt"></i> View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <span className="section-number">05</span>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-line"></div>
          </div>

          <div className="contact-content">
            <div className="contact-info animate-on-scroll">
              <h3>Let's work together!</h3>
              <p>
                I'm always open to new opportunities, collaborations, or just a friendly chat. 
                Feel free to reach out!
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:gowsik977@gmail.com">gowsik977@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+918754912296">+91 8754912296</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <span>Karaikudi, Tamilnadu, India</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-leetcode"></i>
                  </div>
                  <div>
                    <h4>LeetCode</h4>
                    <a href="https://leetcode.com/u/Gowsik_977/" target="_blank" rel="noopener noreferrer">
                      Gowsik_977
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div>
                    <h4>LinkedIn</h4>
                    <a href="https://linkedin.com/in/gowsik" target="_blank" rel="noopener noreferrer">
                      Gowsik B
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <a href="https://github.com/gowsik" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/gowsik" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://leetcode.com/u/Gowsik_977/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fas fa-code"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <form className="contact-form animate-on-scroll">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <span className="form-icon"><i className="fas fa-user"></i></span>
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
                <span className="form-icon"><i className="fas fa-envelope"></i></span>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" />
                <span className="form-icon"><i className="fas fa-tag"></i></span>
              </div>
              <div className="form-group">
                <textarea rows="5" placeholder="Your Message" required></textarea>
                <span className="form-icon"><i className="fas fa-pencil-alt"></i></span>
              </div>
              <button type="submit" className="btn-primary">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span>G<span>.</span></span>
              <p>Building the future, one line of code at a time.</p>
            </div>
            <div className="footer-links">
              {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Gowsik B. All rights reserved. Built with <i className="fas fa-heart" style={{ color: '#ef4444' }}></i></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;