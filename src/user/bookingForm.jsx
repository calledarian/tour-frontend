import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/bookingForm.css";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export default function BookingForm() {
    const { id } = useParams();

    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        tourId: Number(id) || 0,
        name: "",
        email: "",
        people: 1,
        phone: "",
        notes: "",
    });

    // Get tour price
    useEffect(() => {
        if (!id) return;

        axios.get(`${apiUrl}/packages/${id}`)
            .then(res => {
                setPrice(res.data.price || 0);
                setLoading(false);
            })
            .catch(() => {
                setError("Could not load tour info. Please refresh the page.");
                setLoading(false);
            });
    }, [id]);

    // Calculate total price
    const getTotalPrice = () => {
        if (!price || formData.people < 1) return 0;

        let total = price * formData.people;

        // Discounts
        if (formData.people === 2) total = total * 0.9; // 10% off
        if (formData.people >= 3) total = total * 0.85; // 15% off

        return Math.round(total);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "people" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name.trim()) {
            setError("Please enter your name");
            return;
        }
        if (!formData.email.trim()) {
            setError("Please enter your email");
            return;
        }
        if (!formData.phone.trim()) {
            setError("Please enter your phone number");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const bookingData = {
                ...formData,
                totalPrice: getTotalPrice()
            };

            await axios.post(`${apiUrl}/bookings`, bookingData);
            setSuccess(true);

            // Reset form
            setFormData({
                tourId: Number(id) || 0,
                name: "",
                email: "",
                people: 1,
                phone: "",
                notes: "",
            });
        } catch (err) {
            setError("Booking failed. Please try again or call us directly.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error && !success) {
        return (
            <div className="error-box">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Refresh Page</button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="success-box">
                <h2>✅ Booking Sent!</h2>
                <p>We received your booking request. We'll call you within 24 hours to confirm.</p>
                <button onClick={() => setSuccess(false)}>Book Another Tour</button>
            </div>
        );
    }

    return (
        <div className="booking-container">
            <form onSubmit={handleSubmit} className="booking-form">
                <h2>Book This Tour</h2>

                <div className="input-group">
                    <label>Your Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Number of People *</label>
                    <select
                        name="people"
                        value={formData.people}
                        onChange={handleInputChange}
                        required
                    >
                        {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'Person' : 'People'} - ${Math.round(price * num * (num === 1 ? 1 : num === 2 ? 0.9 : 0.85))}
                            </option>
                        ))}
                    </select>
                    <small>Group Discount: 10% off for 2 people, 15% off for 3+ people</small>
                </div>

                <div className="input-group">
                    <label>Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                    />
                    <small>
                        Please include your country code. <br />
                        <strong>Americans: add +1 before your number</strong>
                    </small>
                </div>

                <div className="input-group">
                    <label>Special Requests (Optional)</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests, food preferences, etc."
                        rows="3"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="price-total">
                    <strong>Total: ${getTotalPrice()}</strong>
                    {formData.people > 1 && (
                        <small>({formData.people === 2 ? '10%' : '15%'} discount applied)</small>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="book-button"
                >
                    {submitting ? 'Sending...' : `Book Tour - $${getTotalPrice()}`}
                </button>

                <p className="note">
                    We'll call you to confirm details and payment options.
                </p>
            </form>
        </div>
    );
}