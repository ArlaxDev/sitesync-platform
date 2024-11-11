"use client";

import React from "react";

const PrivacyPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                Your privacy is important to us. This Privacy Policy explains how SiteSync collects, uses, shares, and protects your information.
            </p>

            {/* Privacy Policy Sections */}
            <div className="space-y-12">
                {/* Information Collection Section */}
                <section id="information-collection">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                        We collect information that you provide directly to us, such as when you create an account, contact customer support, or fill out a form on our website. This may include your name, email address, and any other details you choose to share.
                    </p>
                    <p className="text-gray-700">
                        We also automatically collect certain technical information, such as your IP address, browser type, and activity on our website, to improve our services.
                    </p>
                </section>

                {/* Information Usage Section */}
                <section id="information-usage">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                    <p className="text-gray-700 mb-4">
                        SiteSync uses the information we collect to provide, maintain, and improve our services, respond to your requests, and communicate with you. We may also use your information to personalize your experience and send you promotional messages, subject to your preferences.
                    </p>
                    <p className="text-gray-700">
                        We do not sell or rent your personal information to third parties.
                    </p>
                </section>

                {/* Information Sharing Section */}
                <section id="information-sharing">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Information Sharing</h2>
                    <p className="text-gray-700 mb-4">
                        We may share your information with trusted third-party service providers who help us operate our business, such as payment processors, hosting services, and email providers. These third parties are required to maintain the confidentiality of your information and use it only for the purposes specified by SiteSync.
                    </p>
                    <p className="text-gray-700">
                        We may also disclose your information if required by law or to protect our rights and the security of our users.
                    </p>
                </section>

                {/* User Rights Section */}
                <section id="user-rights">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                    <p className="text-gray-700 mb-4">
                        You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data, and request a copy of your information in a portable format.
                    </p>
                    <p className="text-gray-700">
                        If you would like to exercise any of these rights, please contact us at privacy@sitesync.com.
                    </p>
                </section>

                {/* Security Section */}
                <section id="security">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Data Security</h2>
                    <p className="text-gray-700 mb-4">
                        We take the security of your information seriously and implement appropriate measures to protect it from unauthorized access, disclosure, alteration, and destruction.
                    </p>
                    <p className="text-gray-700">
                        However, please be aware that no security measures are perfect, and we cannot guarantee the absolute security of your information.
                    </p>
                </section>

                {/* Changes to Privacy Policy Section */}
                <section id="policy-changes">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Changes to this Privacy Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We may update this Privacy Policy from time to time. When we do, we will post the updated policy on this page and update the “Last Updated” date below.
                    </p>
                    <p className="text-gray-700">
                        We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                    </p>
                </section>

                {/* Contact Information Section */}
                <section id="contact-info">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <address className="text-gray-700">
                        SiteSync<br />
                        1234 Compliance Way, Suite 100<br />
                        Atlanta, GA, 30301<br />
                        Email: <a href="mailto:privacy@sitesync.com" className="text-blue-500 hover:underline">privacy@sitesync.com</a>
                    </address>
                </section>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 mt-12 text-center">Last Updated: [Date]</p>
        </div>
    );
};

export default PrivacyPage;
