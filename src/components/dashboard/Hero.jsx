import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getElectionByCodeAction } from '@features/election/electionAction';
import { toast } from 'react-toastify';

const Hero = () => {
  const [electionCode, setElectionCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setElectionCode(e.target.value);
  };

  const handleJoinBtnClick = async () => {
    try {
      if (!electionCode) {
        toast.error('Please enter the code and try again.', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
        return;
      }
      const electionData = await dispatch(
        getElectionByCodeAction(electionCode)
      );

      if (electionData && electionData._id) {
        navigate(`/user/election-voting/${electionData?._id}`);
      } else {
        toast.error('Invalid Eleciton Code. Please try again.', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }
  };

  return (
    <Container className="p-2 pt-5 d-flex justify-content-center align-items-center flex-column bg-white rounded-4 rounded-top-0">
      <div className="text-center ">
        <h1 className="fw-bold">Welcome to Chunaab</h1>
        <p className="fw-medium">All-in-one Digital Voting Platform</p>
      </div>
      <div
        className="mt-3 p-3 border border-2 text-center rounded-5 shadow-sm"
        style={{ width: '450px' }}
      >
        <h4>Join a Live Election</h4>
        <hr />
        <p className="">Enter your 6-digit Election Code</p>

        <div className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="px-4 py-2 bg-light border-primary border rounded-pill text-center"
            placeholder="c 8 f 3 e 4 a 5"
            maxLength="8"
            pattern="\d{8}"
            style={{ maxWidth: '150px' }}
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
