export const ImagePreview = ({ selectedImages }) => {
    if (!selectedImages || selectedImages.length === 0) return null;

    return (
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
    );
};