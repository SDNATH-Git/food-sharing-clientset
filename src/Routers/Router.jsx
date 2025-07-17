import {
    createBrowserRouter,
} from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../Home/Home";
import Error from "../components/Error";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import AddFood from "../Pages/AddFood/AddFood";
import ManageMyFood from "../Pages/ManageMyFood/ManageMyFood";
import MyFoodRequest from "../Pages/MyFoodRequest/MyFoodRequest";
import PrivateRoute from "../Provider/PrivateRoute";
import AvailableFoods from "../Pages/AvailableFoodx/AvailableFoods";
import FoodDetails from "../Pages/FoodDetails";
import UpdateFood from "../Pages/UpdateFood";


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
                element: <AvailableFoods></AvailableFoods>
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
            },
            {
                path: "/food/:id",
                element: <PrivateRoute><FoodDetails /></PrivateRoute>
            },
            {
                path: "/update-food/:id",
                element: <PrivateRoute><UpdateFood></UpdateFood> </PrivateRoute>
            },

        ]
    },
]);

export default router;

