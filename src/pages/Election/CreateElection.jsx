import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import CreateElectionForm from '../../components/forms/CreateElectionForm';
import './styles/CreateElection.css';

const CreateElection = () => {
  return (
    <Container className="py-4 d-flex justify-content-center">
      <div className="election-form-wrapper">
        <Nav
          variant="tabs"
          defaultActiveKey="election"
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
            <Nav.Link eventKey="launch" className="custom-tab" disabled>
              {' '}
              Launch{' '}
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <CreateElectionForm />

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-link">&lt; Back</button>
          <button className="btn btn-primary">Next &gt;</button>
        </div>
      </div>
    </Container>
  );
};

export default CreateElection;
