import React, { useRef } from 'react';
import './PowerBiDashboard.css';
const PowerBIDashboard = () => {
    const iframeRef = useRef(null);

    const toggleFullscreen = () => {
        const iframe = iframeRef.current;
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
            iframe.msRequestFullscreen();
        }
    };

    return (
        <div className="containerPowerBi mt" style={{ width: '100%' }}>
            <iframe
                ref={iframeRef}
                title="Dashboard_JO"
                width="1140"
                height="541.25"
                src="https://app.powerbi.com/reportEmbed?reportId=2cdbd5a9-9dea-4616-aeff-c71f927b4e9e&autoAuth=true&ctid=108bc864-cdf5-4ec3-8b7c-4eb06be1b41d"
                allowFullScreen={true}
                style={{ width: '100%', height: '100%' }}
            ></iframe>
            <button className="btn btn-secondary " onClick={toggleFullscreen}>
                Plein écran
            </button>
        </div>
    );
};

export default PowerBIDashboard;
