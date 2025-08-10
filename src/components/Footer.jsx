// import React from 'react';
// import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
// import Logo from "../assets/Logo.png";
// import { Link } from 'react-router';

// const Footer = () => {
//     return (
//         <footer className="bg-gray-900 text-base-content  p-6 shadow-inner text-white">
//             <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

//                 {/* App Info */}
//                 <div>
//                     {/* Logo */}
//                     <Link to="/">
//                         <div className="flex items-center">
//                             <img className="w-12 mb-2.5" src={Logo} alt="Logo" />
//                             <h1 className="text-xl font-bold">
//                                 <span className="text-green-600">Food</span>{" "}
//                                 <span className="text-orange-600">Sharing</span>
//                             </h1>
//                         </div>
//                     </Link>
//                     <p>Your one-stop shop for all modern web and mobile apps.</p>
//                 </div>

//                 {/* Useful Links */}
//                 <div className='mt-8'>
//                     <h3 className="text-lg font-semibold mb-2">Links</h3>
//                     <ul className="space-y-1">
//                         <li>
//                             <a href="https://appstore.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                                 Terms of Service
//                             </a>
//                         </li>
//                         <li>
//                             <a href="https://appstore.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                                 Privacy Policy
//                             </a>
//                         </li>
//                         <li>
//                             <a href="https://stackoverflow.com/questions/56939805/how-to-change-developer-website-in-app-store" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                                 Developer Resources
//                             </a>
//                         </li>
//                     </ul>
//                 </div>


//                 {/* Contact Info (Optional) */}
//                 <div className='mt-8'>
//                     <h3 className="text-lg font-semibold mb-2">Contact</h3>
//                     <p>Email: support@appstore.com</p>
//                     <p>Phone: +123-456-7890</p>
//                 </div>

//                 {/* Social Media */}
//                 <div className='mt-8'>
//                     <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
//                     <div className="flex gap-4 text-2xl">
//                         <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
//                         <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
//                         <a href="https://github.com" aria-label="GitHub"><FaGithub /></a>
//                         <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center mt-6 text-sm opacity-70">
//                 © {new Date().getFullYear()} App Store. All rights reserved.
//             </div>
//         </footer>
//     );
// };

// export default Footer;

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
        <footer className="bg-gray-900 text-white p-5 md:p-10 shadow-inner">
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
