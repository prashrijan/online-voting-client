import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaCog,
  FaVoteYea,
  FaChartBar,
  FaHistory,
  FaUserCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user?.fullName || 'User';

  const links = [
    { to: '/user', icon: <FaHome />, label: 'Dashboard' },
    { to: '/user/create-election', icon: <FaPlus />, label: 'Create Election' },
    {
      to: '/user/manage-elections',
      icon: <FaCog />,
      label: 'Manage Elections',
    },
    {
      to: '/user/live-elections',
      icon: <FaVoteYea />,
      label: 'Live Elections',
    },
    { to: '/user/my-votes', icon: <FaChartBar />, label: 'My Votes' },
    { to: '/user/results', icon: <FaVoteYea />, label: 'Results' },
    { to: '/user/history', icon: <FaHistory />, label: 'History' },
    { to: '/user/profile', icon: <FaUserCog />, label: 'Profile Settings' },
    { to: '/user/help', icon: <FaQuestionCircle />, label: 'Help Center' },
    { to: '/logout', icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  return (
    <div
      className="sidebar p-3 bg-dark text-white h-screen fixed"
      style={{ width: '250px' }}
    >
      {/* User Profile Section */}
      <div className="mb-5">
        <h2 className="fs-4 mb-1">Hello, 👋</h2>
        <p className="fs-5 fw-bold">{userName}</p>
      </div>

      {/* Navigation Links */}
      <nav className="d-flex flex-column gap-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-3"
            style={{
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <span style={{ width: '20px', textAlign: 'center' }}>
              {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
