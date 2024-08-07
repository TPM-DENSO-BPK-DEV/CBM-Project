"use client";
import { useState, useEffect, useCallback } from 'react';
import { FaThermometerHalf, FaBolt } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import LineChart from './components/LineChart';
import Card from './components/Card';
import Filter from './components/Filter';
import { fetchData } from '../utils/api';  // Corrected path

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 3600000).toISOString().slice(0, 16), // 1 hour ago
    end: new Date().toISOString().slice(0, 16)
  });
  const [showExpenses, setShowExpenses] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 300000); // Fetch every 5 minutes
    return () => clearInterval(interval);
  }, [loadData]);

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleShowExpensesChange = () => {
    setShowExpenses(!showExpenses);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = data.filter(item => 
    new Date(item.timestamp) >= new Date(dateRange.start) && 
    new Date(item.timestamp) <= new Date(dateRange.end)
  );

  const totalPeakTemp = filteredData.reduce((sum, item) => sum + item.peak_temp, 0);
  const totalAvgTemp = filteredData.reduce((sum, item) => sum + item.avg_temp, 0);
  const totalPeakCurrent = filteredData.reduce((sum, item) => sum + item.peak_current, 0);
  const totalAvgCurrent = filteredData.reduce((sum, item) => sum + item.avg_current, 0);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <Filter
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          showExpenses={showExpenses}
          onShowExpensesChange={handleShowExpensesChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {isLoading && <p className="text-center py-4">Loading...</p>}
        {error && <p className="text-center py-4 text-red-500">{error}</p>}
        
        {!isLoading && !error && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-lg shadow p-6">
              <LineChart 
                data={filteredData}
                showExpenses={showExpenses}
              />

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <p>Total Peak Temperature: {totalPeakTemp.toLocaleString()} °C</p>
                <p>Total Average Temperature: {totalAvgTemp.toLocaleString()} °C</p>
                <p>Total Peak Current: {totalPeakCurrent.toLocaleString()} A</p>
                <p>Total Average Current: {totalAvgCurrent.toLocaleString()} A</p>
              </div>
            </div>

            <div className="space-y-6">
              <Card
                title="Total Peak Temperature"
                value={`${totalPeakTemp.toFixed(2)} °C`}
                icon={<FaThermometerHalf className="text-red-500" />}
              />
              <Card
                title="Total Average Temperature"
                value={`${totalAvgTemp.toFixed(2)} °C`}
                icon={<FaThermometerHalf className="text-orange-500" />}
              />
              <Card
                title="Total Peak Current"
                value={`${totalPeakCurrent.toFixed(2)} A`}
                icon={<FaBolt className="text-yellow-500" />}
              />
              <Card
                title="Total Average Current"
                value={`${totalAvgCurrent.toFixed(2)} A`}
                icon={<FaBolt className="text-blue-500" />}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;