import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchLiveVoteDataApi } from '../../services/voteApi';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LiveVoteChart = ({ electionId }) => {
  const [voteData, setVoteData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Use useRef to persist colors across renders
  const colorsRef = useRef({});

  useEffect(() => {
    const fetchVotes = async () => {
      const res = await fetchLiveVoteDataApi(electionId);
      if (res?.success) {
        const data = res.data;

        // Ensure candidate order is preserved
        const sortedData = data.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );

        setVoteData(sortedData);

        // Generate colors for candidates only once (based on their ID)
        const newColors = {};
        sortedData.forEach((candidate) => {
          if (!colorsRef.current[candidate._id]) {
            colorsRef.current[candidate._id] = generateRandomColor();
          }
          newColors[candidate._id] = colorsRef.current[candidate._id];
        });

        setLastUpdated(new Date().toLocaleTimeString());
      }
    };

    fetchVotes(); // initial fetch
    const interval = setInterval(fetchVotes, 10000); // update every 10 seconds

    return () => clearInterval(interval); // cleanup
  }, [electionId]);

  // Generate a random color for each candidate
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = {
    labels: voteData.map((candidate) => candidate.fullName),
    datasets: [
      {
        label: 'Live Votes',
        data: voteData.map((candidate) => candidate.voteCount),
        backgroundColor: voteData.map(
          (candidate) => colorsRef.current[candidate._id] || '#000000'
        ), // Use color based on candidate ID
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Legend at the top
        labels: {
          font: {
            size: 14, // Font size for legend labels
            weight: 'bold', // Bold font for legend labels
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Display vote count as a whole number, for example, 5 votes
            return `${Math.floor(tooltipItem.raw)} votes`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the X-axis at zero
        grid: {
          display: true, // Show gridlines on X-axis
        },
      },
      y: {
        grid: {
          display: true, // Show gridlines on Y-axis
        },
      },
    },
    indexAxis: 'y', // Set to 'y' for horizontal bar chart
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
      <p className="text-muted mt-2">Last updated: {lastUpdated}</p>
    </div>
  );
};

export default LiveVoteChart;
