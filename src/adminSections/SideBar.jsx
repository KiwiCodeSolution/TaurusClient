import { NavLink, useLocation } from "react-router-dom";
import { Line } from "../icons/iconComponent";
import Logo from "/images/logo_brown.png";
import MenuSideBar from "./MenuSideBar";
import Button from "../components/UI/Button";
import authState from "../store/auth";

const SideBar = () => {
  const location = useLocation();

  function logOut() {
    authState.setIsAuth(false);
  }

  return (
    <div className="w-[300px] h-screen flex flex-col bg-dark-bg border border-base-brown py-12 px-8 items-center">
      <div className="h-[35%] flex flex-col items-center pb-12 relative">
        <img src={Logo} alt="" className="mb-10" />
        <p className="text-16 text-beige mb-4">Доброго дня, </p>
        <p className="text-18 text-beige">UserName</p>
        <Line className={"absolute bottom-0"} />
      </div>
      <div className="w-[237px] min-h-[30%] flex flex-col items-center py-6 relative">
        <MenuSideBar location={location.pathname} />
        <Line className={"absolute bottom-0"} />
      </div>
      <div className="h-[35%] flex flex-col items-center justify-end gap-y-4">
        <NavLink to={"/admin/access"}>
          <Button style={"transparent"}>На головну</Button>
        </NavLink>

        <Button style={"orange"} clickFn={logOut}>
          Вийти
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
