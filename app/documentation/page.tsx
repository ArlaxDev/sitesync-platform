"use client";

import React from "react";

const DocumentationPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Documentation</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Find detailed guides and references to help you get started with SiteSync and use its features effectively.
            </p>

            {/* Documentation Sections */}
            <div className="space-y-12">
                {/* Getting Started Section */}
                <section id="getting-started">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Getting Started</h2>
                    <p className="text-gray-700 mb-4">
                        Learn how to set up your SiteSync account and start managing your construction compliance and project workflow.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Creating an account</li>
                        <li>Setting up your first project</li>
                        <li>Inviting team members</li>
                    </ul>
                </section>

                {/* API Reference Section */}
                <section id="api-reference">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">API Reference</h2>
                    <p className="text-gray-700 mb-4">
                        Use our REST API to integrate SiteSync's features into your own applications.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-mono text-gray-600">
                            <strong>GET</strong> /api/v1/projects - Retrieve a list of projects
                        </p>
                        <p className="font-mono text-gray-600 mt-2">
                            <strong>POST</strong> /api/v1/projects - Create a new project
                        </p>
                        <p className="font-mono text-gray-600 mt-2">
                            <strong>PUT</strong> /api/v1/projects/{'{projectId}'} - Update a specific project
                        </p>
                    </div>
                </section>

                {/* Tutorials Section */}
                <section id="tutorials">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Tutorials</h2>
                    <p className="text-gray-700 mb-4">
                        Follow step-by-step guides to get the most out of SiteSync's advanced features.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>How to set up automated compliance reports</li>
                        <li>Managing team access and permissions</li>
                        <li>Integrating SiteSync with third-party tools</li>
                    </ul>
                </section>

                {/* FAQ Section */}
                <section id="faq">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">FAQ</h2>
                    <p className="text-gray-700 mb-4">
                        Common questions about SiteSync's features and how to use them.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How do I reset my password?</h3>
                            <p className="text-gray-700">Go to the account settings page and click on "Reset Password."</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How do I contact support?</h3>
                            <p className="text-gray-700">You can reach out to our support team via the Contact Us page.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Is SiteSync available on mobile?</h3>
                            <p className="text-gray-700">Yes, SiteSync is accessible on mobile devices through your browser.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DocumentationPage;
