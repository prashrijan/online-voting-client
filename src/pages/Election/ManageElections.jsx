import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteElectionAction,
  getMyElectionAction,
} from '../../features/election/electionAction';
import { to12HourFormat } from '../../utils/time';
import Loader from '../../components/loader/Loader';

const ManageElections = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedElectionId, setSelectedElectionId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'finished':
        return <Badge bg="secondary">Finished</Badge>;
      default:
        return (
          <Badge bg="light" text="dark">
            {status}
          </Badge>
        );
    }
  };

  const handleEditElection = (electionId) => {
    navigate(`/user/edit-election/${electionId}`);
  };

  const handleManageCandidates = (electionId) => {
    navigate(`/user/manage-candidates/${electionId}`);
  };

  const handleDeleteConfirmation = (election) => {
    setShowDeleteModal(true);
    setSelectedElectionId(election._id);
  };

  const handleDeleteElection = async () => {
    if (!selectedElectionId) return;

    try {
      await dispatch(deleteElectionAction(selectedElectionId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete election:', err);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Manage Your Elections</h2>

      {loading ? (
        <Loader text={'Fetching your data...'} />
      ) : elections.length == 0 ? (
        <div className="text-center my-5 text-muted">
          <h5>You haven’t created any elections yet.</h5>
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
                      <strong>Status:</strong> {getStatusBadge(election.status)}
                      <br />
                      <strong>Visibility:</strong>{' '}
                      {election.visibility.charAt(0).toUpperCase() +
                        election.visibility.slice(1)}
                      <br />
                      <strong>Candidates:</strong> {election.candidates.length}
                    </small>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditElection(election._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleManageCandidates(election._id)}
                    >
                      Candidates
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteConfirmation(election)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this election? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteElection}>
            Delete Election
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageElections;
