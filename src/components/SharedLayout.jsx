import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

import Footer from "./Footer";
import NavBar from "./NavBar";
import Logo from "./UI/Logo";

export const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="relative">
      <header className="flex px-[82px] gap-x-[142px] items-center justify-between text-base fixed top-0 left-0 w-full h-[104px] z-10">
        <Logo />
        <NavBar />

        <div className="flex gap-x-5">
          <button>tel</button>
          <button>lang</button>
        </div>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <div className="w-full h-[104px] fixed top-0 left-0 bg-gradient-to-b from-[#090705] to-[rgb(11,8,3,0)]" />
      {!isHomePage && <Footer />}
    </div>
  );
};
