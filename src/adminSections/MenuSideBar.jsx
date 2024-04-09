import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MENUITEMS = [
  { id: "1", name: "Меню", link: "/admin/access/menu" },
  { id: "2", name: "Меню доставки", link: "/admin/access/menu/delivery" },
  { id: "3", name: "Акції", link: "/admin/access/menu/promo" },
];
// const DELIVERYITEMS = [{ id: "", name: "", link: "" }];

const MenuSideBar = ({ location }) => {
  const [currentItem, setCurrentItem] = useState("1");

  const path =
    location === "/admin/access/menu" ||
    location === "/admin/access/menu/promo" ||
    location === "/admin/access/menu/delivery";

  return path ? (
    <div className="h-[237px] flex flex-col justify-between items-center">
      {MENUITEMS.map(el => (
        <NavLink
          to={el.link}
          className={`w-full h-[55px] cursor-pointer uppercase  text-18 flex justify-center items-center hover:text-base-orange hover:bg-dark-btn-bg ${
            currentItem === el.id ? "text-base-orange bg-dark-btn-bg" : "text-beige"
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
