import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';

const EditModal = ({ isEditModalOpen, itemData, handleData, toggle }) => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (itemData) {
            setTitle(itemData.title || '');
            setDescription(itemData.description || '');
            setUrl(itemData.client_site_url || '');
            setIsActive(itemData.status === 1);
        }
    }, [itemData]);

    const handleImageChange = (e) => setImage(e.target.files[0]);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleStatusChange = () => setIsActive(!isActive);

    const createFormData = () => {
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('client_site_url', url);
        formData.append('status', Number(isActive));
        return formData;
    };

    const handleSubmit = () => {
        const data = createFormData();
        handleData(data);
    };

    return (
        <Modal centered isOpen={isEditModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Portfolio Item</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="imageUpload">Image</Label>
                    <Input type="file" id="imageUpload" onChange={handleImageChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="urlInput">URL</Label>
                    <Input
                        type="url"
                        id="urlInput"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={isActive}
                            onChange={handleStatusChange}
                        />
                        {' '}Visible
                    </Label>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <div style={{ textAlign: 'center' }}>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default EditModal;
