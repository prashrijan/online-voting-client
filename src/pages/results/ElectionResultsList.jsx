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
        <p className="text-muted text-center">
          No finished elections available yet.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          {elections.map((election) => (
            <div
              key={election._id}
              className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3"
            >
              <div className="card shadow-sm rounded-4 p-3 h-100 d-flex flex-column">
                <img
                  src={election.coverImage}
                  className="card-img-top rounded-4"
                  alt={election.title}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{election.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Organized by:</strong>{' '}
                    {election.createdBy?.fullName || 'Unknown'}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Start:</strong> {formatDate(election.startDate)}{' '}
                    {election.startTime}
                  </p>
                  <p className="card-text mb-3">
                    <strong>End:</strong> {formatDate(election.endDate)}{' '}
                    {election.endTime}
                  </p>
                  <button
                    className="btn btn-dark mt-auto"
                    onClick={() => navigate(`/user/results/${election._id}`)}
                  >
                    View Results
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionResultsList;
