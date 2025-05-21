import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { CgArrowRight } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import './styles/Hero.styles.css';

const Hero = () => {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate('/register');
  };

  return (
    <section className="hero-section d-flex align-items-center text-center text-white">
      <Container>
        <h1 className="fw-bold display-4 mb-3">
          All-in-One Digital Voting Platform
        </h1>
        <p className="lead mx-auto mb-4 w-75">
          Whether you're organizing a small club election or a nationwide vote,
          <strong> Chunaab </strong> makes it easy, secure, and stress-free.
        </p>
        <Button
          variant="light"
          className="get-started-btn px-4 py-2 rounded-pill fs-5 d-inline-flex align-items-center"
          onClick={getStarted}
        >
          Get Started
          <CgArrowRight className="ms-2 fs-3" />
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
