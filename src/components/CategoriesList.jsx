/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import categoryStore from "../store/filter";
import dishesStore from "../store/dishes";

import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import TotalPrice from "./TotalPrice";
import MenuDeliveryItem from "./MenuDeliveryItem";

const CategoriesList = observer(({ page }) => {
  const dishes = dishesStore.dishes;

  const categories = [];
  const subCategories = [];

  dishes
    .filter(el => el.topCategory === categoryStore.topCategory)
    .forEach(el => {
      if (!categories.includes(el.category)) {
        categories.push(el.category);
      }
    });

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentSubCategory, setCurrentSubCategory] = useState(subCategories[0]);

  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, [categoryStore.topCategory]);

  const menu = dishes.filter(
    el => el.topCategory === categoryStore.topCategory && el.category === currentCategory
  );

  const subMenuItemsDrinks = dishes.filter(
    el => el.topCategory === "напої" && el.subCategory !== ""
  );

  dishes
    .filter(
      el => el.topCategory === "напої" && el.subCategory !== "" && el.category === currentCategory
    )
    .forEach(el => {
      if (!subCategories.includes(el.subCategory)) {
        subCategories.push(el.subCategory);
      }
    });

  console.log("currentSubCategory", currentSubCategory);

  const menuDrinks = dishes.filter(
    el => el.topCategory === "напої" && el.subCategory === currentSubCategory
  );

  console.log("menuDrinks", menuDrinks);

  function changeCategory(category, subCategory) {
    if (subCategory) {
      setCurrentCategory(category);
      setCurrentSubCategory(subCategory);
    }
    setCurrentSubCategory(subCategory);
  }

  return (
    <div
      className={`${page === "admin" ? "w-[calc(100%-300px)] h-[247px]" : "w-[1116px]"} mx-auto`}
    >
      {/* блок для субкатегорій, є у категорії напоїв */}
      {categoryStore.topCategory === "напої" && subMenuItemsDrinks && (
        <div className="w-[735px] flex gap-x-4 justify-between mx-auto">
          {subCategories.map(el => (
            <button key={el} onClick={() => setCurrentSubCategory(el)}>
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
              {categories.map(el => (
                <button
                  key={el}
                  onClick={() => setCurrentCategory(el)}
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
