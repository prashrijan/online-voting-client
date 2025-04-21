import React from 'react';
import { Button } from 'react-bootstrap';
import './homepage.css';

const Hero = () => {
  return (
    <div className=" hero w-100  d-flex flex-column justify-content-between align-items-center">
      <h1 className="p-4 fw-bold fs-1 text-center">
        All-in-one Digital Voting Platform
      </h1>

      <p className="text-center w-50 fs-6 ">
        Whether you're organizing a small club election or a nationwide vote,
        Chunaab makes it easy, secure, and stress-free.
      </p>
      <Button
        variant="primary"
        className="getStartedbtn m-3 px-5 d-flex justify-content-center align-items-center rounded-5 border-3 border-black fs-4 "
      >
        Get Started
      </Button>

      <div className="joinSection m-4 p-3 d-flex justify-content-center align-items-center rounded-5 w-75 flex-wrap  ">
        <span className=" fs-4 text-center">Enter code to join Live Chunaab</span>

        <input
          type="text"
          className="eventCodeInput m-2 rounded-3 text-center fs-5"
          placeholder="123 456"
        />
        <Button variant="primary" className="px-4 m-2 rounded-3 fs-5 ">
          Join
        </Button>
      </div>
    </div>
  );
};

export default Hero;
