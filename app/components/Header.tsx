// app/components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header: React.FC = () => {
    return (
        <header className="w-full py-4 px-6 bg-white shadow-md fixed top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">
                    <Link href="/">
                        <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
                    </Link>
                </div>
                <nav className="flex space-x-6 text-gray-600 ml-auto">
                    <Menu as="div" className="relative">
                        <Link href="/products">
                            <Menu.Button className="hover:text-blue-600 transition">Products</Menu.Button>
                        </Link>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-60 bg-white shadow-xl rounded-md focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="/products/compliance-verification"
                                                className={`${active ? "bg-gray-100" : ""
                                                    } block px-4 py-2 text-sm text-gray-800`}
                                            >
                                                Compliance Verification
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
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
    );
};

export default Header;
