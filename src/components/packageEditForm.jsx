import { useState } from "react";

export const PackageEditForm = ({ pkg, onSave, onCancel }) => {
    const [editFormData, setEditFormData] = useState({
        title: pkg.title,
        location: pkg.location,
        price: pkg.price,
        duration: pkg.duration,
        description: pkg.description,
        costIncludes: pkg.costIncludes,
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(pkg.id, editFormData);
    };

    return (
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
            <input
                name="description"
                value={editFormData.description || ""}
                onChange={handleEditChange}
                className="form-input"
                placeholder="Description"
            />

            <button
                style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
                onClick={handleSave}
            >
                Save
            </button>
            <button
                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    );
};