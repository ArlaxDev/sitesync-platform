// components/ProgressDashboard.tsx
import React from "react";

interface ProgressDashboardProps {
  features: {
    severity: string;
    estimatedCostSavings: string;
  }[];
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ features }) => {
  const severityCount = features.reduce(
    (acc, feature) => {
      acc[feature.severity] += 1;
      return acc;
    },
    { High: 0, Moderate: 0, Low: 0 }
  );

  const totalCostSavings = features.reduce(
    (sum, feature) => sum + parseInt(feature.estimatedCostSavings.replace("$", "")),
    0
  );

  return (
    <section className="max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Compliance Progress</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold">High Severity Issues</p>
          <p className="text-2xl font-bold text-red-600">{severityCount.High}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold">Moderate Severity Issues</p>
          <p className="text-2xl font-bold text-yellow-600">{severityCount.Moderate}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold">Low Severity Issues</p>
          <p className="text-2xl font-bold text-green-600">{severityCount.Low}</p>
        </div>
        <div className="col-span-3 bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
          <p className="text-lg font-semibold">Total Estimated Cost Savings</p>
          <p className="text-2xl font-bold text-blue-600">${totalCostSavings.toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;
