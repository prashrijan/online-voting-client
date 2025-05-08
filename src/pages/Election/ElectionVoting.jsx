import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import coverImg from '../../assets/images/kent.jpg';
import profileimg from '../../assets/images/donut.png';
import './styles/ElectionVoting.css';
import { Button } from 'react-bootstrap';

const Candidates = () => {
  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const toggleCandidate = (name) => {
    if (expandedCandidate === name) {
      setExpandedCandidate(null);
    } else {
      setExpandedCandidate(name);
    }
  };

  const candidates = [
    {
      name: 'Mr. Joe Doe',
      votes: '52% votes in favor',
      slogan: 'This is my slogan, it can be yours too.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quae veritatis, voluptate tempora voluptatibus, dolorem harum id aspernatur non laboriosam autem blanditiis, velit accusamus aliquid consectetur! Illum ea minima accusantium!',
    },
    {
      name: 'Mr. Jonny Jonny',
      votes: '48% votes in favor',
      slogan: 'This is my slogan, it can be yours too.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quae veritatis, voluptate tempora voluptatibus, dolorem harum id aspernatur non laboriosam autem blanditiis, velit accusamus aliquid consectetur! Illum ea minima accusantium!',
    },
  ];

  return (
    <div
      className=" p-4 candidates-container bg-white shadow-sm rounded-4"
      style={{ minHeight: '550px', width: '500px' }}
    >
      <span className="fs-2 fw-semibold">Candidates</span>

      {candidates.map((candidate, index) => (
        <div key={index} className="p-3 m-2 rounded-4 border  ">
          <div
            className=""
            onClick={() => toggleCandidate(candidate.name + index)}
          >
            <div className="mb-5 p-2  d-flex align-items-center justify-content-start   gap-2">
              <img
                src={profileimg}
                alt="Candidate Image"
                className="rounded-circle"
                style={{
                  height: '65px',
                  width: 'auto',
                  border: '5px solid blue',
                }}
              />
              <div className="h-100 w-100 p-2  border rounded-3">
                <span className=" fw-bold">{candidate.name}</span>
                <br />
                {candidate.votes}
              </div>
            </div>
          </div>

          {expandedCandidate === candidate.name + index && (
            <div className="px-3 ">
              {candidate.slogan && (
                <p className="mb-4 text-center fs-5 fw-semibold ">
                  {candidate.slogan}
                </p>
              )}
              {candidate.description && (
                <p className="">{candidate.description}</p>
              )}
              <div className=" mt-4 d-flex align-items-center justify-content-center">
                <Button
                  variant="danger"
                  className="px-5 fw-bold fs-5 rounded-pill"
                >
                  Vote
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ElectionVoting = () => {
  const { id } = useParams();
  return (
    <>
      <div className="h-100 bg-light ">
        {/* Cover  img */}
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img
            src={coverImg}
            alt=""
            style={{ height: '300px', width: '100%' }}
            className=" rounded-5 rounded-top-0 object-fit-cover "
          />
          <div
            className="px-5 bg-white shadow-sm  rounded-4"
            style={{
              height: '70px',
              width: 'auto',
              translate: '0px -30px 0px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1 className="fs-1 fw-medium">Kent Institutes Election</h1>
          </div>
        </div>

        {/* Election Details */}

        <div className="container p-4 rounded-5 shadow-sm bg-white">
          <div>
            <span className="p-1 m-1 px-3 bg-success text-light rounded-pill">
              Active
            </span>
            <span className="p-1 m-1 px-3 bg-secondary-subtle  rounded-pill">
              Ends in: 1 Day
            </span>
            <div className="py-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur tenetur voluptatibus reiciendis quidem recusandae?
              Sed tempora ipsum eveniet veritatis unde voluptatem ex mollitia
              quaerat incidunt dicta. Culpa quidem architecto quos? Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Eaque animi nam
              veritatis tempore rem nostrum cupiditate. Possimus, voluptas
              facilis odit culpa temporibus harum nobis delectus sed, itaque at
              dignissimos magnam.
            </div>
            <div>
              <span className="fw-semibold">Organized by:</span> Kent Institute
              Autralia
            </div>
            <div>
              <span className="fw-semibold">Start by:</span> 8/05/2025 1:00 PM
            </div>
            <div>
              <span className="fw-semibold">End by:</span> 8/06/2025 1:00 PM
            </div>
          </div>
        </div>

        <div className=" mt-5 d-flex justify-content-center align-items-start gap-5">
          {/* candidate Details */}
          {/* <div
            className=" p-4 bg-white shadow-sm rounded-4"
            style={{ height: '600px', width: '500px' }}
          >
            <span className="fs-2 fw-bold my-3">Candidates</span>

            <div className="my-5" style={{ height: '80px', width: 'auto' }}>
              <div className="d-flex align-items-center">
                <img
                  src={profileimg}
                  alt="img"
                  className="rounded-circle"
                  style={{
                    height: '65px',
                    width: 'auto',
                    border: '5px solid blue',
                  }}
                />
                <div className="h-100 w-100 mx-3  p-2 px-4 d-inline rounded-4 bg-body-tertiary ">
                  Mr.joe <br />
                  48% Votes in Favor
                </div>
              </div>
            </div>
          </div> */}

          <Candidates />

          {/* live Updates */}
          <div
            className=" p-2 bg-white shadow-sm rounded-4 "
            style={{ height: '550px', width: '500px' }}
          >
            <span className="fs-2 fw-semibold">Live Updates</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionVoting;
