import MetaData from "../../components/MetaData";
import { useState } from "react";

import * as icons from "../../icons/iconComponent";

const ICONS = [
  { id: "1", Icon: icons.Menu, category: "dishes", title: "основне меню" },
  { id: "2", Icon: icons.Desserts, category: "desserts", title: "десерти" },
  { id: "3", Icon: icons.Drinks, category: "drinks", title: "напої" },
];

const Menu = () => {
  const [currentCategory, setCurrentCategory] = useState("dishes");
  const [currentTitle, setCurrentTitle] = useState("основне меню");

  function handleCahngeCategory(category, title) {
    setCurrentCategory(category);
    setCurrentTitle(title);
  }

  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <main className="relative w-full">
        <img
          src={
            currentCategory === "dishes"
              ? "/images/menu/dishes.jpg"
              : currentCategory === "desserts"
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
              {ICONS.map(({ id, Icon, category, title }) => (
                <button
                  key={id + category}
                  className="w-[208px] h-[208px] flex flex-col items-center justify-center text-lite-yellow hover:text-base-orange menu-list"
                  onClick={() => handleCahngeCategory(category, title)}
                  onMouseEnter={() => handleCahngeCategory(category, title)}
                >
                  <Icon />
                  <p className="text-xl uppercase mx-auto mt-8">{title}</p>
                </button>
              ))}
            </li>
          </ul>
          <h3 className="w-full text-center text-[27px] text-lite-yellow uppercase mt-10 mb-8">{currentTitle}</h3>
        </section>
      </main>
    </>
  );
};

export default Menu;
