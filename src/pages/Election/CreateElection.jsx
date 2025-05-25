import React, { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CreateElectionForm from '@components/forms/CreateElectionForm';
import LaunchElectionForm from '@components/forms/LaunchElectionForm';
import SearchCandidateForm from '@components/forms/SelectCandidateForm';
import { fetchAllUserAction } from '@features/user/userAction';
import { useDispatch } from 'react-redux';

const CreateElection = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleNext = () => {
    setStep((prev) => (prev >= 3 ? 3 : prev + 1)); // Fix bounds
  };

  const handleBack = () => {
    setStep((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    dispatch(fetchAllUserAction());
  }, [dispatch]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Container
        className="d-flex justify-content-center flex-column align-items-center flex-grow-1"
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <h2 className="mb-4 fw-bold text-center px-3">
          Create and Launch your Election
        </h2>

        <div
          className="p-4 bg-white border rounded-5 shadow"
          style={{
            width: '100%',
            maxWidth: 800,
            minWidth: 300,
          }}
        >
          <Nav
            variant="tabs"
            activeKey={
              step === 1 ? 'election' : step === 2 ? 'candidates' : 'launch'
            }
            className="mb-3 justify-content-center flex-wrap"
          >
            <Nav.Item>
              <Nav.Link eventKey="election">Election</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="candidates" disabled>
                Candidates
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="launch" disabled={step !== 3}>
                Launch
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {step === 1 ? (
            <CreateElectionForm />
          ) : step === 2 ? (
            <SearchCandidateForm showAddButton={false} />
          ) : (
            <LaunchElectionForm />
          )}

          <div className="mt-4 mx-2 d-flex justify-content-between flex-wrap gap-2">
            <button
              className="btn btn-outline-dark px-4 py-2 flex-grow-1 flex-md-grow-0"
              disabled={step === 1}
              onClick={handleBack}
              style={{ minWidth: 120 }}
            >
              &lt; Back
            </button>
            <button
              className="btn btn-dark text-light px-4 py-2 flex-grow-1 flex-md-grow-0"
              onClick={handleNext}
              disabled={step === 3}
              style={{ minWidth: 120 }}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateElection;
