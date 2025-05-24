import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

import ProtectedRoute from '../auth/ProtectedRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import Chatbot from '../chatbot/Chatbot';

const ProtectedLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ProtectedRoute>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <div className="sticky-top z-3">
          <Header />
        </div>

        <div className="flex-grow-1 d-flex" style={{ minHeight: 0 }}>
          {/* Show arrow toggle button ONLY if sidebar is closed on mobile */}
          {!isDesktop && !showSidebar && (
            <Button
              variant="outline-dark"
              onClick={() => setShowSidebar(true)}
              className="position-fixed"
              style={{
                top: '50%',
                left: '10px',
                transform: 'translate(-50%, -50%)',
                zIndex: 1050,
                borderRadius: '0 5px 5px 0',
                padding: '0.4rem 0.6rem',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open sidebar"
            >
              <FaArrowRight />
            </Button>
          )}

          {/* Sidebar */}
          {isDesktop ? (
            <div
              className="bg-light"
              style={{
                width: '250px',
                minHeight: '100%',
                padding: '2rem 1rem',
              }}
            >
              <Sidebar setShowSidebar={setShowSidebar} />
            </div>
          ) : (
            <Offcanvas
              show={showSidebar}
              onHide={() => setShowSidebar(false)}
              backdrop="static"
              scroll={false}
              placement="start"
            >
              <Offcanvas.Header closeButton />
              <Offcanvas.Body>
                <Sidebar setShowSidebar={setShowSidebar} />
              </Offcanvas.Body>
            </Offcanvas>
          )}

          {/* Main content */}
          <div className="flex-grow-1 p-3">
            <Outlet />
            <div
              className="position-fixed"
              style={{ right: 20, bottom: 20, zIndex: 1030 }}
            >
              <Chatbot />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
