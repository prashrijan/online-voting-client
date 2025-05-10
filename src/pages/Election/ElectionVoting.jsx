import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import profileimg from '../../assets/images/donut.png';
import { fetchElectionAction } from '../../features/election/electionAction';
import { getTimeRemaining } from '../../utils/getRemainingtime';
import { formatDate } from '../../utils/date';
import Loader from '../../components/loader/Loader';

const ElectionVoting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const election = useSelector((state) => state?.election?.electionToShow);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchElectionAction(id));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  if (loading || !election || !election.title) {
    return <Loader text="Getting Election Data...." />;
  }

  return (
    <>
      <div className="h-100 bg-light ">
         {/* Cover Image */}
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <img
            src={election.coverImage}
            alt=""
            style={{ height: '300px', width: '100%' }}
            className="rounded-5 rounded-top-0 object-fit-cover"
          />
          <div
            className="px-5 bg-white shadow-sm rounded-4"
            style={{
              height: '70px',
              translate: '0px -30px 0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1 className="fs-1 fw-medium">{election.title}</h1>
          </div>
        </div>

        {/* Election Details */}
        <div className="container p-4 rounded-5 shadow-sm bg-white">
          <div>
            <span className="p-1 m-1 px-3 bg-success text-light rounded-pill">
              {election.status}
            </span>

            {election?.endDate && (
              <span className="p-1 m-1 px-3 bg-secondary-subtle rounded-pill">
                {getTimeRemaining(election.endDate)}
              </span>
            )}

            <div>
              <span className="fw-semibold">Organized by:</span>{' '}
              {election.createdBy?.fullName}
            </div>
            <div>
              <span className="fw-semibold">
                Starts in: {formatDate(election.startDate)} at{' '}
                {election.startTime}
              </span>
            </div>
            <div>
              <span className="fw-semibold">
                Ends in: {formatDate(election.endDate)} at {election.endTime}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 d-flex justify-content-center align-items-start gap-5">
          {/* Candidate Details */}
          <div
            className="p-4 bg-white shadow-sm rounded-4"
            style={{ height: '600px', width: '500px' }}
          >
            <span className="fs-2 fw-bold my-3">Candidates</span>

            <div className="my-5" style={{ height: '80px', width: 'auto' }}>
              <div className="d-flex align-items-center">
                <img
                  src={profileimg}
                  alt="img"
                  className="rounded-circle"
                  style={{
                    height: '65px',
                    width: 'auto',
                    border: '5px solid blue',
                  }}
                />
                <div className="h-100 w-100 mx-3 p-2 px-4 d-inline rounded-4 bg-body-tertiary">
                  Mr. Joe <br />
                  48% Votes in Favor
                </div>
              </div>
            </div>
          </div>

          {/* Live Updates */}
          <div
            className="p-2 bg-white shadow-sm rounded-4"
            style={{ height: '550px', width: '500px' }}
          >
            <span className="fs-2 fw-semibold">Live Updates</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionVoting;
