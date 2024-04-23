import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './navbar.css'
const Navigate = () => {



return (
    <div className='test'>
<Navbar bg="light" expand="lg">
<Container>
<Navbar.Brand href="/">CRUD MERN</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="me-auto">
<Nav.Link href="/">Home</Nav.Link>
<Nav.Link href="/readAll">Read</Nav.Link>
<Nav.Link href="/create">Create</Nav.Link>


</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
</div>
);
}
export default Navigate;