"use client";

import React from "react";

const HelpCenterPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Help Center</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Find answers to common questions and learn how to make the most out of SiteSync.
            </p>

            {/* Help Center Sections */}
            <div className="space-y-12">
                {/* Getting Started Section */}
                <section id="getting-started">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Getting Started</h2>
                    <p className="text-gray-700 mb-4">
                        New to SiteSync? Start with these guides to set up your account and explore the basic features.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">How to Register and Set Up Your Account</li>
                        <li className="mb-2">Navigating the Dashboard</li>
                        <li className="mb-2">Creating Your First Project</li>
                    </ul>
                </section>

                {/* Account Management Section */}
                <section id="account-management">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Account Management</h2>
                    <p className="text-gray-700 mb-4">
                        Learn how to manage your account settings, subscriptions, and preferences.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">Updating Your Profile Information</li>
                        <li className="mb-2">Changing Your Password</li>
                        <li className="mb-2">Managing Notifications</li>
                        <li className="mb-2">Billing and Subscription Options</li>
                    </ul>
                </section>

                {/* Technical Support Section */}
                <section id="technical-support">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Technical Support</h2>
                    <p className="text-gray-700 mb-4">
                        Need assistance with technical issues? Find solutions to common technical problems.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">Clearing Cache and Cookies</li>
                        <li className="mb-2">Updating Your Browser or Mobile App</li>
                        <li className="mb-2">Enabling SiteSync Notifications</li>
                        <li className="mb-2">Supported Browsers and Devices</li>
                    </ul>
                </section>

                {/* Troubleshooting Section */}
                <section id="troubleshooting">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Troubleshooting</h2>
                    <p className="text-gray-700 mb-4">
                        Having trouble? Check out our troubleshooting guides for quick fixes.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li className="mb-2">Troubleshooting Login Issues</li>
                        <li className="mb-2">Resolving Project Syncing Errors</li>
                        <li className="mb-2">Fixing Payment and Billing Problems</li>
                        <li className="mb-2">Contacting Support</li>
                    </ul>
                </section>

                {/* Contact Support Section */}
                <section id="contact-support">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Support</h2>
                    <p className="text-gray-700 mb-4">
                        If you can't find an answer here, reach out to our support team.
                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpCenterPage;
