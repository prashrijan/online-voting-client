import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const testimonials = [
  {
    name: 'Anchal Shrestha',
    role: 'Lecturer',
    quote: 'Chunnab is reliable. It encourages students participation.',
  },
  {
    name: 'Anuska Shrestha',
    role: 'Student',
    quote:
      'Chunaab made our election transparent and so easy to manage. Loved the live results!',
  },
  {
    name: 'Pawan Bhattrai',
    role: 'Project Manager',
    quote: 'This platform is a game-changer. Safe, reliable, and quick.',
  },
  {
    name: 'Prashrijan Shrestha',
    role: 'Admin',
    quote:
      'Creating elections and managing voters was smooth. Highly recommended!',
  },
];

const TestimonialSection = () => {
  return (
    <section className="testimonial-section py-5">
      <Container>
        <h2 className="text-center fw-bold mb-4">What People Say</h2>
        {testimonials?.map((t, index) => (
          <Row key={index} className="justify-content-center mb-4">
            <Col md={8}>
              <div className="testimonial-box p-4 shadow-sm rounded-4 bg-white">
                <p className="quote-text fst-italic mb-3">“{t.quote}”</p>
                <div className="author-info text-end">
                  <strong>{t.name}</strong>
                  <div className="text-secondary small">{t.role}</div>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default TestimonialSection;
