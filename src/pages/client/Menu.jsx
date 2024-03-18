import { observer } from "mobx-react-lite";
import categoryStore from "../../store/filter";

import MetaData from "../../components/MetaData";
import { useEffect, useState } from "react";

import * as icons from "../../icons/iconComponent";
import CategoriesList from "../../components/CategoriesList";
import { createDish, getDishes } from "../../API/dishes";
import Button from "../../components/UI/Button";

const ICONS = [
  { id: "1", Icon: icons.Menu, topCategoryName: "dishes", title: "основне меню" },
  { id: "2", Icon: icons.Desserts, topCategoryName: "desserts", title: "десерти" },
  { id: "3", Icon: icons.Drinks, topCategoryName: "drinks", title: "напої" },
];

const Menu = observer(() => {
  useEffect(() => {
    getDishes();
  }, []);

  const dishTest = {
    _id: "65f48751c4fdb09a3720cdcf",
    category: "qqqq13",
    name: "test8",
    discount_price: 823,
    price: 800,
    unit: "g",
    available: false,
    description: "lalalala",
    favourite: true,
  };

  const [currentTopCategory, setCurrentTopCategory] = useState("dishes");
  const [currentTopTitle, setCurrentTopTitle] = useState("основне меню");

  function handleCahngeCategory(topCategoryName, title) {
    setCurrentTopCategory(topCategoryName);
    setCurrentTopTitle(title);
    categoryStore.setTopCategory(topCategoryName);
  }

  function create(dish) {
    createDish(dish);
    console.log("creating.....");
  }

  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <main className="relative w-full">
        <img
          src={
            currentTopCategory === "dishes"
              ? "/images/menu/dishes.jpg"
              : currentTopCategory === "desserts"
              ? "/images/menu/desserts.jpg"
              : "/images/menu/drinks.jpg"
          }
          alt=""
          className="w-full h-[416px] object-cover object-top border-b-[0.5px] border-base-brown"
        />
        <section className="wrapper w-full section-wrapper py-16">
          <ul>
            <li className="flex gap-x-4 items-center justify-center w-full mb-9">
              <icons.Devices />
              <h2 className="text-[53px] text-lite-yellow uppercase">Меню</h2>
            </li>
            <li className="w-[736px] flex gap-x-14 mx-auto border_menu pb-10">
              {ICONS.map(({ id, Icon, topCategoryName, title }) => (
                <button
                  key={id + topCategoryName}
                  className="w-[208px] h-[208px] flex flex-col items-center justify-between text-lite-yellow hover:text-base-orange menu-list py-[29px]"
                  onClick={() => handleCahngeCategory(topCategoryName, title)}
                  // onMouseEnter={() => handleCahngeCategory(topCategoryName, title)}
                >
                  <div className="w-[112px] h-[112px] flex pb-6 items-end justify-center">
                    <Icon />
                  </div>

                  <p className="text-xl uppercase mx-auto">{title}</p>
                </button>
              ))}
            </li>
          </ul>
          <h3 className="w-full text-center text-[27px] text-lite-yellow uppercase mt-10 mb-8">{currentTopTitle}</h3>

          <CategoriesList />
          <Button style={"orange"} clickFn={() => create(dishTest)}>
            Create
          </Button>
        </section>
      </main>
    </>
  );
});

export default Menu;
