import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles/Subscriptions.styles.css';
import { subscriptionPlans } from '@assets/data/subscriptionPlan';

const Subscriptions = () => {
  const navigate = useNavigate();

  const handleSubscribeClick = (type) => {
    // Redirect to login with redirect to /subscriptions
    navigate(`/login?redirect=/user/subscriptions&type=${type}`);
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f9fafc' }}>
      <Container>
        <h2 className="text-center fw-bold mb-4 display-6">
          Chunaab Subscriptions
        </h2>
        <Row className="justify-content-center g-4">
          {subscriptionPlans.map((plan) => (
            <Col xs={12} md={6} lg={5} key={plan.type}>
              <Card className="subscription-card shadow-sm rounded-4 h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-3 fw-bold text-center text-dark">
                    {plan.type} Plan
                  </Card.Title>
                  <h4 className="text-center text-muted mb-3">{plan.price}</h4>
                  <Card.Text className="text-center mb-3">
                    {plan.description}
                  </Card.Text>

                  <ListGroup variant="flush" className="mb-4">
                    {plan.features.map((feature, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0">
                        ✅ {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Button
                    variant={plan.variant}
                    className="mt-auto w-100"
                    onClick={() => handleSubscribeClick(plan.type)}
                  >
                    {plan.cta}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Subscriptions;
