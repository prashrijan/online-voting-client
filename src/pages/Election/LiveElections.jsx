import React from 'react';
import ElectionCard from '../../components/elections/ElectionCard';
import { live } from '../../assets/form/dummyCardData';
import { useSelector } from 'react-redux';

const LiveElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const live = publicElection?.filter(
    (election) => election.status === 'active'
  );
  return (
    <>
      <h2 className="m-3 fs-2">Live Events</h2>
      <ElectionCard cardData={live} />
    </>
  );
};

export default LiveElections;
