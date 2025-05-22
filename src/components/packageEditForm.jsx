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
            <input
                name="description"
                value={editFormData.description || ""}
                onChange={handleEditChange}
                className="form-input"
                placeholder="Description"
            />
            <input
                name="cost includes;"
                value={editFormData.costIncludes || ""}
                onChange={handleEditChange}
                className="form-input"
                placeholder="Cost Includes"
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