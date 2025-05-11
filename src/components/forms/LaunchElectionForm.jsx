import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createElectionAction } from '../../features/election/electionAction';
import { useNavigate } from 'react-router-dom';

const LaunchElectionForm = () => {
  const { electionData, candidates } = useSelector((state) => state.election);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('title', electionData.title);
    formData.append('startDate', electionData.startDate);
    formData.append('startTime', electionData.startTime);
    formData.append('endDate', electionData.endDate);
    formData.append('endTime', electionData.endTime);
    formData.append('visibility', electionData.visibility);

    electionData.candidateIds.forEach((id) => {
      formData.append('candidate', id);
    });

    if (electionData.coverImageFile) {
      formData.append('coverImage', electionData.coverImageFile);
    }
    console.log(electionData.coverImageFile);

    try {
      dispatch(createElectionAction(formData));
      navigate('/user');
    } catch (error) {
      console.error('Election creation failed: ', error);
    }
  };

  const displayData = electionData?.candidateIds
    ? electionData.candidateIds
        .map((id) => candidates.find((c) => c._id === id))
        .filter(Boolean)
    : [];
  return (
    <div
      className=" d-flex flex-column align-items-center justify-content-center"
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <Card className="mb-4 overflow-hidden w-100">
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
            <span className="fw-semibold">Start:</span>{' '}
            {electionData.startDate || 'Not set'} at{' '}
            {electionData.startTime || '--:--'}
            <br />
            <span className="fw-semibold">End:</span>{' '}
            {electionData.endDate || 'Not set'} at{' '}
            {electionData.endTime || '--:--'}
            <br />
            <span className="fw-semibold">Visibility:</span>{' '}
            {electionData.visibility || 'Not specified'}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Candidates Table */}
      <Card className="w-100">
        <Card.Header as="h5">Candidates</Card.Header>
        <Card.Body>
          {displayData?.length > 0 ? (
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
                {displayData.map((candidate, index) => (
                  <tr key={candidate._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={
                          candidate.profileImage ||
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
                    <td>{candidate.fullName}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.bio || 'No bio'}</td>
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
      <Button
        variant="primary"
        onClick={handleSubmit}
        className=" py-3 w-50 my-4 rounded-pill fs-5"
      >
        Launch Election
      </Button>
    </div>
  );
};

export default LaunchElectionForm;
