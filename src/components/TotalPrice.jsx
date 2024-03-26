import { observer } from "mobx-react-lite";

import ordersStore from "../store/order";

const TotalPrice = observer(() => {
  const totalSum = ordersStore.order.total;

  return (
    <div className="w-full flex justify-end items-center mt-4 uppercase text-16 text-lite-yellow">
      всього:{" "}
      <span className="min-w-[155px] ml-[21px] h-10 py-2 flex justify-center bg-button-bg text-base-orange normal-case">
        {totalSum} грн.
      </span>
    </div>
  );
});

export default TotalPrice;
