"use client";

import React, { useState } from "react";

const BlogPage: React.FC = () => {
    // Sample data for blog posts
    const blogPosts = [
        {
            id: 1,
            title: "The Future of Construction Compliance",
            excerpt: "Explore how technology is reshaping compliance processes in the construction industry.",
            date: "November 10, 2024",
            author: "John Doe",
            image: "/images/blog1.jpg",
        },
        {
            id: 2,
            title: "5 Tips to Improve Project Management Efficiency",
            excerpt: "Enhance your project management with these key strategies.",
            date: "October 20, 2024",
            author: "Jane Smith",
            image: "/images/blog2.jpg",
        },
        {
            id: 3,
            title: "Understanding the Importance of Safety Compliance",
            excerpt: "A deep dive into why safety compliance is essential for every construction project.",
            date: "September 15, 2024",
            author: "Michael Lee",
            image: "/images/blog3.jpg",
        },
        // Add more blog posts as needed
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    // Pagination logic
    const currentPosts = blogPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-blue-900 py-16 text-white text-center">
                <h1 className="text-4xl font-extrabold">SiteSync Blog</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Stay updated with the latest trends, tips, and insights in construction compliance and project management.
                </p>
            </header>

            {/* Blog Posts Section */}
            <section className="container mx-auto py-16 px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{post.date} by {post.author}</p>
                            <p className="text-gray-700 mb-4">{post.excerpt}</p>
                            <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                                Read More →
                            </a>
                        </div>
                    </div>
                ))}
            </section>

            {/* Pagination Section */}
            <div className="flex justify-center items-center py-10">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mr-2 rounded-lg font-semibold ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700 transition"}`}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 ml-2 rounded-lg font-semibold ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700 transition"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPage;
