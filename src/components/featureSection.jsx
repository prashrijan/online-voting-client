import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  FaUserLock,
  FaVoteYea,
  FaEnvelopeOpenText,
  FaChartLine,
  FaUserSecret,
  FaQrcode,
  FaLaptopCode,
  FaBug,
  FaClock,
} from 'react-icons/fa';

const chunabFeatures = [
  {
    icon: <FaUserLock size={30} />,
    title: 'Secure Login',
    desc: 'Role-based login system for voters and admins with authentication.',
  },
  {
    icon: <FaVoteYea size={30} />,
    title: 'Create & Manage Elections',
    desc: 'Admins can create elections, add options, set timelines, and manage voters.',
  },
  {
    icon: <FaEnvelopeOpenText size={30} />,
    title: 'Email Invitations',
    desc: 'Send voter invites via email or distribute unique access codes.',
  },
  {
    icon: <FaChartLine size={30} />,
    title: 'Live Results',
    desc: 'Real-time result visualization with total votes and percentage breakdown.',
  },
  {
    icon: <FaUserSecret size={30} />,
    title: 'Anonymous Voting',
    desc: 'No personal data is tied to votes — ensuring true anonymity.',
  },
  {
    icon: <FaQrcode size={30} />,
    title: 'Code-based Join',
    desc: 'Voters can join elections using short event codes on any device.',
  },
  {
    icon: <FaLaptopCode size={30} />,
    title: 'Admin Dashboard',
    desc: 'Manage elections, monitor participation, and control settings easily.',
  },
  {
    icon: <FaBug size={30} />,
    title: 'Fraud Detection',
    desc: 'System flags duplicate or suspicious voting patterns automatically.',
  },
  {
    icon: <FaClock size={30} />,
    title: 'Election History',
    desc: 'View completed elections, vote logs, and archived data for transparency.',
  },
];

const FeatureSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center fw-bold mb-4">Why Chunab?</h2>
        <Row>
          {chunabFeatures?.map((feature, index) => (
            <Col key={index} sm={6} md={4} className="mt-4">
              <Card className="h-100 shadow-sm rounded-4 p-3 text-center">
                <div className="text-primary mb-2">{feature.icon}</div>
                <Card.Title className="fw-semibold fs-5">
                  {feature.title}
                </Card.Title>
                <Card.Text className="text-muted fs-6">
                  {feature.desc}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureSection;
