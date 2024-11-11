"use client";

import React from "react";

const TutorialsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Tutorials</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Explore our tutorials to get the most out of SiteSync. Whether you're just starting or looking to master advanced features, we've got you covered.
            </p>

            {/* Tutorials Sections */}
            <div className="space-y-12">
                {/* Getting Started Section */}
                <section id="getting-started">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Getting Started</h2>
                    <p className="text-gray-700 mb-4">
                        New to SiteSync? Start with these beginner tutorials to set up your account and understand the basics.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">How to Create Your First Project</li>
                        <li className="mb-2">Adding and Managing Team Members</li>
                        <li className="mb-2">Understanding Project Compliance</li>
                    </ul>
                </section>

                {/* Advanced Features Section */}
                <section id="advanced-features">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Advanced Features</h2>
                    <p className="text-gray-700 mb-4">
                        Dive deeper into SiteSync’s capabilities and learn how to maximize your project efficiency.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">Automating Compliance Reports</li>
                        <li className="mb-2">Setting Up Custom Notifications</li>
                        <li className="mb-2">Using Analytics and Insights for Decision Making</li>
                    </ul>
                </section>

                {/* Integrations Section */}
                <section id="integrations">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Integrations</h2>
                    <p className="text-gray-700 mb-4">
                        Learn how to connect SiteSync with other tools you use to create a seamless workflow.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">Integrating SiteSync with Slack</li>
                        <li className="mb-2">Syncing Data with Google Sheets</li>
                        <li className="mb-2">Connecting SiteSync to Project Management Tools</li>
                    </ul>
                </section>

                {/* Video Tutorials Section */}
                <section id="video-tutorials">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Video Tutorials</h2>
                    <p className="text-gray-700 mb-4">
                        Prefer watching over reading? Check out our video tutorials for a more visual learning experience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Introduction to SiteSync</h3>
                            <p className="text-gray-600 mt-2">A quick overview of SiteSync's main features and benefits.</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Creating and Managing Projects</h3>
                            <p className="text-gray-600 mt-2">Learn how to set up and manage projects effectively.</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">Using Compliance Tools</h3>
                            <p className="text-gray-600 mt-2">Step-by-step guide to using compliance tools within SiteSync.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TutorialsPage;
