import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/dashboard.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Dashboard() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        duration: "1 day",
        description: "",
    });
    const [message, setMessage] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${apiUrl}/packages`, getAuthHeaders());
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load packages.");
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        try {
            await axios.delete(`${apiUrl}/packages/${id}`, getAuthHeaders());
            setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
        } catch (err) {
            alert("Failed to delete package.");
        }
    };

    const handleEdit = (pkg) => {
        setEditId(pkg.id);
        setEditFormData({
            title: pkg.title,
            location: pkg.location,
            url: pkg.url,
            price: pkg.price,
            duration: pkg.duration,
            description: pkg.description,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditFormData({});
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`${apiUrl}/packages/${id}`, editFormData, getAuthHeaders());
            setPackages((prev) =>
                prev.map((pkg) => (pkg.id === id ? { ...pkg, ...editFormData } : pkg))
            );
            setEditId(null);
            setEditFormData({});
        } catch (err) {
            alert("Failed to update package.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formPayload = new FormData();

            // Append text fields
            formPayload.append("title", formData.title);
            formPayload.append("location", formData.location);
            formPayload.append("price", formData.price);
            formPayload.append("duration", formData.duration);
            formPayload.append("description", formData.description);

            // Append images
            for (let i = 0; i < selectedImages.length; i++) {
                formPayload.append("images", selectedImages[i]);
            }

            const response = await axios.post(`${apiUrl}/packages/create`, formPayload, {
                ...getAuthHeaders(),
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...getAuthHeaders().headers,
                },
            });

            setMessage("Package created successfully!");
            setFormData({ title: "", location: "", price: "", duration: "1 day", description: "" });
            setSelectedImages([]);
            setPackages((prev) => [...prev, response.data]);
        } catch {
            setMessage("Failed to create package.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (loading) return <p>Loading packages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="create-package-container">
            <button
                onClick={handleLogout}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "crimson",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginBottom: "20px",
                }}
            >
                Logout
            </button>
            <h2 className="create-package-title">Create Package</h2>
            <form onSubmit={handleSubmit} className="create-package-form">
                <div className="form-group">
                    <label htmlFor="images" className="form-label">
                        Upload Images:
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                        className="form-input"
                    />
                </div>

                {/* Image preview */}
                <div className="image-preview-container" style={{ display: "flex", marginBottom: 20 }}>
                    {[...selectedImages].map((file, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                                marginRight: 10,
                                borderRadius: 5,
                                border: "1px solid #ccc",
                            }}
                        />
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location" className="form-label">
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="form-label">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration" className="form-label">
                        Duration:
                    </label>
                    <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        {[...Array(10)].map((_, i) => {
                            const day = i + 1;
                            return (
                                <option key={day} value={`${day} day${day > 1 ? "s" : ""}`}>
                                    {day} day{day > 1 ? "s" : ""}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Create Package
                </button>
            </form>
            {message && <p className="form-message">{message}</p>}

            <div className="tour-packages-container">
                <h2 className="tour-packages-title">Tour Packages</h2>
                {packages.length === 0 ? (
                    <p>No packages available.</p>
                ) : (
                    <ul className="tour-packages-list">
                        {packages.map((pkg) => (

                            <li className="tour-packages-item" key={pkg.id}>
                                <Link
                                    to={`/tours/${(pkg.id)}`}
                                    className="tour-packages-content-link"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="tour-packages-image">
                                        {pkg.images && pkg.images.length > 0 && (
                                            <img
                                                src={pkg.images[0]}
                                                alt={pkg.title}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: "5px",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="tour-packages-content">
                                        <h3 className="tour-packages-item-title">{pkg.title}</h3>
                                        <p className="tour-packages-item-text">Location: {pkg.location}</p>
                                        <p className="tour-packages-item-text">Price: ${pkg.price}</p>
                                        <p className="tour-packages-item-text">Duration: {pkg.duration}</p>
                                        <Link
                                            to={`/tours/${(pkg.id)}`}
                                            className="tour-packages-content-link"
                                            style={{ textDecoration: "none", color: "green", display: "block" }}
                                        >
                                            External Details
                                        </Link>
                                    </div>
                                </Link>

                                <div className="tour-packages-actions">
                                    {editId === pkg.id ? (
                                        <div className="edit-form">
                                            <input
                                                name="title"
                                                value={editFormData.title || ""}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                placeholder="Title"
                                                required
                                            />
                                            <input
                                                name="location"
                                                value={editFormData.location || ""}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                placeholder="Location"
                                                required
                                            />
                                            <input
                                                name="price"
                                                type="number"
                                                value={editFormData.price || ""}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                placeholder="Price"
                                                required
                                            />
                                            <select
                                                name="duration"
                                                value={editFormData.duration || "1 day"}
                                                onChange={handleEditChange}
                                                className="form-input"
                                                required
                                            >
                                                {[...Array(10)].map((_, i) => {
                                                    const day = i + 1;
                                                    return (
                                                        <option key={day} value={`${day} day${day > 1 ? "s" : ""}`}>
                                                            {day} day{day > 1 ? "s" : ""}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            <button
                                                style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
                                                onClick={() => handleSaveEdit(pkg.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                className="tour-packages-btn edit-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(pkg);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="tour-packages-btn delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(pkg.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
