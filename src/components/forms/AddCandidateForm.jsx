import React, { useState, useEffect } from 'react';
import {
  Form,
  Dropdown,
  Card,
  Row,
  Col,
  Image,
  InputGroup,
  Table,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCandidateToElectionAction } from '@features/election/electionAction';
import { fetchCandidatesAction } from '@features/election/electionAction';

const AddCandidateForm = ({ electionId, setShowAddModal }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Debounced search filter
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.trim()) {
        const matches = activeUsers.filter((user) =>
          user.email.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(matches);
      } else {
        setFiltered([]);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [search, activeUsers]);

  const handleSelect = (user) => {
    if (!selectedIds.includes(user._id)) {
      setSelectedIds((prev) => [...prev, user._id]);
    }
    setSearch('');
    setFiltered([]);
  };

  const handleRemove = (userId) => {
    setSelectedIds((prev) => prev.filter((id) => id !== userId));
  };

  const handleFinalize = async () => {
    if (selectedIds.length) {
      setLoading(true);

      try {
        await dispatch(addCandidateToElectionAction(selectedIds, electionId));
        await dispatch(fetchCandidatesAction(electionId));
        setSelectedIds([]);
        setShowAddModal(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Get full user data from activeUsers for display
  const selectedUsers = activeUsers.filter((user) =>
    selectedIds.includes(user._id)
  );

  return (
    <>
      <Form.Group controlId="candidateSearch" className="mb-4">
        <Form.Label className="fw-semibold">
          Search Candidate by Email
        </Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter candidate email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {filtered.length > 0 && (
        <Dropdown.Menu show className="mt-2 shadow" style={{ width: '25rem' }}>
          {filtered.map((user) => (
            <Dropdown.Item
              key={user._id}
              className="p-2"
              onClick={() => handleSelect(user)}
              disabled={selectedIds.includes(user._id)}
            >
              <Card className="p-2">
                <Row className="align-items-center">
                  <Col xs={9}>
                    <h5 className="mb-1">{user.fullName}</h5>
                    <p className="mb-1">{user.email}</p>
                    <small className="text-muted">
                      {user.bio || "User hasn't added any slogan yet."}
                    </small>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Image
                      src={user.profileImage}
                      roundedCircle
                      fluid
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}

      {selectedUsers.length > 0 ? (
        <>
          <div className="mt-4">
            <h5 className="mb-3">Selected Candidates</h5>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Slogan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <Image
                        src={user.profileImage}
                        roundedCircle
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.bio || 'No bio.'}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(user._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="dark" onClick={handleFinalize} disabled={loading}>
              {loading
                ? 'Adding...'
                : `Add ${selectedIds.length > 1 ? 'All Candidates' : 'Candidate'}`}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-danger">No Candidates Selected Yet.</p>
      )}
    </>
  );
};

export default AddCandidateForm;
