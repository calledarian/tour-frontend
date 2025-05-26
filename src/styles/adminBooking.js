const styles = {
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
    },
    header: {
        marginBottom: '32px'
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '8px'
    },
    subtitle: {
        fontSize: '16px',
        color: '#64748b',
        marginBottom: '24px'
    },
    controls: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    },
    searchContainer: {
        position: 'relative',
        flex: '1',
        minWidth: '250px'
    },
    searchInput: {
        width: '100%',
        padding: '12px 16px 12px 44px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    searchIcon: {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af'
    },
    filterSelect: {
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        minWidth: '120px'
    },
    refreshButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '14px',
        color: '#64748b'
    },
    bookingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px'
    },
    bookingCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    },
    bookingCardHover: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px'
    },
    customerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    avatar: {
        width: '48px',
        height: '48px',
        backgroundColor: '#dbeafe',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    customerName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '4px'
    },
    bookingId: {
        fontSize: '12px',
        color: '#64748b'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px'
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    detailIcon: {
        color: '#64748b',
        width: '16px',
        height: '16px'
    },
    detailText: {
        fontSize: '14px',
        color: '#374151'
    },
    priceSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #e2e8f0'
    },
    price: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#059669'
    },
    dateCreated: {
        fontSize: '12px',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    actions: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end'
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    confirmButton: {
        backgroundColor: '#059669',
        color: 'white'
    },
    cancelButton: {
        backgroundColor: '#dc2626',
        color: 'white'
    },
    deleteButton: {
        backgroundColor: '#6b7280',
        color: 'white'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#64748b'
    },
    emptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
    },
    emptyIcon: {
        width: '64px',
        height: '64px',
        color: '#9ca3af',
        margin: '0 auto 16px'
    },
    emptyTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px'
    },
    emptyText: {
        fontSize: '14px',
        color: '#64748b'
    }
};
export default styles;