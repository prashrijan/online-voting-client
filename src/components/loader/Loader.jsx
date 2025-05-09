import React from 'react';
import { BarLoader } from 'react-spinners';

const Loader = ({ text }) => {
  return (
    <div
      className="py-4 d-flex flex-column align-items-center justify-content-center"
      style={{ height: '500px' }}
    >
      <BarLoader color="#212529" />;<p className="mt-2">{text}</p>
    </div>
  );
};

export default Loader;
