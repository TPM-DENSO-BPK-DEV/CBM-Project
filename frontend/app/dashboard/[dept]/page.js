// app/dashboard/[dept]/page.js
"use client";

import { useParams, useSearchParams } from 'next/navigation';
import Layout from '../../../components/layout/Layout';

const DepartmentPage = () => {
  const params = useParams(); // Get the department from the URL
  const searchParams = useSearchParams(); // Get the query parameters

  const { dept } = params; // e.g., Alternator
  const section = searchParams.get('section'); // Get the section ID from the query parameter
  const mc_no = searchParams.get('mc'); // Get the machine number from the query parameter

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Department: {dept}</h1>
        <h2 className="text-xl">Section ID: {section}</h2>
        <h3 className="text-lg">Machine No: {mc_no}</h3>
        {/* Add any content or components relevant to this section and machine number */}
      </div>
    </Layout>
  );
};

export default DepartmentPage;
