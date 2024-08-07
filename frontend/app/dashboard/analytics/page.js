"use client";
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';

const AnalyticsPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detailed Analytics</h1>
          <Link href="/dashboard" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <p className="mb-4">This page will contain detailed analytics and insights derived from your CBM data.</p>
          <p className="mb-4">Future features may include:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Trend analysis of temperature and current over time</li>
            <li>Predictive maintenance suggestions</li>
            <li>Equipment performance comparisons</li>
            <li>Anomaly detection and alerts</li>
          </ul>
          <p>Check back later for updates and new analytics features!</p>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;