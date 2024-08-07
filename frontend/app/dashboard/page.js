"use client";
import { useState, useEffect, useCallback } from 'react';
import { FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import LineChart from './LineChart';
import Card from './Card';
import Filter from './Filter';

const generateMockData = () => {
  const data = [];
  const now = new Date();
  now.setMinutes(Math.floor(now.getMinutes() / 5) * 5, 0, 0); // Round to nearest 5 minutes
  
  for (let i = 71; i >= 0; i--) { // Generate 6 hours of data (72 * 5 minutes)
    const timestamp = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      timestamp: timestamp.toISOString(),
      sales: Math.floor(Math.random() * 1000) + 500,
      expenses: Math.floor(Math.random() * 500) + 300,
      category: ['product', 'service', 'subscription'][Math.floor(Math.random() * 3)]
    });
  }
  return data;
};

const DashboardPage = () => {
  const [data, setData] = useState(generateMockData());
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 3600000).toISOString().slice(0, 16), // 1 hour ago
    end: new Date().toISOString().slice(0, 16)
  });
  const [showExpenses, setShowExpenses] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const updateData = useCallback(() => {
    const now = new Date();
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5, 0, 0); // Round to nearest 5 minutes
    const newDataPoint = {
      timestamp: now.toISOString(),
      sales: Math.floor(Math.random() * 1000) + 500,
      expenses: Math.floor(Math.random() * 500) + 300,
      category: ['product', 'service', 'subscription'][Math.floor(Math.random() * 3)]
    };
    setData(prevData => [...prevData.slice(1), newDataPoint]);
    setDateRange(prev => ({
      start: new Date(now.getTime() - 3600000).toISOString().slice(0, 16), // 1 hour ago
      end: now.toISOString().slice(0, 16)
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [updateData]);

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
    new Date(item.timestamp) <= new Date(dateRange.end) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = filteredData.reduce((sum, item) => sum + item.expenses, 0);
  const profitMargin = totalSales ? ((totalSales - totalExpenses) / totalSales) * 100 : 0;

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

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <LineChart 
              data={filteredData}
              showExpenses={showExpenses}
            />

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p>Total Sales: ${totalSales.toLocaleString()}</p>
              {showExpenses && (
                <p>Total Expenses: ${totalExpenses.toLocaleString()}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card
              title="Profit Margin"
              value={profitMargin.toFixed(2) + '%'}
              icon={<FaChartLine className="text-green-500" />}
            />
            <Card
              title="Total Revenue"
              value={'$' + totalSales.toLocaleString()}
              icon={<FaMoneyBillWave className="text-blue-500" />}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
