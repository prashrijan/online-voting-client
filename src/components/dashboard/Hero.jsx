import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const Hero = () => {
  const [electionCode, setElectionCode] = useState('');

  const handleInputChange = (e) => {
    setElectionCode(e.target.value);
  };

  const handleJoinBtnClick = () => {
    console.log(`Election Code ${electionCode}`);
  };

  return (
    <Container className="p-2 pt-5 d-flex justify-content-center align-items-center flex-column bg-white rounded-4 rounded-top-0">
      <div className="text-center ">
        <h1 className="fw-bold">Welcome to Chunaab</h1>
        <p className="fw-medium">All-in-one Digital Voting Platform</p>
      </div>
      <div
        className="mt-3 p-3 border border-2 text-center rounded-5 shadow-sm"
        style={{ width: '350px' }}
      >
        <h4>Join a Live Election</h4>
        <hr />
        <p className="">Enter your 6-digit Election Code</p>

        <div className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="p-2 bg-light border-primary border rounded-pill text-center"
            placeholder="123 456"
            maxLength="6"
            pattern="\d{6}"
            style={{ maxWidth: '100px' }}
            onChange={handleInputChange}
          />

          <Button
            className="m-2 p-2 rounded-pill "
            style={{ width: '100px' }}
            variant="primary"
            onClick={handleJoinBtnClick}
          >
            Join Now
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
