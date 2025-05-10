import React from 'react';
import Hero from './Hero';
import './homepage.css';
import FeatureSection from '../../components/featureSection';
import TestimonialSection from '../../components/testimonial';

// homepage

const Homepage = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <TestimonialSection />
    </>
  );
};
export default Homepage;
