import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import orderStore from "../store/order";
import { Minus, Plus, Trash } from "../icons/iconComponent";
import Button from "./UI/Button";

const CartMenuItem = observer(({ item }) => {
  if (!item) {
    return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  }

  const { _id, name, price } = item;

  const value = _id => {
    if (orderStore.currentDish(_id)) {
      return orderStore.currentDish(_id).quantity;
    }
    return 0;
  };

  return (
    <article className="w-[263px] xl:w-[561px] xl:h-[54px] flex flex-col gap-y-1 xl:gap-y-0 xl:flex-row xl:items-center gap-x-6 border-b border-dashed border-base-brown pr-[10px] py-2 xl:py-0 relative">
      <div className="w-full xl:w-[316px] text-sm normal-case">{name}</div>
      <div className="w-[72px] h-[29px] flex gap-x-1 py-1 bg-dark-btn-bg">
        <Button
          style={"count"}
          clickFn={() => orderStore.decreaseQuantity(item)}
          disabled={value(_id) === 0}
        >
          <Minus />
        </Button>
        <span
          className={`h-full text-sm bg-dark-btn-bg mx-auto flex justify-center items-center text-beige font-medium
          `}
        >
          {value(_id) <= 0 ? 0 : value(_id)}
        </span>
        <Button style={"count"} clickFn={() => orderStore.addToCart(item)}>
          <Plus />
        </Button>
      </div>
      <div className="text-sm font-semibold text-base-yellow">{price} грн</div>
      <button
        className="absolute top-1/3 right-1 xl:static xl:ml-auto trash"
        onClick={() => orderStore.removeDish(_id)}
      >
        <Trash className={"fill-beige"} />
      </button>
    </article>
  );
});

CartMenuItem.propTypes = {
  item: PropTypes.object,
};

export default CartMenuItem;
