import React from 'react';
import { Container, Row, Col, Image, Card, Nav } from 'react-bootstrap';
import './styles/AboutPage.styles.css';
import { FaLinkedin } from 'react-icons/fa6';
import { FaSquareGithub } from 'react-icons/fa6';
import { FaSquareInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const founders = [
  {
    name: 'Prashrijan Shreshta',
    role: 'Founder & CEO',
    img: '/images/prashrijan.jpg',
    linkedin: 'https://www.linkedin.com/in/prashrijanshrestha/',
    github: 'https://github.com/prashrijan',
    instagram: 'https://www.instagram.com/prashrijan_/',
  },
  {
    name: 'Anuska Shrestha',
    role: 'Frontend Developer',
    img: '/images/anuska.jpg',
    linkedin: 'https://www.linkedin.com/in/anuska-shrestha-065571287/',
    github: 'https://github.com/ayeanuska',
    instagram: 'https://www.instagram.com/aye_anuska/',
  },
  {
    name: 'Pawan Bhattrai',
    role: 'Project Manager & Technical Author',
    img: '/images/pawan.jpg',
    linkedin: 'https://www.linkedin.com/in/pawan-bhattarai-australia/',
    github: 'https://github.com/iampawannn',
    instagram: 'https://www.instagram.com/iampawannnn/',
  },
  {
    name: 'Shubik Bhatt',
    role: 'Frontend Developer & UI/UX Designer',
    img: '/images/shubik.jpg',
    linkedin: 'https://www.linkedin.com/in/shubik-bhatt/',
    github: 'https://github.com/ShubikB',
    instagram: 'https://www.instagram.com/shubik_bhatt/',
  },
  {
    name: 'Bishwo Sunar',
    role: 'Frontend Developer',
    img: '/images/bishwo.jpeg',
    linkedin: '',
    github: 'https://github.com/iambeeshow',
    instagram: 'https://www.instagram.com/iambeeshow_/',
  },
];

const AboutPage = () => {
  return (
    <section className="about-page py-5 position-relative">
      {/* Decorative elements */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div className="about-blob-1"></div>
        <div className="about-blob-2"></div>
      </div>

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-4 about-title">About Chunaab</h2>
          <div className="d-flex justify-content-center mb-4">
            <div className="about-divider"></div>
          </div>
          <p className="w-75 mx-auto fs-5 about-description mb-4 ">
            Born from a desire to leave a lasting impact,{' '}
            <strong>Chunaab</strong> emerged during our Capstone journey. We saw
            student elections still relying on basic tools like SurveyMonkey and
            envisioned a secure, modern, and user-friendly platform tailored for
            digital voting.
          </p>
          <p className="w-75 mx-auto fs-5 about-description">
            Encouraged by our mentor, Mr. Mehedi Hasan, and insights from peers,
            we developed a system with core features like secure authentication,
            real-time results, role-based access, one-person-one-vote
            enforcement, and even AI chatbot assistance. Today,{' '}
            <strong>Chunaab</strong> empowers universities and organizations to
            run elections with confidence and transparency.
          </p>
        </div>

        <div className="text-center mb-5">
          <h3 className="fw-semibold mb-4 team-title">Meet the Team</h3>
          <div className="d-flex justify-content-center mb-4">
            <div className="team-divider"></div>
          </div>
        </div>

        <Row className="justify-content-center g-4">
          {founders.map((founder, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3} className="text-center">
              <Card className="border-0 p-3 founder-card h-100">
                <div className="founder-img-container mb-3 mx-auto">
                  <Image
                    src={founder.img}
                    roundedCircle
                    className="founder-img"
                  />
                </div>
                <h5 className="fw-bold mb-1">{founder.name}</h5>
                <p className="text-muted small mb-3">{founder.role}</p>
                <div className="founder-social">
                  <Nav.Link
                    as={Link}
                    to={founder.linkedin}
                    className="text-decoration-none"
                  >
                    <FaLinkedin />
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={founder.github}
                    className="text-decoration-none "
                  >
                    <FaSquareGithub />
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={founder.instagram}
                    className="text-decoration-none "
                  >
                    <FaSquareInstagram />
                  </Nav.Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutPage;
