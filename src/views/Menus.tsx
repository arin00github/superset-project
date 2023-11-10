import { MenuType } from "src/interfaces/common";

interface MenusProps {
    menuArray: MenuType[];
    onMenuClick: (url: string) => void;
}

const Menus = (props: MenusProps) => {
    const { menuArray, onMenuClick } = props;
    return (
        <div>
            {menuArray.map((menu) => {
                return (
                    <li key={menu.id} onClick={() => onMenuClick(menu.path)}>
                        {menu.label}
                    </li>
                );
            })}
        </div>
    );
};

export default Menus;
