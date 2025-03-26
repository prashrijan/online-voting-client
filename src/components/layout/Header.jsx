import React from "react"
import { Button } from "react-bootstrap"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

const Header = () => {
  return (
    <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
      <Container>
        {/* TODO import correct logo */}
        {/* <img src="/chunaabFavicon.svg" alt="Chunaab Logo" className="rounded"/> */}
        <Navbar.Brand href='#home'>chunaab</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto  d-flex justify-content-center'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='#createChunaab'>Create chunaab</Nav.Link>
            <Nav.Link href='#contact'>Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='/login'>
              <Button variant='outline-primary'>Login</Button>
            </Nav.Link>
            <Nav.Link href='/register'>
              <Button variant='primary'>Register</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
