"use client";

import React from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import RecentBlogs from "@/app/components/RecentBlogs";
import ContactSpecialist from "@/app/components/ContactSpecialist";

const PricingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Pricing Section */}
      <main className="pt-20 px-6">
        <section className="max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Pricing Plans</h1>
          <p className="text-lg text-gray-700 mb-8">
            Choose the plan that fits your project’s needs. Whether you’re a small team or a large enterprise, we have a solution for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic</h2>
              <p className="text-gray-500 mb-6">Ideal for small projects or individual users.</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">$29/month</p>
              <ul className="text-left mb-6">
                <li className="text-gray-700 mb-2">✓ 5 Project Uploads per Month</li>
                <li className="text-gray-700 mb-2">✓ Basic Compliance Checks</li>
                <li className="text-gray-700 mb-2">✓ Standard Support</li>
              </ul>
              <Link href="/register">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-blue-50 shadow-lg rounded-lg p-8 border-2 border-blue-600">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professional</h2>
              <p className="text-gray-500 mb-6">Perfect for growing teams and larger projects.</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">$79/month</p>
              <ul className="text-left mb-6">
                <li className="text-gray-700 mb-2">✓ 20 Project Uploads per Month</li>
                <li className="text-gray-700 mb-2">✓ Advanced Compliance Checks</li>
                <li className="text-gray-700 mb-2">✓ Priority Support</li>
                <li className="text-gray-700 mb-2">✓ Real-Time Collaboration</li>
              </ul>
              <Link href="/register">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise</h2>
              <p className="text-gray-500 mb-6">Custom solutions for large organizations.</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">Contact Us</p>
              <ul className="text-left mb-6">
                <li className="text-gray-700 mb-2">✓ Unlimited Project Uploads</li>
                <li className="text-gray-700 mb-2">✓ Full Compliance Suite</li>
                <li className="text-gray-700 mb-2">✓ Dedicated Account Manager</li>
                <li className="text-gray-700 mb-2">✓ Custom Integrations</li>
                <li className="text-gray-700 mb-2">✓ 24/7 Premium Support</li>
              </ul>
              <Link href="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Blogs & Articles Section */}
          <RecentBlogs />

          {/* Contact Us Section */}
          <ContactSpecialist />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
