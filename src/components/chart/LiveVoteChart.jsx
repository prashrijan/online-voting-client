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
import { fetchLiveVoteDataApi } from '../../services/voteApi';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Define a fixed palette of visually distinct colors
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

const LiveVoteChart = ({ electionId }) => {
  const [voteData, setVoteData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const fetchVotes = async () => {
      const res = await fetchLiveVoteDataApi(electionId);
      console.log(res);
      if (res?.success) {
        const data = res.data.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
        setVoteData(data);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    };

    fetchVotes();
    const interval = setInterval(fetchVotes, 10000);
    return () => clearInterval(interval);
  }, [electionId]);

  const commonChartData = {
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
          generateLabels: (chart) => {
            return chart.data.labels.map((label, index) => ({
              text: label, // Label will be the candidate's name
              fillStyle: chart.data.datasets[0].backgroundColor[index], // Color of the bar
              strokeStyle: chart.data.datasets[0].backgroundColor[index], // Border color (optional)
              lineWidth: 1, // Border width (optional)
            }));
          },
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
        labels: {
          font: { size: 14, weight: 'bold' },
        },
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <select
          className="form-select w-auto"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      {chartType === 'bar' ? (
        <div
          style={{
            width: '100%',
            height: '400px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Bar
            data={commonChartData}
            options={{
              ...barOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            maxWidth: '400px',
            height: '400px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Pie data={commonChartData} options={pieOptions} />
        </div>
      )}

      <p className="text-muted mt-2">Last updated: {lastUpdated}</p>
    </div>
  );
};

export default LiveVoteChart;
