import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import './styles/Subscriptions.styles.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkoutSessionApi } from '@services/paymentApi';
import { subscriptionPlansLoggedIn } from '@assets/data/subscriptionPlan';

const Subscriptions = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleBuySubscription = async () => {
    if (user._id) {
      const res = await checkoutSessionApi();

      if (res?.success && res.data?.url) {
        window.location.href = res.data.url;
      }
    } else {
      navigate('/login?redirect=/subscriptions');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">⭐ Choose Your Subscription</h2>
      <Row className="justify-content-center g-4">
        {subscriptionPlansLoggedIn.map((plan) => {
          const isCurrentPlan =
            (plan.type === 'Free' && !user.isPaid) ||
            (plan.type === 'Pro' && user.isPaid);

          const isPaidPlan = plan.type === 'Pro';

          return (
            <Col xs={12} md={6} lg={5} key={plan.type}>
              <Card className={`subscription-card ${plan.type.toLowerCase()}`}>
                <Card.Body>
                  <Card.Title className="mb-2 fs-3 fw-bold text-dark">
                    {plan.type} Plan {}
                    {plan.price && (
                      <span className="text-muted fs-5">({plan.price})</span>
                    )}
                  </Card.Title>
                  <Card.Text className="mb-3">{plan.description}</Card.Text>
                  <ListGroup variant="flush" className="mb-4">
                    {plan.features.map((feature, idx) => (
                      <ListGroup.Item key={idx} className="border-0 ps-0">
                        • {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {/* Hide Free plan button if user is already paid */}
                  {!(user.isPaid && plan.type === 'Free') && (
                    <Button
                      variant={isCurrentPlan ? 'outline-secondary' : 'dark'}
                      disabled={isCurrentPlan}
                      className="w-100"
                      onClick={
                        !isCurrentPlan && isPaidPlan
                          ? handleBuySubscription
                          : null
                      }
                    >
                      {isCurrentPlan
                        ? 'Current Plan'
                        : isPaidPlan
                          ? 'Buy Pro'
                          : 'Choose Free'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Subscriptions;
