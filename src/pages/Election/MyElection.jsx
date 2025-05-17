import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyElectionAction } from '../../features/election/electionAction';
import { to12HourFormat } from '../../utils/time';
import Loader from '@components/loader/Loader';
import { toast } from 'react-toastify';
import { SiTicktick } from 'react-icons/si';

const MyElection = () => {
  const [loading, setLoading] = useState(true);
  const [copiedElectionId, setCopiedElectionId] = useState(null);

  const dispatch = useDispatch();
  const elections = useSelector((state) => state.election.yourElections);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getMyElectionAction());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'finished':
        return 'info';
      case 'closed':
        return 'secondary';
      default:
        return 'dark';
    }
  };

  const copyToClipboard = (text, electionId) => {
    navigator.clipboard.writeText(text);
    setCopiedElectionId(electionId);

    toast.success('Chunaab Code copied!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      setCopiedElectionId(null);
    }, 2000);
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Elections</h2>

      {loading ? (
        <Loader text={'Fetching your data...'} />
      ) : elections.length === 0 ? (
        <div className="text-center my-5 text-muted">
          <h5>You haven't created any elections yet.</h5>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {elections.map((election) => (
            <Col key={election._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={election.coverImage}
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{election.title}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      <strong>Dates:</strong> {formatDate(election.startDate)}{' '}
                      to {formatDate(election.endDate)}
                      <br />
                      <strong>Time:</strong>{' '}
                      {to12HourFormat(election.startTime)} -{' '}
                      {to12HourFormat(election.endTime)}
                      <br />
                      <strong>Status:</strong>{' '}
                      <Badge
                        bg={getStatusVariant(election.status)}
                        className="text-capitalize"
                      >
                        {election.status}
                      </Badge>
                      <br />
                      <strong>Visibility:</strong>{' '}
                      {election.visibility.charAt(0).toUpperCase() +
                        election.visibility.slice(1)}
                      <br />
                      <strong>Candidates:</strong> {election.candidates.length}
                      <br />
                      <div className="d-flex align-items-center">
                        <span>
                          <strong>Chunaab Code:</strong>{' '}
                          <span
                            className={`me-2 ${copiedElectionId === election._id ? 'bg-warning px-2 rounded' : ''}`}
                            style={{
                              transition: 'background-color 0.3s ease',
                              wordBreak: 'break-all',
                            }}
                          >
                            {election.chunaabCode}
                          </span>
                        </span>
                        <Button
                          variant={
                            copiedElectionId === election._id
                              ? 'success'
                              : 'outline-dark'
                          }
                          size="sm"
                          onClick={() =>
                            copyToClipboard(election.chunaabCode, election._id)
                          }
                          className="ms-auto d-flex align-items-center gap-1"
                        >
                          {copiedElectionId === election._id ? (
                            <>
                              <SiTicktick /> Copied
                            </>
                          ) : (
                            <>
                              <i className="bi bi-clipboard"></i> Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyElection;
