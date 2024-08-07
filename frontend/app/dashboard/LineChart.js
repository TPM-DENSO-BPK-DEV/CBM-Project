import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
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

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, showExpenses }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const newData = {
        datasets: [
          {
            label: 'Sales',
            data: data.map(item => ({ x: new Date(item.timestamp), y: item.sales })),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          ...(showExpenses ? [{
            label: 'Expenses',
            data: data.map(item => ({ x: new Date(item.timestamp), y: item.expenses })),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }] : [])
        ]
      };

      setChartData(newData);
    }
  }, [data, showExpenses]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Expenses Over Time',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          stepSize: 5,
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        ticks: {
          source: 'auto',
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount'
        },
        suggestedMin: 0,
        suggestedMax: 2000, // Adjust this based on your data range
      }
    },
    animation: {
      duration: 0
    },
    transitions: {
      active: {
        animation: {
          duration: 0
        }
      }
    }
  };

  return <Line ref={chartRef} options={options} data={chartData} />;
};

export default LineChart;
