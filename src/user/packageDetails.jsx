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
        async function fetchPackage() {
            try {
                const response = await axios.get(`${apiUrl}/packages/${id}`);
                setPkg(response.data);
            } catch (err) {
                console.error(err);
                setError("Package not found or failed to load.");
            } finally {
                setLoading(false);
            }
        }

        fetchPackage();
    }, [id]);

    if (loading) return <p className="package-loading">Loading package details...</p>;
    if (error) return <p className="package-error">{error}</p>;
    if (!pkg) return null;

    return (
        <div className="package-container">
            <h1 className="package-title">{pkg.title}</h1>
            <p className="package-info"><strong>Location:</strong> {pkg.location}</p>
            <p className="package-info"><strong>Price:</strong> ${pkg.price}</p>
            <p className="package-info"><strong>Duration:</strong> {pkg.duration || "N/A"}</p>
            <p className="package-description">{pkg.description || "No description provided."}</p>
        </div>
    );
}
