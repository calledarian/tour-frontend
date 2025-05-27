import { useEffect, useState } from 'react';
import { Calendar, Users, Phone, Mail, Clock, DollarSign, Check, X, Trash2, RefreshCw } from 'lucide-react';
import styles from '../styles/adminBooking.js';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');

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
            const res = await fetch(`${apiUrl}/bookings`, {
                headers: getAuthHeaders().headers
            });
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
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
            await fetch(`${apiUrl}/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders().headers
                },
                body: JSON.stringify({ status })
            });
            fetchBookings();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const deleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        try {
            await fetch(`${apiUrl}/bookings/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders().headers
            });
            fetchBookings();
        } catch (error) {
            alert('Failed to delete booking');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return { backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' };
            case 'pending': return { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
            case 'cancelled': return { backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
            default: return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesStatus;
    });

    const getBookingStats = () => {
        const total = bookings.length;
        const confirmed = bookings.filter(b => b.status === 'confirmed').length;
        const pending = bookings.filter(b => b.status === 'pending').length;
        const cancelled = bookings.filter(b => b.status === 'cancelled').length;
        return { total, confirmed, pending, cancelled };
    };

    const stats = getBookingStats();

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
                    <p>Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Bookings Management</h1>
                <p style={styles.subtitle}>Manage and track all tour bookings</p>

                <div style={styles.controls}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={styles.filterSelect}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                        onClick={fetchBookings}
                        style={styles.refreshButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>

                <div style={styles.statsRow}>
                    <div style={styles.statCard}>
                        <div style={styles.statValue}>{stats.total}</div>
                        <div style={styles.statLabel}>Total Bookings</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statValue, color: '#059669' }}>{stats.confirmed}</div>
                        <div style={styles.statLabel}>Confirmed</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statValue, color: '#d97706' }}>{stats.pending}</div>
                        <div style={styles.statLabel}>Pending</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.statValue, color: '#dc2626' }}>{stats.cancelled}</div>
                        <div style={styles.statLabel}>Cancelled</div>
                    </div>
                </div>
            </div>

            {filteredBookings.length === 0 ? (
                <div style={styles.emptyState}>
                    <Users size={64} style={styles.emptyIcon} />
                    <h3 style={styles.emptyTitle}>No bookings found</h3>
                    <p style={styles.emptyText}>
                        {statusFilter !== 'all'
                            ? 'No bookings found with the selected status'
                            : 'No bookings have been made yet'
                        }
                    </p>
                </div>
            ) : (
                <div style={styles.bookingsGrid}>
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            style={styles.bookingCard}
                            onMouseEnter={(e) => {
                                Object.assign(e.currentTarget.style, styles.bookingCardHover);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                e.currentTarget.style.transform = 'none';
                            }}
                        >
                            <div style={styles.cardHeader}>
                                <div style={styles.customerInfo}>
                                    <div style={styles.avatar}>
                                        <Users size={20} color="#3b82f6" />
                                    </div>
                                    <div>
                                        <div style={styles.customerName}>{booking.name}</div>
                                        <div style={styles.bookingId}>
                                            ID: {booking.id} | Tour: {booking.tourId}
                                        </div>
                                    </div>
                                </div>
                                <span style={{ ...styles.statusBadge, ...getStatusColor(booking.status) }}>
                                    {booking.status}
                                </span>
                            </div>

                            <div style={styles.detailsGrid}>
                                <div style={styles.detailItem}>
                                    <Mail style={styles.detailIcon} />
                                    <span style={styles.detailText}>{booking.email}</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Phone style={styles.detailIcon} />
                                    <span style={styles.detailText}>{booking.phone}</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Calendar style={styles.detailIcon} />
                                    <span style={styles.detailText}>{booking.tourDate}</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Users style={styles.detailIcon} />
                                    <span style={styles.detailText}>{booking.people} people</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Users style={styles.detailIcon} />
                                    <span style={styles.detailText}>{booking.referenceCode}</span>
                                </div>
                            </div>

                            {booking.notes && (
                                <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Notes:</div>
                                    <div style={{ fontSize: '14px', color: '#374151' }}>{booking.notes}</div>
                                </div>
                            )}

                            <div style={styles.priceSection}>
                                <div style={styles.price}>
                                    <DollarSign size={18} style={{ display: 'inline', marginRight: '4px' }} />
                                    {Number(booking.totalPrice).toFixed(2)}
                                </div>
                                <div style={styles.dateCreated}>
                                    <Clock size={12} />
                                    {new Date(booking.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div style={styles.actions}>
                                {booking.status !== 'confirmed' && (
                                    <button
                                        style={{ ...styles.actionButton, ...styles.confirmButton }}
                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                                    >
                                        <Check size={14} />
                                        Confirm
                                    </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                    <button
                                        style={{ ...styles.actionButton, ...styles.cancelButton }}
                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                                    >
                                        <X size={14} />
                                        Cancel
                                    </button>
                                )}
                                <button
                                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                                    onClick={() => deleteBooking(booking.id)}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminBookings;