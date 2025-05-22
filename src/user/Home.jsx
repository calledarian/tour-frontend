import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/home.css";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Home() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${apiUrl}/packages`);
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching packages:', err);
                setError("Failed to load tour packages.");
                setLoading(false);

            }
        }
        fetchPackages();
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to Ramboda Tours</h1>
                <p>Your adventure starts here!</p>
                <Link to="/tours" className="explore-button">Explore Tours</Link>
            </div>

            {/* Featured Tours Section */}
            <div className="featured-tours-section">
                <h2 className="featured-tours-title">Featured Tours</h2>

                {loading ? (
                    <div className="loading-container">
                        <p>Loading amazing destinations...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="tour-packages-container">
                        {packages.length === 0 ? (
                            <p>No tour packages available.</p>
                        ) : (
                            <ul className="tour-packages-list">
                                {packages.map((pkg) => (
                                    <li className="tour-packages-item" key={pkg.id}>
                                        <div className="tour-packages-image"></div>
                                        <Link
                                            to={`/tours/${pkg.id}`}
                                            className="tour-packages-content-link"
                                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                        >
                                            <div className="tour-packages-content">
                                                <h3 className="tour-packages-item-title">{pkg.title}</h3>
                                                <p className="tour-packages-item-text">Location: {pkg.location}</p>
                                                <p className="tour-packages-item-text">Price: ${pkg.price}</p>
                                                <p className="tour-packages-item-text">Duration: {pkg.duration}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
