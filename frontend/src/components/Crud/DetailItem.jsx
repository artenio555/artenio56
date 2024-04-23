import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Image } from "react-bootstrap";
import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const DetailItem = () => {
// Per te marre elementin me id perkatese
const { id } = useParams();
// Metode navigimi (nga njeri komponent tek tjetri)
const nav = useNavigate();
// Ruajta e informacionit te nje elementi (object)
const [item, setItem] = useState({});
// Merren informacionet per elementin i cili ka id-ne e kerkuar
// Per cdo ndryshim te id-se therritet useEffect
// Ndryshohen informacionet ne baze te id-se
useEffect(() => {
// Marrja e infomacionit per elementin
const getData = async () => {
await axios.get(`http://localhost:5000/readOne/${id}`)
.then((res) => {
// Testimi
console.log(res.data);
// Ruhen tek state objekt
setItem(res.data);
})
.catch((err) => {
// Nese nuk ndodh shfaqen te dhenat
console.log("Data not showing " + err);
});};
// Therritja e funksionit
getData();},
// Therritja e useEffect cdo here qe ka nje ndryshim te vleres se id-se
[id]);
// Funksioni i fshirjes se nje elementi
const handleDelete = async (id) => {
await axios.delete(`http://localhost:5000/delete/${id}`)
.then(() => {
// Pas fshirjes kalohet te faqja kryesore
nav("/");
})
.catch((err) => {
// Nese nuk fshihet elementi
console.log("Data not deleted " + err);
});
};
return (
<Container className="my-5">
<Row>
<Col xs={12} md={6}>
{/* Informacionet e elementit */}
<h1>Data</h1>
<h2>{item.name}</h2>
<p>{item.description}</p>
<div className="d-grid gap-2 d-md-block">
{/* Therritja e funksionit Delete */}
<Button variant="warning" className='me-3'
href={`/update/${item._id}`}>Update</Button>
<Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
</div>
</Col>
<Col xs={12} md={6}>
{/* imazhi */}
<h1>Image</h1>
<Image
src={`http://localhost:5000/images/${item.photo}`}
alt='Uploaded'
rounded
className='img-fluid'
/>
</Col>
</Row>
</Container>
);
};
export default DetailItem;