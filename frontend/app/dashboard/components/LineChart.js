import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define a color palette for different nodes
const nodeColors = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const LineChart = ({ data, currentType, timeRange }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the chart.</p>;
  }

  const sortedData = [...data].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const startTime = new Date(sortedData[0].timestamp);
  const endTime = new Date(sortedData[sortedData.length - 1].timestamp);

  // Group data by node_id
  const groupedData = sortedData.reduce((acc, item) => {
    if (!acc[item.node_id]) {
      acc[item.node_id] = [];
    }
    acc[item.node_id].push(item);
    return acc;
  }, {});

  // Create datasets for each node
  const datasets = Object.entries(groupedData).map(([nodeId, nodeData], index) => ({
    label: `${currentType === 'peak' ? 'Peak' : 'Average'} Current - Node ${nodeId}`,
    data: nodeData.map(item => ({
      x: new Date(item.timestamp),
      y: currentType === 'peak' ? item.peak_current : item.avg_current
    })),
    borderColor: nodeColors[index % nodeColors.length],
    backgroundColor: nodeColors[index % nodeColors.length].replace('1)', '0.2)'),
    yAxisID: 'y',
  }));

  // Add average temperature dataset
  datasets.push({
    label: 'Average Temperature',
    data: sortedData.map(item => ({
      x: new Date(item.timestamp),
      y: item.avg_temp
    })),
    borderColor: 'rgba(255, 99, 132, 1)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    yAxisID: 'y1',
  });

  const chartData = { datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CBM Data Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === '15m' || timeRange === '30m' ? 'minute' : 'hour',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
        min: startTime,
        max: endTime,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Current (A)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;