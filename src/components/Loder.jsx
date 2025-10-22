import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.png";

const Loder = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-green-100 via-white to-orange-100"
                >
                    {/* Animated Gradient Background */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-200 via-white to-orange-200"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    />

                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Dual Rotating Borders */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-8 border-transparent"
                            style={{ borderTopColor: "#e11d48" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-full border-4 border-transparent"
                            style={{ borderBottomColor: "green" }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Pulsing Logo */}
                        <motion.img
                            src={Logo}
                            alt="App Logo"
                            className="w-40 h-40 rounded-full object-contain p-3 shadow-xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* App Name Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.0, duration: 2.8, ease: "easeOut" }}
                        className="mt-6 text-3xl font-bold text-red-600 tracking-wide"
                    >
                        🍴  <span className="text-green-500">Food</span>{" "}
                        <span className="text-orange-500">Sharing</span>
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loder;
