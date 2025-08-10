// src/components/HowItWorks.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const steps = [
//     {
//         title: "Register or Login",
//         desc: "Create an account or login to get started.",
//         icon: "👤",
//     },
//     {
//         title: "Post your food",
//         desc: "Share details of food you want to donate or request.",
//         icon: "🍲",
//     },
//     {
//         title: "Connect with others",
//         desc: "Get in touch with nearby donors or receivers.",
//         icon: "🤝",
//     },
//     {
//         title: "Arrange pickup",
//         desc: "Schedule pickup or delivery easily.",
//         icon: "📦",
//     },
// ];

// export default function HowItWorks() {
//     return (
//         <section className="bg-gradient-to-br from-green-50 to-orange-50 py-12 px-5 md:px-10">
//             <h2 className="text-3xl font-bold text-center mb-10 text-green-800">
//                 How It Works
//             </h2>
//             <div className="grid md:grid-cols-4 gap-8">
//                 {steps.map(({ title, desc, icon }, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.2, duration: 0.5 }}
//                         className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center"
//                     >
//                         <div className="text-5xl mb-4">{icon}</div>
//                         <h3 className="text-xl font-semibold mb-2 text-green-900">{title}</h3>
//                         <p className="text-green-700">{desc}</p>
//                     </motion.div>
//                 ))}
//             </div>
//         </section>
//     );
// }

import React from "react";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";

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
        title: "Arrange pickup",
        desc: "Schedule pickup or delivery easily.",
        icon: "📦",
    },
];

export default function HowItWorks() {
    return (
        <section className=" py-16 px-5 md:px-10">
            <h2 className="text-4xl font-extrabold text-center mb-14 text-green-900 drop-shadow-md flex items-center justify-center gap-3">
                <FaCogs className="text-green-700" size={36} />
                How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {steps.map(({ title, desc, icon }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.25, duration: 0.6, ease: "easeOut" }}
                        className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center cursor-default hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="text-6xl mb-5 rounded-full bg-gradient-to-tr from-green-400 to-orange-400 text-white w-20 h-20 flex items-center justify-center shadow-md">
                            {icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-green-900">{title}</h3>
                        <p className="text-green-700 text-sm sm:text-base">{desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

