// import React from "react";
// import Lottie from "lottie-react";
// import foodSharingAnimation from "../assets/food-sharing.json"; // Replace with your file
// import bgAnimation from "../assets/bgAnimation.json"; // Optional background animation JSON

// const Banner = () => {
//     return (
//         <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center px-6 md:px-20 py-10">
//             {/* ✅ Animated background using Lottie */}
//             <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
//                 <Lottie animationData={bgAnimation} loop={true} className="w-full h-full" />
//             </div>

//             {/* ✅ Gradient background (fallback if no bg-animation) */}
//             <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-white to-orange-100 z-0"></div>

//             {/* ✅ Main content */}
//             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10">
//                 {/* Left Text */}
//                 <div className="w-full md:w-1/2 text-left">
//                     <h1 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight drop-shadow">
//                         FOOD <span className="text-orange-500">SHARING</span>
//                     </h1>
//                     <p className="text-gray-800 mt-4 text-base md:text-lg">
//                         Share food, not waste. Join our mission to create a kind and sustainable future for all.
//                     </p>
//                     <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow">
//                         Read More
//                     </button>
//                 </div>

//                 {/* Right Animation */}
//                 <div className="w-full md:w-1/2 flex justify-center">
//                     <Lottie animationData={foodSharingAnimation} loop={true} className="w-72 md:w-96" />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Banner;



import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import foodSharingAnimation from "../assets/food-sharing.json";
import bgAnimation from "../assets/bgAnimation.json";

const Banner = () => {
    return (
        <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center px-10 py-12 bg-gradient-to-r from-green-100 via-white to-orange-100">
            {/* Background Animation */}
            <div className="absolute inset-0 -z-20 opacity-30 pointer-events-none select-none">
                <Lottie animationData={bgAnimation} loop={true} />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12">
                {/* Left Text */}
                <div className="w-full md:w-1/2 text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 leading-tight drop-shadow-md">
                        FOOD <span className="text-orange-600">SHARING</span>
                    </h1>
                    <p className="text-gray-700 mt-6 text-lg sm:text-xl max-w-lg">
                        Share food, not waste. Join our mission to create a kind and sustainable future for all.
                    </p>

                    <Link
                        to="/about"
                        className="inline-block mt-8 bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
                    >
                        Read More
                    </Link>
                </div>

                {/* Right Animation */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                        <Lottie
                            animationData={foodSharingAnimation}
                            loop={true}
                            className="w-full h-96"
                            style={{ filter: "drop-shadow(0 0 10px rgba(234, 88, 12, 0.5))" }}
                        />
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Banner;





