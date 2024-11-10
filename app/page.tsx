"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiX } from "react-icons/fi";
import { FaCheckCircle, FaBolt, FaSearch } from "react-icons/fa";
import RecentBlogs from "./components/RecentBlogs";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [parallaxStyle, setParallaxStyle] = useState({ transform: "translate(0px, 0px)" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      setFilePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (file) {
      console.log("File uploaded: ", file);
    }
  };

  const handleSignUpSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/register?company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}`);
  };

  const handleFeedbackSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/feedback?company=${encodeURIComponent(company)}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-white min-h-screen flex items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 opacity-20"
              width="800"
              height="600"
              fill="none"
              viewBox="0 0 800 600"
            >
              <circle cx="400" cy="300" r="300" fill="#E5E7EB" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center relative z-10">
            <div className="w-full md:w-1/2 md:pr-12">
              <h1 className="text-6xl font-bold text-gray-900">SiteSync</h1>
              <p className="mt-4 text-xl text-gray-600">
                Automate your compliance process for engineering plans with unmatched speed, reliability, and precision. No more guesswork—just results.
              </p>
              <button
                className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
                onClick={() =>
                  document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get Started
              </button>
            </div>
            <div
              className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center relative"
              onMouseMove={handleMouseMove}
            >
              <img
                src="assets/images/landing_page/productDemo.png"
                alt="SiteSync Platform Preview"
                className="w-full max-w-md rounded-lg shadow-lg shadow-blue-300/50 transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-500/50"
                style={parallaxStyle}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[25%]">
            <img
              src="/assets/images/landing_page/homepageView.png"
              alt="Decorative Background"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 opacity-20"
              width="800"
              height="600"
              fill="none"
              viewBox="0 0 800 600"
            >
              <circle cx="400" cy="300" r="300" fill="#BFDBFE" />
            </svg>
          </div>
          <div className="relative z-10 max-w-7xl">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Revolutionize Your Compliance Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaBolt className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">10X Compliance</h3>
                <p className="mt-2 text-gray-700">
                  Accelerate document verification from months to mere minutes, ensuring swift, seamless compliance without the wait.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaSearch className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">Streamline Critical Feedback</h3>
                <p className="mt-2 text-gray-700">
                  nstantly identify potential issues in your schematics, empowering faster decisions and smoother project execution.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 min-h-[350px] text-center flex flex-col justify-between">
                <FaCheckCircle className="text-blue-600 text-5xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4 text-gray-900">Minimize Rejections</h3>
                <p className="mt-2 text-gray-700">
                  Enhance document reliability and significantly reduce rejection rates from municipal authorities, keeping your projects on track and on time.
                </p>
              </div>
            </div>
            <div className="text-center mt-16">
              <Link href="/about">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Try the Software Section */}
        <section
          id="upload-section"
          className="bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col justify-center items-center px-6 relative"
          style={{ minHeight: '90vh' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4 opacity-20"
              width="600"
              height="400"
              fill="none"
              viewBox="0 0 600 400"
            >
              <rect width="600" height="400" fill="#E5E7EB" />
            </svg>
          </div>
          <div className="relative z-10 w-full max-w-lg">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Experience SiteSync in Action</h2>
            <p className="text-center mt-4 text-lg text-gray-600">
              Effortlessly scan your engineering documents and receive real-time compliance feedback.
            </p>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 relative mt-8">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-4">
                Drag and drop your PDF file here or click to select.
              </label>
              <input
                type="file"
                id="file-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {filePreview && (
                <div className="mt-4 relative">
                  <embed src={filePreview} type="application/pdf" width="100%" height="250px" />
                  <button
                    type="button"
                    onClick={handleDeleteFile}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-600 hover:text-red-800 shadow-md"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              )}
              <button
                type="submit"
                disabled={!file}
                className={`mt-4 ${file ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                  } text-white px-6 py-3 rounded-lg transition w-full text-lg`}
              >
                Get Insights
              </button>
            </form>
          </div>
        </section>

        {/* Sign-Up for Demo */}
        {/* I think this can be on its own page */}
        <section className="bg-gradient-to-t from-white to-blue-50 min-h-screen flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 opacity-20"
              width="600"
              height="600"
              fill="none"
              viewBox="0 0 1000 1000"
            >
              <circle cx="300" cy="300" r="300" fill="#E0F2FE" />
            </svg>
          </div>
          <div className="relative z-10 max-w-lg w-full bg-gray-100 p-10 rounded-lg shadow-lg">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 text-center">Sign up for a Demo</h2>
              <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-br from-white to-blue-50 py-32 flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 opacity-20"
              width="800"
              height="600"
              fill="none"
              viewBox="0 0 800 600"
            >
              <circle cx="400" cy="300" r="300" fill="#BFDBFE" />
            </svg>
          </div>
          <div className="relative z-10 max-w-7xl">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Transformations Powered by SiteSync</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Row of Testimonials */}
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "SiteSync has completely transformed how we approach compliance checks. The process is so much faster and more accurate now."
                </p>
                <p className="font-semibold text-gray-800">Rea Lauren</p>
                <p className="text-gray-500">Civil Engineer, Georgia Tech Research Institute</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "The intuitive interface and fast processing have made our workflow so much smoother. Simple yet revolutionary!"
                </p>
                <p className="font-semibold text-gray-800">Amy Turner</p>
                <p className="text-gray-500">Project Financial Analyst, JEDunn</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "Game-changer. It’s fast, reliable, and a great investment in any firm's tools! It has made our industry significantly more efficient by reducing compliance check times!"
                </p>
                <p className="font-semibold text-gray-800">Grace Wang</p>
                <p className="text-gray-500">Project Engineer, Turner</p>
              </div>
            </div>
            {/* Second Row of Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "The compliance checks were never this easy before SiteSync. It’s a must-have for any engineering team."
                </p>
                <p className="font-semibold text-gray-800">Dmitry Iglesias</p>
                <p className="text-gray-500">Construction Builder, Norcross Construction Co.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "We've reduced our compliance review time by 80% using SiteSync. This helped us save a year on a project!"
                </p>
                <p className="font-semibold text-gray-800">Andras Luiza</p>
                <p className="text-gray-500">Project Manager, Constellation Energy</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  "SiteSync has saved us so much time. We see a quantifable reduction in resource loss."
                </p>
                <p className="font-semibold text-gray-800">Angela Smith</p>
                <p className="text-gray-500">Chief Financial Officer, Duluth & Country Construction Co.</p>
              </div>
            </div>
          </div>
        </section>
        
        <RecentBlogs />

        {/* Feedback Form */}
        <section className="bg-gradient-to-t from-white to-blue-100 min-h-screen flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 opacity-20"
              width="600"
              height="500"
              fill="none"
              viewBox="0 0 600 450"
            >
              <circle cx="300" cy="300" r="300" fill="#E0F2FE" />
            </svg>
          </div>
          <div className="relative z-10 max-w-lg w-full bg-gray-100 p-10 rounded-lg shadow-lg">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 text-center">Feedback?</h2>
              <form onSubmit={handleFeedbackSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div> */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="feedbacksubject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="feedbacksubject"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="feedbackbody" className="block text-sm font-medium text-gray-700">
                    Body
                  </label>
                  <textarea
                    id="feedbackbody"
                    value={feedbackBody}
                    onChange={(e) => setFeedbackBody(e.target.value)}
                    className="mt-0.5 block w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y"
                    rows={6} // Increase rows for more height
                    placeholder="Enter your feedback here"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
