import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import styles from "../styles/Tours";
import { usePackages } from "../utils/packageContext";

export default function Tours() {
    const { packages, loading } = usePackages();
    const navigate = useNavigate();

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
                            <div style={styles.emptyIcon}></div>
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
                                        <div style={styles.durationBadge}>{pkg.duration}</div>
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
                                            <button style={styles.viewButton}>View Details →</button>
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
