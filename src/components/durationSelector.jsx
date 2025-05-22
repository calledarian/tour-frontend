export const DurationSelector = ({ value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor="duration" className="form-label">Duration:</label>
            <select
                id="duration"
                name="duration"
                value={value}
                onChange={onChange}
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
    );
};