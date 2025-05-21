import React from 'react';
import Hero from '@components/home/Hero';
import FeatureSection from '@components/home/FeatureSection';
import TestimonialSection from '@components/home/Testimonial';
import Subscriptions from '@components/home/Subscriptions';

// homepage

const Homepage = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <TestimonialSection />
      <Subscriptions />
    </>
  );
};
export default Homepage;
