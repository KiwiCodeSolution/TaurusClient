import { observer } from "mobx-react-lite";
import MetaData from "../../components/MetaData";
import { useEffect, useState } from "react";
import CategoriesList from "../../components/CategoriesList";
import Button from "../../components/UI/Button";
import CartPopup from "../../components/CartPopup";
import ConfirmPopup from "../../components/ConfirmPopup";
import CategoryFilter from "../../components/CategoryFilter";
import filterStore from "../../store/filter";
import orderStore from "../../store/order";
import dishesStore from "../../store/dishes";
import { imagePages } from "../../helpers/styles";

const Order = observer(() => {
  useEffect(() => {
    // Перевірка наявності страв у сторі
    if (!dishesStore.dishes.length) {
      // Якщо страв немає, тоді викликаємо функцію для їх отримання
      dishesStore.getDishesAction();
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  function handleModals() {
    setIsModalOpen(false);
    setIsOpenNotification(true);
  }

  const isDisabled = orderStore.items?.length <= 0;

  return (
    <>
      <MetaData>Замовлення</MetaData>

      <main className="relative w-full h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="w-full md:w-9/12 text-center text-[40px] text-beige mx-auto flex flex-col gap-y-10">
            <p>Шановні клієнти! </p>
            <p>
              Наразі, розділ не доступний. Вже зовсім скоро завершиться тестування та ми зможемо
              радувати Вас найсмачнішою та найшвидшою доставкою!
            </p>
            <p>
              <span className="text-base-orange font-bold">Чекаємо на Вас!</span>
            </p>
          </h1>
        </div>
        {/* <div className="h-[198px] md:h-[416px]">
          <img
            src={
              filterStore.topCategory === "основне меню"
                ? "/images/order/dishes.png"
                : filterStore.topCategory === "десерти"
                ? "/images/order/desserts.png"
                : "/images/order/drinks.png"
            }
            alt=""
            className={imagePages}
          />
        </div>
        <section className="wrapper w-full section-wrapper py-16">
          <CategoryFilter page="order" />
          <CategoriesList page="order" />
          <div className="w-full flex justify-center mt-10">
            <Button
              style={"orange"}
              btnClass={"text-18 font-medium"}
              clickFn={() => setIsModalOpen(true)}
              disabled={isDisabled}
            >
              Замовити
            </Button>
          </div>
        </section>
        {isOpenNotification && (
          <ConfirmPopup type={"cart"} clickFn={() => setIsOpenNotification(false)} />
        )}
        {isModalOpen && <CartPopup clickFn={() => setIsModalOpen(false)} formFn={handleModals} />} */}
      </main>
    </>
  );
});

export default Order;
