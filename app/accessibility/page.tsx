"use client";

import React from "react";

const AccessibilityPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Accessibility</h1>
            <p className="text-lg text-gray-600 mb-12 text-center">
                At SiteSync, we are committed to making our platform accessible to everyone, including people with disabilities.
            </p>

            {/* Accessibility Topics */}
            <div className="space-y-12">
                {/* Accessibility Standards Section */}
                <section id="accessibility-standards">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Accessibility Standards</h2>
                    <p className="text-gray-700 mb-4">
                        We strive to meet WCAG 2.1 Level AA standards to ensure our platform is usable for all individuals, including those with disabilities.
                    </p>
                    <p className="text-gray-700">
                        SiteSync undergoes regular accessibility testing and improvements to meet industry standards and provide a seamless experience for all users.
                    </p>
                </section>

                {/* Keyboard Navigation Section */}
                <section id="keyboard-navigation">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Keyboard Navigation</h2>
                    <p className="text-gray-700 mb-4">
                        Our platform is fully navigable using only a keyboard. Key features such as menus, buttons, and form fields are accessible via the <code className="bg-gray-200 px-1 rounded">Tab</code> key for easy navigation.
                    </p>
                    <p className="text-gray-700">
                        We also support <code className="bg-gray-200 px-1 rounded">Enter</code> and <code className="bg-gray-200 px-1 rounded">Space</code> keys for activating buttons and links.
                    </p>
                </section>

                {/* Screen Reader Compatibility Section */}
                <section id="screen-reader-compatibility">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Screen Reader Compatibility</h2>
                    <p className="text-gray-700 mb-4">
                        SiteSync is designed to work seamlessly with screen readers, providing clear labels, alt text for images, and semantic HTML to improve readability and navigation.
                    </p>
                    <p className="text-gray-700">
                        We recommend using the latest versions of popular screen readers such as NVDA, JAWS, or VoiceOver for the best experience.
                    </p>
                </section>

                {/* Color Contrast Section */}
                <section id="color-contrast">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Color Contrast</h2>
                    <p className="text-gray-700 mb-4">
                        We ensure that our text and UI elements have a high contrast ratio to improve readability for users with visual impairments. SiteSync meets the WCAG 2.1 AA guidelines for color contrast.
                    </p>
                    <p className="text-gray-700">
                        Additionally, we provide accessible color schemes to accommodate users with different visual needs.
                    </p>
                </section>

                {/* Feedback Section */}
                <section id="feedback">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Feedback</h2>
                    <p className="text-gray-700 mb-4">
                        Your feedback is valuable to us. If you encounter any accessibility issues or have suggestions to improve the accessibility of our platform, please let us know.
                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Provide Feedback
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccessibilityPage;
