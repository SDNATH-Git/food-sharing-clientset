import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

export default function FoodDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data));
    }, [id]);

    const handleRequest = async () => {
        const token = localStorage.getItem("access-token");
        if (!token) {
            Swal.fire("Error", "You must be logged in to make a request.", "error");
            return;
        }

        const requestInfo = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            donorEmail: food.donorEmail,
            donorName: food.donorName,
            userEmail: user.email,
            requestDate: new Date(),
            location: food.location,
            expiredAt: food.expiredAt,
            notes,
        };

        try {
            // 1. Save to requests collection
            const res1 = await fetch("http://localhost:5000/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestInfo),
            });

            // 2. Update food status to "requested"
            const res2 = await fetch(`http://localhost:5000/foods/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "requested" }),
            });

            if (res1.ok && res2.ok) {
                Swal.fire("✅ Success!", "Food request has been submitted.", "success");
                setShowModal(false);
            } else {
                throw new Error("Request failed");
            }
        } catch (err) {
            Swal.fire("❌ Error!", err.message || "Something went wrong.", "error");
        }
    };

    if (!food) return <div className="text-center py-20 text-xl">⏳ Loading food details...</div>;

    return (
        <div className="px-6 md:px-20 py-10 bg-gradient-to-r from-green-50 to-orange-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-10 px-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
                    <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-full h-64 object-cover rounded-md mb-4 border border-orange-300"
                    />
                    <h2 className="text-3xl font-bold text-green-700">{food.foodName}</h2>
                    <p className="text-gray-700 mt-2"><strong>Quantity:</strong> {food.quantity}</p>
                    <p><strong>Pickup Location:</strong> {food.location}</p>
                    <p><strong>Expires:</strong> {new Date(food.expiredAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> <span className="text-orange-600">{food.status}</span></p>

                    <div className="flex items-center gap-4 mt-4">
                        <img
                            src={food.donorImage}
                            alt={food.donorName}
                            className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                        />
                        <div>
                            <p className="text-green-700 font-semibold">{food.donorName}</p>
                            <p className="text-sm text-gray-500">{food.donorEmail}</p>
                        </div>
                    </div>

                    {food.status === "available" && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn mt-6 bg-orange-500 text-white hover:bg-green-600"
                        >
                            Request this Food
                        </button>
                    )}
                </div>

                {/* ✅ Request Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl border border-green-300">
                            <h3 className="text-xl font-bold text-green-700 mb-4">🍽️ Request Food</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p><strong>Food Name:</strong> {food.foodName}</p>
                                <p><strong>Food ID:</strong> {food._id}</p>
                                <p><strong>Donor Name:</strong> {food.donorName}</p>
                                <p><strong>Donor Email:</strong> {food.donorEmail}</p>
                                <p><strong>User Email:</strong> {user.email}</p>
                                <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>
                                <p><strong>Pickup Location:</strong> {food.location}</p>
                                <p><strong>Expire Date:</strong> {new Date(food.expiredAt).toLocaleString()}</p>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Additional Notes"
                                    className="textarea textarea-bordered w-full mt-2"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setShowModal(false)} className="btn btn-outline border-orange-400">Cancel</button>
                                <button onClick={handleRequest} className="btn bg-green-600 text-white">Confirm Request</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
