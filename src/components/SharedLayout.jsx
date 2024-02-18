import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "./Loader";

import Footer from "./Footer";
import NavBar from "./NavBar";
import Logo from "./UI/Logo";
import PhoneContactList from "./PhoneContactList";
import Button from "./UI/Button";

export const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const number = "+38 099 101 81 81";

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="relative" id="header">
      <header className="flex px-[82px] gap-x-[142px] items-center justify-between text-base fixed top-0 left-0 w-full h-[104px] z-10">
        <Logo />
        <NavBar />

        <div className="flex gap-x-5">
          {/* <button onClick={openModal}>tel</button> */}
          <Button style={"transparent"} clickFn={openModal}>
            {number}
          </Button>
        </div>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <div className="w-full h-[104px] fixed top-0 left-0 bg-gradient-to-b from-[#090705] to-[rgb(11,8,3,0)]" />
      {isOpen && <PhoneContactList clickFn={closeModal} contactNumber={number} />}
      {!isHomePage && <Footer />}
    </div>
  );
};
