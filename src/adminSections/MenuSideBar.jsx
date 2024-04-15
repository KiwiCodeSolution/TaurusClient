import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const MENULINKS = [
  { id: "1", name: "Меню", link: "/admin/access/site/menu" },
  { id: "2", name: "Меню доставки", link: "/admin/access/site/delivery" },
  { id: "3", name: "Акції", link: "/admin/access/site/promo" },
  { id: "4", name: "add", link: "/admin/access/site/menu/create" },
];

const RESTAURANTLINKS = [
  { id: "1", name: "Доставка", link: "/admin/access/restaurant/delivery" },
  { id: "2", name: "Замовлення", link: "/admin/access/restaurant/take" },
  { id: "3", name: "Звернення", link: "/admin/access/restaurant/appeals" },
  { id: "4", name: "Бронювання", link: "/admin/access/restaurant/booking" },
  { id: "5", name: "Архів", link: "/admin/access/restaurant/booking" },
];

const USERSLINKS = [
  { id: "1", name: "Всі користувачі", link: "/admin/access/users/staff" },
  { id: "2", name: "Архів", link: "/admin/access/users/archive" },
];

const MenuSideBar = () => {
  const [currentItem, setCurrentItem] = useState("1");
  const { pathname } = useLocation();

  // Перевіряємо, чи адреса містить "/admin/access/site"
  const isSitePage = pathname.includes("/admin/access/site");
  const isRestaurantPage = pathname.includes("/admin/access/restaurant");
  const isUserPage = pathname.includes("/admin/access/users");

  // const currentLocation = useLocation()?.state?.from.pathname;

  // const path =
  //   currentLocation === "/admin/access/site/menu" ||
  //   location === "/admin/access/site/menu" ||
  //   location === "/admin/access/site/promo" ||
  //   location === "/admin/access/site/delivery";

  return (
    <div className="h-[237px] flex flex-col justify-between items-center">
      {isSitePage &&
        MENULINKS.map(el => (
          <NavLink
            to={el.link}
            className={`w-full h-[55px] cursor-pointer uppercase text-18 flex justify-center items-center ${
              currentItem === el.id
                ? "text-base-orange bg-dark-btn-bg hover:underline hover:underline-offset-4"
                : "hover:text-base-yellow hover:underline hover:underline-offset-4 text-beige"
            }`}
            key={el.id + el.name}
            onClick={() => setCurrentItem(el.id)}
          >
            {el.name}
          </NavLink>
        ))}
      {isRestaurantPage &&
        RESTAURANTLINKS.map(el => (
          <NavLink
            to={el.link}
            className={`w-full h-[55px] cursor-pointer uppercase text-18 flex justify-center items-center ${
              currentItem === el.id
                ? "text-base-orange bg-dark-btn-bg hover:underline hover:underline-offset-4"
                : "hover:text-base-yellow hover:underline hover:underline-offset-4 text-beige"
            }`}
            key={el.id + el.name}
            onClick={() => setCurrentItem(el.id)}
          >
            {el.name}
          </NavLink>
        ))}
      {isUserPage &&
        USERSLINKS.map(el => (
          <NavLink
            to={el.link}
            className={`w-full h-[55px] cursor-pointer uppercase text-18 flex justify-center items-center ${
              currentItem === el.id
                ? "text-base-orange bg-dark-btn-bg hover:underline hover:underline-offset-4"
                : "hover:text-base-yellow hover:underline hover:underline-offset-4 text-beige"
            }`}
            key={el.id + el.name}
            onClick={() => setCurrentItem(el.id)}
          >
            {el.name}
          </NavLink>
        ))}
    </div>
  );
};

MenuSideBar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default MenuSideBar;
