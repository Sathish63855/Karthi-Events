import React from 'react';
import { useApp } from '../context/AppContext';
import CategoryCard from '../components/CategoryCard';
import ContactForm from '../components/ContactForm';

const Home = () => {
  const { categories } = useApp();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Events Into
              <span className="highlight"> Unforgettable Experiences</span>
            </h1>
            <p className="hero-subtitle">
              Professional event decoration services that bring your vision to life. 
              From intimate gatherings to grand celebrations, we create magic.
            </p>
            {/* <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Events Decorated</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Design Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Decoration Services</h2>
            <p className="section-subtitle">
              Explore our wide range of decoration categories tailored for every occasion
            </p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">We're here to make your event extraordinary</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>123 Event Street</p>
              <p>City, State 12345</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>+91 7603998728</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email Us</h3>
              <p>karthievents@gmail.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">⏰</div>
              <h3>Business Hours</h3>
              <p>Monday - Sunday</p>
              <p>9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;