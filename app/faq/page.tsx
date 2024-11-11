"use client";

import React from "react";

const FAQsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Here are some of the most common questions about using SiteSync. If you have further inquiries, please reach out to our support team.
            </p>

            {/* FAQ Categories */}
            <div className="space-y-12">
                {/* General Questions */}
                <section id="general-questions">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">General Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">What is SiteSync?</h3>
                            <p className="text-gray-700">
                                SiteSync is a platform designed to streamline construction compliance and project management, helping teams work more efficiently and meet regulatory standards.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How can I sign up for SiteSync?</h3>
                            <p className="text-gray-700">
                                You can sign up by clicking on the "Register" button on our homepage and following the registration process.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Account Management */}
                <section id="account-management">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Account Management</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How do I reset my password?</h3>
                            <p className="text-gray-700">
                                Go to the account settings page, click on "Reset Password," and follow the instructions sent to your email.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How do I update my profile information?</h3>
                            <p className="text-gray-700">
                                You can update your profile information by going to the account settings page and editing your details.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Can I delete my account?</h3>
                            <p className="text-gray-700">
                                Yes, you can request account deletion from the account settings page, or contact support for assistance.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Billing and Payments */}
                <section id="billing">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Billing and Payments</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">What payment methods are accepted?</h3>
                            <p className="text-gray-700">
                                We accept credit/debit cards, PayPal, and wire transfers for larger transactions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Can I change my subscription plan?</h3>
                            <p className="text-gray-700">
                                Yes, you can change your plan by going to the subscription settings in your account.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Do you offer refunds?</h3>
                            <p className="text-gray-700">
                                Refunds are available within 14 days of the initial purchase if you're unsatisfied with our service.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technical Support */}
                <section id="technical-support">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Technical Support</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">How do I contact support?</h3>
                            <p className="text-gray-700">
                                You can contact support through the "Contact Us" page or by emailing support@sitesync.com.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Is there a knowledge base for troubleshooting?</h3>
                            <p className="text-gray-700">
                                Yes, we have a comprehensive knowledge base in our Help Center where you can find troubleshooting guides.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">What should I do if I encounter a bug?</h3>
                            <p className="text-gray-700">
                                If you encounter a bug, please report it through our support page or email support@sitesync.com with details.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FAQsPage;
