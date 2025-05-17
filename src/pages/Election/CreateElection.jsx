import React, { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CreateElectionForm from '@components/forms/CreateElectionForm';
import LaunchElectionForm from '@components/forms/LaunchElectionForm';
import SearchCandidateForm from '@components/forms/SelectCandidateForm';
import { fetchAllUserAction } from '@features/user/userAction';
import { useDispatch, useSelector } from 'react-redux';

const CreateElection = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleNext = () => {
    setStep((prev) => (prev > 3 ? 1 : prev + 1));
  };

  const handleBack = () => {
    setStep((prev) => (prev < 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    dispatch(fetchAllUserAction());
  }, []);
  return (
    <div className="bg-light h-100">
      <Container className="p-5 d-flex justify-content-center flex-column align-items-center">
        <h2 className="mb-4 fw-bold text-center ">
          Create and Launch your Election
        </h2>
        <div className="w-75  p-5 bg-white border rounded-5 shadow">
          <Nav
            variant="tabs"
            activeKey={
              step == 1 ? 'election' : step == 2 ? 'candidates' : 'launch'
            }
            className="mb-3  justify-content-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="election" className="">
                Election
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="candidates" className="" disabled>
                Candidates
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="launch"
                className=""
                disabled={step !== 'launch'}
              >
                Launch
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {step === 1 ? (
            <CreateElectionForm />
          ) : step == 2 ? (
            <SearchCandidateForm />
          ) : (
            <LaunchElectionForm />
          )}

          <div className="mt-4 mx-2 d-flex justify-content-between">
            <button
              className="btn btn-outline-dark px-4 py-2"
              disabled={step === 1}
              onClick={handleBack}
            >
              &lt; Back
            </button>
            <button
              className="btn btn-primary text-light px-4 py-2"
              onClick={handleNext}
              disabled={step === 3}
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
