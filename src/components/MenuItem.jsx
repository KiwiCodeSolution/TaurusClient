import { useState } from "react";
import Button from "./UI/Button";
import { Minus, Plus } from "../icons/iconComponent";

const MenuItem = () => {
  const [value, setValue] = useState(0);

  function counter(type) {
    if (type === "increment") {
      setValue(value + 1);
    }
    if (type === "decrement") {
      setValue(value - 1);
    }
  }

  return (
    <div className="w-[831px] flex gap-x-14 mx-auto items-center">
      <ul className="flex flex-col text-lite-yellow w-[813px] overflow-hidden">
        <li className="text-lg uppercase">ПАСТА З ВЕГАНСЬКИМИ БОЛАМИ</li>
        <li className="text-sm flex justify-between">
          <p className="w-fit relative">
            та томатним соусом (300 г)
            <span className="w-[90%] absolute top-0 left-[100%] z-0">
              ....................................................................................................................................................................................................................................................................................................................................................................................................
            </span>
          </p>
          <p className="w-fit h-full bg-base-back z-10">125грн</p>
        </li>
        <li className="text-xs text-base-brown">Pasta with vegan meatballs and tomato sauce</li>
      </ul>
      <div className="h-[41px] flex py-1 bg-button-bg">
        <Button style={"count"} clickFn={() => counter("decrement")} disabled={value === 0}>
          <Minus />
        </Button>
        <span
          className={`w-[71px] h-full text-base font-semibold bg-button-bg border-base-brown border-l border-r mx-auto flex justify-center items-center ${
            value === 0 ? "text-base-brown" : "text-base-orange"
          }`}
        >
          {value <= 0 ? 0 : value}
        </span>
        <Button style={"count"} clickFn={() => counter("increment")}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
