import React from 'react';
import { Button } from 'react-bootstrap';
import './homepage.css';

import { CgArrowRight } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate('/register');
  };

  return (
    <div className=" hero w-100  d-flex flex-column justify-content-between align-items-center py-5">
      <h1 className="p-4 fw-bold fs-1 text-center">
        All-in-one Digital Voting Platform
      </h1>

      <p className="text-center w-50 fs-6 ">
        Whether you're organizing a small club election or a nationwide vote,
        Chunaab makes it easy, secure, and stress-free.
      </p>
      <Button
        variant="primary"
        className="getStartedbtn d-flex justify-content-center align-items-center fs-5 rounded-5 border-2 border-black  "
        onClick={getStarted}
      >
        Get Started
        <span className="ms-1 mb-1 fs-3">
          <CgArrowRight />
        </span>
      </Button>
    </div>
  );
};

export default Hero;
