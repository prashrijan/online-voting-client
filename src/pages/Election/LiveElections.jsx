import React, { useState } from 'react';
import ElectionCard from '@/elections/ElectionCard';
import { useSelector } from 'react-redux';
import { Container, Accordion } from 'react-bootstrap';

const LiveElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const live = publicElection?.filter(
    (election) => election.status === 'active'
  );
  return (
    <Container className="mt-3 p-2 rounded-4 bg-white">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="border-0">
          <Accordion.Header className="">
            <h2>Live Elections</h2>
          </Accordion.Header>
          <Accordion.Body>
            {live.length > 0 ? (
              <ElectionCard cardData={live} />
            ) : (
              <p className="m-3">No live elections at the moment.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default LiveElections;
