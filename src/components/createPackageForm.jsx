import { useState, useEffect } from "react";
import axios from "axios";
import { ImagePreview } from "./imagePreview";
import { DurationSelector } from "./durationSelector";
import { ImagePlus, MapPin, DollarSign, FileText, CheckCircle, Loader2 } from "lucide-react";
import '../styles/createPackageForm.css'

const apiUrl = process.env.REACT_APP_API_URL;

export const CreatePackageForm = ({ onPackageCreated }) => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        duration: "1 day",
        description: "",
        costIncludes: "",
    });
    const [message, setMessage] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        try {
            const formPayload = new FormData();
            for (let key in formData) {
                formPayload.append(key, formData[key]);
            }
            formPayload.append("highlights", JSON.stringify(highlights));
            for (let i = 0; i < selectedImages.length; i++) {
                formPayload.append("images", selectedImages[i]);
            }

            const response = await axios.post(
                `${apiUrl}/packages/create`,
                formPayload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );


            setMessage("Package created successfully!");
            setLoading(false);
            setFormData({ title: "", location: "", price: "", duration: "1 day", description: "", costIncludes: "" });
            setSelectedImages([]);
            setHighlights([]);
            onPackageCreated(response.data);
        } catch {
            setMessage("Failed to create package.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="create-package-container">
            <h2 className="form-title"><FileText size={20} /> Create Package</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="images" className="form-label">
                        <ImagePlus size={16} /> Upload Images:
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif"
                        max={7}
                        onChange={handleImageChange}
                        className="form-input"
                    />
                </div>

                <ImagePreview selectedImages={selectedImages} />

                <div className="form-group">
                    <label htmlFor="title" className="form-label"><FileText size={16} /> Title:</label>
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
                    <label htmlFor="location" className="form-label"><MapPin size={16} /> Location:</label>
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
                    <label htmlFor="price" className="form-label"><DollarSign size={16} /> Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="any"
                        className="form-input"
                    />
                </div>

                <DurationSelector value={formData.duration} onChange={handleChange} />

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

                <div className="form-group">
                    <label htmlFor="costIncludes" className="form-label">Cost Includes:</label>
                    <input
                        type="text"
                        id="costIncludes"
                        name="costIncludes"
                        value={formData.costIncludes}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? <Loader2 className="loading-icon" size={16} /> : <CheckCircle size={16} />}
                    {loading ? "Creating..." : "Create Package"}
                </button>
            </form>

            {message && <p className="form-message">{message}</p>}
        </div>
    );
};
