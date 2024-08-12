'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaBolt, FaThermometerHalf } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import LineChart from './components/LineChart';
import Card from './components/Card';
import Filter from './components/Filter';
import { fetchData } from '../utils/api';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState({});
  const [nodeId, setNodeId] = useState('all');
  const [currentType, setCurrentType] = useState('peak');
  const [timeRange, setTimeRange] = useState('1h');
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    end: new Date().toISOString().slice(0, 16),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateTimeRange = useCallback(() => {
    const end = new Date();
    let start;

    switch (timeRange) {
      case '15m':
        start = new Date(end.getTime() - 15 * 60 * 1000);
        break;
      case '30m':
        start = new Date(end.getTime() - 30 * 60 * 1000);
        break;
      case '1h':
        start = new Date(end.getTime() - 60 * 60 * 1000);
        break;
      case '2h':
        start = new Date(end.getTime() - 2 * 60 * 60 * 1000);
        break;
      case 'custom':
        start = new Date(customDateRange.start);
        break;
      default:
        start = new Date(end.getTime() - 60 * 60 * 1000);
    }

    return { 
      start: start.toISOString(), 
      end: end.toISOString() 
    };
  }, [timeRange, customDateRange]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { start, end } = calculateTimeRange();
      console.log('Fetching data for range:', { start, end, nodeId, currentType });
      const result = await fetchData(start, end, nodeId, currentType);
      console.log('Data received from API:', result);
      
      if (Array.isArray(result) && result.length > 0) {
        setData(result);
        
        // Group latest data by node
        const latestDataByNode = result.reduce((acc, item) => {
          if (!acc[item.node_id] || new Date(item.timestamp) > new Date(acc[item.node_id].timestamp)) {
            acc[item.node_id] = item;
          }
          return acc;
        }, {});
        
        setLatestData(latestDataByNode);
        console.log('Data set successfully. Length:', result.length);
      } else {
        console.warn('Received empty or invalid data from API');
        setData([]);
        setLatestData({});
        setError('No data available for the selected range');
      }
    } catch (error) {
      console.error('Error in loadData:', error);
      setError(`Failed to fetch data: ${error.message}`);
      setData([]);
      setLatestData({});
    } finally {
      setIsLoading(false);
    }
  }, [calculateTimeRange, nodeId, currentType]);

  useEffect(() => {
    loadData();
  }, [loadData, timeRange, customDateRange, nodeId, currentType]);

  const handleNodeIdChange = (event) => {
    setNodeId(event.target.value);
  };

  const handleCurrentTypeChange = (event) => {
    setCurrentType(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleCustomDateRangeChange = (field, value) => {
    setCustomDateRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">CBM Dashboard</h1>

        <Filter
          nodeId={nodeId}
          onNodeIdChange={handleNodeIdChange}
          currentType={currentType}
          onCurrentTypeChange={handleCurrentTypeChange}
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          customDateRange={customDateRange}
          onCustomDateRangeChange={handleCustomDateRangeChange}
        />

        {isLoading && <p className="text-center py-4">Loading...</p>}
        {error && <p className="text-center py-4 text-red-500">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {Object.entries(latestData).map(([nodeId, data]) => (
                <div key={nodeId} className="space-y-4">
                  <Card
                    title={`Node ${nodeId} - Peak Current`}
                    value={`${data.peak_current.toFixed(2)} A`}
                    icon={<FaBolt className="text-yellow-500" />}
                  />
                  <Card
                    title={`Node ${nodeId} - Average Current`}
                    value={`${data.avg_current.toFixed(2)} A`}
                    icon={<FaBolt className="text-blue-500" />}
                  />
                  <Card
                    title={`Node ${nodeId} - Average Temperature`}
                    value={`${data.avg_temp.toFixed(2)} °C`}
                    icon={<FaThermometerHalf className="text-red-500" />}
                  />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <LineChart 
                data={data} 
                currentType={currentType}
                timeRange={timeRange}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}