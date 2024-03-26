import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import orderStore from "../../store/order";
import { Minus, Plus, Trash } from "../../icons/iconComponent";
import Button from "../../components/UI/Button";

const CartMenuItem = observer(({ item }) => {
  if (!item) {
    return <h3 className="text-lite-yellow ">Вибачте, сталася помилка</h3>;
  }

  const { _id, name, price } = item;

  const value = (_id) => {
    if (orderStore.currentDish(_id)) {
      return orderStore.currentDish(_id).quantity;
    }
    return 0;
  };

  return (
    <article className="w-[561px] h-[54px] flex items-center gap-x-6 border-b border-dashed border-base-brown pr-[10px]">
      <div className="w-[316px] text-sm normal-case">{name}</div>
      <div className="w-[72px] h-[29px] flex gap-x-1 py-1 bg-button-bg">
        <Button style={"count"} clickFn={() => orderStore.decreaseQuantity(item)} disabled={value(_id) === 0}>
          <Minus />
        </Button>
        <span
          className={`h-full text-sm bg-button-bg mx-auto flex justify-center items-center text-lite-yellow font-medium
          `}
        >
          {value(_id) <= 0 ? 0 : value(_id)}
        </span>
        <Button style={"count"} clickFn={() => orderStore.addToCart(item)}>
          <Plus />
        </Button>
      </div>
      <div className="text-sm font-semibold text-base-yellow">{price} грн</div>
      <button className="ml-auto trash" onClick={() => orderStore.removeDish(_id)}>
        <Trash />
      </button>
    </article>
  );
});

CartMenuItem.propTypes = {
  item: PropTypes.object,
};

export default CartMenuItem;
