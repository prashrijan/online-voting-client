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

const AddCandidateForm = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const { candidates } = useSelector((state) => state.election);
  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(111, activeUsers);

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

  const handleAddCandidate = (candidate) => {
    if (!candidates.some((c) => c._id === candidate._id)) {
      dispatch(addCandidate(candidate));
    }
    setSearch('');
    setFiltered([]);
  };

  const handleRemoveCandidate = (candidateId) => {
    dispatch(removeCandidate({ _id: candidateId }));
  };

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
              onClick={() => handleAddCandidate(user)}
              disabled={candidates.some((c) => c._id === user._id)}
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

      {candidates.length > 0 ? (
        <div className="mt-4">
          <h5 className="mb-4">Selected Candidates</h5>
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
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>
                    <Image
                      src={candidate.profileImage}
                      roundedCircle
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.bio || 'No bio.'}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveCandidate(candidate._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p className="text-danger">No Candidates Added Yet.</p>
      )}
    </>
  );
};

export default AddCandidateForm;
