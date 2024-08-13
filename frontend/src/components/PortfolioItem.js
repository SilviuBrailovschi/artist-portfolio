// src/components/PortfolioItem.js
import React from 'react';
import './PortfolioItem.css';


const PortfolioItem = ({ item }) => {
    return (
        <div className="portfolio-item">
            <img src={`data:image/jpeg;base64,${item?.imageData}`} alt={item?.title} />
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <a href={item?.clientSiteUrl} target="_blank" rel="noopener noreferrer">
                Visit Client Site
            </a>
        </div>
    );
};

export default PortfolioItem;
