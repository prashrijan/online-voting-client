import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user.fullName;

  const links = [
    { to: '/user', label: 'Dashboard' },
    { to: '#', label: 'Create Election' },
    { to: '#', label: 'Manage Elections' },
    { to: '#', label: 'Live Elections' },
    { to: '#', label: 'My Votes' },
    { to: '#', label: 'Results' },
    { to: '#', label: 'History' },
    { to: '#', label: 'Profile Settings' },
    { to: '#', label: 'Help Center' },
    { to: '#', label: 'Logout' },
  ];

  return (
    <div
      className="sidebar p-1 fixed top bg-info h-screen"
      style={{ width: '300px', minWidth: '300px' }}
    >
      <div>
        <h1 className="ms-4">
          Hello <br />
          {userName}
        </h1>

        <div className="d-flex flex-column gap-3 ms-4 my-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="text-black text-decoration-none"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
