import React, { useEffect, useState } from 'react';
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
import {
  addCandidate,
  removeCandidate,
} from '../../features/election/elecitonSlice';

const dummyCandidates = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    slogan: 'For a better tomorrow',
    profilePic: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    slogan: 'Your voice, your choice',
    profilePic: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Ali Khan',
    email: 'ali@example.com',
    slogan: 'Leading with integrity',
    profilePic:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  },
];

const SearchCandidateForm = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const { electionData } = useSelector((state) => state.election);
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (search) {
        const matches = dummyCandidates.filter((candidate) =>
          candidate.email.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(matches);
      } else {
        setFiltered([]);
      }
    }, 500);

    return () => clearTimeout(debounceFunction);
  }, [search]);

  const handleAddCandidate = (candidate) => {
    dispatch(addCandidate(candidate));
    setSearch('');
    setFiltered([]);
  };

  const handleDeleteCandidate = (candidateId) => {
    dispatch(removeCandidate({ id: candidateId }));
  };

  return (
    <>
      <Form.Group controlId="candidateSearch" className="mb-4">
        <Form.Label>Search Candidate by Email</Form.Label>
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
          {filtered.map((candidate) => (
            <Dropdown.Item
              key={candidate.id}
              className="p-2"
              onClick={() => handleAddCandidate(candidate)}
            >
              <Card className="p-2">
                <Row className="align-items-center">
                  <Col xs={9}>
                    <h5 className="mb-1">{candidate.name}</h5>
                    <p className="mb-1">{candidate.email}</p>
                    <small className="text-muted">{candidate.slogan}</small>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Image
                      src={candidate.profilePic}
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

      {electionData.candidates.length > 0 && (
        <div className="mt-4">
          <h5>Selected Candidates</h5>
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
              {electionData.candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>
                    <Image
                      src={candidate.profilePic}
                      roundedCircle
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.slogan}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SearchCandidateForm;
