import React, { useState, useEffect } from 'react';
import './PortfolioItem.css';
import axios from 'axios';

const PortfolioItem = ({ item }) => {
    // console.log(item);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axios.get(`/portfolio-item/image_data/${item.id}`, {
                    responseType: 'blob'
                });
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image", error);
            }
        };

        fetchImageUrl().then();
    }, [item.id]);

    return (
        <div className="portfolio-item">
            {imageUrl ? (
                <img
                    src={imageUrl} // Use the state with the image URL
                    alt={item.title}
                    style={{ maxWidth: '100%', height: 'auto' }} // Add your styles
                />
            ) : (
                <p>Loading image...</p>
            )}
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <a href={item?.clientSiteUrl} target="_blank" rel="noopener noreferrer">
                Visit Client Site
            </a>
        </div>
    );
};

export default PortfolioItem;
