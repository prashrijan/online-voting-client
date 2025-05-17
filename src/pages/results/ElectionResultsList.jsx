import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFinishedElectionAction } from '@features/election/electionAction';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@utils/date';
import Loader from '@components/loader/Loader';

const ElectionResultsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const elections = useSelector((state) => state.election.finishedElections);

  useEffect(() => {
    dispatch(getFinishedElectionAction());
  }, [dispatch]);

  if (!elections) return <Loader text="Loading Results..." />;

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-semibold text-center">
        🗳️ Published Election Results
      </h2>

      {elections.length === 0 ? (
        <p className="text-muted">No finished elections available yet.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          {elections.map((election) => (
            <div
              key={election._id}
              className="card shadow-sm rounded-4 p-3"
              style={{ width: '350px' }}
            >
              <img
                src={election.coverImage}
                className="card-img-top rounded-4 object-fit-cover"
                alt={election.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{election.title}</h5>
                <p className="card-text mb-1">
                  <strong>Organized by:</strong>{' '}
                  {election.createdBy?.fullName || 'Unknown'}
                </p>
                <p className="card-text mb-1">
                  <strong>Start:</strong> {formatDate(election.startDate)}{' '}
                  {election.startTime}
                </p>
                <p className="card-text mb-2">
                  <strong>End:</strong> {formatDate(election.endDate)}{' '}
                  {election.endTime}
                </p>
                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => navigate(`/user/results/${election._id}`)}
                >
                  View Results
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionResultsList;
