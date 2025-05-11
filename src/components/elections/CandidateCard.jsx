import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './styles/CandidateCard.styles.css';

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
        <Card.Text className="text-muted fst-italic">"{slogan}"</Card.Text>
        <Button
          onClick={onVote}
          disabled={hasVoted}
          className={`button ${hasVoted ? 'disabled' : 'active'}`}
        >
          {hasVoted ? 'Already Voted' : 'Vote'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
