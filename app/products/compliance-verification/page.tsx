// app/compliance-verification.tsx
"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { downloadPDFReport } from "./generatePDFReport";
import Link from "next/link";

const ComplianceVerificationPage = () => {
  const companyDetails = {
    name: "ACME Corp",
    project: "Downtown Office Renovation",
    room: "Conference Room A",
    location: "Atlanta, GA",
  };

  const nonCompliantFeatures = [
    {
      id: 1,
      title: "Distance from Exit",
      description:
        "The distance from certain workstations to the nearest exit exceeds the maximum allowed 75 feet.",
      recommendation:
        "Relocate workstations or add an additional emergency exit to meet safety standards.",
      codeReference: "Atlanta Fire Code 907.5.2.3",
      estimatedCostSavings: "$1,500",
      severity: "High",
    },
    {
      id: 2,
      title: "Room Capacity Exceeds Limit",
      description:
        "Conference Room A currently accommodates 25 people, but the maximum occupancy limit is 20.",
      recommendation:
        "Limit the number of occupants or consider applying for an occupancy increase permit.",
      codeReference: "International Building Code 1004.1.2",
      estimatedCostSavings: "$2,000",
      severity: "Moderate",
    },
    {
      id: 3,
      title: "Insufficient Emergency Signage",
      description:
        "Exit signs are not visible from all areas of the office, especially in the break room and storage area.",
      recommendation:
        "Install additional illuminated exit signs to ensure visibility from all locations within the office.",
      codeReference: "NFPA 101 Section 7.10",
      estimatedCostSavings: "$500",
      severity: "Low",
    },
    {
      id: 4,
      title: "Fire Extinguisher Placement",
      description:
        "Fire extinguishers are not readily accessible in all areas of the workspace.",
      recommendation:
        "Install additional fire extinguishers in key areas such as corridors and common rooms.",
      codeReference: "NFPA 10, Section 6.1.3",
      estimatedCostSavings: "$800",
      severity: "High",
    },
    {
      id: 5,
      title: "Lighting Levels",
      description:
        "Lighting levels in some work areas fall below the recommended minimum of 300 lux.",
      recommendation:
        "Increase lighting fixtures or replace bulbs to meet the minimum lighting standards.",
      codeReference: "OSHA Standard 1910.37",
      estimatedCostSavings: "$1,200",
      severity: "Moderate",
    },
  ];

  const recentBlogs = [
    {
      id: 1,
      title: "How SiteSync Enhances Workplace Safety",
      description: "Learn how our platform automates compliance to reduce workplace risks.",
      imageUrl: "/assets/images/blog1.jpg", // Replace with actual path
      link: "/blog/safety-enhancements"
    },
    {
      id: 2,
      title: "Cost Savings Through Automated Compliance",
      description: "Discover the cost benefits of switching to automated compliance checks.",
      imageUrl: "/assets/images/blog2.jpg", // Replace with actual path
      link: "/blog/cost-savings"
    },
    {
      id: 3,
      title: "Top 5 Compliance Issues in Modern Workspaces",
      description: "An overview of common compliance challenges and how to tackle them.",
      imageUrl: "/assets/images/blog3.jpg", // Replace with actual path
      link: "/blog/compliance-issues"
    },
  ];

  const [showCostSavings, setShowCostSavings] = useState(false);

  const costSavingsData = {
    labels: nonCompliantFeatures.map((feature) => feature.title),
    datasets: [
      {
        label: "Estimated Cost Savings ($)",
        data: nonCompliantFeatures.map((feature) =>
          parseInt(feature.estimatedCostSavings.replace("$", ""))
        ),
        backgroundColor: "#5a67d8",
        borderColor: "#4c51bf",
        borderWidth: 1,
      },
    ],
  };

  const severityColors = {
    High: "bg-red-100 text-red-600 border-red-500",
    Moderate: "bg-yellow-100 text-yellow-600 border-yellow-500",
    Low: "bg-green-100 text-green-600 border-green-500",
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
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
          <Link href="/register">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign Out
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 pb-16">
        {/* Project Details */}
        <section className="max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Compliance Verification Report
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600 text-center mb-8">
            {Object.entries(companyDetails).map(([key, value]) => (
              <div key={key} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-500 capitalize">{key}</p>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Non-Compliant Features */}
        <section className="max-w-7xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Non-Compliant Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nonCompliantFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${severityColors[feature.severity]}`}>
                  {feature.severity} Severity
                </div>
                <p className="mt-4 text-gray-700">
                  <strong>Description:</strong> {feature.description}
                </p>
                <p className="text-gray-700">
                  <strong>Recommendation:</strong> {feature.recommendation}
                </p>
                <p className="text-gray-700">
                  <strong>Code Reference:</strong> {feature.codeReference}
                </p>
                <p className="text-gray-700">
                  <strong>Estimated Cost Savings:</strong> {feature.estimatedCostSavings}
                </p>
                <button
                  onClick={() => setShowCostSavings(true)}
                  className="mt-4 text-blue-600 underline hover:text-blue-800"
                >
                  View Cost Savings
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Savings Section */}
        {showCostSavings && (
          <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Potential Cost Savings
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Addressing these non-compliance issues could save ACME Corp significant expenses by avoiding fines, minimizing project delays, and enhancing safety.
            </p>
            <div className="flex justify-center">
              <div className="w-full md:w-2/3 lg:w-1/2">
                <Bar
                  data={costSavingsData}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                      },
                    },
                    responsive: true,
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Compliance Summary */}
        <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Compliance Summary
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8">
            Resolving these compliance issues will ensure regulatory adherence, enhance workplace safety, and improve overall project efficiency.
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => downloadPDFReport(companyDetails)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Download Full Report
            </button>
          </div>
        </section>

        {/* Recent Blogs & Articles Section */}
        <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Recent Blogs & Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src={blog.imageUrl} alt={blog.title} className="rounded-lg mb-4 w-full h-32 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <Link 
                  href={blog.link}
                  className="text-blue-600 hover:underline"
                  >
                    Read More
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Questions? Ask Us!
          </h2>
          <p className="text-lg text-gray-700 text-center mb-4">
            Have a question about our product or want to speak to a specialist regarding a compliance issue?
          </p>
          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Contact a Specialist
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Our team is here to help you navigate compliance challenges and maximize efficiency.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-white mt-16">
        <p className="text-sm">© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComplianceVerificationPage;
