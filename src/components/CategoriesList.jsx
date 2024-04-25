/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";

import categoryStore from "../store/filter";
import dishesStore from "../store/dishes";

import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import TotalPrice from "./TotalPrice";
import MenuDeliveryItem from "./MenuDeliveryItem";
import SubMenuSwiper from "./SubMenuSwiper";

const CategoriesList = observer(({ page }) => {
  useEffect(() => {
    categoryStore.reset();
  }, []);

  const dishes = dishesStore.dishes;

  const categories = []; //бічне меню
  const subCategories = []; //суб меню у напоях

  //формуємо бічне меню

  dishes
    .filter(el => el.topCategory === categoryStore.topCategory)
    .forEach(el => {
      if (!categories.includes(el.category)) {
        categories.push(el.category);
      }
    });

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categoryStore.topCategory]);

  // виводимо страви в залежності від топ та бічного меню
  const menu = dishes.filter(
    el => el.topCategory === categoryStore.topCategory && el.category === currentCategory
  );

  // всі елементи у розділі напоїв
  const subMenuItemsDrinks = dishes.filter(
    el => el.topCategory === "напої" && el.subCategory !== ""
  );

  // формуємо суб меню: топ = напої, суб не пусто та поточна категорія
  dishes
    .filter(
      el => el.topCategory === "напої" && el.subCategory !== "" && el.category === currentCategory
    )
    .forEach(el => {
      if (!subCategories.includes(el.subCategory)) {
        subCategories.push(el.subCategory);
      }
    });

  //формуємо переік напоїв, які вібповідають активному бічному меню та меню зверху.
  const menuDrinks = dishes.filter(
    el => el.topCategory === "напої" && el.subCategory === (currentSubCategory || subCategories[0])
  );

  function changeCategory(category) {
    setCurrentCategory(category);
    setCurrentSubCategory("");
  }

  function changeSubCategory(sub) {
    setCurrentSubCategory(sub);
    categoryStore.setSubCategory(sub);
  }

  return (
    <div
      className={`${
        page === "admin" ? "w-[calc(100%-300px)] h-[247px]" : "w-[1116px]"
      } mx-auto categories relative`}
    >
      {/* блок для субкатегорій, є у категорії напоїв */}
      {categoryStore.topCategory === "напої" && subMenuItemsDrinks && (
        // <div className="w-[735px] flex gap-x-4 justify-between mx-auto">
        <SubMenuSwiper items={subCategories} fnc={changeSubCategory} />
        // </div>
      )}

      {page !== "admin" && (
        <>
          <div className="w-full flex gap-x-[46px]">
            {/* бічне меню із розділами */}
            <div className="w-[273px] flex flex-col gap-y-2 pt-7">
              {categories.map(el => (
                <button
                  key={el}
                  onClick={() => changeCategory(el)}
                  className={`w-full py-[14px] px-2 text-18 uppercase ${
                    el === currentCategory
                      ? "text-base-orange bg-dark-btn-bg hover:underline hover:underline-offset-4"
                      : "hover:text-base-yellow hover:underline hover:underline-offset-4 text-beige"
                  }`}
                >
                  {el}
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

              {/* не напої */}

              {categoryStore.topCategory !== "напої" && (
                <div className="flex flex-col gap-y-4">
                  {page === "order"
                    ? menu.map(item => <MenuDeliveryItem key={item._id} item={item} />)
                    : menu.map(item => <MenuItem key={item._id} item={item} section={"menu"} />)}
                </div>
              )}

              {/* напої */}
              {categoryStore.topCategory === "напої" && (
                <div className="flex flex-col gap-y-4">
                  {page === "order"
                    ? menuDrinks.map(item => <MenuDeliveryItem key={item._id} item={item} />)
                    : menuDrinks.map(item => (
                        <MenuItem key={item._id} item={item} section={"menu"} />
                      ))}
                </div>
              )}
            </div>
          </div>
          {page === "order" && <TotalPrice />}
        </>
      )}
    </div>
  );
});

export default CategoriesList;
