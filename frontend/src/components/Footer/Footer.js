// Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{
            background: '#003d59',
            color:'#ccc',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <b>&copy; {new Date().getFullYear()} Silviu Brailovschi. All rights reserved.</b>
        </footer>
    );
};

export default Footer;
