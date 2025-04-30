import React from 'react';
import { Button, Container } from 'react-bootstrap';
import LiveElections from '../Election/LiveElections';
import UpcomingElections from '../Election/UpcomingElections';
import Hero from '../../components/dashboard/Hero';

const Dashboard = () => {
  return (
    <Container className="p-5">
      <div className="w-100">
        <Hero />
        <LiveElections />
        <UpcomingElections />
      </div>
    </Container>
  );
};

export default Dashboard;
