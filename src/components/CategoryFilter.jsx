import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as icons from "../icons/iconComponent";
import categoryStore from "../store/filter";

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

const CategoryFilter = observer(({ page }) => {
  const [currentTopTitle, setCurrentTopTitle] = useState("основне меню");

  const [currentId, setCurrentId] = useState("1");

  function handleCahngeCategory(topCategoryName, title, id) {
    // clickFn(topCategoryName);
    setCurrentTopTitle(title);
    setCurrentId(id);
    categoryStore.setTopCategory(topCategoryName);
  }

  return (
    <>
      <ul>
        <li
          className={`${
            page === "admin" ? "mb-10" : "mb-9"
          } flex gap-x-4 items-center justify-center w-full`}
        >
          {page !== "admin" && <icons.Devices />}

          <h2
            className={`${
              page === "admin" ? "text-[32px] mt-12 mb-1" : "text-[53px]"
            }  text-lite-yellow uppercase`}
          >
            Меню
          </h2>
        </li>
        <li
          className={`${
            page !== "admin" ? "w-[736px] border_menu pb-10" : "w-[851px] pb-3"
          } flex gap-x-14 mx-auto`}
        >
          {ICONS.map(({ id, Icon, IconHover, topCategoryName, title }) => (
            <button
              key={id + topCategoryName}
              className={`flex items-center justify-between hover:text-base-orange menu-list py-[29px] ${
                id === currentId ? "text-base-orange  bg-dark-btn-bg" : "text-lite-yellow"
              } ${page === "admin" ? "w-[237px] h-[55px]" : "w-[208px] h-[208px]  flex-col"}`}
              onClick={() => handleCahngeCategory(topCategoryName, title, id)}
              onMouseEnter={() => setCurrentId(id)}
            >
              {page !== "admin" && (
                <div className="w-[112px] h-[112px] flex pb-6 items-end justify-center">
                  {id === currentId ? <IconHover /> : <Icon />}
                </div>
              )}

              <p className="text-xl uppercase mx-auto">{title}</p>
            </button>
          ))}
        </li>
        {page === "admin" && <li className="border_admin_menu w-[916px] mx-auto" />}
      </ul>
      {page !== "admin" && (
        <h3 className="w-full text-center text-[27px] text-lite-yellow uppercase mt-10 mb-8">
          {currentTopTitle}
        </h3>
      )}
    </>
  );
});

export default CategoryFilter;
