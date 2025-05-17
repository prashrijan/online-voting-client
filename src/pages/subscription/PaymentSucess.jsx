import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card
        className="text-center shadow-lg p-5 rounded-4"
        style={{ maxWidth: '480px', width: '100%' }}
      >
        <h2 className="mb-3 text-success">🎉 You're now a Chunaab Pro!</h2>
        <p className="mb-4 fs-5 text-muted">
          Thank you for subscribing. You now have access to all premium
          features.
        </p>
        <Button
          variant="primary"
          className="px-4 py-2 rounded-pill fw-semibold"
          onClick={() => navigate('/user')}
        >
          🚀 Go to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
