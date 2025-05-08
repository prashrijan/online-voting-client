import React from 'react';
import { useParams } from 'react-router-dom';

const ElectionVoting = () => {
  const { id } = useParams();
  return (
    <div>
      Election Voting
      {id}
    </div>
  );
};

export default ElectionVoting;
