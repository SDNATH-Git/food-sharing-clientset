// src/Pages/AddFood.jsx
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

export default function AddFood() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const expiredAt = form.expiredAt.value;
        const notes = form.notes.value;

        const foodData = {
            foodName,
            foodImage,
            quantity,
            location,
            expiredAt,
            notes,
            status: "available",
            donorName: user?.displayName,
            donorEmail: user?.email,
            donorImage: user?.photoURL,
            addedAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:5000/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(foodData),
            });

            const data = await res.json();
            if (data.insertedId) {
                Swal.fire("Success!", "Food added successfully", "success");
                form.reset();
            } else {
                throw new Error("Failed to add");
            }
        } catch (err) {
            Swal.fire("Error!", err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4 md:mx-36 px-6 py-10 mt-10 mb-16  bg-gradient-to-r from-green-50 via-orange-50 to-green-50 shadow-xl rounded-2xl">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
                🍽️ Add Food
            </h2>
            <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Food Name</label>
                    <input type="text" name="foodName" required className="input input-bordered w-full" placeholder="Enter food name" />
                </div>
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Food Image URL</label>
                    <input type="text" name="foodImage" required className="input input-bordered w-full" placeholder="Enter image URL" />
                </div>
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Food Quantity</label>
                    <input type="number" name="quantity" required className="input input-bordered w-full" placeholder="Enter quantity" />
                </div>
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Pickup Location</label>
                    <input type="text" name="location" required className="input input-bordered w-full" placeholder="Enter location" />
                </div>
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Expired Date & Time</label>
                    <input type="datetime-local" name="expiredAt" required className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block font-semibold text-green-800 mb-1">Additional Notes</label>
                    <textarea name="notes" rows="3" className="textarea textarea-bordered w-full" placeholder="Any special note?"></textarea>
                </div>

                {/* Donor Info */}
                <div className="md:col-span-2 mt-4 bg-white p-4 rounded-xl border border-orange-200 flex items-center gap-4 shadow">
                    <img
                        src={user?.photoURL}
                        alt="Donor"
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-400"
                    />
                    <div>
                        <p className="text-green-800 font-bold">{user?.displayName}</p>
                        <p className="text-orange-600 text-sm">{user?.email}</p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-green-600 hover:bg-orange-500 text-white w-full text-lg"
                    >
                        {loading ? "Adding..." : "Add Food 🍛"}
                    </button>
                </div>
            </form>
        </div>
    );
}
