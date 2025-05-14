import React from 'react';
import { Card, Button, Container, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  if (!user) return <Loader text="Loading your data..." />;

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card
        className="p-5 shadow-lg rounded-4 text-center"
        style={{
          maxWidth: '480px',
          width: '100%',
          border: 'none',
          background: 'linear-gradient(145deg, #ffffff, #f1f1f1)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="d-flex justify-content-center mb-4">
          <img
            src={user.profileImage || '/default-avatar.png'}
            alt="Profile"
            className="rounded-circle"
            style={{
              height: '140px',
              width: '140px',
              objectFit: 'cover',
              border: '4px solid #0d6efd',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
            }}
          />
        </div>

        <h3 className="fw-bold text-dark mb-1">{user.fullName}</h3>
        <p className="text-muted mb-2" style={{ fontSize: '0.95rem' }}>
          📧 {user.email}
        </p>

        {user.bio && (
          <p
            className="fst-italic text-secondary px-3 mb-3"
            style={{ fontSize: '0.9rem' }}
          >
            💬 {user.bio}
          </p>
        )}

        <div className="mb-4">
          {user.isVerified ? (
            <Badge bg="success" className="px-3 py-2 rounded-pill">
              ✅ Verified Account
            </Badge>
          ) : (
            <Badge bg="secondary" className="px-3 py-2 rounded-pill">
              ⏳ Not Verified
            </Badge>
          )}
        </div>

        <Button
          variant="primary"
          className="px-4 py-2 rounded-pill fw-medium shadow-sm"
          onClick={() => navigate('/user/profile/edit')}
        >
          ✏️ Edit Profile
        </Button>
      </Card>
    </Container>
  );
};

export default ProfilePage;
