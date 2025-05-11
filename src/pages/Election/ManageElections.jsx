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
import { FiCalendar } from 'react-icons/fi';
import { TbListDetails } from 'react-icons/tb';

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
    <div className=" h-100 w-100 p-5 bg-light ">
      <Container className="">
        <h2 className="mb-4 fw-bold text-center">Manage Your Elections</h2>
        {loading ? (
          <Loader text={'Fetching your data...'} />
        ) : elections.length == 0 ? (
          <div className="text-center my-5 text-muted">
            <h5>You haven’t created any elections yet.</h5>
          </div>
        ) : (
          <Row
            xs={1}
            md={2}
            lg={3}
            className=" border bg-white rounded-4 shadow p-4"
          >
            {elections.map((election) => (
              <Col key={election._id}>
                <Card className="border-1 shadow-sm rounded-2 overflow-hidden h-100">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={election.coverImage}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div
                      className={`position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill text-white fw-semibold small ${
                        election.status === 'active'
                          ? 'bg-success'
                          : election.status === 'pending'
                            ? 'bg-warning text-dark'
                            : election.status === 'completed'
                              ? 'bg-secondary'
                              : 'bg-primary'
                      }`}
                    >
                      {election.status.charAt(0).toUpperCase() +
                        election.status.slice(1)}
                    </div>
                  </div>

                  <Card.Body>
                    <Card.Title className="fw-bold text-dark">
                      {election.title}
                    </Card.Title>
                    <Card.Text>
                      <div className="bg-light rounded-3 p-3 mb-3 small text-secondary d-flex align-items-center">
                        <FiCalendar className="icon" />
                        <div>
                          <div className="mb-2">
                            <strong className="fw-semibold text-dark">
                              Created Date:
                            </strong>{' '}
                            {formatDate(election.createdAt)}
                          </div>
                          <div>
                            <strong className="fw-semibold text-dark">
                              Created Time:
                            </strong>{' '}
                            {to12HourFormat(election.startTime)}
                          </div>
                        </div>
                      </div>

                      <div className="bg-light rounded-3 p-3 small text-secondary d-flex align-items-center">
                        <TbListDetails className="icon" />
                        <div>
                          <div className="mb-1">
                            <strong className="fw-semibold text-dark">
                              Dates:
                            </strong>{' '}
                            {formatDate(election.startDate)} to{' '}
                            {formatDate(election.endDate)}
                          </div>
                          <div className="mb-1">
                            <strong className="fw-semibold text-dark">
                              Time:
                            </strong>{' '}
                            {to12HourFormat(election.startTime)} -{' '}
                            {to12HourFormat(election.endTime)}
                          </div>
                          <div className="mb-1">
                            <strong className="fw-semibold text-dark">
                              Visibility:
                            </strong>{' '}
                            {election.visibility.charAt(0).toUpperCase() +
                              election.visibility.slice(1)}
                          </div>
                          <div className="mb-1">
                            <strong className="fw-semibold text-dark">
                              Status
                            </strong>{' '}
                            {election.status.charAt(0).toUpperCase() +
                              election.status.slice(1)}
                          </div>
                          <div>
                            <strong className="fw-semibold text-dark">
                              Candidates:
                            </strong>{' '}
                            {election.candidates.length}
                          </div>
                          <div>
                            <strong className="fw-semibold text-dark">
                              Voters:{' '}
                            </strong>{' '}
                          </div>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>

                  <Card.Footer className="bg-white border-0 pt-0">
                    <div className="d-flex justify-content-around align-items-center flex-wrap gap-2">
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
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteElection}>
              Delete Election
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ManageElections;
