import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MENUITEMS = [
  { id: "1", name: "Меню", link: "/admin/home/menu" },
  { id: "2", name: "Меню доставки", link: "/admin/home/menu/delivery" },
  { id: "3", name: "Акції", link: "/admin/home/menu/promo" },
];
// const DELIVERYITEMS = [{ id: "", name: "", link: "" }];

const MenuSideBar = ({ location }) => {
  const [currentItem, setCurrentItem] = useState("1");

  const path =
    location === "/admin/home/menu" ||
    location === "/admin/home/menu/promo" ||
    location === "/admin/home/menu/delivery";

  return path ? (
    <div className="h-[237px] flex flex-col justify-between items-center">
      {MENUITEMS.map(el => (
        <NavLink
          to={el.link}
          className={`w-full h-[55px] cursor-pointer uppercase  text-18 flex justify-center items-center hover:text-base-orange hover:bg-dark-btn-bg ${
            currentItem === el.id ? "text-base-orange bg-dark-btn-bg" : "text-lite-yellow"
          }`}
          key={el.id + el.name}
          onClick={() => setCurrentItem(el.id)}
        >
          {el.name}
        </NavLink>
      ))}
    </div>
  ) : (
    <h1>restourant</h1>
  );
};

MenuSideBar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default MenuSideBar;
