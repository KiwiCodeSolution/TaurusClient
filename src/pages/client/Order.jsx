import { observer } from "mobx-react-lite";
import categoryStore from "../../store/filter";
import MetaData from "../../components/MetaData";
import { useEffect, useState } from "react";
import * as icons from "../../icons/iconComponent";
import CategoriesList from "../../components/CategoriesList";
import { getDishes } from "../../API/dishes";
import Button from "../../components/UI/Button";
import CartPopup from "../../components/CartPopup";
import ConfirmPopup from "../../components/ConfirmPopup";

const ICONS = [
  {
    id: "1",
    Icon: icons.Menu,
    IconHover: icons.MenuHover,
    topCategoryName: "dishes",
    title: "основне меню",
  },
  {
    id: "2",
    Icon: icons.Desserts,
    IconHover: icons.DessertsHover,
    topCategoryName: "desserts",
    title: "десерти",
  },
  {
    id: "3",
    Icon: icons.Drinks,
    IconHover: icons.DrinksHover,
    topCategoryName: "drinks",
    title: "напої",
  },
];

const Order = observer(() => {
  useEffect(() => {
    getDishes();
  }, []);

  const [currentTopCategory, setCurrentTopCategory] = useState("dishes");
  const [currentTopTitle, setCurrentTopTitle] = useState("основне меню");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState("1");
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  function handleCahngeCategory(topCategoryName, title, id) {
    setCurrentTopCategory(topCategoryName);
    setCurrentTopTitle(title);
    setCurrentId(id);
    categoryStore.setTopCategory(topCategoryName);
  }

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
            currentTopCategory === "dishes"
              ? "/images/order/dishes.png"
              : currentTopCategory === "desserts"
              ? "/images/order/desserts.png"
              : "/images/order/drinks.png"
          }
          alt=""
          className="w-full h-[416px] object-cover object-top border-b-[0.5px] border-base-brown"
        />
        <section className="wrapper w-full section-wrapper py-16">
          <ul>
            <li className="flex items-center justify-center w-full mb-9">
              <h2 className="text-[53px] text-lite-yellow uppercase">Меню замовлення</h2>
            </li>
            <li className="w-[736px] flex gap-x-14 mx-auto border_menu pb-10">
              {ICONS.map(({ id, Icon, IconHover, topCategoryName, title }) => (
                <button
                  key={id + topCategoryName}
                  className={`w-[208px] h-[208px] flex flex-col items-center justify-between hover:text-base-orange menu-list py-[29px] ${
                    id === currentId ? "text-base-orange" : "text-lite-yellow"
                  }`}
                  onClick={() => handleCahngeCategory(topCategoryName, title, id)}
                  onMouseEnter={() => setCurrentId(id)}
                >
                  <div className="w-[112px] h-[112px] flex pb-6 items-end justify-center">
                    {id === currentId ? <IconHover /> : <Icon />}
                  </div>

                  <p className="text-xl uppercase mx-auto">{title}</p>
                </button>
              ))}
            </li>
          </ul>
          <h3 className="w-full text-center text-[27px] text-lite-yellow uppercase mt-10 mb-8">
            {currentTopTitle}
          </h3>

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
