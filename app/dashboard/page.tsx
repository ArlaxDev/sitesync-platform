"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link"; // Import Link
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/login"); // Redirect to the login page after logout
    }
  };

  useEffect(() => {
    // Redirect unauthenticated users
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, supabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Small Logo at the Top Left */}
      <div className="absolute top-4 left-6">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg"
      >
        Log Out
      </button>
    </div>
  );
};

export default DashboardPage;

