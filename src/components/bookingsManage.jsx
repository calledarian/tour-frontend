import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/adminBooking.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/bookings`, getAuthHeaders());
            setBookings(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${apiUrl}/bookings/${id}`, { status }, getAuthHeaders());
            fetchBookings();
        } catch {
            alert('Failed to update status');
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            await axios.delete(`${apiUrl}/bookings/${id}`, getAuthHeaders());
            fetchBookings();
        } catch {
            alert('Failed to delete booking');
        }
    };

    if (loading) return <p className="loading">Loading bookings...</p>;

    return (
        <div className="admin-container">
            <h1 className="admin-heading">Bookings Admin</h1>
            <div className="table-wrapper">

                {bookings.length === 0 ? (
                    <p className="empty-message">No bookings found.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tour ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>People</th>
                                <th>Phone</th>
                                <th>Notes</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>{b.tourId}</td>
                                    <td>{b.name}</td>
                                    <td>{b.email}</td>
                                    <td>{b.people}</td>
                                    <td>{b.phone}</td>
                                    <td>{b.notes || '-'}</td>
                                    <td>${Number(b.totalPrice).toFixed(2)}</td>
                                    <td>{b.status}</td>
                                    <td>{new Date(b.createdAt).toLocaleString()}</td>
                                    <td>
                                        <div className="button-group">
                                            {b.status !== 'confirmed' && (
                                                <button
                                                    className="btn btn-confirm"
                                                    onClick={() => updateStatus(b.id, 'confirmed')}
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                            {b.status !== 'cancelled' && (
                                                <button
                                                    className="btn btn-cancel"
                                                    onClick={() => updateStatus(b.id, 'cancelled')}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => deleteBooking(b.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;
