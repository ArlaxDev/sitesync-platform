"use client";

import React from "react";
import TeamMember from "./TeamMember";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="w-full py-4 px-6 bg-white shadow-md fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="flex space-x-6 text-gray-600 ml-auto">
            <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About ⠀⠀</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 transition">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 px-6">
        {/* Mission Section */}
        <section className="relative max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h1>
          <p className="text-lg text-gray-700 mb-6">
          At SiteSync, we’re transforming construction project management with automated, high-speed compliance checks for engineering plans. Our platform delivers unparalleled accuracy and efficiency, empowering projects to stay on time, within budget, and built to the highest standards.
          </p>
          <div className="relative w-full h-64 overflow-hidden rounded-md shadow-lg">
            <img 
              src="/assets/images/atlanta_infrastructure.png" 
              alt="Mission Graphic" 
              className="absolute inset-0 w-full h-full object-cover opacity-75" 
            />
            <div className="absolute inset-0 bg-gray-5 opacity-50"></div>
          </div>
        </section>

        {/* Successes Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Successes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prototype Development</h3>
              <p className="text-gray-600">
                Launched a prototype enabling real-time compliance checks for engineering drawings.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Discovery</h3>
              <p className="text-gray-600">
                Conducted 50+ interviews to validate our solution and refine its functionality.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pilot Testing</h3>
              <p className="text-gray-600">
                Our pilot program with leading firms confirmed the impact of reducing compliance review times.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cost Savings</h3>
              <p className="text-gray-600">
                Automating compliance saves users significant time and resources, keeping projects on track.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet the Team</h2>
          <div className="space-y-6">
            <TeamMember
              name="Anthony Hong"
              role="Machine Learning Engineer"
              description="Anthony brings a wealth of experience in software architecture and plays a crucial role in ensuring our platform's stability and scalability."
              imageUrl="/assets/images/anthony.jpg" // Placeholder image URL
            />
            <TeamMember
              name="Adolfo Moreno"
              role="Computer Vision Engineer"
              description="Adolfo leads our design team, crafting an intuitive and effective interface for our users."
              imageUrl="/assets/images/adolfo.jpg" // Placeholder image URL
            />
            <TeamMember
              name="Kevin Lin"
              role="Full-Stack Software Engineer"
              description="Kevin plays a central role in developing and maintaining the SiteSync platform, ensuring seamless user experiences across the board."
              imageUrl="/assets/images/team_profile_pictures/kevin_lin_pfp.png"
            />
            <TeamMember
              name="Benjamin Gunasekera"
              role="Data Scientist"
              description="Benjamin provides data insights that guide our product development and enhance user experience."
              imageUrl="/assets/images/benjamin.jpg" // Placeholder image URL
            />
            <TeamMember
              name="Christopher Semali"
              role="Chief Finance Officer, Electrical & Hardware Engineer"
              description="Christopher's expertise in regulatory compliance ensures that SiteSync meets all necessary standards, making it a reliable choice for any project."
              imageUrl="/assets/images/christopher.jpg" // Placeholder image URL
            />
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Timeline of Growth</h2>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-600 h-2 w-2 rounded-full mr-4"></div>
              <p className="text-lg font-semibold text-gray-800">Q1 2024 - Idea Inception</p>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-600 h-2 w-2 rounded-full mr-4"></div>
              <p className="text-lg font-semibold text-gray-800">Q2 2024 - Customer Discovery & Prototyping</p>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-600 h-2 w-2 rounded-full mr-4"></div>
              <p className="text-lg font-semibold text-gray-800">Q3 2024 - Pilot Testing with Key Clients</p>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-600 h-2 w-2 rounded-full mr-4"></div>
              <p className="text-lg font-semibold text-gray-800">Q4 2024 - Market Expansion & Product Launch</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 text-center text-white mt-16">
        <p className="text-sm">© {new Date().getFullYear()} SiteSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
