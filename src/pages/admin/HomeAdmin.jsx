import { NavLink, Outlet, useLocation } from "react-router-dom";
import MetaData from "../../components/MetaData";
import Logo from "/images/logo_brown.png";
import Button from "../../components/UI/Button";
import authStore from "../../store/auth";
import SideBar from "../../adminSections/SideBar";

const HomeAdmin = () => {
  const location = useLocation();

  const currentStyle =
    location.pathname === "/admin/home" ? "bg-[rgba(171,171,171,0.5)]" : "bg-base-back";

  console.log(currentStyle);

  return (
    <>
      <MetaData>Домашня адмін-сторінка</MetaData>
      <section
        className={`fixed inset-0 w-full h-screen ${currentStyle} z-[100] top-0 backdrop-blur-lg flex`}
      >
        {location.pathname === "/admin/home" && (
          <div className="w-[578px] min-h-[460px] bg-base-back border border-base-brown py-[64px] px-[122px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={Logo} alt="" className="mx-auto" />
            <h1 className="w-[333px] mb-6 mt-12 text-center uppercase text-18 leading-6 mx-auto text-lite-yellow">
              Оберіть тип доступу
            </h1>

            <div className="flex flex-col gap-y-4 text-18">
              <NavLink
                to={"/admin/home/orders"}
                className="w-[340px] h-[75px] py-6 px-8 border border-base-brown text-lite-yellow uppercase hover:text-base-back hover:bg-base-brown text-center"
              >
                Управління рестораном
              </NavLink>
              <NavLink
                to={"/admin/home/menu"}
                className="w-[340px] h-[75px] py-6 px-8 border border-base-brown text-lite-yellow uppercase hover:text-base-back hover:bg-base-brown text-center"
              >
                Управління сайтом
              </NavLink>
              <Button
                style={"orange"}
                btnClass="mt-6 text-center text-18 font-medium"
                type="button"
                clickFn={() => authStore.setIsAuth(false)}
              >
                Вийти
              </Button>
            </div>
          </div>
        )}

        {location.pathname !== "/admin/home" && <SideBar />}

        <Outlet />
      </section>
    </>
  );
};

export default HomeAdmin;
