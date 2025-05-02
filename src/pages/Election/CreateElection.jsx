import React, { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CreateElectionForm from '../../components/forms/CreateElectionForm';
import './styles/CreateElection.css';
import LaunchElectionForm from '../../components/Forms/LaunchElectionForm';
import SearchCandidateForm from '../../components/Forms/SelectCandidateForm';
import { fetchAllUserAction } from '../../features/user/userAction';
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
    <Container className="py-4 d-flex justify-content-center">
      <div className="election-form-wrapper">
        <Nav
          variant="tabs"
          activeKey={
            step == 1 ? 'election' : step == 2 ? 'candidates' : 'launch'
          }
          className="mb-3 justify-content-center"
        >
          <Nav.Item>
            <Nav.Link eventKey="election" className="custom-tab">
              Election
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="candidates" className="custom-tab" disabled>
              {' '}
              Candidates{' '}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="launch"
              className="custom-tab"
              disabled={step !== 'launch'}
            >
              {' '}
              Launch{' '}
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

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-link"
            disabled={step == 1}
            onClick={handleBack}
          >
            &lt; Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={step == 3}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CreateElection;
