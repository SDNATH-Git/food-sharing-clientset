// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Rahim",
        text: "Thanks to this platform, I could donate leftover food and help many families.",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Ayesha",
        text: "I got food support when I needed it most. Very grateful!",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "Sabbir",
        text: "Easy to use and very effective. Highly recommend!",
        img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-white py-12 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
                Success Stories
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {testimonials.map(({ name, text, img }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.3, duration: 0.6 }}
                        className="max-w-sm bg-green-50 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                    >
                        <img
                            src={img}
                            alt={name}
                            className="w-20 h-20 rounded-full mb-4 object-cover"
                            loading="lazy"
                        />
                        <p className="text-green-900 italic mb-4">“{text}”</p>
                        <h4 className="font-semibold text-green-800">{name}</h4>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
