import React from 'react';
import Layout from '../components/layout/Layout';
import Image from 'next/image';

const Home = () => {
  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Welcome to CBM-Project
            </h1>
            <p className="text-lg md:text-xl font-light">
              Innovating TPM solutions for Denso BPK
            </p>
          </header>

          <section className="mb-12">
            <div className="relative h-56 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/api/placeholder/800/600"  // Replace with your actual image path
                alt="CBM-Project at Denso BPK"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {['Efficiency', 'Innovation', 'Reliability'].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">
                  {item}
                </h2>
                <p className="text-sm">
                  Delivering cutting-edge {item.toLowerCase()} in Total Productive Maintenance for enhanced manufacturing performance.
                </p>
              </div>
            ))}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'TPM Consulting', desc: 'Expert guidance on implementing TPM strategies' },
                { title: 'Performance Analysis', desc: 'In-depth analysis of manufacturing processes' },
                { title: 'Training Programs', desc: 'Comprehensive TPM training for your team' },
                { title: 'Software Solutions', desc: 'Cutting-edge software for TPM management' }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm">{service.desc}</p>
                  </div>
                  <span className="text-purple-600 dark:text-purple-400 ml-4">&#8594;</span>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Ready to Optimize Your Operations?</h2>
            <p className="text-lg font-light mb-6">
              Let's discuss how CBM-Project can elevate your manufacturing processes.
            </p>
            <a href="/contact" className="inline-flex items-center bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300">
              Get in Touch
              <span className="ml-2">&#8594;</span>
            </a>
          </section>

          <footer className="border-t border-gray-300 dark:border-gray-700 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <h3 className="text-lg font-semibold mb-4">About CBM-Project</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Innovating TPM solutions for enhanced manufacturing performance at Denso BPK.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:text-purple-400 transition-colors duration-300">About Us</a></li>
                  <li><a href="/services" className="hover:text-purple-400 transition-colors duration-300">Services</a></li>
                  <li><a href="/contact" className="hover:text-purple-400 transition-colors duration-300">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">&#9742;</span> +1 234 567 890
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">&#9993;</span> info@cbm-project.com
                  </li>
                  <li className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">&#128205;</span> Denso BPK, Thailand
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              &copy; 2024 CBM-Project by Denso TPM BPK. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
