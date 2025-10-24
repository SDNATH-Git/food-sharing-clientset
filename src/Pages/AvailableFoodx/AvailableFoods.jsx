import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const getToken = () => localStorage.getItem("access-token");

const fetchFoods = async () => {
    const token = getToken();
    const res = await fetch(
        "https://food-sharing-serverset.vercel.app/foods?status=available",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    if (!res.ok) throw new Error("Failed to fetch foods");
    return res.json();
};

export default function AvailableFoods() {
    const [columns, setColumns] = useState(3);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: foods = [], isLoading, error } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    const toggleLayout = () => setColumns((prev) => (prev === 3 ? 2 : 3));
    const handleSort = (order) => setSortOrder(order);

    const filteredFoods = foods
        .filter((food) =>
            food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.expiredAt);
            const dateB = new Date(b.expiredAt);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

    if (isLoading)
        return (
            <div className="text-center py-20">
                <Loading />
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-600">
                Error: {error.message}
            </div>
        );

    return (
        <div className="px-6 md:px-20 py-12 bg-gradient-to-br from-green-50 via-white to-orange-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10 tracking-wide">
                🍱 Available Foods
            </h2>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                <input
                    type="text"
                    placeholder="🔍 Search food by name..."
                    className="input input-bordered w-full md:w-1/3 border-green-400 focus:ring-2 focus:ring-orange-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select select-bordered border-green-400 text-green-700 font-semibold w-full md:w-1/3 focus:ring-2 focus:ring-orange-400"
                >
                    <option value="asc">Expire Date ↑</option>
                    <option value="desc">Expire Date ↓</option>
                </select>

                <button
                    onClick={toggleLayout}
                    className="btn bg-orange-500 text-white hover:bg-green-600 transition w-full md:w-auto"
                >
                    Toggle Layout ({columns} Columns)
                </button>
            </div>

            {/* Foods Grid */}
            {filteredFoods.length > 0 ? (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-8`}
                >
                    {filteredFoods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-green-100 hover:-translate-y-2"
                        >
                            <div className="overflow-hidden rounded-t-xl">
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                                />
                            </div>

                            <div className="p-5">
                                <h3 className="text-2xl font-bold text-green-800 ">
                                    {food.foodName}
                                </h3>
                                <div className="space-y-1 text-gray-700 text-sm">
                                    <p>
                                        📦 <strong>Quantity:</strong> {food.quantity}
                                    </p>
                                    <p>
                                        📍 <strong>Pickup:</strong> {food.location}
                                    </p>
                                    <p className="text-orange-600 font-medium">
                                        ⏰ Expires:{" "}
                                        {new Date(food.expiredAt).toLocaleString("en-GB")}
                                    </p>
                                </div>

                                {/* Donor Info */}
                                <div className="flex items-center gap-4 mt-5 p-3 bg-green-50 rounded-xl border border-orange-100">
                                    <img
                                        src={food.donorImage}
                                        alt={food.donorName}
                                        className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover"
                                    />
                                    <div>
                                        <p className="text-green-800 font-semibold">
                                            {food.donorName}
                                        </p>
                                        <p className="text-xs text-gray-500">{food.donorEmail}</p>
                                    </div>
                                </div>

                                <Link to={`/food/${food._id}`}>
                                    <button className="mt-5 w-full btn bg-green-600 text-white hover:bg-orange-500 transition-all duration-300">
                                        🍽️ View Details
                                    </button>
                                </Link>
                            </div>
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


