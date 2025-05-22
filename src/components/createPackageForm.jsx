import { useState, useEffect } from "react";
import axios from "axios";
import { ImagePreview } from "./imagePreview";
import { DurationSelector } from "./durationSelector";

const apiUrl = process.env.REACT_APP_API_URL;

export const CreatePackageForm = ({ onPackageCreated, getAuthHeaders }) => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        duration: "1 day",
        description: "",
    });
    const [message, setMessage] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [highlights, setHighlights] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "duration") {
            const days = parseInt(value) || 0;
            setHighlights((prev) =>
                Array.from({ length: days }, (_, i) => prev[i] || "")
            );
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("location", formData.location);
            formPayload.append("price", formData.price);
            formPayload.append("duration", formData.duration);
            formPayload.append("description", formData.description);
            formPayload.append("highlights", JSON.stringify(highlights));

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
            setHighlights([]);
            onPackageCreated(response.data);
        } catch {
            setMessage("Failed to create package.");
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
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

                <ImagePreview selectedImages={selectedImages} />

                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title:</label>
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
                    <label htmlFor="location" className="form-label">Location:</label>
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
                    <label htmlFor="price" className="form-label">Price:</label>
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

                <DurationSelector
                    value={formData.duration}
                    onChange={handleChange}
                />

                {highlights.map((highlight, index) => (
                    <div key={index} className="form-group">
                        <label className="form-label">Day {index + 1} Highlights:</label>
                        <textarea
                            className="form-input"
                            placeholder={`Describe what happens on Day ${index + 1}`}
                            value={highlight}
                            onChange={(e) => {
                                const updated = [...highlights];
                                updated[index] = e.target.value;
                                setHighlights(updated);
                            }}
                        />
                    </div>
                ))}


                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description:</label>
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
        </div>
    );
};