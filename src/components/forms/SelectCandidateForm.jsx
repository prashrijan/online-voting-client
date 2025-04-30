import React, { useState } from 'react';
import {
  Form,
  Dropdown,
  Card,
  Row,
  Col,
  Image,
  InputGroup,
} from 'react-bootstrap';

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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const matches = dummyCandidates.filter((c) =>
        c.email.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(matches);
    } else {
      setFiltered([]);
    }
  };

  return (
    <>
      <Form.Group controlId="candidateSearch">
        <Form.Label>Search Candidate by Email</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter candidate email"
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>
      </Form.Group>

      {filtered.length > 0 && (
        <Dropdown.Menu show className="mt-2 shadow" style={{ width: '25rem' }}>
          {filtered.map((candidate) => (
            <Dropdown.Item key={candidate.id} className="p-2">
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
    </>
  );
};

export default SearchCandidateForm;
