import { observer } from "mobx-react-lite";
import orderStore from "../store/order";

import Button from "./UI/Button";
import { Minus, Plus } from "../icons/iconComponent";
import MenuItem from "./MenuItem";

const MenuDeliveryItem = observer(({ item }) => {
  if (!item) {
    return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  }

  const { _id } = item;

  const value = _id => {
    if (orderStore.currentDish(_id)) {
      return orderStore.currentDish(_id).quantity;
    }
    return 0;
  };

  return (
    <article className="w-[831px] flex gap-x-14 mx-auto items-center justify-between">
      <MenuItem item={item} section={"order"} />
      <div className="h-[41px] flex py-1 bg-dark-btn-bg">
        <Button
          style={"count"}
          clickFn={() => orderStore.decreaseQuantity(item)}
          disabled={value(_id) === 0}
        >
          <Minus />
        </Button>
        <span
          className={`w-[71px] h-full text-base font-semibold bg-dark-btn-bg border-base-brown border-l border-r mx-auto flex justify-center items-center ${
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

export default MenuDeliveryItem;
