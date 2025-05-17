import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Modal, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCandidateFromElectionAction,
  fetchCandidatesAction,
} from '../../features/election/electionAction';
import Loader from '@components/loader/Loader';
import SearchCandidateForm from '@components/Forms/SelectCandidateForm';

const ManageCandidates = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.election.candidatesToShow);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCandidatesAction(electionId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);
  console.log(candidates);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    bio: '',
  });

  const handleAddCandidate = () => {
    const candidate = {
      ...newCandidate,
      _id: (candidates.length + 1).toString(),
    };
    setCandidates([...candidates, candidate]);
    setNewCandidate({ name: '', position: '', bio: '' });
    setShowAddModal(false);
  };

  const handleDeleteConfirmation = (candidate) => {
    setCandidateToDelete(candidate);
    setShowDeleteModal(true);
  };

  const handleDeleteCandidate = async () => {
    try {
      setLoading(true);
      await dispatch(
        deleteCandidateFromElectionAction(candidateToDelete._id, electionId)
      );
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete candidate');
      setLoading(false);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Candidates</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Candidate
        </Button>
      </div>

      {loading ? (
        <Loader text="Fetching your data..." />
      ) : candidates.length === 0 ? (
        <Card className="text-center p-4">
          <p>No candidates have been added yet.</p>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Your First Candidate
          </Button>
        </Card>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>
                  <img
                    src={candidate.profileImage}
                    alt={candidate.fullName}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </td>
                <td>{candidate.fullName}</td>
                <td>{candidate.bio || '—'}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteConfirmation(candidate)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="mt-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/user/manage-elections')}
        >
          Back to Elections
        </Button>
      </div>

      {/* Add Candidate Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchCandidateForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCandidate}>
            Add Candidate
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove "{candidateToDelete?.fullName}" from
          this election?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCandidate}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageCandidates;
