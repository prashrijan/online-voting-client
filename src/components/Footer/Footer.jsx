import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const GuestFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem 0',
        marginTop: 'auto',
        borderTop: '1px solid #dee2e6',
      }}
    >
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5>Chunaab Voting</h5>
            <p style={{ fontSize: '0.95rem', color: '#6c757d' }}>
              Secure, transparent, and accessible election platform for the
              digital age.
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '1.25rem' }}>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h6>Explore</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <NavLink
                  to="/"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact</h6>
            <ul style={{ listStyle: 'none', padding: 0, color: '#6c757d' }}>
              <li>chunaabs@gmail.com</li>
              <li>+61 2 9093 5151</li>
              <li>
                Level 11, 10 Barrack Street
                <br />
                Sydney NSW 2000, Australia
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ marginTop: '2rem' }} />
        <div
          className="text-center"
          style={{ fontSize: '0.9rem', color: '#6c757d' }}
        >
          © {new Date().getFullYear()} Chunaab Voting Platform. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
};

const UserFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem 0',
        marginTop: 'auto',
        borderTop: '1px solid #dee2e6',
      }}
    >
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5>Chunaab Voting</h5>
            <p style={{ fontSize: '0.95rem', color: '#6c757d' }}>
              Thanks for being a part of the Chunaab community.
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '1.25rem' }}>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h6>Dashboard Links</h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <NavLink
                  to="/user/my-elections"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  My Elections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/results"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  Results
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/help-center"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/subscriptions"
                  style={{ color: '#212529', textDecoration: 'none' }}
                >
                  Subscriptions
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact</h6>
            <ul style={{ listStyle: 'none', padding: 0, color: '#6c757d' }}>
              <li>chunaabs@gmail.com</li>
              <li>+61 2 9093 5151</li>
              <li>
                Level 11, 10 Barrack Street
                <br />
                Sydney NSW 2000, Australia
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ marginTop: '2rem' }} />
        <div
          className="text-center"
          style={{ fontSize: '0.9rem', color: '#6c757d' }}
        >
          © {new Date().getFullYear()} Chunaab Voting Platform. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
};

const Footer = () => {
  const { user } = useSelector((state) => state.user);

  return user && user._id ? <UserFooter /> : <GuestFooter />;
};

export default Footer;
