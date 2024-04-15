/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import categoryStore from "../store/filter";
import dishesStore from "../store/dishes";

import data from "../data/categories.json";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import TotalPrice from "./TotalPrice";
import MenuDeliveryItem from "./MenuDeliveryItem";

const CategoriesList = observer(({ page }) => {
  useEffect(() => {
    setCurrentCategory(
      categoryStore.topCategory === "dishes"
        ? "холодні страви"
        : categoryStore.topCategory === "drinks"
        ? "пиво"
        : "тістечка"
    );
  }, [categoryStore.topCategory]);

  useEffect(() => {
    dishesStore.getDishesAction();
  }, []);

  const dishes = dishesStore.dishes;

  // const isEmpty = products?.length === 0;

  // const totalSum = products.reduce((acc, product) => acc + product.item.price * product.quantity, 0);

  const [currentCategory, setCurrentCategory] = useState(categoryStore.category);
  const menuItems = data.filter(el => el.topCategory === categoryStore.topCategory);
  const subMenuItemsDrinks = menuItems[0].subCategory
    ? menuItems.find(el => el.category === currentCategory)
    : null;

  return (
    <div
      className={`${page === "admin" ? "w-[calc(100%-300px)] h-[247px]" : "w-[1116px]"} mx-auto`}
    >
      {/* блок для субкатегорій, є у категорії напоїв */}
      {categoryStore.topCategory === "drinks" && subMenuItemsDrinks && (
        <div className="w-[735px] flex gap-x-4 justify-between mx-auto">
          {subMenuItemsDrinks.subCategory.map(el => (
            <button key={el} onClick={() => categoryStore.setSubCategory(el)}>
              {el}
            </button>
          ))}
        </div>
      )}

      {page !== "admin" && (
        <>
          <div className="w-full flex gap-x-[46px]">
            {/* бічне меню із розділами */}
            <div className="w-[273px] flex flex-col gap-y-2 pt-7">
              {menuItems.map(el => (
                <button
                  key={el.id}
                  onClick={() => setCurrentCategory(el.category)}
                  className={`w-full py-[14px] px-2 text-18 uppercase ${
                    el.category === currentCategory
                      ? "text-base-orange bg-dark-btn-bg hover:underline hover:underline-offset-4"
                      : "hover:text-base-yellow hover:underline hover:underline-offset-4 text-beige"
                  }`}
                >
                  {el.category}
                </button>
              ))}
            </div>

            {/* центральний блок із переліком страв*/}

            <div className="">
              <div
                className={`${
                  page === "order" ? "w-[546px]" : "w-{831px]"
                } flex justify-between mr-auto items-center pb-[14px]`}
              >
                <p className="text-14 text-beige">Назва</p>
                <p className="text-14 text-beige">Ціна</p>
              </div>
              <div className="flex flex-col gap-y-4">
                {page === "order"
                  ? dishes.map(item => <MenuDeliveryItem key={item._id} item={item} />)
                  : dishes.map(item => <MenuItem key={item._id} item={item} section={"menu"} />)}
              </div>
            </div>
          </div>
          {page === "order" && <TotalPrice />}
        </>
      )}
    </div>
  );
});

export default CategoriesList;
