import { useState } from "react";
import { Archive, Minus, Plus, Trash } from "../icons/iconComponent";

const MessageItem = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  return (
    <article className="w-full px-2 border-b border-base-brown border-dashed text-sm text-beige">
      <div className="w-full flex items-center gap-x-6 px-2 overflow-hidden">
        <p className="w-[117px]">01-04-2024 12:35</p>
        <p className="w-[168px]">Катерина Олександрівна Коваленко-Бачинська</p>
        <div className="w-[342px] max-h-[63px] overflow-hidden">
          <div className="line-clamp-3">
            <p className="block">
              Доброго дня! Підкажіть, будь-ласка, скільки коштує аренда приміщення для святкування
              дня народження Доброго дня! Підкажіть, будь-ласка, скільки коштує аренда приміщення
              для святкування дня народження Доброго дня! Підкажіть, будь-ласка, скільки коштує
              аренда приміщення для святкування дня народження
            </p>
          </div>
        </div>

        <p className="w-[120px]">Нове</p>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div>
          <div className="grid grid-cols-3">
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Email: </span>
              <a href="mailto:roman_bondarenko@gmail.com" className="cursor-pointer">
                roman_bondarenko@gmail.com
              </a>
            </p>
            <p>
              <span className="text-base font-semibold text-base-yellow">Телефон: </span>
              +38 099 840 96 14
            </p>

            <p className="col-span-3">
              <span className="text-base font-semibold text-base-yellow">Повідомлення: </span>
              Доброго дня! Підкажіть, будь-ласка, скільки коштує аренда приміщення для святкування
              дня народження Доброго дня! Підкажіть, будь-ласка, скільки коштує аренда приміщення
              для святкування дня народження Доброго дня! Підкажіть, будь-ласка, скільки коштує
              аренда приміщення для святкування дня народження
            </p>
          </div>

          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Trash className={"fill-white w-4 h-4"} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default MessageItem;
