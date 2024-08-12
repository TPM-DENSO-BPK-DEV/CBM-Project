// app/dashboard/[part]/[option]/page.js
"use client";

import { useParams } from 'next/navigation';
import Layout from '../../../../components/layout/Layout';

const PartOptionPage = () => {
  const params = useParams();
  const { dept, option } = params;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Department: {dept}</h1>
        <h2 className="text-xl">Option: {option}</h2>
        {/* Add any content or components relevant to this part and option */}
      </div>
    </Layout>
  );
};

export default PartOptionPage;
