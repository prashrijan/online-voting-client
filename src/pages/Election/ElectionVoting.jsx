import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import profileimg from '../../assets/images/donut.png';
import {
  fetchCandidatesAction,
  fetchElectionAction,
} from '../../features/election/electionAction';
import { getTimeRemaining } from '../../utils/getRemainingtime';
import { formatDate } from '../../utils/date';
import Loader from '../../components/loader/Loader';
import CandidateCard from '../../components/elections/CandidateCard';

const ElectionVoting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const election = useSelector((state) => state?.election?.electionToShow);
  const candidates = useSelector((state) => state?.election?.candidatesToShow);
  console.log(election);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchElectionAction(id));
      await dispatch(fetchCandidatesAction(id));
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

        <div className="container mt-5 d-flex gap-4 flex-column">
          {/* Live Updates */}
          <div className="bg-white p-4 shadow-sm rounded-4">
            <h2 className="fs-4 fw-semibold mb-3">Live Updates</h2>
            {/* Live update content can go here */}
          </div>
          {/* Candidate Details */}
          <div className="flex-grow-1 bg-white p-4 shadow-sm rounded-4">
            <h2 className="mb-4 fw-semibold">Candidates</h2>

            <div className="row g-4">
              {candidates?.map((candidate) => (
                <div className="col-12 col-md-6 col-lg-4" key={candidate._id}>
                  <CandidateCard
                    name={candidate.fullName}
                    slogan={candidate.bio}
                    imageUrl={candidate.profileImage || profileimg}
                    onVote={() => console.log(candidate._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionVoting;
