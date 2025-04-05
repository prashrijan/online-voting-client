import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import "./FooterStyles.css";

const Footer = () => {
    return (
        <footer className="light-footer with-shadow">
            <Container>
                <Row className="g-4">
                    <Col md={4}>
                        <h5 className="footer-heading">Chunaab Voting</h5>
                        <p className="footer-text">
                            Secure, transparent, and accessible election
                            platform for the digital age.
                        </p>
                        <div className="social-icons">
                            <a href="#">
                                <FaFacebook />
                            </a>
                            <a href="#">
                                <FaTwitter />
                            </a>
                            <a href="#">
                                <FaInstagram />
                            </a>
                            <a href="#">
                                <FaGithub />
                            </a>
                        </div>
                    </Col>
                    <Col md={2}>
                        <h6 className="footer-subheading">Navigation</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="#createChunaab">Create Poll</a>
                            </li>
                            <li>
                                <a href="/results">Results</a>
                            </li>
                            <li>
                                <a href="/contact">Contact</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="footer-subheading">Legal</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="/privacy">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/security">Security</a>
                            </li>
                            <li>
                                <a href="/faq">FAQ</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="footer-subheading">Contact</h6>
                        <ul className="footer-links">
                            <li>chunaabs@gmail.com</li>
                            <li>+61290935151</li>
                            <li>
                                Level 11, 10 Barrack Street Sydney NSW 2000,
                                Australia
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="footer-divider" />
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Chunaab Voting Platform.
                        All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
