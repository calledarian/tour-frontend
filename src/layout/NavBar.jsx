import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>RambodaTours</Link>
                </div>

                <div className="nav-phone">
                    <a href="tel:+94712345678" className="nav-link">+94 712 345 678</a>
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
                        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tours" className="nav-link" onClick={closeMenu}>Tours</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}