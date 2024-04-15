import { Suspense, useState } from "react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import orderStore from "../store/order";
import Loader from "./Loader";

import Footer from "./Footer";
import NavBar from "./NavBar";
import Logo from "./UI/Logo";
import PhoneContactList from "./PhoneContactList";
import Button from "./UI/Button";
import { Cart } from "../icons/iconComponent";
import CartPopup from "./CartPopup";
import ConfirmPopup from "./ConfirmPopup";

const SharedLayout = observer(() => {
  // потрібно, аби зрозуміти розташування сторінки та чи потрібно виводити футер
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
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
      <header className="w-[1280px] flex px-[82px] gap-x-[65px] items-center justify-between text-base absolute top-0 left-1/2 -translate-x-1/2 h-[104px] z-10 mx-auto">
        <Logo />
        <NavBar />

        <div className="flex gap-x-[44px]">
          <Button style={"contacts"} clickFn={openModal}>
            {number}
          </Button>
          <button onClick={() => setIsOpenCart(true)} className="cart-btn" disabled={!isCartEmpty}>
            <Cart className={isCartEmpty ? "cart-not-empty" : "cart"} />
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

      {/* попап підтвердження відправки замовлення */}
      {isOpenNotification && (
        <ConfirmPopup type={"cart"} clickFn={() => setIsOpenNotification(false)} />
      )}
      {!isHomePage && <Footer />}
    </div>
  );
});

export default SharedLayout;
