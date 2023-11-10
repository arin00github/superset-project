import { ReactNode } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardPage from "src/dashboard";
import ExplorePage from "src/explore/explorePage";
import Root from "./Root";

const routesArray: { path: string; element: ReactNode }[] = [
    {
        path: "/explore",
        element: <ExplorePage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
];

const router = createBrowserRouter([
    {
        element: <Root />,
        children: routesArray,
    },
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" />,
    },
]);

export default router;
