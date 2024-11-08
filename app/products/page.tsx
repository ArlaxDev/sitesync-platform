"use client";

import React from "react";
import Link from "next/link";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend, ArcElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend, ArcElement);

const ProductsPage = () => {
  const complianceData = {
    labels: ["Before SiteSync", "With SiteSync"],
    datasets: [
      {
        label: "Compliance Success Rate (%)",
        data: [68, 95],
        backgroundColor: ["#d1d5db", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const timeSavingsData = {
    labels: ["Manual Process", "SiteSync"],
    datasets: [
      {
        label: "Average Compliance Check Time (Hours)",
        data: [10, 2],
        backgroundColor: ["#f87171", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Manual Entry Reduction", "Automated Compliance"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#facc15", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="w-full py-4 px-6 bg-white shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="flex space-x-6 text-gray-600 ml-auto">
            <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About ⠀⠀</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Products</h1>
          <p className="text-lg text-gray-700 mb-8">
            SiteSync’s suite of tools is tailored to streamline construction compliance, boost collaboration, and ensure project success.
          </p>
        </section>

        {/* Product Features Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Product Cards */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Automated Compliance Checker</h2>
            <p className="text-gray-500 mb-6">
              Quickly verify that engineering plans meet municipal standards, reducing errors and expediting approvals.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Collaborative Review Platform</h2>
            <p className="text-gray-500 mb-6">
              Work together seamlessly with team members and stakeholders, keeping everyone in sync.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Insights & Analytics</h2>
            <p className="text-gray-500 mb-6">
              Make data-driven decisions with detailed insights into project performance and compliance trends.
            </p>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Transforming the Industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Success Rate</h3>
              <Bar data={complianceData} options={{ plugins: { legend: { display: false } } }} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Time Savings</h3>
              <Bar data={timeSavingsData} options={{ plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </section>

        {/* Workflow Diagram Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">How SiteSync Works</h2>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <img src="/assets/images/workflow_process.png" alt="Workflow Diagram" className="mx-auto w-full md:w-2/3" />
            <p className="text-gray-700 mt-6">
            Seamlessly navigate from document upload to final approval with SiteSync's instant feedback, intelligent compliance checks, and advanced collaboration features—bringing speed, precision, and efficiency to every stage of your review process.
            </p>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="max-w-7xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">SiteSync vs. Traditional Compliance</h2>
              <div className="overflow-hidden rounded-lg shadow-lg bg-white">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-lg">Feature</th>
                      <th className="px-6 py-4 text-left font-semibold text-lg">SiteSync</th>
                      <th className="px-6 py-4 text-left font-semibold text-lg">Traditional Methods</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 text-gray-700 font-medium">Compliance Check Speed</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">Instant</td>
                      <td className="px-6 py-4 text-gray-600">Several Hours</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 text-gray-700 font-medium">Accuracy</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">95%</td>
                      <td className="px-6 py-4 text-gray-600">70%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 text-gray-700 font-medium">Real-Time Collaboration</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">Enabled</td>
                      <td className="px-6 py-4 text-gray-600">Limited</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-gray-700 font-medium">Cost Efficiency</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">High</td>
                      <td className="px-6 py-4 text-gray-600">Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>

        </section>

        {/* Call-to-Action Section */}
        <section className="max-w-7xl mx-auto mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience the Future of Compliance</h2>
          <p className="text-lg text-gray-700 mb-8">
            Start your journey with SiteSync and simplify your compliance process like never before.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Start Free Trial
              </button>
            </Link>
            <Link href="/pricing">
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">
                View Pricing
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-white mt-16">
        <p className="text-sm">© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductsPage;
