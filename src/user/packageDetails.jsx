import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/packageDetails.css'

const apiUrl = process.env.REACT_APP_API_URL;

export default function PackageDetails() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axios.get(`${apiUrl}/packages/${id}`);
                let data = res.data;

                // Parse highlights if it's a string (JSON)
                if (data.highlights && typeof data.highlights === "string") {
                    try {
                        data.highlights = JSON.parse(data.highlights);
                    } catch {
                        data.highlights = [];
                    }
                }

                setPkg(data);
            } catch (err) {
                setError("Package not found or server error.");
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, [id]);


    if (loading) return <div className="package-loading">Loading...</div>;
    if (error) return <div className="package-error">{error}</div>;

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

            <p className="package-description">{pkg.description}</p>

            {pkg.highlights?.length > 0 && (
                <div className="package-highlights">
                    <h3>Daily Highlights</h3>
                    <ul>
                        {pkg.highlights.map((highlight, idx) => (
                            <li key={idx}>
                                <strong>Day {idx + 1}:</strong> {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
