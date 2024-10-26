"use client";

import Link from "next/link";

const ConfirmEmailPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      {/* Logo at the Top Left */}
      <div className="absolute top-4 left-6">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Confirmation Message Section */}
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
        <p className="text-gray-700 mb-8">
          We&apos;ve sent a confirmation email to the address you provided. Please check your inbox
          and follow the instructions to complete your registration.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
