/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import useMediaQuery from "../hooks/useMediaQuery";
import categoryStore from "../store/filter";
import dishesStore from "../store/dishes";

import { useEffect, useMemo, useState } from "react";
import MenuItem from "./MenuItem";
import TotalPrice from "./TotalPrice";
import MenuDeliveryItem from "./MenuDeliveryItem";
import SubMenuSwiper from "./SubMenuSwiper";
import { Filter } from "../icons/iconComponent";

const CategoriesList = observer(({ page }) => {
  useEffect(() => {
    categoryStore.reset();
  }, []);

  const { isMobile } = useMediaQuery();

  const dishes = useMemo(
    () => dishesStore.dishes.filter(el => el.available && !el.archive),
    [dishesStore.dishes]
  );

  const categories = useMemo(() => {
    const result = isMobile ? ["Показати все"] : [];
    dishes
      .filter(el => el.topCategory === categoryStore.topCategory)
      .forEach(el => {
        if (!result.includes(el.category)) {
          result.unshift(el.category);
        }
      });
    return result;
  }, [dishes, isMobile, categoryStore.topCategory]);

  const [currentCategory, setCurrentCategory] = useState(categories[0] || "");
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");

  useEffect(() => {
    const filteredSubCategories = dishes
      .filter(
        el => el.topCategory === "напої" && el.subCategory !== "" && el.category === currentCategory
      )
      .map(el => el.subCategory)
      .filter((sub, index, self) => self.indexOf(sub) === index);

    setSubCategories(filteredSubCategories);

    if (!filteredSubCategories.includes(currentSubCategory)) {
      setCurrentSubCategory(filteredSubCategories[0] || "");
    }
  }, [dishes, currentCategory]);

  useEffect(() => {
    setCurrentCategory(categories[0] || "");
  }, [categories]);

  const menu = useMemo(() => {
    return currentCategory === "Показати все"
      ? dishes
          .filter(el => el.topCategory === categoryStore.topCategory)
          .sort((a, b) => a.name.localeCompare(b.name))
      : dishes
          .filter(
            el => el.topCategory === categoryStore.topCategory && el.category === currentCategory
          )
          .sort((a, b) => a.name.localeCompare(b.name));
  }, [dishes, currentCategory, categoryStore.topCategory]);

  const subMenuItemsDrinks = useMemo(
    () => dishes.filter(el => el.topCategory === "напої" && el.subCategory !== ""),
    [dishes]
  );

  const menuDrinks = useMemo(
    () =>
      dishes.filter(
        el =>
          el.topCategory === "напої" && el.subCategory === (currentSubCategory || subCategories[0])
      ),
    [dishes, currentSubCategory, subCategories]
  );

  function changeCategory(category) {
    if (isMobile) {
      setIsOpenCategoryFilter(false);
    }
    setCurrentCategory(category);
  }

  function changeSubCategory(sub) {
    setCurrentSubCategory(sub);
    categoryStore.setSubCategory(sub);
  }

  return (
    <>
      <div
        className={`${
          page === "admin" ? "w-[980px] mx-auto h-[247px]" : "w-full md:w-[1116px]"
        } mx-auto categories relative`}
      >
        {/* блок для субкатегорій, є у категорії напоїв */}
        {categoryStore.topCategory === "напої" &&
          subMenuItemsDrinks &&
          (subCategories.length <= 2 ? (
            <div className="hidden w-[735px] md:flex gap-x-4 justify-center mx-auto mb-[18px]">
              {subCategories.map(el => (
                <button
                  key={el}
                  onClick={() => changeSubCategory(el)}
                  className={`text-xl ${
                    el === currentSubCategory
                      ? "text-base-orange hover:underline hover:underline-offset-4"
                      : "text-beige hover:text-base-yellow hover:underline hover:underline-offset-4"
                  } uppercase mx-auto `}
                >
                  {el}
                </button>
              ))}
            </div>
          ) : (
            <SubMenuSwiper items={subCategories} fnc={changeSubCategory} />
          ))}

        {/* категорії та страви для мобілок */}
        <div className="relative md:hidden">
          <button
            className={`w-full h-10 flex items-center justify-between p-1 ${
              isOpenCategoryFilter ? "bg-dark-bg border-b-[1px] border-base-orange" : ""
            }`}
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            <span className="uppercase text--lg- text-base-orange">{currentCategory}</span>
            <Filter />
          </button>
          {isOpenCategoryFilter && (
            <div className="absolute left-0 w-full bg-dark-bg flex flex-col gap-y-1 max-h-[397px] overflow-y-auto z-20">
              {categories.map(el => (
                <button
                  key={el}
                  onClick={() => changeCategory(el)}
                  className="text-base py-1 px-2 text-left uppercase text-beige"
                >
                  {el}
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-col mt-4">
            <div className={`w-full flex justify-between mr-auto items-center mb-4`}>
              <p className="text-14 text-beige">Назва</p>
              <p className="text-14 text-beige">Ціна</p>
            </div>
            {page === "order"
              ? menu.map(item => <MenuDeliveryItem key={item._id} item={item} />)
              : menu.map(item => <MenuItem key={item._id} item={item} section={"menu"} />)}
          </div>
        </div>

        {/* категорії та страви для десктопів */}
        {!isMobile && page !== "admin" && (
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
                    page === "order" ? "w-[546px]" : "w-[831px]"
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
    </>
  );
});

export default CategoriesList;
