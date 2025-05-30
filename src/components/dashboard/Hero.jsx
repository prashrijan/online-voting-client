import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
    if (!electionCode) {
      toast.error('Please enter the code and try again.', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
      return;
    }
    try {
      const electionData = await dispatch(
        getElectionByCodeAction(electionCode)
      );

      if (electionData && electionData._id) {
        navigate(`/user/election-voting/${electionData._id}`);
      } else {
        toast.error('Invalid Election Code. Please try again.', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }
  };

  return (
    <Container
      className="p-3 pt-5 d-flex flex-column justify-content-center align-items-center bg-white rounded-4 rounded-top-0"
      style={{ minHeight: '300px' }}
    >
      <div className="text-center mb-4">
        <h1 className="fw-bold">Welcome to Chunaab</h1>
        <p className="fw-medium">All-in-one Digital Voting Platform</p>
      </div>

      <div
        className="p-4 border border-2 rounded-5 shadow-sm w-100"
        style={{ maxWidth: 480 }}
      >
        <h4 className="text-center mb-3">Join a Live Election</h4>
        <hr />
        <p className="text-center mb-4">Enter your 8-digit Election Code</p>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinBtnClick();
          }}
        >
          <Row className="g-2 justify-content-center align-items-center">
            <Col xs={12} sm={6} md={5}>
              <Form.Control
                type="text"
                className="bg-light border-dark rounded-pill text-center"
                placeholder="c 8 f 3 e 4 a 5"
                maxLength={8}
                value={electionCode}
                onChange={handleInputChange}
                aria-label="Election Code"
              />
            </Col>

            <Col xs="auto">
              <Button
                type="submit"
                className="rounded-pill px-4"
                variant="dark"
                style={{ minWidth: '100px' }}
              >
                Join Now
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Hero;
