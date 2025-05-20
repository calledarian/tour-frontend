import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export default function PackageDetail() {
    const { title } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPackage() {
            try {
                const decodedTitle = decodeURIComponent(title);
                // Adjust this to your API: 
                // Example assumes GET /packages?title=xyz returns array
                const response = await axios.get(`${apiUrl}/packages?title=${encodeURIComponent(decodedTitle)}`);
                if (response.data.length > 0) {
                    setPkg(response.data[0]);
                } else {
                    setError("Package not found");
                }
            } catch {
                setError("Failed to fetch package details.");
            } finally {
                setLoading(false);
            }
        }
        fetchPackage();
    }, [title]);

    if (loading) return <p>Loading package details...</p>;
    if (error) return <p>{error}</p>;
    if (!pkg) return null;

    return (
        <div style={{ padding: 20 }}>
            <h2>{pkg.title}</h2>
            <p><strong>Location:</strong> {pkg.location}</p>
            <p><strong>Price:</strong> ${pkg.price}</p>
            <p><strong>Duration:</strong> {pkg.duration}</p>
        </div>
    );
}
