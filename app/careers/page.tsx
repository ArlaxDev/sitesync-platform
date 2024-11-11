"use client";

import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Careers: React.FC = () => {
    return (
        <>
            {/* Header */}
            <Header />
            <div className="bg-gray-50">
                {/* Job Openings Section */}
                <section className="container mx-auto py-16 px-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Open Positions</h2>
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {/* Placeholder for job listings */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-900">Software Engineer</h3>
                            <p className="text-gray-600 mt-2">Full-time · Remote</p>
                            <p className="text-gray-600 mt-4">
                                We're looking for a talented software engineer to help build scalable and reliable software solutions.
                            </p>
                            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-900">Project Manager</h3>
                            <p className="text-gray-600 mt-2">Full-time · New York, NY</p>
                            <p className="text-gray-600 mt-4">
                                Manage construction compliance projects and ensure quality standards are met in every step of our process.
                            </p>
                            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-900">Data Analyst</h3>
                            <p className="text-gray-600 mt-2">Full-time · Remote</p>
                            <p className="text-gray-600 mt-4">
                                Join our data team to provide insights that drive smarter decision-making across our operations.
                            </p>
                            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </section>

                {/* Life at SiteSync Section */}
                <section className="bg-white py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Life at SiteSync</h2>
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center">
                                <img src="/assets/images/team-collaboration.jpg" alt="Collaboration" className="w-16 h-16 mr-4 rounded-full object-cover" />
                                <p className="text-gray-600">Collaborative and inclusive work environment that fosters creativity and growth.</p>
                            </div>
                            <div className="flex items-center">
                                <img src="/assets/images/flexible-work.jpg" alt="Flexible work" className="w-16 h-16 mr-4 rounded-full object-cover" />
                                <p className="text-gray-600">Flexible work schedules to support work-life balance.</p>
                            </div>
                            <div className="flex items-center">
                                <img src="/assets/images/professional-growth.jpg" alt="Professional growth" className="w-16 h-16 mr-4 rounded-full object-cover" />
                                <p className="text-gray-600">Opportunities for professional development and career growth.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-gray-50 py-16 px-6">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Benefits</h2>
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Health & Wellness</h3>
                                <p className="text-gray-600 mt-2">Comprehensive health, dental, and vision plans to keep you healthy.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Retirement Plans</h3>
                                <p className="text-gray-600 mt-2">401(k) matching and financial planning resources.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Paid Time Off</h3>
                                <p className="text-gray-600 mt-2">Generous paid time off, including holidays and sick leave.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Remote Work</h3>
                                <p className="text-gray-600 mt-2">Options for remote work to give you flexibility.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Professional Development</h3>
                                <p className="text-gray-600 mt-2">Access to workshops, courses, and industry events.</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-blue-900">Team Events</h3>
                                <p className="text-gray-600 mt-2">Regular team-building events to connect and have fun.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-900 py-16 text-center text-white">
                    <h2 className="text-3xl font-extrabold mb-4">Ready to join SiteSync?</h2>
                    <p className="text-lg mb-8">We’re looking for talented, driven individuals to be part of our team. Apply today and help us innovate in construction management.</p>
                    <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        View All Open Positions
                    </button>
                </section>


            </div>
            <Footer />
        </>
    );
};

export default Careers;
