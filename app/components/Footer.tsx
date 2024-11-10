// app/components/Footer.tsx
"use client";

import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 py-6 text-center text-white mt-16">
            <p className="text-sm">© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
            <div className="mt-2">
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Privacy Policy</a>
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Terms of Service</a>
                <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
