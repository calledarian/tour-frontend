import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/bookingForm.css";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_SITE_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

export default function BookingForm({ packageData }) {
    const { id } = useParams();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [price, setPrice] = useState(packageData?.price || 0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        tourId: Number(id),
        name: "",
        email: "",
        people: 1,
        phone: "",
        tourDate: '',
        notes: "",
        extra_field: "",
    });

    // Use packageData prop instead of fetching
    useEffect(() => {
        if (packageData && packageData.price) {
            setPrice(packageData.price);
            setLoading(false);
        } else if (packageData && !packageData.price) {
            setPrice(0);
            setLoading(false);
        }
        // If no packageData, keep loading state (parent is still fetching)
    }, [packageData]);

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

        if (!captchaToken) {
            alert('Please verify that you are not a robot.');
            return;
        }

        setSubmitting(true);
        setError("");

        if (formData.extra_field) {
            setError("Bot detected. Submission rejected.");
            setSubmitting(false);
            return;
        }

        try {
            const bookingData = {
                ...formData,
                totalPrice: getTotalPrice(),
                captchaToken, // <-- send token here!
            };

            await axios.post(`${apiUrl}/bookings`, bookingData);

            setSuccess(true);
            setFormData({
                tourId: Number(id),
                name: "",
                email: "",
                people: 1,
                phone: "",
                tourDate: "",
                notes: "",
                extra_field: "",
            });
            setCaptchaToken(null); // reset captcha for new form
        } catch (err) {
            setError("Booking failed. Please try again or call us directly.");
        } finally {
            setSubmitting(false);
        }
    };


    if (loading && !packageData) {
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
            <div className="success-box" style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <h2 style={{ color: "#2ecc40", fontSize: "2.2rem", marginBottom: "0.5rem" }}>✅ Booking Sent!</h2>
                <h3 style={{ margin: "0.5rem 0 1.5rem", color: "#222" }}>We received your booking request.</h3>
                <div style={{
                    background: "#f4f8fb",
                    borderRadius: "10px",
                    display: "inline-block",
                    padding: "1.2rem 2rem",
                    marginBottom: "1.5rem",
                    boxShadow: "0 2px 8px #e0e0e0"
                }}>
                    <p style={{ margin: "0.5rem 0" }}>
                        We'll call you from <a href="tel:+94712345678" style={{ color: "#0074d9", fontWeight: 500 }}>+94 712 345 678</a>
                        <br />
                        or email you from <a href="mailto:info@rambodatours.com" style={{ color: "#0074d9", fontWeight: 500 }}>info@rambodatours.com</a>
                    </p>
                    <p style={{ margin: "0.5rem 0" }}>
                        within <strong>24 hours</strong> to confirm your booking.
                    </p>
                    <p style={{ margin: "0.5rem 0" }}>
                        We'll provide your reference code and verify your email address.<br />
                        Please check your inbox and follow the instructions.
                    </p>
                </div>
                <Link to="/" className="back-link" style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    padding: "0.7rem 2.2rem",
                    background: "#0074d9",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    boxShadow: "0 1px 4px #b0c4de"
                }}>
                    ⬅ Back to Home
                </Link>
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
                    <label>Date:</label>
                    <input
                        type="date"
                        name="tourDate"
                        value={formData.tourDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <small>
                        Please choose a date <br />
                    </small>
                </div>
                <input
                    type="text"
                    name="extra_field"
                    value={formData.extra_field || ""}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                />
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

                <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                    <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        onExpired={() => setCaptchaToken(null)}
                    />
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