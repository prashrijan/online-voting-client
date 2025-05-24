import ElectionCard from '@components/elections/ElectionCard';
import { useSelector } from 'react-redux';
import { Container, Accordion } from 'react-bootstrap';

const UpcomingElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const upcoming = publicElection?.filter(
    (election) => election.status === 'pending'
  );

  return (
    <Container
      fluid="md"
      className="mt-3 p-3 rounded-4 bg-white"
      style={{ maxWidth: '100%' }}
    >
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="border-0">
          <Accordion.Header>
            <h2 className="mb-0 fs-5 fs-md-4">Upcoming Elections</h2>
          </Accordion.Header>
          <Accordion.Body className="p-2 p-md-3">
            {upcoming.length > 0 ? (
              <ElectionCard cardData={upcoming} />
            ) : (
              <p className="m-3 text-center">No upcoming elections.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default UpcomingElections;
