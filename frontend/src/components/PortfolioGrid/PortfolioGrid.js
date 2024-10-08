import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Spinner, Row, Col, Button } from 'reactstrap';
import PortfolioItem from '../PortofolioItem/PortfolioItem';
import './PortfolioGrid.css';
import AddModal from "../AddModal/AddModal";

const PortfolioGrid = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectedItem = (id) => {
        setSelectedItem(id)
    }

    const fetchPortfolioItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiUrl}/portfolio-item`, {
                params: { status: statusFilter }
            });
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
            fetchPortfolioItems().then();
            handleAddModal();

        }).catch(error => console.error('Error:', error))
    }

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchPortfolioItems().then();
    }, [statusFilter]);


    return (
            <Card style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: "url('/home-pic.jpg')",
                backgroundSize: 'cover',
                minHeight: '100%',
                maxWidth: '80%',
                minWidth: '80%'
            }}>
                <AddModal isAddModalOpen={isAddModalOpen} handleData={handleAddPortfolio} toggle={handleAddModal}/>
                <Row className="d-flex justify-content-center align-items-center" style={{ margin: '2rem', minWidth: '100%'}}>
                    <Col  sm={12} md={4} lg={4} >
                        <div >
                            <Button className="m-1" color="primary" onClick={() => setStatusFilter('all')}>All</Button>
                            <Button color="primary" onClick={() => setStatusFilter('active')} className="mx-2">Active</Button>
                            <Button color="primary" onClick={() => setStatusFilter('inactive')}>Inactive</Button>
                        </div>
                    </Col>
                    <Col  sm={12} md={2} lg={2}>&nbsp;</Col>
                    <Col  sm={12} md={4} lg={4}>
                        <div>
                            <Button color="success"  onClick={handleAddModal}>Add Portfolio</Button>
                        </div>
                    </Col>
                </Row>

                    <CardBody
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: '8rem',
                            width: '100%'
                        }}>
                        {loading ?
                            <Spinner color="primary"
                                     style={{
                                         height: '5rem',
                                         width: '5rem',
                                         color: 'lightgray!important',
                                         fontSize: 'xx-large'
                            }}>
                                Loading...
                            </Spinner> :
                            <Row className="justify-content-center align-items-center" >
                                <Col sm={12}  className="d-flex flex-column align-items-center ">
                                    {error && <p className="error-message">{error}</p>}
                                    <div className="portfolio-grid">
                                        {!portfolioItems?.length > 0 && !loading && <b style={{color: 'darkgray'}}>No items found.</b>}
                                        {portfolioItems?.map(item => {
                                            return(
                                                <PortfolioItem
                                                    key={item._id}
                                                    id={item._id}
                                                    item={item}
                                                    selectedItem={selectedItem}
                                                    onCancel={handleSelectedItem}
                                                    getItems={fetchPortfolioItems}
                                                />
                                            )})
                                        }
                                    </div>
                                </Col>
                            </Row>
                        }
                    </CardBody>

            </Card>
    );
};

export default PortfolioGrid;
