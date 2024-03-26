import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import orderStore from "../store/order";
import Overlay from "./UI/modal/Overlay";

import CartMenuItem from "../pages/client/CartMenuItem";
import TotalPrice from "./TotalPrice";

const CartPopup = observer(({ clickFn }) => {
  const items = orderStore.order.items;
  console.log(items);

  return (
    <Overlay
      clickFn={clickFn}
      stylesPopUp={"w-[641px] min-h-[319px] flex flex-col items-strt"}
      status={"confirm"}
      type={"cart"}
    >
      <h4 className="text-20 text-lite-yellow uppercase text-center mb-6">Замовлення</h4>
      <div className="mb-20">
        {items.map(({ item }) => (
          <CartMenuItem key={item._id} item={item} />
        ))}
        <TotalPrice />
      </div>
    </Overlay>
  );
});

CartPopup.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default CartPopup;
