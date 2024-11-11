"use client";

import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Press: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <Header/>

            {/* Recent News Section */}
            <section className="container mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">In the News</h2>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {/* News Articles */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-900">SiteSync revolutionizes construction management</h3>
                        <p className="text-gray-600 mt-4">
                            A feature in Construction Today highlights how SiteSync's tools are helping teams streamline compliance and efficiency on the job site.
                        </p>
                        <a
                            href="#"
                            target="_blank"
                            className="text-blue-600 hover:underline mt-4 block"
                        >
                            Read More
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-900">CEO Interview with Tech Innovators</h3>
                        <p className="text-gray-600 mt-4">
                            SiteSync’s CEO discusses the future of construction technology and shares insights on the company’s journey.
                        </p>
                        <a
                            href="#"
                            target="_blank"
                            className="text-blue-600 hover:underline mt-4 block"
                        >
                            Read More
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-blue-900">Forbes recognizes SiteSync as a top startup</h3>
                        <p className="text-gray-600 mt-4">
                            Forbes includes SiteSync in its list of top construction startups to watch in 2024.
                        </p>
                        <a
                            href="#"
                            target="_blank"
                            className="text-blue-600 hover:underline mt-4 block"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </section>

            {/* Press Releases Section */}
            <section className="bg-white py-16 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Press Releases</h2>
                    <div className="space-y-8">
                        {/* Press Release Items */}
                        <div className="p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-900">SiteSync Launches New AI-Powered Compliance Tool</h3>
                            <p className="text-gray-600 mt-2">January 10, 2024</p>
                            <p className="text-gray-600 mt-4">
                                SiteSync announces the release of a groundbreaking AI-powered tool that enhances on-site compliance and streamlines project management.
                            </p>
                            <a
                                href="#"
                                target="_blank"
                                className="text-blue-600 hover:underline mt-4 block"
                            >
                                Read Full Release
                            </a>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-900">Series B Funding Round Raises $50M for Expansion</h3>
                            <p className="text-gray-600 mt-2">October 22, 2023</p>
                            <p className="text-gray-600 mt-4">
                                SiteSync has successfully raised $50 million in a Series B funding round to fuel product development and expand into new markets.
                            </p>
                            <a
                                href="#"
                                target="_blank"
                                className="text-blue-600 hover:underline mt-4 block"
                            >
                                Read Full Release
                            </a>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-blue-900">Partnership with XYZ Construction</h3>
                            <p className="text-gray-600 mt-2">August 5, 2023</p>
                            <p className="text-gray-600 mt-4">
                                SiteSync partners with XYZ Construction to bring advanced compliance tools to large-scale projects.
                            </p>
                            <a
                                href="#"
                                target="_blank"
                                className="text-blue-600 hover:underline mt-4 block"
                            >
                                Read Full Release
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Kit Section */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Media Kit</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Access high-resolution logos, executive bios, and product screenshots for media purposes.
                    </p>
                    <a
                        href="/media-kit.zip"
                        download
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Download Media Kit
                    </a>
                </div>
            </section>

            {/* Contact for Press Section */}
            <section className="bg-blue-900 py-16 text-white text-center">
                <h2 className="text-3xl font-extrabold mb-4">Contact Our PR Team</h2>
                <p className="text-lg mb-8 max-w-xl mx-auto">
                    For media inquiries, interviews, and further information, reach out to our press team at <a href="mailto:press@sitesync.com" className="underline">press@sitesync.com</a>.
                </p>
                <a
                    href="mailto:press@sitesync.com"
                    className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Contact Us
                </a>
            </section>

            <Footer/>
        </div>
    );
};

export default Press;
