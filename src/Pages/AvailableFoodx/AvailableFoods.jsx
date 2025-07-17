// src/Pages/AvailableFoods.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AvailableFoods() {
    const [foods, setFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filteredFoods, setFilteredFoods] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/foods?status=available")
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
                setFilteredFoods(data);
            });
    }, []);

    const handleSort = (order) => {
        setSortOrder(order);
        const sorted = [...foods].sort((a, b) => {
            const dateA = new Date(a.expiredAt);
            const dateB = new Date(b.expiredAt);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        setFilteredFoods(sorted);
    };

    return (
        <div className="px-6 md:px-20 py-10 bg-gradient-to-r from-green-50 to-orange-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
                🍱 Available Foods
            </h2>

            {/* Sort Dropdown */}
            <div className="mb-8 flex justify-center">
                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select select-bordered border-orange-400 text-green-700 font-semibold"
                >
                    <option value="asc">Sort by Expire Date (Ascending)</option>
                    <option value="desc">Sort by Expire Date (Descending)</option>
                </select>
            </div>

            {/* Cards Section */}
            {filteredFoods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFoods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white border border-green-200 rounded-xl shadow-xl p-5 hover:shadow-2xl transition"
                        >
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-lg mb-4 border border-orange-200"
                            />
                            <h3 className="text-2xl font-bold text-green-800 mb-2">{food.foodName}</h3>
                            <p className="text-sm text-gray-700 mb-1">📦 Quantity: <strong>{food.quantity}</strong></p>
                            <p className="text-sm text-gray-700 mb-1">📍 Pickup: <strong>{food.location}</strong></p>
                            <p className="text-sm text-orange-600 mb-3">⏰ Expires: {new Date(food.expiredAt).toLocaleString()}</p>

                            {/* Donor Info */}
                            <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-orange-100 mb-4">
                                <img
                                    src={food.donorImage}
                                    alt={food.donorName}
                                    className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                                />
                                <div>
                                    <p className="text-green-800 font-semibold">{food.donorName}</p>
                                    <p className="text-xs text-gray-500">{food.donorEmail}</p>
                                </div>
                            </div>

                            <Link to={`/food/${food._id}`}>
                                <button className="btn bg-orange-500 text-white w-full hover:bg-green-600">
                                    🍽️ View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 text-lg mt-10">
                    No available foods right now.
                </p>
            )}
        </div>
    );
}
