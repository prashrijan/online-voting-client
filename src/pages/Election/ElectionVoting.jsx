import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import profileimg from '@assets/images/donut.png';
import {
  fetchCandidatesAction,
  fetchElectionAction,
} from '@features/election/electionAction';
import { getTimeRemaining } from '@utils/getRemainingTime';
import { formatDate } from '@utils/date';
import Loader from '@components/loader/Loader';
import CandidateCard from '@components/elections/CandidateCard';
import { castVoteApi, checkVoteStatusApi } from '@services/voteApi';
import LiveVoteChart from '@components/chart/LiveVoteChart';
import { Button, Modal } from 'react-bootstrap';

const ElectionVoting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [candidateToVote, setCandidateToVote] = useState(null);
  const [chartType, setChartType] = useState('bar');

  const election = useSelector((state) => state?.election?.electionToShow);
  const candidates = useSelector((state) => state?.election?.candidatesToShow);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchElectionAction(id));
      await dispatch(fetchCandidatesAction(id));
      const res = await checkVoteStatusApi(id);
      setHasVoted(res.data); // true or false from API
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  if (loading || !election || !election.title) {
    return <Loader text="Getting Election Data..." />;
  }

  const handleVote = async () => {
    const res = await castVoteApi(id, candidateToVote._id);
    if (res && res.success) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
    setShowModal(false);
  };

  const handleVoteConfirmation = (candidate) => {
    setCandidateToVote(candidate);
    setShowModal(true);
  };

  return (
    <div className="h-100 bg-light mb-3">
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
          <span
            className={`p-1 m-1 px-3 ${
              election.status === 'active'
                ? 'bg-success'
                : election.status === 'pending'
                  ? 'bg-warning'
                  : 'bg-danger'
            } text-light rounded-pill`}
          >
            {election.status.toUpperCase()}
          </span>

          {election?.endDate && (
            <span className="p-1 m-1 px-3 bg-secondary-subtle rounded-pill">
              {getTimeRemaining(
                election.startDate,
                election.startTime,
                election.endDate,
                election.endTime
              )}
            </span>
          )}
        </div>

        <section className="mt-3">
          <div>
            <strong>Organized by:</strong>{' '}
            {election.createdBy?.fullName || 'Unknown'}
          </div>
          <div>
            <strong>Starts:</strong> {formatDate(election.startDate)} at{' '}
            {election.startTime}
          </div>
          <div>
            <strong>Ends:</strong> {formatDate(election.endDate)} at{' '}
            {election.endTime}
          </div>
        </section>
      </div>

      {/* Live Chart + Candidates */}
      <div className="container mt-5 d-flex gap-4 flex-column">
        {/* Live Updates */}
        <div className="bg-white p-4 shadow-sm rounded-4">
          <h2 className="fs-4 fw-semibold mb-3">Live Updates</h2>

          {election.status === 'active' ? (
            <>
              <div className="mb-3 d-flex align-items-center gap-3">
                <select
                  id="chartType"
                  className="form-select w-auto"
                  value={chartType}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected === 'pie' && !user?.isPaid) {
                      navigate('/user/subscriptions');
                    } else {
                      setChartType(selected);
                    }
                  }}
                >
                  <option value="bar">Bar Chart</option>
                  <option
                    value="pie"
                    className={!user?.isPaid ? 'text-muted' : ''}
                  >
                    Pie Chart{' '}
                    {!user?.isPaid && (
                      <span className="badge bg-warning text-dark ms-2">
                        (Premium)
                      </span>
                    )}
                  </option>
                </select>
              </div>

              <LiveVoteChart electionId={id} type={chartType} />
            </>
          ) : (
            'Live Updates will show when the election starts.'
          )}
        </div>

        {/* Candidate List */}
        <div className="flex-grow-1 bg-white p-4 shadow-sm rounded-4">
          <h2 className="mb-4 fw-semibold">Candidates</h2>
          <div className="d-flex align-items-center flex-wrap g-4">
            {candidates.length === 0 ? (
              <p>No candidates have been added for this election.</p>
            ) : (
              candidates?.map((candidate) => (
                <div className="m-2" key={candidate._id}>
                  <CandidateCard
                    name={candidate.fullName}
                    slogan={candidate.bio}
                    imageUrl={candidate.profileImage || profileimg}
                    onVote={
                      election.status === 'active'
                        ? () => handleVoteConfirmation(candidate)
                        : null
                    }
                    hasVoted={hasVoted}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vote Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Vote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to vote for{' '}
            <strong>{candidateToVote?.fullName}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleVote}>
              Yes, Vote
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ElectionVoting;
