import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

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
        <section className=" py-16 px-5 md:px-10">
            <h2 className="flex items-center justify-center text-4xl font-extrabold mb-12 text-green-900 drop-shadow-md gap-3">
                <FaStar className="text-yellow-400" size={36} />
                Success Stories
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-10 max-w-7xl mx-auto">
                {testimonials.map(({ name, text, img }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center bg-white rounded-3xl shadow-xl p-8 max-w-sm hover:shadow-2xl transition-shadow duration-300 cursor-default"
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 shadow-md mb-6">
                            <img
                                src={img}
                                alt={name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-green-800 italic text-lg mb-6 leading-relaxed select-text">
                            “{text}”
                        </p>
                        <h4 className="font-bold text-green-900 text-xl tracking-wide">
                            {name}
                        </h4>
                        <div className="mt-2 w-16 h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 rounded-full"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

