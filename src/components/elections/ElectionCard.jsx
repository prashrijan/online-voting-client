import React, { use } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import defaultImg from '../../assets/images/Chunaab.png';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  FiClock,
  FiUser,
  FiUsers,
  FiCalendar,
  FiAlertCircle,
} from 'react-icons/fi';
import './ElectionCard.css';

import { formatDate } from '../../utils/date';

function ElectionCard({ cardData }) {
  const navigate = useNavigate();

  // Function to calculate time remaining
  const getTimeRemaining = (endDate) => {
    const end = new Date(endDate.split('/').reverse().join('-'));
    const now = new Date();
    const diff = end - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `Ends in ${days} day${days !== 1 ? 's' : ''}`;
    if (hours > 0) return `Ends in ${hours} hour${hours !== 1 ? 's' : ''}`;
    return 'Ending soon';
  };

  // Function to get button text based on status
  const getButtonText = (status) => {
    switch (status) {
      case 'active':
        return 'Vote Now';
      case 'pending':
        return 'View Details';
      default:
        return 'View Results';
    }
  };

  // Function to get button variant based on status
  const getButtonVariant = (status) => {
    switch (status) {
      case 'active':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const handleOnVoteButtonClick = (_id) => {
    console.log('Vote Button Clicked', _id);
    navigate(`/user/election-voting/${_id}`);
  };

  return (
    <div className="election-card-container">
      {cardData?.map((election) => (
        <Card key={election._id} className="election-card">
          <div className="card-image-container">
            <Card.Img
              variant="top"
              src={election.coverImage || defaultImg}
              className="card-image"
            />
            <div className={`status-badge ${election.status.toLowerCase()}`}>
              {election.status == 'active' ? 'Active' : 'Upcoming'}
              {election.status === 'active' && (
                <span className="pulse-dot"></span>
              )}
            </div>
          </div>

          <Card.Body>
            <Card.Title className="card-title">{election.title}</Card.Title>

            {election.description && (
              <div className="election-description">
                <FiAlertCircle className="icon" />
                <span>{election.description}</span>
              </div>
            )}

            <div className="organizer-info">
              <FiUser className="icon" />
              <span>Organized by: {election.createdBy?.fullName}</span>
            </div>

            <div className="date-time-info">
              <div className="date-time-group">
                <FiCalendar className="icon" />
                <div>
                  <div className="date-time">
                    <span className="label">Start:</span>
                    {formatDate(election.startDate)} at {election.startTime}
                  </div>
                  <div className="date-time">
                    <span className="label">End:</span>
                    {formatDate(election.endDate)} at {election.endTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <FiUsers className="icon" />
                <span>{election.candidates?.length} Candidates</span>
              </div>
              <div className="stat-item">
                <FiUsers className="icon" />
                <span>{election.voters || '99+'} Voters</span>
              </div>
            </div>
          </Card.Body>

          <Card.Footer className="card-footer">
            <Button
              variant={getButtonVariant(election.status)}
              className="vote-button"
              onClick={() => handleOnVoteButtonClick(election._id)}
            >
              {getButtonText(election.status)}
            </Button>
            {election.status === 'active' && (
              <div className="time-remaining">
                <FiClock className="icon" />
                <span>{getTimeRemaining(election.endDate)}</span>
              </div>
            )}
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

export default ElectionCard;
