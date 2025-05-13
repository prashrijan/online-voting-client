import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Badge,
  Alert,
  Image,
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
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedElectionId, setSelectedElectionId] = useState(null);

  const elections = useSelector((state) => state.election.yourElections);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getMyElectionAction());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745'; // green
      case 'pending':
        return '#ffc107'; // yellow
      case 'completed':
        return '#6c757d'; // grey
      case 'closed':
        return '#343a40'; // dark
      default:
        return '#007bff'; // blue
    }
  };

  const handleEdit = (id) => navigate(`/user/edit-election/${id}`);
  const handleCandidates = (id) => navigate(`/user/manage-candidates/${id}`);

  const handleDelete = async () => {
    if (selectedElectionId) {
      await dispatch(deleteElectionAction(selectedElectionId));
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-center">🛠️ Manage Elections</h2>

      {loading ? (
        <Loader text="Loading your elections..." />
      ) : elections.length === 0 ? (
        <Alert variant="info" className="text-center">
          You haven’t created any elections yet.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {elections.map((election) => (
            <Col key={election._id}>
              <Card className="shadow-sm border-0 rounded-4 h-100 position-relative overflow-hidden">
                <div
                  style={{
                    height: '6px',
                    backgroundColor: getStatusColor(election.status),
                    width: '100%',
                  }}
                ></div>

                {election.coverImage && (
                  <Card.Img
                    src={election.coverImage}
                    style={{ height: '140px', objectFit: 'cover' }}
                  />
                )}

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-2 text-dark">{election.title}</h5>

                    <div className="mb-2 text-muted small">
                      <div>
                        📅 {formatDate(election.startDate)} —{' '}
                        {formatDate(election.endDate)}
                      </div>
                      <div>
                        ⏰ {to12HourFormat(election.startTime)} -{' '}
                        {to12HourFormat(election.endTime)}
                      </div>
                      <div>👥 Candidates: {election.candidates.length}</div>
                      <div>
                        🔒 Visibility:{' '}
                        {election.visibility.charAt(0).toUpperCase() +
                          election.visibility.slice(1)}
                      </div>
                    </div>

                    <Badge
                      bg="light"
                      text="dark"
                      className="border mt-1 px-3 py-1"
                    >
                      Status:{' '}
                      <span
                        style={{
                          color: getStatusColor(election.status),
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}
                      >
                        {election.status}
                      </span>
                    </Badge>
                  </div>

                  <div className="d-flex justify-content-evenly gap-2 mt-4">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(election._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleCandidates(election._id)}
                    >
                      Candidates
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setSelectedElectionId(election._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Election</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this election? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageElections;
