import React from 'react';
import { upcoming } from '../../assets/form/dummyCardData';
import ElectionCard from '../../components/elections/ElectionCard';

const UpcomingElections = () => {
  return (
    <>
      <h2 className="m-3 fs-2">Upcoming Events</h2>
      <ElectionCard cardData={upcoming} />
    </>
  );
};

export default UpcomingElections;
