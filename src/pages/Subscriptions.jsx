import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import './Subscriptions.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const subscriptionPlans = [
  {
    type: 'Free',
    description:
      'Get started with our basic features at no cost. Ideal for individuals and small groups.',
    features: [
      'Create up to 2 elections per month',
      'Basic analytics',
      'Email support',
      'Access to public templates',
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'outline-secondary',
    disabled: true,
  },
  {
    type: 'Pro',
    description:
      'Unlock advanced features for growing organizations and power users.',
    features: [
      'Unlimited elections',
      'Advanced analytics & reports',
      'Priority support',
      'Custom branding',
      'Invite team members',
    ],
    buttonText: 'Buy Pro',
    buttonVariant: 'primary',
    disabled: false,
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleBuySubscription = () => {
    if (user._id) {
      console.log('congratulations your are a pro now');
    } else {
      navigate('/login?redirect=/subscriptions');

      console.log('Please Login Fist');
    }
  };
  console.log(user);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Choose Your Subscription</h2>
      <Row className="justify-content-center g-4">
        {subscriptionPlans.map((plan) => (
          <Col xs={12} md={6} lg={5} key={plan.type}>
            <Card className={`subscription-card ${plan.type.toLowerCase()}`}>
              <Card.Body>
                <Card.Title className="mb-2 fs-3 fw-bold">
                  {plan.type} Plan
                </Card.Title>
                <Card.Text className="mb-3">{plan.description}</Card.Text>
                <ListGroup variant="flush" className="mb-4">
                  {plan.features.map((feature, idx) => (
                    <ListGroup.Item key={idx} className="border-0 ps-0">
                      • {feature}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Button
                  variant={plan.buttonVariant}
                  disabled={plan.disabled}
                  className="w-100"
                  onClick={handleBuySubscription}
                >
                  {plan.buttonText}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Subscriptions;
