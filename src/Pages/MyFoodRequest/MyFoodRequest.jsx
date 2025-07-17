import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

export default function MyFoodRequest() {
    const { user } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //console.log("aaa");

    useEffect(() => {
        if (user?.email) {
            const token = localStorage.getItem("access-token");
            fetch(`https://food-sharing-serverset.vercel.app/requests?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Unauthorized access");
                    }
                    return res.json();
                })
                .then((data) => {
                    if (Array.isArray(data)) {
                        setMyRequests(data);
                    } else {
                        //console.error("Invalid data format:", data);
                        setMyRequests([]);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    //console.error("Error fetching requests:", error.message);
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
        return (
            <p className="text-center py-10 text-lg text-orange-600 animate-pulse">
                ⏳ Loading your requests...
            </p>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl text-red-600 font-semibold">❌ {error}</h2>
            </div>
        );
    }

    if (myRequests.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl text-orange-600 font-semibold">
                    You have not requested any food yet.
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                🥗 My Food Requests
            </h2>

            <div className="overflow-x-auto bg-gradient-to-br from-green-50 via-white to-orange-50 shadow-xl rounded-xl border border-orange-300">
                <table className="table w-full">
                    <thead className="bg-orange-100 text-orange-700">
                        <tr>
                            <th>#</th>
                            <th className="text-left">Food</th>
                            <th className="text-left">Donor</th>
                            <th className="text-left">Pickup Location</th>
                            <th className="text-left">Expire Date</th>
                            <th className="text-left">Request Date</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-green-900">
                        {myRequests.map((req, index) => (
                            <tr key={req._id} className="hover:bg-green-50 transition-all">
                                <td>{index + 1}</td>
                                <td className="font-semibold">{req.foodName}</td>
                                <td>{req.donorName}</td>
                                <td>{req.location}</td>
                                <td className="text-sm">{new Date(req.expiredAt).toLocaleString()}</td>
                                <td className="text-sm">{new Date(req.requestDate).toLocaleString()}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-xs capitalize ${req.status === "pending"
                                            ? "bg-yellow-500"
                                            : req.status === "approved"
                                                ? "bg-green-600"
                                                : "bg-gray-400"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
