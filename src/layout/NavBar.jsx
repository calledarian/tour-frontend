import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">RambodaTours</Link>
                </div>

                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tours" className="nav-link">Tours</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="tel:+94712345678" className="nav-link" >+94 712 345 678</a>
                    </li>
                </ul>
            </div>
        </nav >
    );
}