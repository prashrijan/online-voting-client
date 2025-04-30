import React from 'react';
import ElectionCard from '../../components/elections/ElectionCard';
import { live } from '../../assets/form/dummyCardData';

const LiveElections = () => {
  return (
    <>
      <h2 className="m-3 fs-2">Live Events</h2>
      <ElectionCard cardData={live} />
    </>
  );
};

export default LiveElections;
