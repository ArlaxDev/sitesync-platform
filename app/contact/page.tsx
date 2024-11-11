"use client";

import React, { useState } from "react";

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic (e.g., sending data to an API)
        console.log("Form submitted:", formData);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-blue-900 py-16 text-white text-center">
                <h1 className="text-4xl font-extrabold">Contact Us</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Get in touch with SiteSync for inquiries, support, and more.
                </p>
            </header>

            {/* Contact Information Section */}
            <section className="container mx-auto py-16 px-6 grid gap-10 lg:grid-cols-3">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-blue-900">General Inquiries</h2>
                    <p className="text-gray-600 mt-4">Email: info@sitesync.com</p>
                    <p className="text-gray-600">Phone: +1 (123) 456-7890</p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-blue-900">Support</h2>
                    <p className="text-gray-600 mt-4">Email: support@sitesync.com</p>
                    <p className="text-gray-600">Phone: +1 (123) 456-7891</p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-blue-900">Media & PR</h2>
                    <p className="text-gray-600 mt-4">Email: press@sitesync.com</p>
                    <p className="text-gray-600">Phone: +1 (123) 456-7892</p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="container mx-auto py-16 px-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="mt-2 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </section>

            {/* Location Map Section */}
            <section className="container mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Office Location</h2>
                <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        title="SiteSync Office Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.308109487196!2d-122.41941518468105!3d37.77492927975956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3e8b63c7%3A0x4b0a8afc1f120f14!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1634873011256!5m2!1sen!2sus"
                        style={{ border: 0 }}
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
