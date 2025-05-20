import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import './styles/testimonial.styles.css';

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
        <div className="testimonial-container">
          <Carousel interval={3000} indicators={false} controls={true} fade>
            {testimonials.map((t, index) => (
              <Carousel.Item key={index}>
                <div className="testimonial-box p-4 shadow-sm rounded-4 bg-white">
                  <p className="quote-text fst-italic mb-3">“{t.quote}”</p>
                  <div className="author-info text-end">
                    <strong>{t.name}</strong>
                    <div className="text-secondary small">{t.role}</div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
