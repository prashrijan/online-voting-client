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

  return (
    <div className="bg-light">
      <div className="w-100">
        <Hero />
        <LiveElections />
        <UpcomingElections />
      </div>
    </div>
  );
};

export default Dashboard;
