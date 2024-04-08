import { observer } from "mobx-react-lite";
import MetaData from "../../components/MetaData";
import { useEffect, useState } from "react";
import CategoriesList from "../../components/CategoriesList";
import { getDishes } from "../../API/dishes";
import Button from "../../components/UI/Button";
import CartPopup from "../../components/CartPopup";
import ConfirmPopup from "../../components/ConfirmPopup";
import CategoryFilter from "../../components/CategoryFilter";
import filterStore from "../../store/filter";

const Order = observer(() => {
  useEffect(() => {
    getDishes();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  function handleModals() {
    setIsModalOpen(false);
    setIsOpenNotification(true);
  }

  return (
    <>
      <MetaData>Замовлення</MetaData>

      <main className="relative w-full">
        <img
          src={
            filterStore.topCategory === "dishes"
              ? "/images/order/dishes.png"
              : filterStore.topCategory === "desserts"
              ? "/images/order/desserts.png"
              : "/images/order/drinks.png"
          }
          alt=""
          className="w-full h-[416px] object-cover object-top border-b-[0.5px] border-base-brown"
        />
        <section className="wrapper w-full section-wrapper py-16">
          <CategoryFilter />
          <CategoriesList page="order" />
          <div className="w-full flex justify-center mt-10">
            <Button
              style={"orange"}
              btnClass={"text-18 font-medium"}
              clickFn={() => setIsModalOpen(true)}
            >
              Замовити
            </Button>
          </div>
        </section>
        {isOpenNotification && (
          <ConfirmPopup type={"cart"} clickFn={() => setIsOpenNotification(false)} />
        )}
        {isModalOpen && <CartPopup clickFn={() => setIsModalOpen(false)} formFn={handleModals} />}
      </main>
    </>
  );
});

export default Order;
