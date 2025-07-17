import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateFood() {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data));
    }, [id]);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localISOTime = new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
        return localISOTime;
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedFood = {
            foodName: form.foodName.value,
            foodImage: form.foodImage.value,
            quantity: form.quantity.value,
            location: form.location.value,
            expiredAt: form.expiredAt.value,
            notes: form.notes.value,
            status: food.status, // ✅ Preserve status
        };

        fetch(`http://localhost:5000/foods/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0 || data.matchedCount > 0 || data.acknowledged) {
                    Swal.fire("✅ Success!", "Food updated successfully", "success");
                    navigate("/manage-my-foods");
                } else {
                    Swal.fire("ℹ️ No Changes", "Nothing was updated.", "info");
                }
            });
    };

    if (!food) return <p className="text-center py-20">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 my-10 rounded-xl shadow-lg border border-orange-200">
            <h2 className="text-2xl text-green-700 font-bold mb-6 text-center">
                ✏️ Update Food
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    name="foodName"
                    defaultValue={food.foodName}
                    placeholder="Food Name"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="foodImage"
                    defaultValue={food.foodImage}
                    placeholder="Image URL"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="quantity"
                    defaultValue={food.quantity}
                    placeholder="Quantity"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="location"
                    defaultValue={food.location}
                    placeholder="Pickup Location"
                    required
                    className="input input-bordered w-full"
                />
                <input
                    type="datetime-local"
                    name="expiredAt"
                    defaultValue={formatDateForInput(food.expiredAt)}
                    required
                    className="input input-bordered w-full"
                />
                <textarea
                    name="notes"
                    defaultValue={food.notes}
                    placeholder="Additional Notes"
                    className="textarea textarea-bordered w-full"
                ></textarea>

                {/* Status Field (Read Only) */}
                <input
                    type="text"
                    name="status"
                    defaultValue={food.status}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 text-gray-600"
                />

                <button
                    type="submit"
                    className="btn bg-green-600 hover:bg-orange-500 text-white w-full"
                >
                    Update Food
                </button>
            </form>
        </div>
    );
}
