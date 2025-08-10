
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

export default function ManageMyFood() {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access-token");

        if (user?.email && token) {
            fetch(`https://food-sharing-serverset.vercel.app/foods?email=${user.email}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Unauthorized");
                    }
                    return res.json();
                })
                .then((data) => {
                    setMyFoods(data);
                })
                .catch((err) => {
                    console.error("Fetch error:", err.message);
                    Swal.fire("Error", "Failed to fetch your foods", "error");
                });
        }
    }, [user]);

    const handleDelete = (id) => {
        const token = localStorage.getItem("access-token");

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this food item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://food-sharing-serverset.vercel.app/foods/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Food has been deleted.", "success");
                            const remaining = myFoods.filter((food) => food._id !== id);
                            setMyFoods(remaining);
                        } else {
                            Swal.fire("Error", "Failed to delete the food.", "error");
                        }
                    });
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/update-food/${id}`);
    };

    return (
        <div className="py-12 px-4 md:px-20 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-green-700 text-center mb-10 drop-shadow-md">
                🍽️ Manage My Foods
            </h2>

            {myFoods.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-green-200 bg-white">
                    <table className="table-auto w-full text-left min-w-[700px]">
                        <thead className="bg-green-100 text-green-800 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Food Name</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Expire Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map((food, index) => (
                                <tr
                                    key={food._id}
                                    className="border-b border-green-100 hover:bg-green-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={food.foodImage}
                                            alt={food.foodName}
                                            className="w-14 h-14 rounded-xl object-cover border border-green-300 shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-800">{food.foodName}</td>
                                    <td className="px-6 py-4 text-green-700">{food.quantity}</td>
                                    <td className="px-6 py-4 text-green-700">
                                        {new Date(food.expiredAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                            {food.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-3 whitespace-nowrap">
                                        <button
                                            onClick={() => handleUpdate(food._id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            title="Update Food"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                            title="Delete Food"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600 text-lg mt-20">
                    You haven’t added any food yet.
                </p>
            )}
        </div>
    );
}
