import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { resetUser } from '../../features/user/userSlice';
import { logoutUserApi } from '../../services/authApi.js';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user?.fullName || 'User';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleOnLogOut = async () => {
    try {
      await logoutUserApi();

      //reset user state in redux
      dispatch(resetUser());

      //clearing tokens
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      //redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
    // { to: '/logout', icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  return (
    <>
      <div
        className="sidebar p-3 bg-secondary-subtle text-dark h-screen fixed"
        style={{ width: '250px' }}
      >
        {/* User Profile Section */}
        <div className="mb-5 fs-4 fw-bold ">
          <p className="mb-1">Hello, 👋</p>
          <p className="mb-1">{userName} </p>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex flex-column gap-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="py-2 px-3 d-flex align-items-center gap-3 text-dark text-decoration-none fs-6 fw-medium "
              style={{
                transition: 'background-color 0.2s',
                borderRadius: '5px',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#fafafa')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <span style={{ width: '20px', textAlign: 'center' }}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}

          {/* Logout that triggers dialgoue */}

          <button
            className="text-start py-2 px-3 d-flex align-items-center gap-3 border-0 fs-6 fw-medium"
            onClick={() => setShowLogoutDialog(true)}
            style={{ transition: 'background-color 0.2s', borderRadius: '5px' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#fafafa')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <span style={{ width: '20px', textAlign: 'center' }}>
              <FaSignOutAlt />
            </span>
            Logout
          </button>
        </nav>
      </div>

      {/* // logout confirmation dialog */}

      {showLogoutDialog && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{ minWidth: '300px' }}
          >
            <p className="mb-3 fs-3 fw-medium">Confirm Logout</p>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleOnLogOut}
                aria-label="Confirm Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
