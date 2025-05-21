import { Container, Row, Col, Card } from 'react-bootstrap';

import { chunabFeatures } from '@assets/data/chunaabFeatures';

const FeatureSection = () => {
  return (
    <section
      className="py-5"
      style={{ background: 'linear-gradient(180deg, #f8f9fa, #ffffff)' }}
    >
      <Container>
        <h2 className="text-center fw-bold mb-5 display-6">
          Why Choose Chunab?
        </h2>
        <Row className="g-4">
          {chunabFeatures.map((feature, index) => (
            <Col key={index} sm={6} md={4}>
              <Card className="h-100 border-0 shadow-sm rounded-4 text-center p-4 feature-card transition">
                <div
                  className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                  style={{
                    backgroundColor: '#e9f2ff',
                    width: 60,
                    height: 60,
                    color: '#0d6efd',
                  }}
                >
                  {feature.icon}
                </div>
                <Card.Title className="fw-semibold fs-5 mb-2">
                  {feature.title}
                </Card.Title>
                <Card.Text className="text-muted fs-6">
                  {feature.desc}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx="true">{`
        .feature-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1);
          border: 1px solid #cfe2ff;
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;
