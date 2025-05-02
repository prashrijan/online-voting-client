import React from 'react';
import { upcoming } from '../../assets/form/dummyCardData';
import ElectionCard from '../../components/elections/ElectionCard';
import { useSelector } from 'react-redux';

const UpcomingElections = () => {
  const publicElection = useSelector((state) => state.election.publicElections);

  const upcoming = publicElection?.filter(
    (election) => election.status === 'pending'
  );
  return (
    <>
      <h2 className="m-3 fs-2">Upcoming Events</h2>
      {upcoming.length > 0 ? (
        <ElectionCard cardData={upcoming} />
      ) : (
        <p className="m-3">No upcoming elections.</p>
      )}
    </>
  );
};

export default UpcomingElections;
