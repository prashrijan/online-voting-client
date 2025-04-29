import React from 'react';
import { Button } from 'react-bootstrap';
import LiveElections from '../Election/LiveElections';

const Dashboard = () => {
  return (
    <>
      <div className="w-100">
        <div className="d-flex justify-content-center align-items-center flex-column ">
          <h1 className="mt-5 fw-bold">Welcome To Chunaab</h1>
          <p className="fs-5">All-in-one Digital Voting Platform</p>

          <div className="joinSection m-4 p-3 d-flex justify-content-center align-items-center rounded-pill w-75 flex-wrap  ">
            <span className=" fs-5 text-center">
              Enter code to join Live Election
            </span>

            <input
              type="text"
              className="eventCodeInput m-2 rounded-3 text-center fs-5"
              placeholder="123 456"
            />
            <Button variant="primary" className="px-4 m-2 rounded-3 fs-5 ">
              Join
            </Button>
          </div>
        </div>
        <LiveElections />
      </div>
    </>
  );
};

export default Dashboard;
