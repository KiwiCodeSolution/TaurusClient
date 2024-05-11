import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "./NavBar";

const NavBarMobile = ({ clickFn }) => {
  return (
    <nav className={`w-full flex flex-col text-lg gap-y-6`}>
      {MENU_ITEMS.map(el => (
        <NavLink to={el.link} className="text-center" key={el.id + el.name} onClick={clickFn}>
          {el.name}
        </NavLink>
      ))}
    </nav>
  );
};

NavBarMobile.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default NavBarMobile;
