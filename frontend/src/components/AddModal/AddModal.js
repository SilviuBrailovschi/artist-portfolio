import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';

const AddModal = ({isAddModalOpen, handleData, toggle}) => {

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [isActive, setIsActive] = useState(false);


    const handleImageChange = (e) => {setImage(e.target.files[0])};
    const handleTitleChange = (e) => {setTitle(e.target.value)};
    const handleDescriptionChange = (e) => {setDescription(e.target.value)};
    const handleUrlChange = (e) => {setUrl(e.target.value)};
    const handleStatusChange = () => { setIsActive(!isActive)};

    const createFormData = () => {
        const formData = new FormData();

        if (image) {
            formData.append('image_data', image);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('client_site_url', url);
        formData.append('status', JSON.stringify(isActive));

        return formData;
    };


    const handleSubmit = () => {
        const data =  createFormData();
        handleData( data );
        setIsActive(false);
        setImage(null)
        setTitle('')
        setDescription('')
        setUrl('')
    };

    return (
        <div>
            <Modal centered isOpen={isAddModalOpen} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add a portfolio</ModalHeader>
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
                    <div style={{textAlign: 'center'}}>
                        <Button color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>{' '}
                        <Button color="danger" onClick={toggle}>
                            Cancel
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddModal;