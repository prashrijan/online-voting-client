import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { cardData } from '../../assets/form/dummyCardData';
import defaultImg from '../../assets/images/Chunaab.png';

function ElectionCard() {
  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center">
      {cardData.map((election) => (
        <Card
          key={election.id}
          className="rounded-4 overflow-hidden"
          style={{ width: '350px' }}
        >
          <Card.Img
            variant="top"
            src={election.image || defaultImg}
            className="rounded-0 object-fit-cover"
            style={{ height: '250px' }}
          />
          <Card.Body className="pb-1 pt-3">
            <Card.Title className="fw-bold fs-5 mb-2">
              {election.title}
            </Card.Title>
            <div className="d-flex align-items-center mb-2">
              <Badge
                bg={election.status === 'Active' ? 'success' : 'secondary'}
                className="rounded-circle p-2 me-2"
                style={{ width: '10px', height: '10px' }}
              />
              <span
                className={`small text-${election.status === 'Active' ? 'success' : 'secondary'}`}
              >
                {election.status}
              </span>
            </div>
            <div className="mb-2 small">
              <div>
                <strong>Organized By:</strong> {election.createdBy}
              </div>
              <div>
                <strong>Start Date:</strong> {election.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {election.endDate}
              </div>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush border-0">
            <ListGroup.Item className="d-flex justify-content-between px-3 small">
              <span className="bg-light rounded-pill px-2">
                {election.noOfCandidates} Candidates
              </span>
              <span className="bg-light rounded-pill px-2">99+ voters</span>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body className="pt-2 text-center">
            <Button variant="primary" className="w-50 rounded-pill fw-bold">
              Vote
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ElectionCard;
