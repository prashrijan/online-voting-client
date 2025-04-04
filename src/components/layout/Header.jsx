import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Logo";
import { FaVoteYea, FaChartBar, FaUserShield } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";
import "./HeaderStyles.css";

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="light-navbar">
            <Container>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <Logo darkMode={false} />
                </Navbar.Brand>

                <div className="live-badge d-lg-none">
                    <RiLiveFill className="me-1" />
                    <span>Live Voting</span>
                </div>

                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="nav-toggle"
                />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-center flex-grow-1 main-nav">
                        <Nav.Link href="/" className="nav-link">
                            <FaVoteYea className="me-1" />
                            Home
                        </Nav.Link>
                        <Nav.Link href="#createChunaab" className="nav-link">
                            Create Poll
                        </Nav.Link>
                        <Nav.Link href="/results" className="nav-link">
                            <FaChartBar className="me-1" />
                            Results
                        </Nav.Link>
                        <Nav.Link href="/contact" className="nav-link">
                            <FaUserShield className="me-1" />
                            Contact EC
                        </Nav.Link>
                    </Nav>

                    <div className="live-badge d-none d-lg-flex">
                        <RiLiveFill className="me-1" />
                        <span>Live Voting</span>
                    </div>

                    <Nav className="auth-buttons">
                        <Nav.Link href="/login" className="px-2">
                            <Button
                                variant="outline-primary"
                                className="nav-button"
                            >
                                Sign In
                            </Button>
                        </Nav.Link>
                        <Nav.Link href="/register" className="ps-2">
                            <Button variant="primary" className="nav-button">
                                Register
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
