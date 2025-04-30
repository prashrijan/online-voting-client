import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const LaunchElectionForm = () => {
  const { electionData } = useSelector((state) => state.election);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card className="mb-4">
        {electionData.coverImagePreview ? (
          <Card.Img
            variant="top"
            src={electionData.coverImagePreview}
            style={{ height: '250px', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              height: '250px',
              backgroundColor: '#343a40',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem',
            }}
          >
            No Image Added
          </div>
        )}
        <Card.Body>
          <Card.Title>{electionData.title || 'Untitled Election'}</Card.Title>
          <Card.Text>
            <strong>Start:</strong> {electionData.startDate || 'Not set'} at{' '}
            {electionData.startTime || '--:--'}
            <br />
            <strong>End:</strong> {electionData.endDate || 'Not set'} at{' '}
            {electionData.endTime || '--:--'}
            <br />
            <strong>Visibility:</strong>{' '}
            {electionData.visibility || 'Not specified'}
          </Card.Text>
          <Button variant="primary">Launch Election</Button>
        </Card.Body>
      </Card>

      {/* Candidates Table */}
      <Card>
        <Card.Header as="h5">Candidates</Card.Header>
        <Card.Body>
          {electionData.candidates?.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Slogan</th>
                </tr>
              </thead>
              <tbody>
                {electionData.candidates.map((candidate, index) => (
                  <tr key={candidate.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={
                          candidate.profilePic ||
                          'https://via.placeholder.com/50'
                        }
                        alt={candidate.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.slogan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-4 text-muted">
              No candidates added yet
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LaunchElectionForm;
