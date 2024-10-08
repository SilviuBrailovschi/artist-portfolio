import React, { useState } from 'react';
import './PortfolioItem.css';
import axios from 'axios';
import { Button } from "reactstrap";
import { encode } from 'base64-arraybuffer';
import EditModal from "../EditModal/EditModal";

const PortfolioItem = ({ id, item, onCancel, selectedItem, getItems }) => {
    const { data, type } = item?.image_data;
    const base64String = encode(new Uint8Array(data));
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const newImageUrl = `data:${type};base64,${base64String}`;

    const handleEditClick = () => {
        setIsEditModalOpen(prev => !prev);
    };

    const handleData = async (data) => {
        try {
            await axios.put(`/portfolio-item/${item._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleEditClick();
            getItems();
            onCancel(null)
        } catch (error) {
            console.error('Error updating item', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const resp = await axios.delete(`/portfolio-item/${item._id}`);
            if (resp?.status === 200) {
                getItems();
            }
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onCancel(item._id);
    };
    const handleCancel = (e) => {
        e.stopPropagation();
        onCancel(null)
    }

    const getValidUrl = (url) => {
        if (!url) return '#';
        return url.startsWith('http') ? url : `https://${url}`;
    };

    return (
        <div
            className={`portfolio-item ${selectedItem === item._id ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <EditModal
                isEditModalOpen={isEditModalOpen}
                toggle={() => setIsEditModalOpen(!isEditModalOpen)}
                handleData={handleData}
                itemData={item}
            />
            <div className="image-container">
                <img
                    className="port-item"
                    src={newImageUrl}
                    alt={item.title}
                />
            </div>
            <h3 className="port-item">{item?.title}</h3>
            <p className="port-item">{item?.description}</p>
            <a href={getValidUrl(item?.client_site_url)}
               target="_blank"
               rel="noopener noreferrer"
               style={{ marginTop: 'auto' }}
            >
                {item?.client_site_url.length > 30
                    ? `${item.client_site_url.slice(0, 20)}...`
                    : item.client_site_url}
            </a>
            {selectedItem === item._id && (
                <>
                    <hr />
                    <div className="portfolio-item-actions">
                        <Button color="primary" className="mx-2 my-2 btn-sm" style={{minWidth: '59px'}} onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button color="danger" className="mx-2 my-2 btn-sm" style={{minWidth: '59px'}} onClick={handleDeleteClick}>
                            Delete
                        </Button>
                        <Button color="secondary" className="mx-2 my-2 btn-sm" style={{minWidth: '59px'}} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PortfolioItem;