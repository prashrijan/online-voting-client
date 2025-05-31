import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './styles/CandidateCard.styles.css';
import { MdOutlineHowToVote } from 'react-icons/md';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

const CandidateCard = ({ name, slogan, imageUrl, onVote, hasVoted }) => {
  return (
    <Card style={{ width: '18rem' }} className="shadow-sm rounded-4">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        className="p-3 rounded-circle mx-auto"
        style={{ height: '150px', width: '150px', objectFit: 'cover' }}
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold fs-4">{name}</Card.Title>
        <Card.Text className="text-muted fst-italic">
          "
          {slogan
            ? slogan.length > 30
              ? slogan.slice(0, 30) + '...'
              : slogan
            : "User hasn't added any slogan yet."}
          "
        </Card.Text>
        {onVote ? (
          <Button
            onClick={onVote}
            disabled={hasVoted}
            className={`button ${hasVoted ? 'disabled' : 'active'}`}
            variant={hasVoted ? 'success' : 'dark'}
          >
            {hasVoted ? (
              <div className="d-flex align-items-center gap-1">
                Already Voted{' '}
                <IoCheckmarkDoneCircle
                  style={{ height: '20px', width: '20px' }}
                />
              </div>
            ) : (
              <div className="d-flex align-items-center gap-1">
                Vote{' '}
                <MdOutlineHowToVote style={{ height: '20px', width: '20px' }} />
              </div>
            )}
          </Button>
        ) : (
          <div className="text-secondary small mt-2">
            Voting is not available at the moment.
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
