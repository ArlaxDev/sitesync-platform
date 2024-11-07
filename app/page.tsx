"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiX } from "react-icons/fi";
import { FaCheckCircle, FaBolt, FaSearch } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parallaxStyle, setParallaxStyle] = useState({ transform: "translate(0px, 0px)" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkUserSession();
  }, [supabase]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const moveX = (clientX / window.innerWidth) * 20 - 10;
    const moveY = (clientY / window.innerHeight) * 20 - 10;
    setParallaxStyle({ transform: `translate(${moveX}px, ${moveY}px)` });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setUploadStatus(null); // Reset status on new file selection
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setUploadStatus(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;

    // Redirect to the dashboard after "Analyze" button is clicked
    router.push("/dashboard");
  };

  const handleSignUpSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/register?company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="w-full py-4 px-6 bg-white shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Centered navigation links */}
          <nav className="flex-1 flex justify-center space-x-6 text-gray-600">
            <Menu as="div" className="relative">
              <Link href="/products">
                <Menu.Button className="hover:text-blue-600 transition">Products</Menu.Button>
              </Link>
              <Transition as={Fragment}>
                <Menu.Items className="absolute left-0 mt-2 w-60 bg-white shadow-xl rounded-md focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/products/compliance-verification" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-800`}>
                          Compliance Verification
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          </nav>

          {/* Right-aligned login and sign-up buttons */}
          <div className="space-x-6 flex items-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-gray-600 hover:text-blue-600 transition">Log In</button>
                </Link>
                <Link href="/register">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>


      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-white min-h-screen flex items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 opacity-20" width="800" height="600" fill="none" viewBox="0 0 800 600">
              <circle cx="400" cy="300" r="300" fill="#E5E7EB" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center relative z-10">
            <div className="w-full md:w-1/2 md:pr-12">
              <h1 className="text-6xl font-bold text-gray-900">SiteSync</h1>
              <p className="mt-4 text-xl text-gray-600">
                Automatically verify your engineering schematics with AI and ensure compliance with municipal standards.
              </p>
              <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
                onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}>
                Get Started
              </button>
            </div>
            <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center relative" onMouseMove={handleMouseMove}>
              <img src="assets/images/productDemo.png" alt="SiteSync Platform Preview" className="w-full max-w-md rounded-lg shadow-lg shadow-blue-300/50 transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-500/50" style={parallaxStyle} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[25%]">
            <img src="/assets/images/homepageView.png" alt="Decorative Background" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col justify-center items-center px-6 relative">
          <div className="relative z-10 max-w-7xl">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Boost Productivity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaBolt className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">10X Compliance</h3>
                <p className="mt-2 text-gray-700">Bring document verification time from months to minutes.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaSearch className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">Streamline Critical Feedback</h3>
                <p className="mt-2 text-gray-700">Spot potential issues in your schematics in an instant.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaCheckCircle className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">Minimize Rejections</h3>
                <p className="mt-2 text-gray-700">Improve reliability and reduce document rejections by municipal authorities.</p>
              </div>
            </div>
            <div className="text-center mt-16">
              <Link href="/about">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg">Learn More</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Try the Software Section */}
        <section id="upload-section" className="bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col justify-center items-center px-6 relative" style={{ minHeight: '90vh' }}>
          <div className="relative z-10 w-full max-w-lg">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Try SiteSync</h2>
            <p className="text-center mt-4 text-lg text-gray-600">Upload your Revit (.rvt) file for compliance verification.</p>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 relative mt-8">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-4">Upload your Revit file (.rvt)</label>
              <input type="file" id="file-upload" accept=".rvt" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
              <button type="submit" disabled={!file} className={`mt-4 ${file ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"} text-white px-6 py-3 rounded-lg transition w-full text-lg`}>
                Analyze Revit File
              </button>
              {uploadStatus && <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>}
            </form>
          </div>
        </section>

        {/* Conditional Sign-Up or Dashboard Section */}
        <section className="bg-gradient-to-t from-white to-blue-50 min-h-screen flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 opacity-20" width="600" height="600" fill="none" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="300" fill="#E0F2FE" />
            </svg>
          </div>
          <div className="relative z-10 max-w-lg w-full bg-gray-100 p-10 rounded-lg shadow-lg">
            {isAuthenticated ? (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">Welcome Back to SiteSync</h2>
                <p className="mt-4 text-lg text-gray-600 text-center">Access your dashboard and manage your projects.</p>
                <div className="flex justify-center">
                  <Link href="/dashboard">
                    <button className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg">Go to Dashboard</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-gray-800 text-center">Sign Up for SiteSync</h2>
                <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-lg">Sign Up</button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-6 text-center text-white">
          <p className="text-sm">© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Privacy Policy</a>
            <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Terms of Service</a>
            <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
