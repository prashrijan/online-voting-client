// Hero.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import './styles/hero.styles.css';
const Hero = () => {
  return (
    <section
      className="d-flex align-items-center bg-light"
      style={{ minHeight: '100vh' }}
    >
      <Container className="text-center">
        <h1 className="display-4 fw-bold">Welcome to Chunaab</h1>
        <p className="lead text-muted">
          Secure. Transparent. Simple digital voting platform for everyone.
        </p>
      </Container>
    </section>
  );
};

export default Hero;
