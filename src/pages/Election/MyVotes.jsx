import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Image, Badge } from 'react-bootstrap';
import { fetchMyVotesApi } from '../../services/voteApi';
import Loader from '@components/loader/Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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

const MyVotes = () => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyVotes = async () => {
    try {
      setLoading(true);
      const res = await fetchMyVotesApi();
      setVotes(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load your votes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVotes();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold text-center">🗳️ My Votes</h2>

      {loading && <Loader text="Fetching your votes..." />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && votes.length === 0 && (
        <Alert variant="info">😶 You haven’t voted in any elections yet.</Alert>
      )}

      {!loading &&
        votes.map((vote) => {
          const election = vote?.electionId;
          const candidate = vote?.candidateId;
          const statusVariant = getStatusVariant(election?.status);
          const formattedTime = dayjs(vote.updatedAt).fromNow();

          return (
            <Card key={vote._id} className="mb-4 shadow-sm border-0 rounded-4">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="fw-bold mb-0 me-3">{election?.title}</h5>
                    <Badge bg={statusVariant} className="text-capitalize">
                      {election?.status}
                    </Badge>
                  </div>
                  <p className="mb-1">
                    🧑 You voted for: <strong>{candidate?.fullName}</strong>
                  </p>
                  <small className="text-muted">🕒 {formattedTime}</small>
                </div>

                {candidate?.profileImage && (
                  <Image
                    src={candidate.profileImage}
                    alt={candidate.fullName}
                    roundedCircle
                    width={150}
                    height={150}
                    style={{ objectFit: 'cover', border: '2px solid #ddd' }}
                  />
                )}
              </Card.Body>
            </Card>
          );
        })}
    </Container>
  );
};

export default MyVotes;
