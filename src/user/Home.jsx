import { Link } from "react-router-dom";
import "../styles/home.css";
import { MapPin, DollarSign, Clock, Star, Users, Globe, Award } from "lucide-react";

export default function Home() {
    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Ramboda Tours</h1>
                    <p className="hero-description">
                        Your local travel companion for authentic adventures and unforgettable experiences
                    </p>
                    <div className="hero-actions">
                        <Link className="cta-primary" to="/tours">Browse Tours</Link>
                        <Link className="cta-secondary" to="/contact">Contact Us</Link>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Us?</h2>
                        <p className="section-subtitle">
                            Personal service with local expertise you can trust
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <MapPin size={32} />
                            </div>
                            <h3 className="feature-title">Local Expertise</h3>
                            <p className="feature-description">
                                Hand-picked destinations by locals who know the hidden gems
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <DollarSign size={32} />
                            </div>
                            <h3 className="feature-title">Fair Pricing</h3>
                            <p className="feature-description">
                                Honest, transparent pricing with no hidden fees
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Clock size={32} />
                            </div>
                            <h3 className="feature-title">Personal Support</h3>
                            <p className="feature-description">
                                Direct contact with our team whenever you need help
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <div className="stat-icon">
                            <Users size={24} />
                        </div>
                        <div className="stat-number">200+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon">
                            <Globe size={24} />
                        </div>
                        <div className="stat-number">20+</div>
                        <div className="stat-label">Destinations</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon">
                            <Award size={24} />
                        </div>
                        <div className="stat-number">8</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-icon">
                            <Star size={24} />
                        </div>
                        <div className="stat-number">4.9</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>
            </section>
        </div>
    );
}