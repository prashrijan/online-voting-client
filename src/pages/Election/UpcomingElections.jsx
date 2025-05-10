import React from 'react';
import { upcoming } from '../../assets/form/dummyCardData';
import ElectionCard from '../../components/elections/ElectionCard';
import { useSelector } from 'react-redux';
import { Container, Accordion } from 'react-bootstrap';

const UpcomingElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const upcoming = publicElection?.filter(
    (election) => election.status === 'pending'
  );
  return (
    <Container className="mt-3 p-2 rounded-4 bg-white">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className="border-0">
          <Accordion.Header className="">
            <h2>Upcomming Elections</h2>
          </Accordion.Header>
          <Accordion.Body>
            {upcoming.length > 0 ? (
              <ElectionCard cardData={upcoming} />
            ) : (
              <p className="m-3">No upcoming elections.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default UpcomingElections;
