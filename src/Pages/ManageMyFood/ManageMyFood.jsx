import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

export default function ManageMyFood() {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/foods?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyFoods(data));
        }
    }, [user]);

    const handleDelete = (id) => {
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
                fetch(`http://localhost:5000/foods/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Food has been deleted.", "success");
                            const remaining = myFoods.filter((food) => food._id !== id);
                            setMyFoods(remaining);
                        }
                    });
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/update-food/${id}`);
    };

    return (
        <div className="py-10 px-4 md:px-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
                🍽️ Manage My Foods
            </h2>

            {myFoods.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="bg-green-100 text-green-800">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Food Name</th>
                                <th>Quantity</th>
                                <th>Expire Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map((food, index) => (
                                <tr key={food._id} className="hover:bg-orange-50">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={food.foodImage}
                                            alt={food.foodName}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </td>
                                    <td className="font-semibold">{food.foodName}</td>
                                    <td>{food.quantity}</td>
                                    <td>{new Date(food.expiredAt).toLocaleString()}</td>
                                    <td>
                                        <span className="badge bg-green-200 text-green-800">
                                            {food.status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleUpdate(food._id)}
                                            className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="btn btn-sm bg-orange-500 text-white hover:bg-red-600"
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
                <p className="text-center text-gray-600">You haven’t added any food yet.</p>
            )}
        </div>
    );
}
