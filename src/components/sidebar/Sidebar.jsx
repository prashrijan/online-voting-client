import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaCog,
  FaVoteYea,
  FaChartBar,
  FaUserCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { resetUser } from '../../features/user/userSlice';
import { logoutUserApi } from '../../services/authApi.js';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const userName = user?.fullName || 'User';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOnLogOut = async () => {
    try {
      await logoutUserApi();

      // Reset user state in redux
      dispatch(resetUser());

      // Clear tokens
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Redirect to login page
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
    { to: '/user/my-votes', icon: <FaChartBar />, label: 'My Votes' },
    { to: '/user/results', icon: <FaVoteYea />, label: 'Results' },
    { to: '/user/profile', icon: <FaUserCog />, label: 'Profile' },
    {
      to: '/user/help-center',
      icon: <FaQuestionCircle />,
      label: 'Help Center',
    },
  ];

  return (
    <>
      <div
        className="sidebar p-3 bg-secondary-subtle text-dark h-screen fixed"
        style={{ width: '250px' }}
      >
        {/* User Profile Section */}
        <div className="mb-5 fs-4 fw-bold">
          <p className="mb-1">Hello, 👋</p>
          <p className="mb-1">{userName}</p>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex flex-column gap-3">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="py-2 px-3 d-flex align-items-center gap-3 text-dark text-decoration-none fs-6 fw-medium"
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

          {/* Logout Button */}
          <button
            className="text-start py-2 px-3 d-flex align-items-center gap-3 border-0 fs-6 fw-medium bg-transparent"
            onClick={() => setShowLogoutModal(true)}
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

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout? You'll need to log in again to access
          your account.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleOnLogOut}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sidebar;
