// src/components/PortfolioGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioItem from './PortfolioItem';
import './PortfolioGrid.css';

const PortfolioGrid = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        console.log(portfolioItems)
    },[portfolioItems])

    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const fetchPortfolioItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/portfolio-item`, {
                    // params: { status: statusFilter }
                });
                console.log('API Response:', response.data);
                setPortfolioItems(response.data);
            } catch (error) {
                console.error("Error fetching portfolio items", error);
                setError('Error fetching portfolio items. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchPortfolioItems().then();
    }, [statusFilter]);

    return (
        <div>
            <div className="filter-controls">
                <button onClick={() => setStatusFilter('all')}>All</button>
                <button onClick={() => setStatusFilter('active')}>Active</button>
                <button onClick={() => setStatusFilter('inactive')}>Inactive</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="portfolio-grid">
                {portfolioItems?.length === 0 && !loading && <p>No items found.</p>}
                {portfolioItems?.map(item => (
                    <PortfolioItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default PortfolioGrid;
