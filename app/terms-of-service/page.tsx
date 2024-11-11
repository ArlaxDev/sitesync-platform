"use client";

import React from "react";

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Terms of Service</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Welcome to SiteSync. Please read these Terms of Service carefully before using our website and services.
            </p>

            {/* Terms of Service Sections */}
            <div className="space-y-12">
                {/* Acceptance of Terms Section */}
                <section id="acceptance">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
                    <p className="text-gray-700 mb-4">
                        By accessing or using SiteSync, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
                    </p>
                </section>

                {/* Account Responsibilities Section */}
                <section id="account-responsibilities">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Account Responsibilities</h2>
                    <p className="text-gray-700 mb-4">
                        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                    <p className="text-gray-700">
                        SiteSync is not liable for any losses or damages caused by your failure to safeguard your account credentials.
                    </p>
                </section>

                {/* Permitted Use Section */}
                <section id="permitted-use">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Permitted Use</h2>
                    <p className="text-gray-700 mb-4">
                        You agree to use SiteSync only for lawful purposes and in compliance with these Terms of Service. You are prohibited from using our services to engage in any conduct that restricts or inhibits anyone’s use or enjoyment of the services.
                    </p>
                    <p className="text-gray-700">
                        Unauthorized access, interference, or any misuse of our platform may result in termination of your access and legal action.
                    </p>
                </section>

                {/* Intellectual Property Section */}
                <section id="intellectual-property">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                    <p className="text-gray-700 mb-4">
                        All content, trademarks, and logos displayed on SiteSync are the property of SiteSync or its licensors. You may not use, reproduce, or distribute any of our intellectual property without prior written permission.
                    </p>
                </section>

                {/* Disclaimer of Warranties Section */}
                <section id="disclaimer">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Disclaimer of Warranties</h2>
                    <p className="text-gray-700 mb-4">
                        SiteSync is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the reliability, accuracy, or availability of our services.
                    </p>
                    <p className="text-gray-700">
                        We do not warrant that our services will be uninterrupted, error-free, or free of viruses or other harmful components.
                    </p>
                </section>

                {/* Limitation of Liability Section */}
                <section id="liability">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">
                        To the fullest extent permitted by law, SiteSync and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use our services.
                    </p>
                    <p className="text-gray-700">
                        Our liability is limited to the maximum extent permitted by law, even if we have been advised of the possibility of such damages.
                    </p>
                </section>

                {/* Changes to Terms Section */}
                <section id="terms-changes">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
                    <p className="text-gray-700 mb-4">
                        We reserve the right to update these Terms of Service at any time. We will post the revised terms on this page and update the “Last Updated” date below.
                    </p>
                    <p className="text-gray-700">
                        Your continued use of SiteSync after any changes constitutes your acceptance of the new terms.
                    </p>
                </section>

                {/* Governing Law Section */}
                <section id="governing-law">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Governing Law</h2>
                    <p className="text-gray-700 mb-4">
                        These Terms of Service shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.
                    </p>
                </section>

                {/* Contact Information Section */}
                <section id="contact-info">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <address className="text-gray-700">
                        SiteSync<br />
                        1234 Compliance Way, Suite 100<br />
                        Atlanta, GA, 30301<br />
                        Email: <a href="mailto:support@sitesync.com" className="text-blue-500 hover:underline">support@sitesync.com</a>
                    </address>
                </section>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 mt-12 text-center">Last Updated: [Date]</p>
        </div>
    );
};

export default TermsOfServicePage;
