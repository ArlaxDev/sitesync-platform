"use client";

import React from "react";

const ContactSpecialist: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Questions? Ask Us!
            </h2>
            <p className="text-lg text-gray-700 text-center mb-4">
                Have a question about our product or want to speak to a specialist regarding a compliance issue?
            </p>
            <div className="flex justify-center mt-6">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Contact a Specialist
                </button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
                Our team is here to help you navigate compliance challenges and maximize efficiency.
            </p>
        </section>
    );
};

export default ContactSpecialist;
