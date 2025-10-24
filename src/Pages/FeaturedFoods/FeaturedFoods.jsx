// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AuthContext } from "../../Provider/AuthProvider";

// export default function FeaturedFoods() {
//     const [foods, setFoods] = useState([]);
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("https://food-sharing-serverset.vercel.app/foods?status=available")
//             .then(res => res.json())
//             .then(data => {
//                 const topFoods = [...data]
//                     .sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity))
//                     .slice(0, 6);
//                 setFoods(topFoods);
//             });
//     }, []);

//     const handleDetails = (id) => {
//         if (!user) {
//             navigate("/login");
//         } else {
//             navigate(`/food/${id}`);
//         }
//     };

//     return (
//         <section className="py-12 px-5 md:px-10 bg-white">
//             <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12 drop-shadow-md">
//                 🍱 Featured Foods
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
//                 {foods.map((food, index) => (
//                     <motion.div
//                         key={food._id}
//                         className="bg-white border border-green-200 rounded-3xl  shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                     >
//                         <img
//                             src={food.foodImage}
//                             alt={food.foodName}
//                             className="w-full h-48 object-cover rounded-t-xl  mb-2  border-green-100"
//                         />
//                         <h3 className="text-2xl font-bold text-orange-600 mb-1">{food.foodName}</h3>
//                         <p className="text-green-700 font-semibold text-sm">
//                             Quantity: <span className="font-normal">{food.quantity}</span>
//                         </p>
//                         <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
//                             <span role="img" aria-label="location">📍</span> {food.location}
//                         </p>

//                         <div className="flex items-center gap-4 mb-6">
//                             <img
//                                 src={food.donorImage}
//                                 alt={food.donorName}
//                                 className="w-12 h-12 rounded-full border-2 border-green-400 object-cover"
//                             />
//                             <div>
//                                 <p className="text-green-800 font-semibold">{food.donorName}</p>
//                                 <p className="text-xs text-gray-500 truncate max-w-xs">{food.donorEmail}</p>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => handleDetails(food._id)}
//                             className="mt-auto bg-gradient-to-r from-green-600 to-orange-500 hover:from-orange-500 hover:to-green-600 text-white font-semibold py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
//                         >
//                             View Details
//                         </button>
//                     </motion.div>
//                 ))}
//             </div>

//             <div className="text-center mt-12">
//                 <Link to="/available-foods">
//                     <button className="inline-block bg-green-600 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
//                         Show All
//                     </button>
//                 </Link>
//             </div>
//         </section>
//     );
// }


import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";

export default function FeaturedFoods() {
    const [foods, setFoods] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://food-sharing-serverset.vercel.app/foods?status=available")
            .then(res => res.json())
            .then(data => {
                const topFoods = [...data]
                    .sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity))
                    .slice(0, 6);
                setFoods(topFoods);
            });
    }, []);

    const handleDetails = (id) => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/food/${id}`);
        }
    };

    return (
        <section className="py-14 px-5 md:px-10 ">
            <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-14 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                🍱 Featured Foods
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {foods.map((food, index) => (
                    <motion.div
                        key={food._id}
                        className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl border border-green-200 hover:border-green-400 transition-all duration-300 flex flex-col overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="relative">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-52 object-cover"
                            />
                            <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-700 shadow">
                                {food.quantity} pcs
                            </span>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-green-800 mb-1 capitalize">{food.foodName}</h3>
                            <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                                📍 {food.location}
                            </p>

                            <div className="flex items-center gap-4 mb-5 mt-3">
                                <img
                                    src={food.donorImage}
                                    alt={food.donorName}
                                    className="w-12 h-12 rounded-full border-2 border-green-400 object-cover shadow"
                                />
                                <div>
                                    <p className="text-green-900 font-semibold">{food.donorName}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{food.donorEmail}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDetails(food._id)}
                                className="mt-auto bg-gradient-to-r from-green-600 to-orange-500 hover:from-orange-500 hover:to-green-600 text-white text-center font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.05]"
                            >
                                View Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/available-foods">
                    <button className="inline-block bg-gradient-to-r from-green-600 to-orange-500 hover:from-orange-500 hover:to-green-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-[1.08]">
                        Show All Foods →
                    </button>
                </Link>
            </div>
        </section>
    );
}
