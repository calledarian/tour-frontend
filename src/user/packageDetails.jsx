import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/packageDetails.css';
import { MapPin } from "lucide-react";
import BookingForm from "./bookingForm";
import { usePackageDetails } from "../utils/packageDetailsContext";
import LoadingSpinner from "../utils/LoadingSpinner";

export default function PackageDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPackageById } = usePackageDetails(); // Use the context
    const [pkg, setPkg] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const parseHighlights = useCallback((highlights) => {
        if (!highlights) return [];
        if (Array.isArray(highlights)) return highlights;
        if (typeof highlights === "string") {
            try {
                return JSON.parse(highlights);
            } catch {
                return highlights.split('\n').filter(Boolean);
            }
        }
        return [];
    }, []);

    const fetchPackage = useCallback(async () => {
        if (!id) {
            setError("Invalid package ID");
            setLoading(false);
            return;
        }

        try {
            setError("");
            // Use the context function instead of axios directly
            const data = await fetchPackageById(id);

            const processedData = {
                ...data,
                highlights: parseHighlights(data.highlights)
            };

            setPkg(processedData);
        } catch (err) {
            // Handle errors that might come from the context
            setError(err.response?.data?.message || err.message || "Failed to load package details");
        } finally {
            setLoading(false);
        }
    }, [id, parseHighlights, fetchPackageById]);

    useEffect(() => {
        fetchPackage();
    }, [fetchPackage]);

    const handleRetry = () => {
        setLoading(true);
        fetchPackage();
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (error) {
        return (
            <div className="package-error">
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <div className="error-actions">
                    <button onClick={handleRetry} className="retry-btn">
                        Try Again
                    </button>
                    <button onClick={() => navigate(-1)} className="back-btn">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="package-error">
                <p>No package data available</p>
                <button onClick={() => navigate(-1)} className="back-btn">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="package-container">
            <button
                onClick={() => navigate(-1)}
                className="back-button"
                aria-label="Go back"
            >
                ← Back
            </button>

            <header className="package-header">
                <h1 className="package-title">{pkg.title}</h1>
                {pkg.location && (
                    <p className="package-location"><MapPin /> {pkg.location}</p>
                )}
            </header>

            {pkg.images?.length > 0 && (
                <section className="package-gallery">
                    <div className="main-image-container">
                        <img
                            src={pkg.images[selectedImageIndex]}
                            alt={`${pkg.title} - Main view`}
                            className="main-package-image"
                            loading="lazy"
                        />
                    </div>

                    {pkg.images.length > 1 && (
                        <div className="image-thumbnails">
                            {pkg.images.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleImageClick(index)}
                                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={url}
                                        alt={`${pkg.title} - Thumbnail ${index + 1}`}
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            )}

            <div className="package-content">
                <div className="package-info-grid">
                    {pkg.price && (
                        <div className="info-card price-card">
                            <h3>Price</h3>
                            <p className="price">{formatPrice(pkg.price)}</p>
                        </div>
                    )}

                    {pkg.duration && (
                        <div className="info-card">
                            <h3>Duration</h3>
                            <p>{pkg.duration}</p>
                        </div>
                    )}
                </div>

                {pkg.description && (
                    <section className="package-description">
                        <h2>About This Package</h2>
                        <p>{pkg.description}</p>
                    </section>
                )}

                {pkg.highlights?.length > 0 && (
                    <section className="package-highlights">
                        <h2>Daily Highlights</h2>
                        <div className="highlights-list">
                            {pkg.highlights.map((highlight, idx) => (
                                <div key={idx} className="highlight-item">
                                    <span className="day-number">Day {idx + 1}</span>
                                    <p>{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {pkg.costIncludes && (
                    <section className="package-includes">
                        <h2>What's Included</h2>
                        <div className="includes-content">
                            {pkg.costIncludes.split('\n').map((item, idx) => (
                                <p key={idx}>{item}</p>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            <BookingForm packageData={pkg} />
        </div>
    );
}