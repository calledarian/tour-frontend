import React from 'react';

const LoadingSpinner = ({
    size = 60,
    color = '#3b82f6',
    strokeWidth = 6,
    className = ''
}) => {
    const spinnerStyle = {
        width: size,
        height: size,
        border: `${strokeWidth}px solid #f3f4f6`,
        borderTop: `${strokeWidth}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
    };

    return (
        <>
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
            <div style={containerStyle} className={className}>
                <div style={spinnerStyle}></div>
            </div>
        </>
    );
};

export default LoadingSpinner;