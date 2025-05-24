import React from 'react';
import ElectionCard from '@components/elections/ElectionCard';
import { useSelector } from 'react-redux';
import { Container, Accordion } from 'react-bootstrap';

const LiveElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const live = publicElection?.filter(
    (election) => election.status === 'active'
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
            <h2 className="mb-0 fs-5 fs-md-4">Live Elections</h2>
          </Accordion.Header>
          <Accordion.Body className="p-2 p-md-3">
            {live.length > 0 ? (
              <ElectionCard cardData={live} />
            ) : (
              <p className="m-3 text-center">
                No live elections at the moment.
              </p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default LiveElections;
