import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import LiveElections from '../Election/LiveElections';
import UpcomingElections from '../Election/UpcomingElections';
import Hero from '../../components/dashboard/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElectionsAction } from '../../features/election/electionAction';

const Dashboard = () => {
  const publicElections = useSelector((state) => state.publicElections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchElectionsAction());
  }, [publicElections]);

  console.log(publicElections);
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
