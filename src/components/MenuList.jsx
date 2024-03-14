import { useState } from "react";
import { Devices } from "../icons/iconComponent";
import * as icons from "../icons/iconComponent";

const ICONS = [
  { id: "1", Icon: icons.Menu, category: "dishes", title: "основне меню" },
  { id: "2", Icon: icons.Desserts, category: "desserts", title: "десерти" },
  { id: "3", Icon: icons.Drinks, category: "drinks", title: "напої" },
];

const MenuList = () => {
  const [currentCategory, setCurrentCategory] = useState();

  console.log(currentCategory);

  return (
    <div>
      <ul>
        <li className="flex gap-x-4 items-center justify-center w-full mb-9">
          <Devices />
          <h2 className="text-[53px] text-lite-yellow uppercase">Меню</h2>
        </li>
        <li className="w-[736px] flex gap-x-14 mx-auto">
          {ICONS.map(({ id, Icon, category, title }) => (
            <button
              key={id + category}
              className="w-[208px] h-[208px] flex flex-col items-center justify-center text-lite-yellow hover:text-base-orange menu-list"
              onClick={() => setCurrentCategory(category)}
            >
              <Icon />
              <p className="text-xl uppercase mx-auto mt-8">{title}</p>
            </button>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default MenuList;
