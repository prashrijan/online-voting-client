import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline-dark"
      className="mb-3 d-flex align-items-center gap-2"
      onClick={() => navigate(-1)}
    >
      ← Go Back
    </Button>
  );
};

export default GoBackButton;
