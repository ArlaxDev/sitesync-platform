"use client";

import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 py-12 text-white mt-16">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Logo and Description */}
                    <div className="mb-8 md:mb-0 md:w-1/4">
                        <h2 className="text-3xl font-extrabold">SiteSync</h2>
                        <p className="mt-4 text-gray-400 text-sm max-w-xs leading-relaxed">
                            Streamlining construction compliance and project management for efficient workflows.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
                        {/* Company */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-gray-200">Company</h4>
                            <ul>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        About Us
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Careers
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Press
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-gray-200">Resources</h4>
                            <ul>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Blog
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Documentation
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        FAQs
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Tutorials
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-gray-200">Support</h4>
                            <ul>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Help Center
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Community
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Accessibility
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-gray-200">Legal</h4>
                            <ul>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Terms of Service
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-400 hover:text-white transition">
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className="my-8 border-gray-700" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Media Icons */}
                        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.437 9.878V14.89h-2.54v-2.89h2.54v-2.207c0-2.516 1.492-3.89 3.777-3.89 1.093 0 2.238.196 2.238.196v2.457h-1.26c-1.241 0-1.628.77-1.628 1.558v1.886h2.773l-.443 2.89h-2.33v7.008C18.343 21.127 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.867 9.867 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.965 13.965 0 011.67 3.15a4.903 4.903 0 001.523 6.574A4.902 4.902 0 01.96 9.326v.062a4.923 4.923 0 003.946 4.827 4.897 4.897 0 01-2.212.084 4.924 4.924 0 004.6 3.417 9.867 9.867 0 01-6.102 2.105c-.395 0-.785-.023-1.17-.067a13.945 13.945 0 007.548 2.212c9.057 0 14.01-7.513 14.01-14.01 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.25c.586-.927 1.582-1.75 2.75-1.75 2.14 0 4 1.86 4 4v5.5z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">Instagram</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.357 3.608 1.332.975.975 1.27 2.242 1.332 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.357 2.633-1.332 3.608-.975.975-2.242 1.27-3.608 1.332-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.357-3.608-1.332-.975-.975-1.27-2.242-1.332-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.357-2.633 1.332-3.608.975-.975 2.242-1.27 3.608-1.332 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.257 0-3.667.012-4.947.07-1.514.066-2.87.355-3.894 1.379s-1.313 2.38-1.379 3.894c-.058 1.28-.07 1.69-.07 4.947s.012 3.667.07 4.947c.066 1.514.355 2.87 1.379 3.894s2.38 1.313 3.894 1.379c1.28.058 1.69.07 4.947.07s3.667-.012 4.947-.07c1.514-.066 2.87-.355 3.894-1.379s1.313-2.38 1.379-3.894c.058-1.28.07-1.69.07-4.947s-.012-3.667-.07-4.947c-.066-1.514-.355-2.87-1.379-3.894s-2.38-1.313-3.894-1.379c-1.28-.058-1.69-.07-4.947-.07zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.297 0-4.162-1.865-4.162-4.162s1.865-4.162 4.162-4.162 4.162 1.865 4.162 4.162-1.865 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.445.649-1.445 1.445s.649 1.445 1.445 1.445 1.445-.649 1.445-1.445-.649-1.445-1.445-1.445z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
