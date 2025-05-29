import { useState } from 'react';
import axios from 'axios';

export default function BookingVerify() {
    const [email, setEmail] = useState('');
    const [referenceCode, setReferenceCode] = useState('');
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setBooking(null);

        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }
        if (!referenceCode.trim()) {
            setError('Please enter your booking reference code.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/bookings/verify`, {
                email: email.trim(),
                referenceCode: referenceCode.trim(),
            });
            setBooking(response.data.booking);
        } catch (err) {
            setError('Booking not found or error fetching booking.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="booking-verification-section">
            <h2>Verify Your Booking</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    required
                />

                <label htmlFor="referenceCode">Booking Reference Code</label>
                <input
                    id="referenceCode"
                    type="text"
                    value={referenceCode}
                    onChange={e => setReferenceCode(e.target.value)}
                    placeholder="Enter your booking code"
                    disabled={loading}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Verify Booking'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {booking && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <p><strong>Name:</strong> {booking.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {booking.email || 'N/A'}</p>
                    <p><strong>Tour ID:</strong> {booking.tourId || 'N/A'}</p>
                    <p><strong>People:</strong> {booking.people || 'N/A'}</p>
                    <p><strong>Phone:</strong> {booking.phone || 'N/A'}</p>
                    <p><strong>Tour Date:</strong> {booking.tourDate ? new Date(booking.tourDate).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Status:</strong> {booking.status || 'N/A'}</p>
                    {booking.status === 'pending' && (
                        <p className="info-message">
                            We’ve received your booking. We will contact you shortly via phone (+94 712345678) or email (info@rambodatours.com).
                        </p>
                    )}
                    <p>
                        <strong>Total Price:</strong>{' '}
                        {booking.totalPrice && !isNaN(booking.totalPrice)
                            ? `$${Number(booking.totalPrice).toFixed(2)}`
                            : 'N/A'}
                    </p>
                    <p><strong>Notes:</strong> {booking.notes || 'N/A'}</p>
                </div>
            )}
        </section>
    );
}
