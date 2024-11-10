// app/compliance-verification.tsx
"use client";

import React, { useState } from "react";
import { downloadPDFReport } from "./generatePDFReport";
import Link from "next/link";
import RecentBlogs from "../../components/RecentBlogs";
import Footer from "@/app/components/Footer";
import CommentSection from "@/app/components/CommentSection";
import TaskAssignment from "@/app/components/TaskAssignment";
import { Bar, Pie } from "react-chartjs-2";

const ComplianceVerificationPage = () => {
  const companyDetails = {
    name: "ACME Corp",
    project: "Downtown Office Renovation",
    room: "Conference Room A",
    location: "Atlanta, GA",
  };

  const projectBudget = {
    totalBudget: 100000,
    spent: 65000,
    remaining: 35000,
    timeline: "Q4 2024",
    breakdown: [
      { item: "Materials", cost: 30000 },
      { item: "Labor", cost: 25000 },
      { item: "Permits & Fees", cost: 5000 },
      { item: "Miscellaneous", cost: 5000 },
    ],
  };

  const breakdownData = {
    labels: projectBudget.breakdown.map((item) => item.item),
    datasets: [
      {
        data: projectBudget.breakdown.map((item) => item.cost),
        backgroundColor: ["#4c6ef5", "#f59f00", "#ff6b6b", "#37b24d"], // Colors for each category
      },
    ],
  };

  const budgetData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        label: "Budget",
        data: [projectBudget.spent, projectBudget.remaining],
        backgroundColor: ["#4c6ef5", "#37b24d"],
      },
    ],
  };

  const timelineData = [
    { stage: "Planning", status: "Completed", details: "Initial project planning and setup" },
    { stage: "Procurement", status: "In Progress", details: "Materials being sourced and purchased" },
    { stage: "Construction", status: "Blocked", details: "Awaiting permits from local authorities" },
    { stage: "Inspection", status: "Pending", details: "Scheduled after construction completion" },
    { stage: "Finalization", status: "Pending", details: "Final review and sign-off" },
  ];


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
      id: 6,
      title: "Insufficient Distance Between Workstations",
      description:
        "Workstations in the open office area do not maintain the required minimum clearance of 36 inches between desks, obstructing safe and efficient egress.",
      recommendation:
        "Rearrange workstations to maintain at least 36 inches of clearance between desks to comply with egress requirements.",
      codeReference: "International Building Code 1018.1",
      estimatedCostSavings: "$1,500",
      severity: "Moderate",
    },
    {
      id: 7,
      title: "Overcrowded Storage Room",
      description:
        "The storage room is currently used to store excess materials and equipment, reducing the required clearance and violating the room's designated maximum capacity.",
      recommendation:
        "Reduce the number of stored items to ensure a clear path for movement and maintain compliance with occupancy limits.",
      codeReference: "International Building Code 1004.1.2",
      estimatedCostSavings: "$1,000",
      severity: "High",
    },
    {
      id: 8,
      title: "Obstructed Emergency Exit in Hallway",
      description:
        "The emergency exit in the main hallway is partially obstructed by office furniture, restricting the required 44-inch egress width.",
      recommendation:
        "Clear any obstructions from the emergency exit to maintain the required egress width and ensure a safe evacuation route.",
      codeReference: "NFPA 101 Section 7.3.4",
      estimatedCostSavings: "$2,200",
      severity: "High",
    },
    {
      id: 9,
      title: "Room Capacity Exceeded in Training Room",
      description:
        "The training room is currently set up to accommodate 30 people, exceeding its maximum allowable occupancy of 25 people.",
      recommendation:
        "Limit the number of occupants to 25 or apply for a permit to increase the room’s capacity if needed.",
      codeReference: "International Building Code 1004.1.2",
      estimatedCostSavings: "$1,500",
      severity: "Moderate",
    },
    {
      id: 10,
      title: "Insufficient Clearance Near Emergency Equipment",
      description:
        "The fire extinguisher cabinet in the corridor has items stacked nearby, obstructing the required 36-inch clearance for access to emergency equipment.",
      recommendation:
        "Remove any obstructions near the fire extinguisher cabinet to maintain the required 36-inch clearance for easy access in emergencies.",
      codeReference: "NFPA 10 Section 6.1.3",
      estimatedCostSavings: "$800",
      severity: "Moderate",
    }
  ];

  const [showCostSavings, setShowCostSavings] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeatureDetails = (id: number) => {
    setExpandedFeature((prevExpandedFeature) => prevExpandedFeature === id ? null : id);
  };

  // Calculate severity counts and total estimated cost savings
  const severityCounts = {
    High: nonCompliantFeatures.filter((feature) => feature.severity === "High").length,
    Moderate: nonCompliantFeatures.filter((feature) => feature.severity === "Moderate").length,
    Low: nonCompliantFeatures.filter((feature) => feature.severity === "Low").length,
  };

  const totalCostSavings = nonCompliantFeatures.reduce(
    (total, feature) => total + parseInt(feature.estimatedCostSavings.replace("$", "")),
    0
  );

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(nonCompliantFeatures.length / itemsPerPage);

  // Paginated features for the current page
  const paginatedFeatures = nonCompliantFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination control functions
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
        {/* Compliance Verification Report */}
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

          {/* Divider */}
          <hr className="my-6 border-t border-gray-300 w-4/4 mx-auto" />

          {/* Project Timeline Section */}
          {/* <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Project Timeline</h2>

            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 items-start">
              {timelineData.map((item, index) => (
                <div key={index} className="flex-1 text-center lg:text-left">
                  <div
                    className={`p-4 rounded-lg shadow-sm ${item.status === "Completed" ? "bg-green-100 text-green-800" :
                        item.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                          item.status === "Blocked" ? "bg-red-100 text-red-800" : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    <h3 className="text-lg font-semibold">{item.stage}</h3>
                    <p className="text-sm">{item.details}</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${item.status === "Completed" ? "bg-green-200 text-green-800" :
                          item.status === "In Progress" ? "bg-yellow-200 text-yellow-800" :
                            item.status === "Blocked" ? "bg-red-200 text-red-800" : "bg-gray-300 text-gray-800"
                        }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Timeline Connector for all except last item */}
          {/* {index < timelineData.length - 1 && (
                    <div className="h-16 w-1 bg-gray-300 mx-auto lg:h-1 lg:w-16 mt-4 lg:mt-0 lg:mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div> */}


          {/* Severity Overview and Total Cost Savings */}
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">High Severity Issues</p>
              <p className="text-2xl font-bold text-red-600">{severityCounts.High}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">Moderate Severity Issues</p>
              <p className="text-2xl font-bold text-yellow-600">{severityCounts.Moderate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">Low Severity Issues</p>
              <p className="text-2xl font-bold text-green-600">{severityCounts.Low}</p>
            </div>
            <div className="col-span-3 bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
              <p className="text-lg font-semibold">Total Estimated Cost Savings</p>
              <p className="text-2xl font-bold text-blue-600">${totalCostSavings.toLocaleString()}</p>
            </div>
          </div>

          {/* Project Budget Section with Balanced Padding */}
          <div className="bg-gray-50 py-8 px-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Project Budget</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Budget Summary */}
              <div className="space-y-4 text-center lg:text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Budget</p>
                  <p className="text-xl font-semibold text-gray-800">${projectBudget.totalBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Spent</p>
                  <p className="text-xl font-semibold text-gray-800">${projectBudget.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Remaining</p>
                  <p className="text-xl font-semibold text-blue-600">${projectBudget.remaining.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Timeline</p>
                  <p className="text-xl font-semibold text-gray-800">{projectBudget.timeline}</p>
                </div>

                <div className="w-1/2">
                  <p className="text-sm font-medium text-gray-500">Miscellaneous</p>
                  <p className="text-xl font-semibold text-gray-800">${projectBudget.breakdown.find(item => item.item === "Miscellaneous")?.cost.toLocaleString()}</p>
                </div>
                <div className="w-1/2">
                  <p className="text-sm font-medium text-gray-500">Permits & Fees</p>
                  <p className="text-xl font-semibold text-gray-800">${projectBudget.breakdown.find(item => item.item === "Permits & Fees")?.cost.toLocaleString()}</p>
                </div>
              </div>

              {/* Pie Chart for Cost Breakdown */}
              <div className="flex justify-center">
                <div className="w-80 h-80 mx-auto"> {/* Center the pie chart */}
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Cost Breakdown</h3>
                  <Pie data={breakdownData} options={{ plugins: { legend: { position: "bottom" } } }} />
                </div>
              </div>

              {/* Bar Chart for Budget Overview */}
              <div className="flex justify-center">
                <div className="w-72 h-80 mx-auto"> {/* Center the bar chart */}
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Budget Overview</h3>
                  <Bar
                    data={budgetData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: projectBudget.totalBudget, // Aligns max to total budget
                          ticks: {
                            stepSize: 10000,
                          },
                          grid: {
                            // borderColor: "rgba(0, 0, 0, 0.1)",
                            color: "rgba(0, 0, 0, 0.1)",
                          },
                        },
                      },
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* Non-Compliant Features with Pagination */}
        <section className="max-w-7xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Non-Compliant Features</h2>

          {/* Pagination Controls - Positioned at the top-right */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Display paginated features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedFeatures.map((feature) => (
              <div key={feature.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${severityColors[feature.severity]}`}>
                  {feature.severity} Severity
                </div>
                <p className="text-gray-700 mt-2">
                  <strong>Description:</strong> {feature.description}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Recommendation:</strong> {feature.recommendation}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Code Reference:</strong> {feature.codeReference}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Estimated Cost Savings:</strong> {feature.estimatedCostSavings}
                </p>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleFeatureDetails(feature.id)}
                  className="text-blue-600 mt-4 text-sm font-medium"
                >
                  {expandedFeature === feature.id ? "Hide Details" : "Show Details"}
                </button>

                {/* Collapsible Section */}
                {expandedFeature === feature.id && (
                  <div className="mt-4 space-y-6"> {/* Increased spacing here */}
                    <TaskAssignment featureId={feature.id} />
                    <CommentSection featureId={feature.id} />
                  </div>
                )}
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
        <RecentBlogs />

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
      <Footer />
    </div>
  );
};

export default ComplianceVerificationPage;
