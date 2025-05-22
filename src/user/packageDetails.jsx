import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/packageDetails.css";

const apiUrl = process.env.REACT_APP_API_URL;

export default function PackageDetails() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await axios.get(`${apiUrl}/packages/${id}`);
                setPkg(response.data);
            } catch (err) {
                console.error("Error fetching package:", err);
                setError("Package not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, [id]);

    if (loading) return <p className="package-loading">Loading package details...</p>;
    if (error) return <p className="package-error">{error}</p>;
    if (!pkg) return null;

    return (
        <div className="package-container">
            <h1 className="package-title">{pkg.title}</h1>

            {pkg.images?.length > 0 && (
                <div className="package-gallery">
                    {pkg.images.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`${pkg.title} - ${index + 1}`}
                            className="package-image"
                        />
                    ))}
                </div>
            )}

            <div className="package-info">
                <p><strong>Location:</strong> {pkg.location}</p>
                <p><strong>Price:</strong> ${pkg.price}</p>
                <p><strong>Duration:</strong> {pkg.duration}</p>
            </div>

            <p className="package-description">
                {pkg.description}
            </p>
        </div>
    );
}
