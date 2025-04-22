import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { cardData } from '../assets/form/dummyCardData';

import kent from '../assets/images/kent.jpg';

function ElectionCard() {
  console.log(cardData);

  return (
    <Card
      className="shadow rounded-4 overflow-hidden"
      style={{ width: '350px' }}
    >
      <Card.Img
        variant="top"
        src={kent}
        className="rounded-0 object-fit-cover"
        style={{ height: '250px' }}
      />
      <Card.Body className="pb-1 pt-3">
        <Card.Title className="fw-bold fs-5 mb-2">
          Kent.edu Student Representative
        </Card.Title>
        <div className="d-flex align-items-center mb-2">
          <Badge
            bg="success"
            className="rounded-circle p-2 me-2"
            style={{ width: '10px', height: '10px' }}
          />
          <span className="text-success small">Active</span>
        </div>
        <div className="mb-2 small">
          <div>
            <strong>Organized By :</strong> Kent Institute Australia
          </div>
          <div>
            <strong>Start Date:</strong> 01/04/2025
          </div>
          <div>
            <strong>End Date:</strong> 20/04/2025
          </div>
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush border-0">
        <ListGroup.Item className="d-flex justify-content-between px-3 small">
          <span className="bg-light rounded-pill px-2">5 Candidates</span>
          <span className="bg-light rounded-pill px-2">100+ voters</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="pt-2 text-center">
        <Button variant="primary" className="w-50 rounded-pill fw-bold">
          Vote
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ElectionCard;
