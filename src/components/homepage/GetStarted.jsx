import React from 'react';
import { Container } from 'react-bootstrap';
import {
  FaUserPlus,
  FaUserLock,
  FaQrcode,
  FaVoteYea,
  FaChartBar,
} from 'react-icons/fa';
import './styles/getStarted.styles.css';

const GetStarted = () => {
  return (
    <section className="get-started-section py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5">How Chunaab Works</h2>
        <div className="step-flow d-flex flex-column flex-md-row justify-content-between align-items-center text-center flex-wrap">
          {/* Step 1 */}
          <div className="step-item">
            <div className="icon-circle">
              <FaUserPlus size={24} />
            </div>
            <h5 className="mt-3">Register</h5>
            <p>Create your account.</p>
          </div>
          <div className="step-connector d-none d-md-block"></div>

          {/* Step 2 */}
          <div className="step-item">
            <div className="icon-circle">
              <FaUserLock size={24} />
            </div>
            <h5 className="mt-3">Create Election</h5>
            <p>Admins can configure and launch elections.</p>
          </div>
          <div className="step-connector d-none d-md-block"></div>

          {/* Step 3 */}
          <div className="step-item">
            <div className="icon-circle">
              <FaQrcode size={24} />
            </div>
            <h5 className="mt-3">Invite Voters</h5>
            <p>......</p>
          </div>
          <div className="step-connector d-none d-md-block"></div>

          {/* Step 4 */}
          <div className="step-item">
            <div className="icon-circle">
              <FaVoteYea size={24} />
            </div>
            <h5 className="mt-3">Cast Vote</h5>
            <p>Voters cast anonymous and secure votes.</p>
          </div>
          <div className="step-connector d-none d-md-block"></div>

          {/* Step 5 */}
          <div className="step-item">
            <div className="icon-circle">
              <FaChartBar size={24} />
            </div>
            <h5 className="mt-3">View Results</h5>
            <p>Live results and insights are displayed instantly.</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetStarted;
