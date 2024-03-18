import { observer } from "mobx-react-lite";
import orderStore from "../store/order";

import Button from "./UI/Button";
import { Minus, Plus } from "../icons/iconComponent";

const MenuItem = observer(({ item }) => {
  if (!item) {
    return <h3 className="text-lite-yellow ">ВИбачте, сталася помилка</h3>;
  }

  const { _id, name, price, unit, description } = item;

  const value = (_id) => {
    if (orderStore.currentDish(_id)) {
      return orderStore.currentDish(_id).quantity;
    }
    return 0;
  };

  return (
    <article className="w-[831px] flex gap-x-14 mx-auto items-center">
      <ul className="flex flex-col text-lite-yellow w-[546px] overflow-hidden">
        <li className="text-lg uppercase">{name}</li>
        <li className="text-sm flex justify-between">
          <p className="w-fit relative">
            {description} ({unit})
            <span className="w-[90%] absolute top-0 left-[100%] z-0">
              ....................................................................................................................................................................................................................................................................................................................................................................................................
            </span>
          </p>
          <p className="w-fit h-full bg-base-back z-10">{price}грн</p>
        </li>
        <li className="text-xs text-base-brown">Pasta with vegan meatballs and tomato sauce</li>
      </ul>
      <div className="h-[41px] flex py-1 bg-button-bg">
        <Button style={"count"} clickFn={() => orderStore.decreaseQuantity(item)} disabled={value(_id) === 0}>
          <Minus />
        </Button>
        <span
          className={`w-[71px] h-full text-base font-semibold bg-button-bg border-base-brown border-l border-r mx-auto flex justify-center items-center ${
            value(_id) === 0 ? "text-base-brown" : "text-base-orange"
          }`}
        >
          {value(_id) <= 0 ? 0 : value(_id)}
        </span>
        <Button style={"count"} clickFn={() => orderStore.addToCart(item)}>
          <Plus />
        </Button>
      </div>
    </article>
  );
});

export default MenuItem;
