import {
    createBrowserRouter,
} from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../Home/Home";
import Error from "../components/Error";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import AvailableFoodx from "../Pages/AvailableFoodx/AvailableFoodx";
import AddFood from "../Pages/AddFood/AddFood";
import ManageMyFood from "../Pages/ManageMyFood/ManageMyFood";
import MyFoodRequest from "../Pages/MyFoodRequest/MyFoodRequest";
import PrivateRoute from "../Provider/PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout></Homelayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/available-foods",
                element: <AvailableFoodx></AvailableFoodx>
            },
            {
                path: "/add-food",
                element: (<PrivateRoute><AddFood></AddFood> </PrivateRoute>),
            },
            {
                path: "/manage-my-foods",
                element: (<PrivateRoute><ManageMyFood></ManageMyFood> </PrivateRoute>),
            },
            {
                path: "/my-food-request",
                element: (<PrivateRoute><MyFoodRequest></MyFoodRequest> </PrivateRoute>),
            }
        ]
    },
]);

export default router;

