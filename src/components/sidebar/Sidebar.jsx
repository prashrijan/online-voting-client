import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaCog,
  FaVoteYea,
  FaChartBar,
  FaUserCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';
import { Modal, Button, Nav } from 'react-bootstrap';
import { resetUser } from '@features/user/userSlice';
import { logoutUserApi } from '@services/authApi.js';

const Sidebar = ({ isOpen, setShowSidebar }) => {
  const { user } = useSelector((state) => state.user);
  const userName = user?.fullName || 'User';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOnLogOut = async () => {
    try {
      await logoutUserApi();

      dispatch(resetUser());

      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

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
      <aside
        className={`sidebar d-flex flex-column  ${
          isOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
      >
        {/* User Greeting */}
        <div className="mb-4 text-center">
          <div
            className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center overflow-hidden"
            style={{
              width: 60,
              height: 60,
              fontSize: '1.5rem',
              userSelect: 'none',
            }}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${userName}'s profile`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <h5 className="mt-3 mb-0">Hello,</h5>
          <p className="text-secondary mb-0 fw-semibold">{userName}</p>
        </div>

        {/* Navigation Links */}
        <Nav className="flex-column gap-2 flex-grow-1 ">
          {links.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Nav.Link
                as={Link}
                to={to}
                key={to}
                active={isActive}
                onClick={() => setShowSidebar(false)}
                className={`d-flex align-items-center gap-3 rounded px-3 py-2 $`}
              >
                <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                <span>{label}</span>
              </Nav.Link>
            );
          })}
        </Nav>

        {/* Logout Button */}
        <Button
          variant="outline-danger"
          onClick={() => setShowLogoutModal(true)}
          className="d-flex align-items-center gap-3 mt-3"
          style={{ userSelect: 'none' }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </Button>
      </aside>

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
