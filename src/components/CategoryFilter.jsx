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

  function handleChangeCategory(topCategoryName, title, id) {
    setCurrentTopTitle(title);
    setCurrentId(id);
    categoryStore.setTopCategory(topCategoryName);
  }

  // function handleId(id) {
  //   if (page !== "admin") {
  //     setCurrentId(id);
  //   }
  //   return;
  // }

  return (
    <>
      <ul>
        <li
          className={`${
            page === "admin" ? "mb-10" : "mb-9"
          } flex gap-x-4 items-center justify-center w-full`}
        >
          {page !== "admin" && <icons.Devices />}

          <h1
            className={`${
              page === "admin" ? "text-[32px] mt-12 mb-1" : "text-[53px]"
            }  text-beige uppercase`}
          >
            Меню
          </h1>
        </li>
        <li
          className={`${
            page !== "admin" ? "w-[736px] border_menu pb-10" : "w-[851px] pb-3"
          } flex gap-x-14 mx-auto`}
        >
          {ICONS.map(({ id, Icon, IconHover, topCategoryName, title }) => (
            <button
              key={id + topCategoryName}
              className={`flex items-center justify-between hover:underline hover:underline-offset-4 menu-list py-[29px] ${
                id === currentId
                  ? "text-base-orange hover:underline hover:underline-offset-4"
                  : "text-beige"
              } 
              ${
                page === "admin"
                  ? "w-[237px] h-[55px] hover:text-base-yellow"
                  : "w-[208px] h-[208px] flex-col"
              }
               ${page === "admin" && id === currentId ? "bg-dark-btn-bg" : ""}
               `}
              onClick={() => handleChangeCategory(topCategoryName, title, id)}
              // onMouseEnter={() => handleId(id)}
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
        <h3 className="w-full text-center text-[27px] text-beige uppercase mt-10 mb-8">
          {currentTopTitle}
        </h3>
      )}
    </>
  );
});

export default CategoryFilter;
