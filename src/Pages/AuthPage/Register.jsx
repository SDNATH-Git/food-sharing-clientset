"use client";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import login from "../../assets/register.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { motion } from "framer-motion";
import Logo from "../../assets/Logo.png";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
    const { createUser, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const inputStyle =
        "w-full px-5 py-3 border text-lg rounded-xl focus:outline-none focus:ring-2 text-green-800 border-green-400 focus:ring-green-500 bg-white placeholder-green-300 transition-all";

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUppercase) {
            toast.error("Password must include at least one uppercase letter.");
            return false;
        }
        if (!hasLowercase) {
            toast.error("Password must include at least one lowercase letter.");
            return false;
        }
        if (!isValidLength) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }

        return true;
    };

    const saveToken = async (userEmail) => {
        const res = await fetch("https://food-sharing-serverset.vercel.app/jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
        });
        const data = await res.json();
        if (data.token) localStorage.setItem("access-token", data.token);
        else throw new Error("JWT token not received");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const photoURL = form.photoURL.value;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!validatePassword(password)) return;

        setLoading(true);
        try {
            const result = await createUser(email, password, username, photoURL);
            const user = result.user;
            setUser(user);
            await saveToken(user.email);
            toast.success("Registration successful!");
            form.reset();
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            await saveToken(user.email);
            toast.success("Google sign-in successful!");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="bg-gradient-to-b from-green-50 via-white to-orange-100 relative w-full h-full overflow-hidden flex flex-col items-center ">

            <div>
                <Link to="/">
                    <div className="flex items-center justify-center pt-16">
                        <img className="w-20" src={Logo} alt="Logo" />

                    </div>
                </Link>
                <h2 className="text-xl md:text-3xl font-bold text-center text-green-800 mb-6">
                    Create a Food Sharing New Account
                </h2>
            </div>


            {/* Container */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10 md:gap-12 z-10 px-5 md:px-20 pb-20">

                {/* Lottie Animation */}
                <motion.div
                    className="w-full md:w-1/2 "
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Lottie animationData={login} loop={true} className="w-full h-auto" />
                </motion.div>

                {/* Register Form */}
                <motion.form
                    onSubmit={handleRegister}
                    className="w-full md:w-1/2  bg-green-50 p-8 md:p-10 rounded-2xl shadow-lg border border-green-200 flex flex-col gap-3 relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div>
                        <label className="block mb-2 text-lg text-green-700">Username</label>
                        <input type="text" name="username" placeholder="Enter your name" required className={inputStyle} />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg text-green-700">Email</label>
                        <input type="email" name="email" placeholder="Enter your email" required className={inputStyle} />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg text-green-700">Photo URL</label>
                        <input type="text" name="photoURL" placeholder="Enter your photo URL" className={inputStyle} />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg text-green-700">Password</label>
                        <div className="relative ">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                required
                                className={`${inputStyle} pr-12`}
                            />

                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                    </div>

                    <div>
                        <label className="block mb-2 text-lg text-green-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                className={`${inputStyle} pr-12`}
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 mt-3 rounded-xl text-lg font-semibold text-white transition-colors ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                    <div className="flex items-center gap-4 mt-2">
                        <hr className="flex-grow border-green-300" />
                        <p className="text-green-500 text-sm font-semibold">or</p>
                        <hr className="flex-grow border-green-300" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-3 w-full py-3  rounded-xl bg-white border border-orange-300 text-black font-semibold shadow-md hover:shadow-lg transition-shadow"
                        disabled={loading}
                    >
                        <FcGoogle className="text-2xl" /> Continue with Google
                    </button>

                    <p className="text-center mt-4 text-green-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </motion.form>
            </div>
        </div>
    );
};

export default Register;

