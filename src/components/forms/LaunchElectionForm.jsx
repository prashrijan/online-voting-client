import React, { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createElectionAction } from '@features/election/electionAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { electionValidationSchema } from '@validation/LaunchElectionValidation';

const LaunchElectionForm = () => {
  const { electionData, candidates } = useSelector((state) => state.election);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await electionValidationSchema.validate(electionData, {
        abortEarly: false,
      });

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
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      formData.append('timezone', userTimezone);

      await dispatch(createElectionAction(formData));

      navigate('/user');
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.inner.forEach((err) =>
          toast.error(err.message, {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          })
        );
      } else {
        console.error('Election creation failed:', error);
        toast.error('Election creation failed. Please try again.', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayData = electionData?.candidateIds
    ? electionData.candidateIds
        .map((id) => candidates.find((c) => c._id === id))
        .filter(Boolean)
    : [];

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center px-3"
      style={{ maxWidth: '900px', margin: '0 auto' }}
    >
      <Card className="mb-4 overflow-hidden w-100">
        {electionData.coverImagePreview ? (
          <Card.Img
            variant="top"
            src={electionData.coverImagePreview}
            style={{ height: '250px', objectFit: 'cover' }}
            className="img-fluid"
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
          <Card.Title className="text-truncate" title={electionData.title}>
            {electionData.title || 'Untitled Election'}
          </Card.Title>
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
            {electionData.visibility?.toUpperCase() || 'NOT SPECIFIED'}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Candidates Table */}
      <Card className="w-100 mb-3">
        <Card.Header as="h5">Candidates</Card.Header>
        <Card.Body className="p-0">
          {displayData.length > 0 ? (
            <Table
              striped
              bordered
              hover
              responsive="sm"
              className="mb-0"
              style={{ minWidth: '350px' }}
            >
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
                        alt={candidate.fullName}
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
                    <td>{candidate.slogan || 'No slogan'}</td>
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
        variant="dark"
        onClick={handleSubmit}
        className="py-2 w-100 w-md-25 my-4 rounded-pill fs-5"
        disabled={isLoading}
        style={{ maxWidth: '250px' }}
      >
        {isLoading ? 'Launching...' : 'Launch Election'}
      </Button>
    </div>
  );
};

export default LaunchElectionForm;
