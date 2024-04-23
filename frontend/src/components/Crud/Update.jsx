import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateItem = () => {
    // Per te marre elementin me id perkatese
    const { id } = useParams()
    // Metode navigimi (nga njeri komponent tek tjetri)
    const nav = useNavigate()
    // Kalimi tek forma e update
    // Statet per inputet
    const [updateItem, setUpdateItem] = useState({
    name: '',
    description: '',
    photo: '',
    });
    // Do te perdoret per te shfaqur imazhin pas upload-it
    const [uploadedImage, setUploadedImage] = useState(null);
    // Do te marre informacionet per elementin qe ka id e therritur
    // Sa here ndryshon vlera e id-se therritet useEffect
    useEffect(() => {
    const fetchData = async () => {
    // Therritja e app => Leximi i te dhenave te elementit
    await axios.get(`http://localhost:5000/readOne/${id}`)
    .then((res) => {
    // Marrja e informacionit
    const { name, description, photo } = res.data;
    // shfaqja e informacionit - test
    console.log(res.data)
    setUpdateItem((prevItem) => ({
    ...prevItem,
    name: name || '',
    description: description || '',
    photo: photo || '',
    }));
    }).catch((err) => {
    // Nese nuk lexohet informacionet e elementit
    console.log('Data not showing ' + err)
    })
    };
    // Therritja e funksionit
    fetchData()
    }, [id])
    // Marrja e informacionir nga input-et
    const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateItem((prevItem) => ({
    ...prevItem,
    [name]: value,
    }));
    };
    // Ndryshimi i imazhit
    const handlePhoto = (e) => {
    setUpdateItem((prevItem) => ({
    ...prevItem,
    photo: e.target.files[0],
    }));
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
    };
    // Funksioni i update
    const handleUpdate = async (e) => {
    e.preventDefault()
    // Marrja e informacioneve te reja
    const formData = new FormData();
    Object.entries(updateItem).forEach(([key, value]) => {
    if (key !== 'photo') {
    formData.append(key, value);
    }
    });
    if (updateItem.photo instanceof File) {
    formData.append('photo', updateItem.photo);
    }
    console.log("Data to be sent to the server:", formData);
    // Therritja e apit - update
    await axios.patch(`http://localhost:5000/update/${id}`, formData)
    .then((res) => {
    // Testimi
    console.log(res.data)
    setUpdateItem((prevItem) => ({ ...prevItem, ...res.data }))
    // Kalimi tek home pas update
    nav('/readAll');
    }).catch((err) => {
    // Nese nuk ndodh update
    console.log("Data not updated " + err)
    })
    }
    return (
    <Container className="my-5">
    <Row>
    <Col>
    <h1>Update</h1>
    {/* Therritja e funksionit dhe encType lejon marrjen e file/imazheve */}
    {/* Cdo input duhet te kete atributin name, value dhe eventin onChange */}
    <Form className="w-70" onSubmit={handleUpdate}
    encType='multipart/form-data'>
    <Form.Group className="mb-3" controlId="nameItem">
    <Form.Label>Name</Form.Label>
    <Form.Control
    type="text"
    defaultValue={updateItem.name}
    onChange={handleChange}
    name="name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="textItem">
    <Form.Label>Description</Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    defaultValue={updateItem.description}
    onChange={handleChange}
    name="description" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="ImageItem">
    <Form.Label>Photo</Form.Label>
    {/* Nuk duhet te kete atributin value */}
    {/* Lejohen vetem keto tipe file-sh */}
    <Form.Control type="file" accept=".jpeg, .png, .jpg"
    onChange={handlePhoto} />
    </Form.Group>
    <Button variant="warning" type="submit" >
    Update
    </Button>
    </Form>
    </Col>
    <Col>
    <h1>Preview Image</h1>
    <Row>
    <Col>
    {/* Shfaqja e imazhit */}
    {uploadedImage ? (
    <Image
    src={uploadedImage}
    alt='Uploaded'
    rounded
    className='img-fluid'
    />
    ) : (
    <Image
    src={`http://localhost:5000/images/${updateItem.photo}`}
    alt='Uploaded'
    rounded
    className='img-fluid'
    />
    )}
    </Col>
    </Row>
    </Col>
    </Row>
    </Container>
    )
    }
    export default UpdateItem