

import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";

const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Available Foods", path: "/available-foods" },
    { name: "Add Food", path: "/add-food" },
    { name: "Manage My Foods", path: "/manage-my-foods" },
    { name: "My Food Request", path: "/my-food-request" },
    { name: "About", path: "/about" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-5 md:p-10 shadow-inner rounded-t-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Logo and Description */}
                <div>
                    <Link to="/">
                        <div className="flex items-center">
                            <img className="w-12 mb-2.5" src={Logo} alt="Logo" />
                            <h1 className="text-2xl font-extrabold tracking-tight">
                                <span className="text-green-500">Food</span>{" "}
                                <span className="text-orange-500">Sharing</span>
                            </h1>
                        </div>
                    </Link>
                    <p className="text-gray-300 leading-relaxed">
                        A platform connecting donors and receivers to reduce food waste and fight hunger.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
                        Quick Links
                    </h3>
                    <ul className="flex flex-col gap-2">
                        {footerLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `hover:text-green-400 transition-colors ${isActive ? "text-green-400 font-semibold" : "text-gray-300"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
                        Contact Us
                    </h3>
                    <p className="text-gray-300 mb-2">Email: <a href="mailto:support@foodsharing.com" className="hover:text-green-400">support@foodsharing.com</a></p>
                    <p className="text-gray-300">Phone: <a href="tel:+1234567890" className="hover:text-green-400">+1 234 567 890</a></p>
                    <p className="text-gray-400 mt-4 text-sm italic">
                        We're here to help! Reach out anytime.
                    </p>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2">
                        Follow Us
                    </h3>
                    <div className="flex items-center gap-6 text-3xl text-gray-400 hover:text-green-400 transition-colors">
                        <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-600">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
                            <FaTwitter />
                        </a>
                        <a href="https://github.com" aria-label="GitHub" className="hover:text-gray-100">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-700">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm select-none">
                © {new Date().getFullYear()} Food Sharing. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
