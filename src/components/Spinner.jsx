import React from 'react';
import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const SpinnerOverlay = () => {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#1976D2");

    const estiloPersonalizado = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999, // Asegura que el Spinner esté en la parte superior
    };


    return (
        <div className="spinner-overlay" style={overlayStyle}>
            <BeatLoader
                color={color}
                loading={loading}
                cssOverride={estiloPersonalizado}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default SpinnerOverlay;