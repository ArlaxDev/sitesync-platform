// app/components/RecentBlogs.tsx
"use client";

import React from "react";
import Link from "next/link";

const recentBlogs = [
    {
        id: 1,
        title: "How SiteSync Enhances Workplace Safety",
        description: "Learn how our platform automates compliance to reduce workplace risks.",
        imageUrl: "/assets/images/workplace_safety.jpeg",
        link: "/blog/safety-enhancements"
    },
    {
        id: 2,
        title: "Cost Savings Through Automated Compliance",
        description: "Discover the cost benefits of switching to automated compliance checks.",
        imageUrl: "/assets/images/article_cost_savings_1.jpg",
        link: "/blog/cost-savings"
    },
    {
        id: 3,
        title: "Top 5 Compliance Issues in Modern Workspaces",
        description: "An overview of common compliance challenges and how to tackle them.",
        imageUrl: "/assets/images/construction_comp_1.webp", // Replace with actual path
        link: "/blog/compliance-issues"
    },
];

const RecentBlogs: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Recent Blogs & Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentBlogs.map((blog) => (
                    <div key={blog.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <img src={blog.imageUrl} alt={blog.title} className="rounded-lg mb-4 w-full h-32 object-cover" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                        <p className="text-gray-700 mb-4">{blog.description}</p>
                        <Link
                            href={blog.link}
                            className="text-blue-600 hover:underline">
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentBlogs;
