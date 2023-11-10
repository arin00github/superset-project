import { Outlet, useNavigate } from "react-router-dom";
import Menus from "./Menus";

const constantMenus = [
    {
        id: "1",
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        id: "2",
        label: "Explore",
        path: "/explore",
    },
];
const Root = () => {
    const navigate = useNavigate();

    const changeMenu = (url: string) => {
        navigate(url);
    };

    return (
        <div>
            <Menus menuArray={constantMenus} onMenuClick={changeMenu} />
            <div>Root Layout</div>
            <Outlet />
        </div>
    );
};

export default Root;
