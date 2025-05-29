const styles = {
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        '@media (max-width: 768px)': {
            padding: '16px'
        },
        '@media (max-width: 480px)': {
            padding: '12px'
        },
        '@media (max-width: 375px)': {
            padding: '10px'
        },
        '@media (max-width: 340px)': {
            padding: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '4px'
        }
    },
    header: {
        marginBottom: '32px',
        '@media (max-width: 480px)': {
            marginBottom: '24px'
        },
        '@media (max-width: 320px)': {
            marginBottom: '16px'
        }
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '8px',
        '@media (max-width: 768px)': {
            fontSize: '28px'
        },
        '@media (max-width: 480px)': {
            fontSize: '24px'
        },
        '@media (max-width: 375px)': {
            fontSize: '22px'
        },
        '@media (max-width: 340px)': {
            fontSize: '20px'
        },
        '@media (max-width: 320px)': {
            fontSize: '18px'
        },
        '@media (max-width: 280px)': {
            fontSize: '16px'
        }
    },
    subtitle: {
        fontSize: '16px',
        color: '#64748b',
        marginBottom: '24px',
        '@media (max-width: 480px)': {
            fontSize: '14px',
            marginBottom: '16px'
        },
        '@media (max-width: 320px)': {
            fontSize: '13px',
            marginBottom: '12px'
        },
        '@media (max-width: 280px)': {
            fontSize: '12px'
        }
    },
    controls: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        '@media (max-width: 640px)': {
            flexDirection: 'column',
            gap: '12px'
        },
        '@media (max-width: 375px)': {
            gap: '10px'
        },
        '@media (max-width: 340px)': {
            gap: '8px'
        },
        '@media (max-width: 320px)': {
            gap: '6px'
        },
        '@media (max-width: 280px)': {
            gap: '4px'
        }
    },
    searchContainer: {
        position: 'relative',
        flex: '1',
        minWidth: '250px',
        '@media (max-width: 640px)': {
            minWidth: 'auto',
            width: '100%'
        }
    },
    searchInput: {
        width: '100%',
        padding: '12px 16px 12px 44px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        transition: 'all 0.2s ease',
        '@media (max-width: 480px)': {
            padding: '10px 14px 10px 40px',
            fontSize: '16px'
        },
        '@media (max-width: 375px)': {
            padding: '9px 12px 9px 38px'
        },
        '@media (max-width: 340px)': {
            padding: '8px 12px 8px 36px',
            borderRadius: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '7px 10px 7px 34px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '6px 8px 6px 32px',
            borderRadius: '4px'
        },
        '&:focus': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
        }
    },
    searchIcon: {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
        '@media (max-width: 340px)': {
            left: '12px'
        },
        '@media (max-width: 320px)': {
            left: '10px'
        },
        '@media (max-width: 280px)': {
            left: '8px'
        }
    },
    filterSelect: {
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        fontSize: '14px',
        backgroundColor: 'white',
        outline: 'none',
        minWidth: '120px',
        '@media (max-width: 640px)': {
            width: '100%',
            minWidth: 'auto'
        },
        '@media (max-width: 480px)': {
            padding: '10px 14px',
            fontSize: '16px'
        },
        '@media (max-width: 340px)': {
            padding: '8px 12px',
            borderRadius: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '7px 10px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '6px 8px',
            borderRadius: '4px'
        }
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
        transition: 'all 0.2s ease',
        '@media (max-width: 640px)': {
            width: '100%',
            justifyContent: 'center'
        },
        '@media (max-width: 480px)': {
            padding: '10px 16px'
        },
        '@media (max-width: 340px)': {
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px'
        },
        '@media (max-width: 320px)': {
            padding: '7px 10px',
            borderRadius: '6px',
            fontSize: '12px'
        },
        '@media (max-width: 280px)': {
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '11px'
        },
        '&:hover': {
            backgroundColor: '#2563eb'
        }
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px'
        },
        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
        },
        '@media (max-width: 340px)': {
            gridTemplateColumns: '10.5fr',
            gap: '8px'
        },
        '@media (max-width: 280px)': {
            gap: '6px'
        }
    },
    statCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '@media (max-width: 480px)': {
            padding: '16px'
        },
        '@media (max-width: 340px)': {
            padding: '12px',
            borderRadius: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '10px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '8px',
            borderRadius: '4px'
        }
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '4px',
        '@media (max-width: 480px)': {
            fontSize: '20px'
        },
        '@media (max-width: 340px)': {
            fontSize: '18px'
        },
        '@media (max-width: 320px)': {
            fontSize: '16px'
        },
        '@media (max-width: 280px)': {
            fontSize: '14px'
        }
    },
    statLabel: {
        fontSize: '14px',
        color: '#64748b',
        '@media (max-width: 340px)': {
            fontSize: '12px'
        },
        '@media (max-width: 320px)': {
            fontSize: '11px'
        },
        '@media (max-width: 280px)': {
            fontSize: '10px'
        }
    },
    bookingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 0.5fr))',
        gap: '20px',
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px'
        },
        '@media (max-width: 640px)': {
            gridTemplateColumns: '1fr',
            gap: '12px'
        },
        '@media (max-width: 340px)': {
            gap: '10px'
        },
        '@media (max-width: 320px)': {
            gap: '8px'
        },
        '@media (max-width: 280px)': {
            gap: '6px'
        }
    },
    bookingCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '@media (max-width: 480px)': {
            padding: '16px',
            borderRadius: '12px'
        },
        '@media (max-width: 340px)': {
            padding: '12px',
            borderRadius: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '10px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '8px',
            borderRadius: '4px'
        }
    },
    bookingCardHover: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
        '@media (max-width: 480px)': {
            marginBottom: '16px',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'stretch'
        },
        '@media (max-width: 320px)': {
            marginBottom: '12px',
            gap: '8px'
        },
        '@media (max-width: 280px)': {
            marginBottom: '10px',
            gap: '6px'
        }
    },
    customerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        '@media (max-width: 340px)': {
            gap: '8px'
        },
        '@media (max-width: 280px)': {
            gap: '6px'
        }
    },
    avatar: {
        width: '48px',
        height: '48px',
        backgroundColor: '#dbeafe',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 480px)': {
            width: '40px',
            height: '40px'
        },
        '@media (max-width: 340px)': {
            width: '36px',
            height: '36px'
        },
        '@media (max-width: 320px)': {
            width: '32px',
            height: '32px'
        },
        '@media (max-width: 280px)': {
            width: '28px',
            height: '28px'
        }
    },
    customerName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '4px',
        '@media (max-width: 480px)': {
            fontSize: '16px'
        },
        '@media (max-width: 340px)': {
            fontSize: '14px'
        },
        '@media (max-width: 320px)': {
            fontSize: '13px'
        },
        '@media (max-width: 280px)': {
            fontSize: '12px'
        }
    },
    bookingId: {
        fontSize: '12px',
        color: '#64748b',
        '@media (max-width: 340px)': {
            fontSize: '11px'
        },
        '@media (max-width: 280px)': {
            fontSize: '10px'
        }
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        '@media (max-width: 480px)': {
            alignSelf: 'flex-start'
        },
        '@media (max-width: 340px)': {
            padding: '4px 8px',
            fontSize: '10px'
        },
        '@media (max-width: 320px)': {
            padding: '3px 6px',
            fontSize: '9px'
        },
        '@media (max-width: 280px)': {
            padding: '2px 4px',
            fontSize: '8px'
        }
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px',
        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
            gap: '8px',
            marginBottom: '16px'
        },
        '@media (max-width: 320px)': {
            gap: '6px',
            marginBottom: '12px'
        },
        '@media (max-width: 280px)': {
            gap: '4px',
            marginBottom: '8px'
        }
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        '@media (max-width: 340px)': {
            gap: '6px'
        },
        '@media (max-width: 280px)': {
            gap: '4px'
        }
    },
    detailIcon: {
        color: '#64748b',
        width: '16px',
        height: '16px',
        flexShrink: 0,
        '@media (max-width: 340px)': {
            width: '14px',
            height: '14px'
        },
        '@media (max-width: 320px)': {
            width: '12px',
            height: '12px'
        },
        '@media (max-width: 280px)': {
            width: '10px',
            height: '10px'
        }
    },
    detailText: {
        fontSize: '14px',
        color: '#374151',
        '@media (max-width: 340px)': {
            fontSize: '12px'
        },
        '@media (max-width: 320px)': {
            fontSize: '11px'
        },
        '@media (max-width: 280px)': {
            fontSize: '10px'
        }
    },
    priceSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #e2e8f0',
        '@media (max-width: 480px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '16px'
        },
        '@media (max-width: 320px)': {
            marginBottom: '12px',
            paddingTop: '12px'
        },
        '@media (max-width: 280px)': {
            marginBottom: '8px',
            paddingTop: '8px'
        }
    },
    price: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#059669',
        '@media (max-width: 480px)': {
            fontSize: '18px'
        },
        '@media (max-width: 340px)': {
            fontSize: '16px'
        },
        '@media (max-width: 320px)': {
            fontSize: '14px'
        },
        '@media (max-width: 280px)': {
            fontSize: '12px'
        }
    },
    dateCreated: {
        fontSize: '12px',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        '@media (max-width: 340px)': {
            fontSize: '11px'
        },
        '@media (max-width: 280px)': {
            fontSize: '10px'
        }
    },
    actions: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        '@media (max-width: 480px)': {
            justifyContent: 'stretch',
            gap: '6px'
        },
        '@media (max-width: 340px)': {
            flexDirection: 'column',
            gap: '4px'
        },
        '@media (max-width: 280px)': {
            gap: '2px'
        }
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
        transition: 'all 0.2s ease',
        '@media (max-width: 480px)': {
            flex: 1,
            justifyContent: 'center'
        },
        '@media (max-width: 340px)': {
            padding: '6px 8px',
            fontSize: '11px'
        },
        '@media (max-width: 320px)': {
            padding: '5px 6px',
            fontSize: '10px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '4px 4px',
            fontSize: '9px',
            borderRadius: '4px'
        }
    },
    confirmButton: {
        backgroundColor: '#059669',
        color: 'white',
        '&:hover': {
            backgroundColor: '#047857'
        }
    },
    cancelButton: {
        backgroundColor: '#dc2626',
        color: 'white',
        '&:hover': {
            backgroundColor: '#b91c1c'
        }
    },
    deleteButton: {
        backgroundColor: '#6b7280',
        color: 'white',
        '&:hover': {
            backgroundColor: '#4b5563'
        }
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#64748b',
        '@media (max-width: 480px)': {
            padding: '24px',
            fontSize: '14px'
        },
        '@media (max-width: 320px)': {
            padding: '16px',
            fontSize: '12px'
        },
        '@media (max-width: 280px)': {
            padding: '12px',
            fontSize: '11px'
        }
    },
    emptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        '@media (max-width: 480px)': {
            padding: '40px 16px',
            borderRadius: '12px'
        },
        '@media (max-width: 340px)': {
            padding: '24px 12px',
            borderRadius: '8px'
        },
        '@media (max-width: 320px)': {
            padding: '16px 8px',
            borderRadius: '6px'
        },
        '@media (max-width: 280px)': {
            padding: '12px 6px',
            borderRadius: '4px'
        }
    },
    emptyIcon: {
        width: '64px',
        height: '64px',
        color: '#9ca3af',
        margin: '0 auto 16px',
        '@media (max-width: 480px)': {
            width: '48px',
            height: '48px',
            marginBottom: '12px'
        },
        '@media (max-width: 340px)': {
            width: '40px',
            height: '40px',
            marginBottom: '8px'
        },
        '@media (max-width: 320px)': {
            width: '32px',
            height: '32px',
            marginBottom: '6px'
        },
        '@media (max-width: 280px)': {
            width: '24px',
            height: '24px',
            marginBottom: '4px'
        }
    },
    emptyTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px',
        '@media (max-width: 480px)': {
            fontSize: '16px'
        },
        '@media (max-width: 340px)': {
            fontSize: '14px'
        },
        '@media (max-width: 320px)': {
            fontSize: '13px'
        },
        '@media (max-width: 280px)': {
            fontSize: '12px'
        }
    },
    emptyText: {
        fontSize: '14px',
        color: '#64748b',
        '@media (max-width: 340px)': {
            fontSize: '12px'
        },
        '@media (max-width: 320px)': {
            fontSize: '11px'
        },
        '@media (max-width: 280px)': {
            fontSize: '10px'
        }
    }
};

export default styles;