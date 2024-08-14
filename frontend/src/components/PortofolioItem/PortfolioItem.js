import React, { useState, useEffect } from 'react';
import './PortfolioItem.css';
import axios from 'axios';
import {Button} from "reactstrap";
import EditModal from "../EditModal/EditModal";

const PortfolioItem = ({ item, onClick, selectedItem, getItems }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleData = async (data) => {
        try {
            await axios.patch(`/portfolio-item/${item.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleEditClick();
            getItems();
        } catch (error) {
            console.error('Error updating item', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`/portfolio-item/${item.id}`).then(resp => {
                if(resp?.status === 200){
                    getItems()
                }
            });
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

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

    const getValidUrl = (url) => {
        if (!url) return '#';
        return url.startsWith('http') ? url : `https://${url}`;
    };

    return (
        <div
            id={item?.id}
            className="portfolio-item"
            onClick={() => onClick(item?.id)}
        >
        <EditModal
                isEditModalOpen={isEditModalOpen}
                toggle={() => setIsEditModalOpen(!isEditModalOpen)}
                handleData={handleData}
                itemData={item}
            />
            {imageUrl ? (
                <img
                    className="port-item"
                    src={imageUrl}
                    alt={item.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            ) : (
                <p>Loading image...</p>
            )}
            <h3 className="port-item">{item?.title}</h3>
            <p className="port-item">{item?.description}</p>
            <a href={getValidUrl(item?.client_site_url)} target="_blank" rel="noopener noreferrer">
                {item?.client_site_url}
            </a>

            {(selectedItem === item?.id) ?
                <>
                    <hr/>
                    <div className="portfolio-item-actions">
                        <Button
                            color="warning"
                            className="mx-2"
                            style={{minWidth: '72px'}}
                            onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button
                            color="danger"
                            className="mx-2"
                            style={{minWidth: '72px'}}
                            onClick={handleDeleteClick}>
                            Delete
                        </Button>
                        <Button
                            color="secondary"
                            className="mx-2 my-2"
                            style={{minWidth: '72px'}}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClick(null)
                            }}>
                            Cancel
                        </Button>
                    </div>
                </>
                : null }

        </div>
    );
};

export default PortfolioItem;
