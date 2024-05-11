import PropTypes from "prop-types";
import Overlay from "./UI/modal/Overlay";

import NavBarMobile from "./NavBarMobile";
import Logo from "./UI/Logo";

const MenuPopup = ({ clickFn }) => {
  return (
    <Overlay
      clickFn={clickFn}
      stylesPopUp={"min-w-[312px] h-[480px] flex flex-col items-center py-12 px-6 mx-auto "}
    >
      <Logo />
      <div className={`border_admin_menu w-[192px] mx-auto my-6`} />
      <NavBarMobile clickFn={clickFn} />
    </Overlay>
  );
};

MenuPopup.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default MenuPopup;
