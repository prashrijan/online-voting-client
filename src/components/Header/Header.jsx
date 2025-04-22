import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Logo';
import './HeaderStyles.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Navbar collapseOnSelect expand="lg" className="light-navbar">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Logo darkMode={false} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="nav-toggle"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-grow-1 main-nav">
            <Nav.Link href="/createElection" className="nav-link">
              Create Election
            </Nav.Link>
            <Nav.Link href="/about" className="nav-link">
              About
            </Nav.Link>
            <Nav.Link href="/contact" className="nav-link">
              Contact
            </Nav.Link>
          </Nav>

          <Nav className="auth-buttons">
            {user._id ? (
              <>
                <Nav.Link href="/logout" className="ps-2">
                  <Button variant="danger" className="nav-button">
                    Logout
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="px-2">
                  <Button variant="outline-primary" className="nav-button">
                    Log In
                  </Button>
                </Nav.Link>
                <Nav.Link href="/register" className="ps-2">
                  <Button variant="primary" className="nav-button">
                    Register
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
