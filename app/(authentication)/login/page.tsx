"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    const checkUserSession = async () => {
      // Only run this on the client
      if (typeof window !== "undefined") {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
          router.push("/dashboard");
        }
      }
    };
    checkUserSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear previous errors

    // Use Supabase to sign in
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message); // Display error if login fails
    } else {
      // Handle successful login (e.g., redirect to dashboard)
      console.log("Logged in successfully:", data);
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Logo at the Top Left */}
      <div className="absolute top-4 left-6">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Left Section - Log In Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-lg w-full mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Log In</h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/loginView.png')" }}
      ></div>
    </div>
  );
};

export default LoginPage;
