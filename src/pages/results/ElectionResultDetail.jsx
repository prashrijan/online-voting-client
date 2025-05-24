import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchElectionResultsAction } from '@services/voteApi.js';
import { Button, Table, Row, Col } from 'react-bootstrap'; // Added Row, Col
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { fetchElectionAction } from '@features/election/electionAction';
import logo from '@assets/logo/chunaab50.png';
import Loader from '@components/loader/Loader';
import GoBackButton from '@components/others/GoBackButton';

const ElectionResultDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const result = useSelector((state) => state.election.result);
  const electionToShow = useSelector((state) => state.election.electionToShow);
  const [loading, setLoading] = useState(false);

  const { resultsWithNames, winners, totalVotes } = result || {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchElectionResultsAction(id));
      await dispatch(fetchElectionAction(id));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const logoWidth = 20;
    const logoHeight = 20;
    doc.addImage(logo, 'PNG', 95, 10, logoWidth, logoHeight);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Chunaab.com', 105, 38, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Election Results: ${electionToShow.title}`, 14, 45);

    const tableColumn = ['Candidate Name', 'Votes', 'Percentage'];
    const tableRows = resultsWithNames.map((result) => [
      result.name,
      result.voteCount,
      `${result.percentage}%`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [tableColumn],
      body: tableRows,
    });

    const finalY = doc.lastAutoTable?.finalY || 75;

    doc.setFontSize(12);
    doc.text(`Total Votes: ${totalVotes}`, 14, finalY + 10);

    if (winners.length > 0) {
      const winnerNames = winners.map((w) => w.name).join(', ');
      doc.text(
        `Winner${winners.length > 1 ? 's' : ''}: ${winnerNames}`,
        14,
        finalY + 20
      );
    }

    doc.save(`ElectionResults_${electionToShow.title}.pdf`);
  };

  if (loading) return <Loader text="Loading Election Results..." />;

  return (
    <div className="container mt-5">
      <GoBackButton />
      <h1 className="mb-4 text-center">
        📋 Results For: {electionToShow.title?.toUpperCase()}
      </h1>

      {!resultsWithNames || resultsWithNames.length === 0 ? (
        <p>No results available yet.</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Vote Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {resultsWithNames.map((result) => (
                <tr
                  key={result.candidateId}
                  className={
                    winners.some((w) => w.candidateId === result.candidateId)
                      ? 'table-success'
                      : ''
                  }
                >
                  <td>{result.name}</td>
                  <td>{result.voteCount}</td>
                  <td>{result.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Responsive info section */}
          <Row className="mt-3 align-items-center text-center text-md-start">
            <Col xs={12} md="auto" className="mb-2 mb-md-0">
              <strong>Total Votes:</strong> {totalVotes}
            </Col>
            <Col xs={12} md="auto" className="mb-2 mb-md-0">
              <strong>Winner{winners.length > 1 ? 's' : ''}:</strong>{' '}
              {winners.map((w) => w.name).join(', ')}
            </Col>
            <Col
              xs={12}
              md="auto"
              className="d-flex justify-content-center justify-content-md-start"
            >
              <Button variant="primary" onClick={generatePDF}>
                Download PDF
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ElectionResultDetail;
