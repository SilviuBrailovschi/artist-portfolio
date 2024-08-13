// src/components/PortfolioGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Container, Row, Col, Button } from 'reactstrap';
import PortfolioItem from '../PortofolioItem/PortfolioItem';
import './PortfolioGrid.css';
import AddModal from "../AddModal/AddModal";

const PortfolioGrid = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

    const handleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    }
    const handleAddPortfolio = (data) => {
        axios.post(`${apiUrl}/portfolio-item`, data ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response);
            fetchPortfolioItems().then();
            handleAddModal();

        }).catch(error => console.error('Error:', error))
    }

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchPortfolioItems().then();
    }, [statusFilter]);

    return (
            <Card>
                <AddModal isAddModalOpen={isAddModalOpen} handleData={handleAddPortfolio} toggle={handleAddModal}/>
                <CardBody>
                    <Row>
                        <Col sm="6">
                            <div className="d-flex justify-content-start">
                                <Button color="primary" onClick={() => setStatusFilter('all')}>All</Button>
                                <Button color="primary" onClick={() => setStatusFilter('active')} className="mx-2">Active</Button>
                                <Button color="primary" onClick={() => setStatusFilter('inactive')}>Inactive</Button>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="d-flex justify-content-end">
                                <Button color="success" className="mx-2" onClick={handleAddModal}>Add Portfolio</Button>
                                <Button color="warning" className="mx-2">Edit Portfolio</Button>
                                <Button color="danger" className="mx-2">Delete Portfolio</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {loading && <p>Loading...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading &&
                            <div className="portfolio-grid">
                                {portfolioItems?.length === 0 && !loading && <p>No items found.</p>}
                                {portfolioItems?.map(item => (
                                    <PortfolioItem key={item.id} item={item} />
                                ))}
                            </div>
                        }
                    </Row>
                </CardBody>
            </Card>
    );
};

export default PortfolioGrid;
