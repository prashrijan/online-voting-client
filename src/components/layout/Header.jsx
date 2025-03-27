import React from "react"
import { Button } from "react-bootstrap"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Logo from "../Logo"

const Header = () => {
  return (
    <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='justify-content-center flex-grow-1'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='#createChunaab'>Create chunaab</Nav.Link>
            <Nav.Link href='/contact'>Contact</Nav.Link>
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
