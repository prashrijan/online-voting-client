import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Container,
  ListGroup,
  Modal,
  Form,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';

const ManageCandidates = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();

  // Mock data for candidates
  const [candidates, setCandidates] = useState([
    {
      _id: '1',
      name: 'John Doe',
      position: 'President',
      bio: 'Experienced leader',
    },
    {
      _id: '2',
      name: 'Jane Smith',
      position: 'Vice President',
      bio: 'Student advocate',
    },
    {
      _id: '3',
      name: 'Alex Johnson',
      position: 'Treasurer',
      bio: 'Finance specialist',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

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

  const handleDeleteCandidate = () => {
    setCandidates(candidates.filter((c) => c._id !== candidateToDelete._id));
    setShowDeleteModal(false);
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

      {candidates.length === 0 ? (
        <Card className="text-center p-4">
          <p>No candidates have been added yet.</p>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Your First Candidate
          </Button>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {candidates.map((candidate) => (
            <Col key={candidate._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{candidate.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {candidate.position}
                  </Card.Subtitle>
                  <Card.Text>{candidate.bio}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      navigate(`/edit-candidate/${electionId}/${candidate._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteConfirmation(candidate)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCandidate.name}
                onChange={handleInputChange}
                placeholder="Enter candidate name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={newCandidate.position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={newCandidate.bio}
                onChange={handleInputChange}
                placeholder="Enter candidate bio"
                rows={3}
              />
            </Form.Group>
          </Form>
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
          Are you sure you want to delete candidate "{candidateToDelete?.name}"?
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
