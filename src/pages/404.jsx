import React from 'react';
import Image from '../services/img/Chien404.jpeg';

const NotFoundPage = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundImage: `url(${Image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div>
                <h1 style={{ color: 'white', fontWeight: 'bold' }}>404 - Page Not Found</h1>
                <p style={{ color: 'white', fontWeight: 'bold' }}>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
