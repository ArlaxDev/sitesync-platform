"use client";

import React from "react";

const CookiePolicyPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Cookie Policy</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                This Cookie Policy explains how SiteSync uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            {/* Cookie Policy Sections */}
            <div className="space-y-12">
                {/* What Are Cookies Section */}
                <section id="what-are-cookies">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
                    <p className="text-gray-700 mb-4">
                        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and provide reporting information.
                    </p>
                </section>

                {/* Types of Cookies Section */}
                <section id="types-of-cookies">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                            <strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.
                        </li>
                        <li>
                            <strong>Performance and Analytics Cookies:</strong> These cookies collect information about how you use our website, such as which pages you visit most often, to help us improve the user experience.
                        </li>
                        <li>
                            <strong>Functional Cookies:</strong> These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                        </li>
                        <li>
                            <strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements relevant to you and your interests. They also help us measure the effectiveness of advertising campaigns.
                        </li>
                    </ul>
                </section>

                {/* Why We Use Cookies Section */}
                <section id="why-we-use-cookies">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why We Use Cookies</h2>
                    <p className="text-gray-700 mb-4">
                        SiteSync uses cookies to enhance user experience, analyze website traffic, and personalize content. Cookies help us understand how our website is being used, which enables us to improve its functionality.
                    </p>
                </section>

                {/* How to Control Cookies Section */}
                <section id="control-cookies">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">How You Can Control Cookies</h2>
                    <p className="text-gray-700 mb-4">
                        You can set your browser to refuse all or some cookies or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                    </p>
                    <p className="text-gray-700">
                        You can also manage your cookie preferences by clicking the "Cookie Settings" link at the bottom of the page.
                    </p>
                </section>

                {/* Third-Party Cookies Section */}
                <section id="third-party-cookies">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
                    <p className="text-gray-700 mb-4">
                        In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and improve the functionality of the site.
                    </p>
                    <p className="text-gray-700">
                        Third-party cookies are subject to the privacy policies of these external services.
                    </p>
                </section>

                {/* Updates to Cookie Policy Section */}
                <section id="updates">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Updates to This Cookie Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy periodically to stay informed about our use of cookies and related technologies.
                    </p>
                </section>

                {/* Contact Us Section */}
                <section id="contact-info">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default CookiePolicyPage;
