import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Tours() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${apiUrl}/packages`);
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const handlePackageClick = (packageId) => {
        navigate(`/tours/${packageId}`);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingContent}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Loading amazing packages...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.mainTitle}>Discover Amazing Tours</h1>
                    <p style={styles.subtitle}>
                        Explore our carefully curated collection of unforgettable travel experiences
                    </p>
                </div>
            </div>

            {/* Packages Grid */}
            <div style={styles.packagesSection}>
                <div style={styles.packagesContainer}>
                    {packages.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>🏝️</div>
                            <h3 style={styles.emptyTitle}>No packages available</h3>
                            <p style={styles.emptyMessage}>
                                Check back soon for exciting new travel packages!
                            </p>
                        </div>
                    ) : (
                        <div style={styles.packagesGrid}>
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    style={styles.packageCard}
                                    onClick={() => handlePackageClick(pkg.id)}
                                >
                                    <div style={styles.imageContainer}>
                                        {pkg.images && pkg.images.length > 0 ? (
                                            <img
                                                src={pkg.images[0]}
                                                alt={pkg.title}
                                                style={styles.packageImage}
                                            />
                                        ) : (
                                            <div style={styles.imagePlaceholder}>
                                                <span style={styles.placeholderIcon}>🏞️</span>
                                            </div>
                                        )}
                                        <div style={styles.durationBadge}>
                                            {pkg.duration}
                                        </div>
                                    </div>

                                    <div style={styles.packageContent}>
                                        <h3 style={styles.packageTitle}>{pkg.title}</h3>
                                        <p style={styles.packageLocation}>
                                            <MapPin /> {pkg.location}
                                        </p>
                                        <div style={styles.packageFooter}>
                                            <div style={styles.priceContainer}>
                                                <span style={styles.priceLabel}>From</span>
                                                <span style={styles.price}>${pkg.price}</span>
                                            </div>
                                            <button style={styles.viewButton}>
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    loadingContainer: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
    },
    loadingContent: {
        textAlign: "center"
    },
    spinner: {
        width: "64px",
        height: "64px",
        border: "4px solid #e3e3e3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 20px"
    },
    loadingText: {
        color: "#666",
        fontSize: "18px",
        margin: 0
    },
    errorContainer: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
    },
    errorContent: {
        textAlign: "center",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: "400px"
    },
    errorIcon: {
        fontSize: "64px",
        marginBottom: "20px"
    },
    errorTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "10px"
    },
    errorMessage: {
        color: "#666",
        marginBottom: "20px"
    },
    retryButton: {
        backgroundColor: "#3498db",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    },
    header: {
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        padding: "60px 0"
    },
    headerContent: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        textAlign: "center"
    },
    mainTitle: {
        fontSize: "48px",
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: "16px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
    },
    subtitle: {
        fontSize: "20px",
        color: "#7f8c8d",
        maxWidth: "600px",
        margin: "0 auto",
        lineHeight: "1.6"
    },
    packagesSection: {
        padding: "80px 0"
    },
    packagesContainer: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px"
    },
    emptyState: {
        textAlign: "center",
        padding: "80px 20px",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
    },
    emptyIcon: {
        fontSize: "80px",
        marginBottom: "24px"
    },
    emptyTitle: {
        fontSize: "28px",
        color: "#2c3e50",
        marginBottom: "12px"
    },
    emptyMessage: {
        fontSize: "18px",
        color: "#7f8c8d"
    },
    packagesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "30px",
        padding: "20px 0"
    },
    packageCard: {
        backgroundColor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: "1px solid rgba(255,255,255,0.2)"
    },
    imageContainer: {
        position: "relative",
        height: "240px",
        overflow: "hidden"
    },
    packageImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.3s ease"
    },
    imagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    placeholderIcon: {
        fontSize: "48px",
        color: "#dee2e6"
    },
    durationBadge: {
        position: "absolute",
        top: "16px",
        right: "16px",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "500"
    },
    packageContent: {
        padding: "24px"
    },
    packageTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: "12px",
        lineHeight: "1.3"
    },
    packageLocation: {
        fontSize: "16px",
        color: "#7f8c8d",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },
    packageFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    priceContainer: {
        display: "flex",
        flexDirection: "column"
    },
    priceLabel: {
        fontSize: "14px",
        color: "#95a5a6",
        marginBottom: "4px"
    },
    price: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#e74c3c"
    },
    viewButton: {
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s ease"
    }
};

// Add CSS animation for spinner
const spinKeyframes = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Inject the keyframes into the document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
}