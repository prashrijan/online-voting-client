import React from 'react';
import { useElection } from '../../context/ElectionContext';
import { Button, Card } from 'react-bootstrap';

const LaunchElectionForm = () => {
  const { electionData } = useElection();
  return (
    <Card>
      <Card.Img variant="top" src={electionData.coverImagePreview} />
      <Card.Body>
        <Card.Title>{electionData.title}</Card.Title>

        <p>
          <strong>Start:</strong> {electionData.startDate} at{' '}
          {electionData.startTime}
        </p>
        <p>
          <strong>End:</strong> {electionData.endDate} at {electionData.endTime}
        </p>
        <p>
          <strong>Visibility:</strong> {electionData.visibility}
        </p>
        <Button>Launch Election</Button>
      </Card.Body>
    </Card>
  );
};

export default LaunchElectionForm;
