import React from 'react';
import { Button } from 'react-bootstrap';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome To Chunaab</h1>
        <p className="hero-subtitle">All-in-one Digital Voting Platform</p>

        <div className="join-section">
          <div className="join-card">
            <h3 className="join-heading">Join Live Election</h3>
            <p className="join-instructions">
              Enter your 8-digit election code below
            </p>

            <div className="code-input-container">
              <input
                type="text"
                className="code-input"
                placeholder="d39e144c"
                maxLength="6"
                pattern="\d{6}"
              />
              <div className="input-highlight"></div>
            </div>

            <Button className="join-button">
              Join Now
              <span className="button-icon">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
