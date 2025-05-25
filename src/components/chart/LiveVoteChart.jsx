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
];

const LiveVoteChart = ({ electionId, type }) => {
  const [voteData, setVoteData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetchLiveVoteDataApi(electionId);
        if (res?.success) {
          const data = res.data.sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
          );
          setVoteData(data);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error('Failed to fetch live vote data:', error);
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
        label: 'Live Votes',
        data: voteData.map((c) => c.voteCount),
        backgroundColor: voteData.map(
          (_, i) => fixedColors[i % fixedColors.length]
        ),
      },
    ],
  };

  const barOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) =>
            chart.data.labels.map((label, index) => ({
              text: label,
              fillStyle: chart.data.datasets[0].backgroundColor[index],
              strokeStyle: chart.data.datasets[0].backgroundColor[index],
              lineWidth: 1,
            })),
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${Math.floor(tooltipItem.raw)} votes`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true, grid: { display: true } },
      y: { grid: { display: true } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 14, weight: 'bold' } },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${Math.floor(tooltipItem.raw)} votes`,
        },
      },
    },
  };

  return (
    <div className="w-100">
      {type === 'bar' ? (
        <div
          style={{
            width: '100%',
            height: 400,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Bar data={chartData} options={barOptions} />
        </div>
      ) : (
        <div
          style={{
            maxWidth: 400,
            height: 400,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Pie data={chartData} options={pieOptions} />
        </div>
      )}

      <p className="text-muted mt-2">Last updated: {lastUpdated}</p>
    </div>
  );
};

export default LiveVoteChart;
