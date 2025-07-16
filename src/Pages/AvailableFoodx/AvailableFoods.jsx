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
                setFilteredFoods(data); // initial sort result
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
        <div className="px-6 md:px-20 py-10">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                🍱 Available Foods
            </h2>

            {/* Sort Dropdown */}
            <div className="mb-6 flex justify-end">
                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select select-bordered text-green-700"
                >
                    <option value="asc">Sort by Expire Date (Ascending)</option>
                    <option value="desc">Sort by Expire Date (Descending)</option>
                </select>
            </div>

            {/* Cards */}
            {filteredFoods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFoods.map((food) => (
                        <div key={food._id} className="bg-white rounded-xl shadow-lg p-5 border border-green-100">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold text-green-800 mb-1">{food.foodName}</h3>
                            <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>
                            <p className="text-sm text-gray-600">Pickup: {food.location}</p>
                            <p className="text-sm text-orange-600">
                                Expire: {new Date(food.expiredAt).toLocaleString()}
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <img
                                    src={food.donorImage}
                                    alt={food.donorName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-green-700">{food.donorName}</p>
                                    <p className="text-xs text-gray-500">{food.donorEmail}</p>
                                </div>
                            </div>
                            <Link to={`/food/${food._id}`}>
                                <button className="btn mt-4 bg-orange-500 text-white w-full hover:bg-green-600">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No available foods right now.</p>
            )}
        </div>
    );
}
