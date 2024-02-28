import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ITEMS = [
  { id: "1", name: "Меню", link: "/menu" },
  { id: "2", name: "Послуги", link: "/services" },
  { id: "3", name: "Акції", link: "/promo" },
  { id: "4", name: "Забронювати", link: "/reserve" },
  { id: "5", name: "Контакти", link: "/contacts" },
];

const NavBar = ({ sectionType }) => {
  return (
    <nav className={`flex text-base ${sectionType === "footer" ? "flex-col gap-y-3" : "gap-x-6"}`}>
      {ITEMS.map((el) => (
        <NavLink
          to={el.link}
          className="hover:text-base-yellow duration-300 ease-in cursor-pointer"
          key={el.id + el.name}
        >
          {el.name}
        </NavLink>
      ))}
    </nav>
  );
};

NavBar.propTypes = {
  sectionType: PropTypes.string,
};

export default NavBar;
