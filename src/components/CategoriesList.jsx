/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import categoryStore from "../store/filter";
import dishesStore from "../store/dishes";

import data from "../datas/categories.json";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const CategoriesList = observer(() => {
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

  const [currentCategory, setCurrentCategory] = useState(categoryStore.category);
  const menuItems = data.filter((el) => el.topCategory === categoryStore.topCategory);
  const subMenuItemsDrinks = menuItems[0].subCategory ? menuItems.find((el) => el.category === currentCategory) : null;

  return (
    <div className="w-[1116px] mx-auto">
      {/* блок для субкатегорій, є у категорії напоїв */}
      {categoryStore.topCategory === "drinks" && subMenuItemsDrinks && (
        <div className="w-[735px] flex gap-x-4 justify-between mx-auto">
          {subMenuItemsDrinks.subCategory.map((el) => (
            <button key={el} onClick={() => categoryStore.setSubCategory(el)}>
              {el}
            </button>
          ))}
        </div>
      )}

      <div className="w-full flex gap-x-[46px]">
        {/* бічне меню із розділами */}
        <div className="w-[273px] flex flex-col gap-y-2 pt-7">
          {menuItems.map((el) => (
            <button
              key={el.id}
              onClick={() => setCurrentCategory(el.category)}
              className={`w-full py-[14px] px-2 text-18 uppercase ${
                el.category === currentCategory ? "text-base-orange bg-button-bg" : "text-lite-yellow"
              }  hover:text-base-orange`}
            >
              {el.category}
            </button>
          ))}
        </div>

        {/* центральний блок із переліком страв*/}
        <div className="">
          <div className="w-[546px] flex justify-between mr-auto items-center pb-[14px]">
            <p className="text-14 text-lite-yellow">Назва</p>
            <p className="text-14 text-lite-yellow">Ціна</p>
          </div>
          {dishes.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>

        <div>Total:</div>
      </div>
    </div>
  );
});

export default CategoriesList;
