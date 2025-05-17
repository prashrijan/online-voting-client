import React from 'react';
import logo25 from '@assets/logo/chunaab25.svg';
import '../App.css';

const Logo = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <img src={logo25} alt="" className="rounded mx-1" />
      <span className="logo-font fs-4">chunaab </span>
    </div>
  );
};

export default Logo;
