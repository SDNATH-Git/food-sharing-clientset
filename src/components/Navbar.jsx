
import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            setIsMenuOpen(false);
            setIsDropdownOpen(false);
        } catch (error) {
            toast.error("Logout failed!");
        }
    };

    const publicLinks = [
        { name: "Home", path: "/" },
        { name: "Available Foods", path: "/available-foods" },
        { name: "About", path: "/about" },
    ];

    const privateLinks = [
        { name: "Add Food", path: "/add-food" },
        { name: "Manage My Foods", path: "/manage-my-foods" },
        { name: "My Food Request", path: "/my-food-request" },
    ];

    const renderNavLinks = (links, onClickClose = null) =>
        links.map((link) => (
            <NavLink
                key={link.name}
                to={link.path}
                onClick={() => onClickClose?.()}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition duration-300 whitespace-nowrap ${isActive
                        ? "bg-orange-100 text-orange-700 shadow-sm"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                }
            >
                {link.name}
            </NavLink>
        ));

    return (
        <header
            className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isSticky ? "shadow-md" : ""
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center">
                        <img className="w-12 mb-2.5" src={Logo} alt="Logo" />
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="text-green-500">Food</span>{" "}
                            <span className="text-orange-500">Sharing</span>
                        </h1>
                    </div>
                </Link>

                {/* Links */}
                <nav className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                    {renderNavLinks(publicLinks)}
                </nav>

                {/* Auth & Dropdown */}
                <div
                    className="hidden lg:flex items-center gap-4 relative ml-4"
                    ref={dropdownRef}
                >
                    {user ? (
                        <>
                            <button
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 text-gray-700 font-semibold focus:outline-none hover:text-orange-600 transition"
                            >
                                <img
                                    src={
                                        user.photoURL ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="User avatar"
                                    className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
                                />
                                <span className="hidden sm:inline-block">
                                    {user.displayName || "Anonymous"}
                                </span>
                                <FaChevronDown
                                    className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg py-2 ring-1 ring-black/10 z-50 animate-fadeIn">
                                    {privateLinks.map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.path}
                                            className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                                    <div className="border-t my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                    SignUp
                                </button>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white px-4 pb-4 shadow-md">
                    <div className="flex flex-col space-y-2">
                        {user
                            ? renderNavLinks([...publicLinks, ...privateLinks], () =>
                                setIsMenuOpen(false)
                            )
                            : renderNavLinks(publicLinks, () => setIsMenuOpen(false))}
                    </div>
                    <div className="mt-4 space-y-2">
                        {user ? (
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        }
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-orange-600"
                                    />
                                    <span className="font-semibold">
                                        {user.displayName || "Anonymous"}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                                        Login
                                    </button>
                                </NavLink>
                                <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                        SignUp
                                    </button>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;



















