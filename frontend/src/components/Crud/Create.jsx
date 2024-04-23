import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  // Metode navigimi (nga njeri komponent tek tjetri)
  const navigate = useNavigate();
  // Cdo input ka nje state ku do te ruhen informacionet
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    photo: "",
  });
  // State i afishimit te imazhit
  const [uploadedImage, setUploadedImage] = useState(null);
  // Marrja e informacioni nga input-et: text, number, radio, textarea, select etj
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  // Marrja e informacionit nga input me type file
  const handlePhoto = (e) => {
    setNewItem({ ...newItem, photo: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };
  // Funksioni qe do te perdoret per te kaluar te dhenat ne backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Te dhenat do te kalojne tek metoda Form data
    const formData = new FormData();
    // Marrja e informacionit nga input-et,
    // infomacioni merret nga atributi name, i cili kalon tek key
    Object.entries(newItem).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Therritja e app => Create
    await axios
      .post("http://localhost:5000/create", formData)
      .then((res) => {
        // Testimi
        console.log(res.data);
        // Pas krijimit kallohet tek faqja kryesore
        navigate("/readAll");
      })
      // Nese nuk krijohet elementi i ri
      .catch((err) => {
        console.log("Error server, Item not created" + err);
      });
  };
  return (
    <Container className="my-5">
      {/* Nese user-i eshte i loguar shfaqet form-a dhe nese jo shfaqet nje mesazh */}
      <Row>
        <Col>
          <h1>Create</h1>
          {/* Therritja e funksionit dhe encType lejon marrjen e file/imazheve */}
          {/* Cdo input duhet te kete atributin name, value dhe eventin onChange */}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="textItem">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={newItem.description}
                onChange={handleChange}
                as="textarea"
                name="description"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                // Nuk duhet te kete atributin value
                // Lejohen vetem keto tipe file-sh
                accept=".jpeg, .png, .jpg"
                onChange={handlePhoto}
                name="photo"
              />
            </Form.Group>
            <Button variant="primary" type="submit" value="Create">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <h1>Preview Image</h1>
          {/* Shfaqja e imazhit */}
          {uploadedImage && (
            <Image
              src={uploadedImage}
              alt="Uploaded"
              rounded
              className="img-fluid"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Create;
