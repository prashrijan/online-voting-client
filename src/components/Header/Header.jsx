import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Logo';
import './HeaderStyles.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GuestNavbar = () => (
  <Navbar collapseOnSelect expand="lg" className="light-navbar fs-6">
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
          <Nav.Link as={Link} to="#" className="nav-link">
            Live Elections
          </Nav.Link>
          <Nav.Link as={Link} to="#" className="nav-link">
            Features
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="nav-link">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className="nav-link">
            Contact
          </Nav.Link>
        </Nav>

        <Nav className="auth-buttons">
          <Nav.Link as={Link} to="/login" className="px-2">
            <Button variant="outline-primary" className="nav-button ">
              Log In
            </Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/register" className="ps-2 ">
            <Button variant="primary" className="nav-button ">
              Register
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const UserNavbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Navbar collapseOnSelect expand="lg" className="light-navbar fs-6">
      <Container>
        <Navbar.Brand href="/user" className="d-flex align-items-center">
          <Logo darkMode={false} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="nav-toggle"
          j
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-grow-1 main-nav">
            <Nav.Link as={Link} to="#" className="nav-link">
              Live Elections
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-link">
              My Elections
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-link">
              Results
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-link">
              Help Center
            </Nav.Link>
          </Nav>

          <Nav className="auth-buttons">
            <Nav.Link as={Link} to="/user/create-election" className="ps-2">
              <Button variant="danger" className="nav-button">
                Create Election
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/user/profile" className="ps-2">
              <div className="profile-pic-container">
                <img
                  src={user?.profileImage || '/default-profile.png'}
                  alt="Profile"
                  className="profile-pic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-profile.png';
                  }}
                />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Header = () => {
  const { user } = useSelector((state) => state.user);

  return user && user._id ? <UserNavbar /> : <GuestNavbar />;
};

export default Header;
