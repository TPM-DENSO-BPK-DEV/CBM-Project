"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/common/Header';
import Layout from '../components/layout/Layout'; // Imported Layout component

// Separate NotFoundMessage Component for clarity
function NotFoundMessage() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        We're sorry, but the page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-y-4">
        <Link href="/" aria-label="Go back to homepage">
          <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Go Home
          </span>
        </Link>
        <p className="text-sm text-gray-400">
          If you believe this is an error, please{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact support
          </Link>.
        </p>
      </div>
    </div>
  );
}

export default function Custom404() {
  useEffect(() => {
    document.body.setAttribute('data-page-type', 'not-found');
    document.body.style.overflow = 'hidden'; // Disable scrolling on the body
    return () => {
      document.body.removeAttribute('data-page-type');
      document.body.style.overflow = ''; // Reset overflow when unmounting
    };
  }, []);

  return (
    <>
      <Header is404={true} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg" style={{ marginBottom: '10rem' }}>
          <NotFoundMessage />
        </div>
      </div>
    </>
  );
}
