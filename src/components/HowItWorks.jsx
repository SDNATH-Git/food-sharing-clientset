// src/components/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";

const steps = [
    {
        title: "Register or Login",
        desc: "Create an account or login to get started.",
        icon: "👤",
    },
    {
        title: "Post your food",
        desc: "Share details of food you want to donate or request.",
        icon: "🍲",
    },
    {
        title: "Connect with others",
        desc: "Get in touch with nearby donors or receivers.",
        icon: "🤝",
    },
    {
        title: "Arrange pickup",
        desc: "Schedule pickup or delivery easily.",
        icon: "📦",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-gradient-to-r from-green-100 to-green-50 py-12 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-green-800">
                How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
                {steps.map(({ title, desc, icon }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center"
                    >
                        <div className="text-5xl mb-4">{icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-green-900">{title}</h3>
                        <p className="text-green-700">{desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
