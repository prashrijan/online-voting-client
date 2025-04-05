import React from "react";
import { useSelector } from "react-redux";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Alert,
} from "react-bootstrap";
import dayjs from "dayjs";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);

    // Dummy data
    const dummyElections = [
        {
            _id: "1",
            title: "Student Council Election",
            startDate: "2025-4-04",
            endDate: "2025-5-06",
            candidates: ["1", "2", "3"],
            createdBy: "admin1",
        },
        {
            _id: "2",
            title: "Department Representative",
            startDate: "2025-5-04",
            endDate: "2025-5-06",
            candidates: ["4", "5"],
            createdBy: "admin2",
        },
        {
            _id: "3",
            title: "Annual Sports Captain",
            startDate: "2024-01-05",
            endDate: "2024-01-10",
            candidates: ["6", "7", "8", "9"],
            createdBy: "admin1",
        },
    ];

    // Categorize elections
    const categorizeElections = () => {
        const now = dayjs();

        return dummyElections.reduce(
            (acc, election) => {
                const start = dayjs(election.startDate);
                const end = dayjs(election.endDate);
                console.log(start, end);

                if (now.isAfter(start) && now.isBefore(end)) {
                    acc.ongoing.push(election);
                } else if (now.isBefore(start)) {
                    acc.upcoming.push(election);
                }
                return acc;
            },
            { ongoing: [], upcoming: [] }
        );
    };

    const { ongoing, upcoming } = categorizeElections();

    return (
        <Container className="py-4">
            {/* Welcome Section */}
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-light border-bottom pb-2">
                        Welcome,{" "}
                        <span className="fw-normal">{user.fullName}</span>
                    </h2>
                    <p className="text-muted">
                        Cast your vote and make a difference
                    </p>
                </Col>
            </Row>

            {/* Ongoing Elections */}
            <Row className="mb-5">
                <Col>
                    <h4 className="mb-4">
                        Ongoing Elections{" "}
                        <Badge bg="danger">{ongoing.length}</Badge>
                    </h4>

                    {ongoing.length > 0 ? (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {ongoing.map((election) => (
                                <Col key={election._id}>
                                    <Card className="h-100 shadow-sm border-primary">
                                        <Card.Body>
                                            <Card.Title>
                                                {election.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted small">
                                                <div className="mb-1">
                                                    <strong>Status:</strong>{" "}
                                                    <Badge bg="success">
                                                        Active
                                                    </Badge>
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Closes in:</strong>{" "}
                                                    {dayjs(
                                                        election.endDate
                                                    ).diff(dayjs(), "day")}{" "}
                                                    days
                                                </div>
                                                <div>
                                                    <strong>Candidates:</strong>{" "}
                                                    {election.candidates.length}
                                                </div>
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                className="w-100"
                                            >
                                                Vote Now
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Alert variant="info">
                            No elections currently running
                        </Alert>
                    )}
                </Col>
            </Row>

            {/* Upcoming Elections */}
            <Row>
                <Col>
                    <h4 className="mb-4">
                        Upcoming Elections{" "}
                        <Badge bg="secondary">{upcoming.length}</Badge>
                    </h4>

                    {upcoming.length > 0 ? (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {upcoming.map((election) => (
                                <Col key={election._id}>
                                    <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                            <Card.Title>
                                                {election.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted small">
                                                <div className="mb-1">
                                                    <strong>Starts:</strong>{" "}
                                                    {dayjs(
                                                        election.startDate
                                                    ).format("MMM D, YYYY")}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Duration:</strong>{" "}
                                                    {dayjs(
                                                        election.endDate
                                                    ).diff(
                                                        election.startDate,
                                                        "day"
                                                    )}{" "}
                                                    days
                                                </div>
                                                <div>
                                                    <strong>Candidates:</strong>{" "}
                                                    {election.candidates.length}
                                                </div>
                                            </Card.Text>
                                            <Button
                                                variant="outline-secondary"
                                                className="w-100"
                                                disabled
                                            >
                                                Starts in{" "}
                                                {dayjs(election.startDate).diff(
                                                    dayjs(),
                                                    "day"
                                                )}{" "}
                                                days
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Alert variant="info">
                            No upcoming elections scheduled
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
