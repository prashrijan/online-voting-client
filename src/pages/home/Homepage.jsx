import React from 'react';

import './homepage.css';

import GetStarted from '../../components/homepage/getStarted.jsx';
import TestimonialSection from '../../components/homepage/testimonial.jsx';
import FeatureSection from '../../components/homepage/featureSection.jsx';
import Hero from '../../components/homepage/Hero.jsx';

// homepage

const Homepage = () => {
  return (
    <div className="bg-light">
      <Hero />
      <FeatureSection />
      <GetStarted />
      <TestimonialSection />
    </div>
  );
};
export default Homepage;
