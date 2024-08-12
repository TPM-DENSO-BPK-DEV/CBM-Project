import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <span className="text-2xl text-gray-500">{icon}</span>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const QuickActionButton = ({ href, children }) => (
  <Link href={href} className="bg-white text-gray-800 p-4 rounded-lg text-center hover:bg-gray-100 transition flex items-center justify-center shadow">
    {children}
  </Link>
);

const DashboardHome = () => {
  const summaryCards = [
    { title: 'Total Users', value: '1,234', icon: '👥' },
    { title: 'Revenue', value: '$45,678', icon: '💰' },
    { title: 'Active Projects', value: '42', icon: '📊' },
  ];

  const quickActions = [
    { href: '/dashboard/users', label: 'Manage Users' },
    { href: '/dashboard/projects', label: 'View Projects' },
    { href: '/dashboard/reports', label: 'Generate Reports' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/b1/alternator/option1', label: 'Go to Option 1' },
  ];

  const recentActivity = [
    'New user registered: John Doe',
    'Project "Website Redesign" completed',
    'Invoice #1234 paid',
    'New comment on Project "Mobile App"',
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryCards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} href={action.href}>
                {action.label}
              </QuickActionButton>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <ul className="bg-white rounded-lg shadow divide-y">
            {recentActivity.map((activity, index) => (
              <li key={index} className="p-4">{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;