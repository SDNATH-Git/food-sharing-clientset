import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";
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
        <div className="py-10 px-5 md:px-20 ">
            <h2 className="text-3xl text-center font-bold text-green-700 mb-6">🍱 Featured Foods</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.map((food, index) => (
                    <motion.div
                        key={food._id}
                        className="bg-white border border-orange-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-44 object-cover rounded-xl mb-4 border-4 border-green-200"
                        />
                        <h3 className="text-xl font-bold text-orange-600 mb-1">{food.foodName}</h3>
                        <p className="text-green-700 font-medium text-sm">Quantity: {food.quantity}</p>
                        <p className="text-gray-600 text-sm mb-2">📍 {food.location}</p>

                        <div className="flex items-center gap-3 mt-2">
                            <img
                                src={food.donorImage}
                                alt={food.donorName}
                                className="w-10 h-10 rounded-full border border-green-500"
                            />
                            <div>
                                <p className="text-green-700 font-semibold">{food.donorName}</p>
                                <p className="text-xs text-gray-500">{food.donorEmail}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDetails(food._id)}
                            className="mt-4 w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-green-600 hover:to-orange-500 text-white font-semibold py-2 rounded-lg transition"
                        >
                            View Details
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link to="/available-foods">
                    <button className="btn bg-green-600 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-semibold">
                        Show All
                    </button>
                </Link>
            </div>
        </div>
    );
}
