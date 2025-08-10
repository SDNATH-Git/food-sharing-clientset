import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const getToken = () => localStorage.getItem("access-token");

// Fetch function with token header
const fetchFoods = async () => {
    const token = getToken();
    const res = await fetch("https://food-sharing-serverset.vercel.app/foods?status=available", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Failed to fetch foods");
    return res.json();
};

export default function AvailableFoods() {
    // State for layout (3 or 2 columns)
    const [columns, setColumns] = useState(3);

    // State for sorting order
    const [sortOrder, setSortOrder] = useState("asc");

    // State for search input
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch foods with react-query
    const { data: foods = [], isLoading, error } = useQuery({
        queryKey: ["foods"],
        queryFn: fetchFoods,
    });

    // Handle layout toggle
    const toggleLayout = () => {
        setColumns((prev) => (prev === 3 ? 2 : 3));
    };

    // Handle sort change
    const handleSort = (order) => {
        setSortOrder(order);
    };

    // Filter & sort foods based on searchTerm and sortOrder
    const filteredFoods = foods
        .filter((food) =>
            food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.expiredAt);
            const dateB = new Date(b.expiredAt);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

    if (isLoading) return <div className="text-center py-20"><Loading></Loading></div>;
    if (error)
        return (
            <div className="text-center py-20 text-red-600">
                Error: {error.message}
            </div>
        );

    return (
        <div className="px-6 md:px-20 py-10 bg-gradient-to-r from-green-50 via-white to-orange-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
                🍱 Available Foods
            </h2>

            {/* Controls: Search, Sort, Layout Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search food by name..."
                    className="input input-bordered input-primary w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Sort Select */}
                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select select-bordered border-orange-400 text-green-700 font-semibold w-full md:w-1/3"
                >
                    <option value="asc">Sort by Expire Date (Ascending)</option>
                    <option value="desc">Sort by Expire Date (Descending)</option>
                </select>

                {/* Layout Toggle Button */}
                <button
                    onClick={toggleLayout}
                    className="btn btn-outline btn-primary w-full md:w-auto"
                    title="Toggle Layout"
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
                            className="bg-white border border-green-200 rounded-xl shadow-xl p-5 hover:shadow-2xl transition"
                        >
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-48 object-cover rounded-lg mb-4 border border-orange-200"
                            />
                            <h3 className="text-2xl font-bold text-green-800 mb-2">
                                {food.foodName}
                            </h3>
                            <p className="text-sm text-gray-700 mb-1">
                                📦 Quantity: <strong>{food.quantity}</strong>
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                📍 Pickup: <strong>{food.location}</strong>
                            </p>
                            <p className="text-sm text-orange-600 mb-3">
                                ⏰ Expires: {new Date(food.expiredAt).toLocaleString()}
                            </p>

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

