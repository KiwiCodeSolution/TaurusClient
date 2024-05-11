import { Suspense, useState } from "react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import orderStore from "../store/order";
import Loader from "./Loader";
import useMediaQuery from "../hooks/useMediaQuery";

import Footer from "./Footer";
import NavBar from "./NavBar";
import Logo from "./UI/Logo";
import PhoneContactList from "./PhoneContactList";
import Button from "./UI/Button";
import { Burger, Call, Cart } from "../icons/iconComponent";
import CartPopup from "./CartPopup";
import ConfirmPopup from "./ConfirmPopup";
import MenuPopup from "./MenuPopup";

const SharedLayout = observer(() => {
  // потрібно, аби зрозуміти розташування сторінки та чи потрібно виводити футер
  const { isMobile } = useMediaQuery();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  // номер всюди задіяно через цю константу. достатньо змінити тільки тут
  const number = "+38 099 101 81 81";

  const isCartEmpty = orderStore.order.items?.length > 0;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleModals() {
    setIsOpenCart(false);
    setIsOpenNotification(true);
  }

  return (
    <div className="relative" id="header">
      <header className="w-full xl:w-[1280px] flex px-3 xl:px-[82px] items-center justify-between text-base absolute top-0 left-1/2 -translate-x-1/2 h-[104px] z-10 mx-auto">
        <Logo />
        {!isMobile && <NavBar />}

        <div className="hidden xl:flex gap-x-[44px]">
          <Button style={"contacts"} clickFn={openModal}>
            {number}
          </Button>
          <button onClick={() => setIsOpenCart(true)} className="cart-btn" disabled={!isCartEmpty}>
            <Cart className={isCartEmpty ? "cart-not-empty" : "cart"} />
          </button>
        </div>

        <div className="xl:hidden flex gap-x-2">
          <button
            onClick={() => openModal()}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Call />
          </button>

          <button
            onClick={() => setIsOpenCart(true)}
            className="cart-btn w-10 h-10 flex items-center justify-center"
            disabled={!isCartEmpty}
          >
            <Cart className={isCartEmpty ? "cart-not-empty" : "cart"} />
          </button>
          <button
            onClick={() => setIsOpenMenu(true)}
            className="cart-btn w-10 h-10 flex items-center justify-center"
          >
            <Burger />
          </button>
        </div>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <div className="w-full h-[104px] absolute top-0 left-0 bg-gradient-to-b from-[#090705] to-[rgb(11,8,3,0)]" />

      {/* попап із лінками на месенджерами */}
      {isOpen && <PhoneContactList clickFn={closeModal} contactNumber={number} />}

      {/* попап кошика */}
      {isOpenCart && <CartPopup clickFn={() => setIsOpenCart(false)} formFn={handleModals} />}

      {/* попап моб меню */}
      {isOpenMenu && <MenuPopup clickFn={() => setIsOpenMenu(false)} />}

      {/* попап підтвердження відправки замовлення */}
      {isOpenNotification && (
        <ConfirmPopup type={"cart"} clickFn={() => setIsOpenNotification(false)} />
      )}
      {!isHomePage && <Footer />}
    </div>
  );
});

export default SharedLayout;
