"use client";

import { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/supabaseClient";
import { validateFormData, isFormValid, ValidationErrors } from "@/utils/validation/account";
import { checkPasswordStrength, PasswordStrength } from "@/utils/validation/password";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image"; // Importing the Next.js Image component

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "Engineer",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is logged in and redirect if they are
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUserSession();
  }, [router]);

  // Populate `company` and `email` from query params if available
  useEffect(() => {
    const companyParam = searchParams.get("company");
    const emailParam = searchParams.get("email");

    setFormData((prevData) => ({
      ...prevData,
      company: companyParam || prevData.company,
      email: emailParam || prevData.email,
    }));
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateFormData(formData);
    setFormErrors(errors);

    if (isFormValid(errors)) {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/confirm-email");
      } else {
        setFormErrors({ api: result.error });
      }

      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full">
      <h1 className="text-5xl font-bold text-gray-900 mb-8">Sign Up</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Contact Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            I&apos;m a(n) ...
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Engineer">Engineer</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Architect">Architect</option>
            <option value="Consultant">Consultant</option>
            <option value="Contractor">Contractor</option>
            <option value="Planner">Planner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
          <div className="mt-2">
            <ul className="text-sm">
              <li className={`${passwordStrength.length ? "text-green-600" : "text-red-500"}`}>
                Minimum 8 characters
              </li>
              <li className={`${passwordStrength.uppercase ? "text-green-600" : "text-red-500"}`}>
                At least one uppercase letter
              </li>
              <li className={`${passwordStrength.lowercase ? "text-green-600" : "text-red-500"}`}>
                At least one lowercase letter
              </li>
              <li className={`${passwordStrength.number ? "text-green-600" : "text-red-500"}`}>
                At least one number
              </li>
              <li className={`${passwordStrength.specialChar ? "text-green-600" : "text-red-500"}`}>
                At least one special character (e.g., !@#$%^&*())
              </li>
            </ul>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Logo at the Top Left */}
      <div className="absolute top-4 left-6">
        <Link href="/">
          <Image src="/assets/images/logo.png" alt="SiteSync Logo" width={40} height={40} className="h-10 w-auto" />
        </Link>
      </div>

      {/* Left Section - Register Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <Image
          src="/assets/images/registerView.png"
          alt="Register Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="bg-cover bg-center"
        />
      </div>
    </div>
  );
}
