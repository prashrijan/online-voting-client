import React from 'react';
import { Button } from 'react-bootstrap';
import './homepage.css';

const Hero = () => {
  return (
    <div className=" hero w-100  d-flex flex-column justify-content-between align-items-center">
      <h1 className="pt-5 pb-2 "> All-in-one Digital Voting Platform</h1>

      <p className="text-center w-50 ">
        Whether you're organizing a small club election or a nationwide vote,
        Chunaab makes it easy, secure, and stress-free.
      </p>
      <Button variant="primary" className="getStartedbtn m-4 rounded-5">
        Get Started
      </Button>

      <div className="joinSection d-flex justify-content-center align-items-center rounded-5">
        Enter code to join Chunaab
        <span>
          <input
            type="text"
            className="eventCodeInput mx-3 rounded-3 text-center"
            placeholder="123 456"
          />
        </span>
        <Button variant="primary" className="px-4 rounded-3">
          Join
        </Button>
      </div>
    </div>
  );
};

export default Hero;
