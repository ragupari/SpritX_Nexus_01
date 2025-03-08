import React from 'react';
import '../components/Style.css';

const NotFound = () => {
    return (
        <div className="wrapper">
            <div className="error-card">
                <h1 className="error-code text-white">404</h1>
                <p className="error-message text-white">Oops! Page not found.</p>
                <a href="/" className="btn error-btn text-white">Go Back Home</a>
            </div>
        </div>
    );
};

export default NotFound;
