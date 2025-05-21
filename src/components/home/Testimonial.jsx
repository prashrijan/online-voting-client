import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { testimonials } from '@assets/data/testimonials';

const TestimonialSection = () => {
  return (
    <section
      className="testimonial-section py-5"
      style={{ background: '#f4f6f9' }}
    >
      <Container>
        <h2 className="text-center fw-bold mb-5 display-6">What People Say</h2>
        <Row className="g-4">
          {testimonials.map((t, index) => (
            <Col key={index} md={6}>
              <div className="testimonial-box p-4 shadow-sm rounded-4 bg-white h-100 transition">
                <p className="quote-text text-muted fst-italic fs-5 mb-4">
                  <span className="fs-1 text-dark">“</span>
                  {t.quote}
                  <span className="fs-1 text-dark">”</span>
                </p>
                <div className="author-info text-end">
                  <span className="d-inline-block fw-semibold text-dark">
                    {t.name}
                  </span>
                  <div className="text-secondary small">{t.role}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx="true">{`
        .testimonial-box {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .testimonial-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.08);
          border: 1px solid #dee2e6;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
