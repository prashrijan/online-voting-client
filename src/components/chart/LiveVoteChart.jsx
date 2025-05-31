import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchLiveVoteDataApi } from '@services/voteApi';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const fixedColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#5AD3D1',
  '#C9CBCF',
  '#B47CC7',
  '#FFA07A',
  '#8FBC8F',
  '#87CEEB',
  '#FF6B6B',
  '#48D1CC',
  '#9370DB',
  '#3CB371',
  '#FFA500',
  '#20B2AA',
  '#DA70D6',
  '#778899',
];

const LiveVoteChart = ({ electionId, type }) => {
  const [voteData, setVoteData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetchLiveVoteDataApi(electionId);
        if (res?.success) {
          const data = res.data.sort(
            (a, b) =>
              b.voteCount - a.voteCount || a.fullName.localeCompare(b.fullName)
          );
          setVoteData(data);
          setLastUpdated(new Date().toLocaleTimeString());
          setError(null);
        } else {
          setError('Failed to load vote data');
        }
      } catch (error) {
        console.error('Failed to fetch live vote data:', error);
        setError('Error fetching live data');
      }
    };

    fetchVotes();
    const interval = setInterval(fetchVotes, 10000);
    return () => clearInterval(interval);
  }, [electionId]);

  const chartData = {
    labels: voteData.map((c) => c.fullName),
    datasets: [
      {
        label: 'Votes',
        data: voteData.map((c) => c.voteCount),
        backgroundColor: voteData.map(
          (_, i) => fixedColors[i % fixedColors.length]
        ),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderColor: '#000000',
        hoverBackgroundColor: voteData.map(
          (_, i) => `${fixedColors[i % fixedColors.length]}CC`
        ),
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Live Election Results',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (tooltipItem) => {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${tooltipItem.raw} votes (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Vote Count',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: { top: 10, bottom: 10 },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          mirror: true,
          z: 1,
          color: '#333',
          padding: -50,
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Vote Distribution',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (tooltipItem) => {
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${tooltipItem.raw} votes (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: '50%',
    borderRadius: 4,
    spacing: 2,
  };

  if (error) {
    return (
      <div
        className="alert alert-danger text-center"
        style={{
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {error}
      </div>
    );
  }

  if (voteData.length === 0) {
    return (
      <div
        className="alert alert-info text-center"
        style={{
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        No vote data available yet.
      </div>
    );
  }

  return (
    <div className="live-vote-chart">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className={`col-12 ${type === 'pie' ? 'col-lg-8 mx-auto' : ''}`}>
            <div
              style={{
                height: type === 'pie' ? '500px' : '600px',
                position: 'relative',
                padding: '1rem',
              }}
            >
              {type === 'bar' ? (
                <Bar data={chartData} options={barOptions} />
              ) : (
                <Pie data={chartData} options={pieOptions} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {voteData.map((candidate, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: fixedColors[index % fixedColors.length],
                      marginRight: '8px',
                      borderRadius: '4px',
                    }}
                  />
                  <span className="text-nowrap">
                    {candidate.fullName} ({candidate.voteCount}{' '}
                    {candidate.voteCount <= 1 ? 'vote' : 'votes'})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <div className="badge bg-secondary p-2">
          <i className="bi bi-arrow-clockwise me-2"></i>
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default LiveVoteChart;
