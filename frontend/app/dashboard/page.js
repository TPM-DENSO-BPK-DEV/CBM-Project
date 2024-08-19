"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Footer from '../../components/common/Footer';
import { ArrowUpRight, Users, Cog, Briefcase } from 'lucide-react';

// Tabs Components
const Tabs = ({ children, value, onValueChange }) => (
  <div className="space-y-4">{React.Children.map(children, (child) => React.cloneElement(child, { value, onValueChange }))}</div>
);

const TabsList = ({ children, value, onValueChange }) => (
  <div className="flex space-x-1 border-b border-gray-200">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isActive: child.props.value === value,
        onClick: () => onValueChange(child.props.value),
      })
    )}
  </div>
);

const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
      isActive
        ? 'text-blue-600 bg-white border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, tabValue }) => value === tabValue ? <div className="py-4">{children}</div> : null;

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="px-6 py-4 border-b border-gray-100">{children}</div>;
const CardContent = ({ children }) => <div className="px-6 py-4">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold text-gray-800">{children}</h3>;
const CardDescription = ({ children }) => <p className="mt-1 text-sm text-gray-500">{children}</p>;

// Data for Sections
const sections = {
  Alternator: [
    { section: 414463, mcNos: ['6ACU0001', '6ACU0002', '6ACU0003'] },
    { section: 414461, mcNos: ['6ACU0004', '6ACU0005', '6ACU0006'] },
    { section: 414464, mcNos: ['6ACU0007', '6ACU0008', '6ACU0009'] },
  ],
  Starter: [
    { section: 414280, mcNos: ['6ABM0001', '6ABM0002', '6ABM0003'] },
    { section: 414281, mcNos: ['6ABM0004', '6ABM0005', '6ABM0006'] },
  ],
  Airbag: [
    { section: 414441, mcNos: ['6ACU0010', '6ACU0011', '6ACU0012'] },
    { section: 414245, mcNos: ['6ACU0013', '6ACU0014', '6ACU0015'] },
  ],
  Parts_1: [
    { section: 414111, mcNos: ['6ABM0010', '6ABM0011', '6ABM0012'] },
  ],
  Parts_2: [
    { section: 414153, mcNos: ['6ABM0013', '6ABM0014', '6ABM0015'] },
  ],
};

// SectionItem Component
const SectionItem = ({ dept, section, mcNos }) => (
  <Card className="mb-4 hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <CardTitle>Section {section}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {mcNos.map((mc_no) => (
          <li key={mc_no} className="flex items-center">
            <Link
              href={`/dashboard/${dept.toLowerCase()}?section=${section}&mc=${mc_no}`}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
            >
              {mc_no}
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// DepartmentTab Component
const DepartmentTab = ({ dept, value }) => (
  <TabsContent value={value} tabValue={dept}>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sections[dept].map(({ section, mcNos }) => (
        <SectionItem key={section} dept={dept} section={section} mcNos={mcNos} />
      ))}
    </div>
  </TabsContent>
);

// AllSections Component
const AllSections = ({ value }) => (
  <TabsContent value={value} tabValue="All">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(sections).flatMap(([dept, sectionData]) =>
        sectionData.map(({ section, mcNos }) => (
          <SectionItem key={`${dept}-${section}`} dept={dept} section={section} mcNos={mcNos} />
        ))
      )}
    </div>
  </TabsContent>
);

// RecentActivity Component
const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Latest updates from your dashboard</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {[
          { color: 'green', text: 'New user registered: John Doe' },
          { color: 'blue', text: 'Project "Website Redesign" completed' },
          { color: 'yellow', text: 'Invoice #1234 paid' },
          { color: 'purple', text: 'New comment on Project "Mobile App"' },
        ].map(({ color, text }, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <span className={`mr-2 w-2 h-2 rounded-full bg-${color}-500`} />
            {text}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// Summary Card Component
const SummaryCard = ({ title, value, icon: Icon }) => (
  <Card className="flex items-center p-6 hover:shadow-md transition-shadow duration-300">
    <div className="mr-4">
      <Icon className="h-8 w-8 text-blue-500" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </Card>
);

// DashboardHome Component
const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">CBM Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SummaryCard title="Total Machines" value="120" icon={Cog} />
          <SummaryCard title="Active Projects" value="8" icon={Briefcase} />
          <SummaryCard title="Total Users" value="320" icon={Users} />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Browse sections and machine numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    {Object.keys(sections).map((dept) => (
                      <TabsTrigger key={dept} value={dept}>{dept.replace('_', ' ')}</TabsTrigger>
                    ))}
                  </TabsList>
                  <AllSections value={activeTab} />
                  {Object.keys(sections).map((dept) => (
                    <DepartmentTab key={dept} dept={dept} value={activeTab} />
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <RecentActivity />
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default DashboardHome;
