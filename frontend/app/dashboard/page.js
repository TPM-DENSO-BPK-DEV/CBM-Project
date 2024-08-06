"use client";

import Layout from '../../components/Layout';
import LineChart from '../../components/LineChart';

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
            <LineChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
