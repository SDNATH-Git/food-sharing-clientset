import React, { useEffect, useState } from "react";
import { FaUsers, FaUtensils, FaSmile } from "react-icons/fa";
import { Link } from "react-router";

const FoodHeroesSection = () => {
    const stats = [
        { icon: <FaUtensils />, label: "Meals Shared", value: 12450 },
        { icon: <FaUsers />, label: "Volunteers", value: 2300 },
        { icon: <FaSmile />, label: "Happy Faces", value: 9800 },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));

    // Counter animation
    useEffect(() => {
        const timer = setInterval(() => {
            setCounts((prevCounts) =>
                prevCounts.map((count, i) =>
                    count < stats[i].value ? count + Math.ceil(stats[i].value / 100) : stats[i].value
                )
            );
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-gradient-to-r from-green-100 via-white to-orange-100 my-10 py-12 px-5 md:px-10 text-center shadow-lg rounded-2xl mx-5 md:mx-10 ">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                🌟 Join Our Food Heroes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
                Together, we’re reducing food waste and bringing smiles to thousands of people.
                Be a part of the change and join our Food Heroes today.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md py-8 px-4 flex flex-col items-center hover:shadow-xl transition-all duration-300"
                    >
                        <div className="text-orange-500 text-4xl sm:text-5xl mb-3">{item.icon}</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                            {counts[index].toLocaleString()}+
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* CTA Button */}

            <Link to="/register">
                <button className="mt-10 px-6 sm:px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                    Become a Food Hero
                </button>
            </Link>

        </section>
    );
};

export default FoodHeroesSection;
