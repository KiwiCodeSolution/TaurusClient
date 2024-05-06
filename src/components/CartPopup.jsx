import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import orderStore from "../store/order";
import Overlay from "./UI/modal/Overlay";

import CartMenuItem from "../pages/client/CartMenuItem";
import TotalPrice from "./TotalPrice";

import Button from "./UI/Button";
import { useState } from "react";
import Form from "./Form";

const CartPopup = observer(({ clickFn, formFn }) => {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("У ресторані");

  const items = orderStore.order.items;

  function deliveryChange(option) {
    orderStore.deliveryOption(option);
  }

  function nextStep() {
    deliveryChange(delivery);
    setStep(2);
  }

  return (
    <>
      <Overlay
        clickFn={clickFn}
        stylesPopUp={"w-[680px] min-h-[319px] flex flex-col items-center"}
        status={"confirm"}
        componentName={"cart"}
      >
        <h4 className="w-full text-xl text-beige uppercase text-center mb-6">
          {step === 1 ? "Замовлення" : "Оформлення замовлення"}
        </h4>

        {step === 1 ? (
          <>
            <div className="w-fit p-1 bg-dark-btn-bg rounded-[6px] mx-auto flex gap-x-4 mb-4">
              <Button
                style={"check"}
                clickFn={() => setDelivery("У ресторані")}
                btnClass={
                  delivery === "У ресторані"
                    ? "bg-base-yellow text-base-black"
                    : "hover:text-base-yellow"
                }
              >
                У ресторані
              </Button>
              <Button
                style={"check"}
                clickFn={() => setDelivery("Доставка")}
                btnClass={
                  delivery === "Доставка"
                    ? "bg-base-yellow text-base-black"
                    : "hover:text-base-yellow"
                }
              >
                Доставка
              </Button>
            </div>
            <div className="mb-20 overflow-auto">
              {items.map(item => (
                <CartMenuItem key={item._id} item={item} />
              ))}
              <TotalPrice />
            </div>
            <Button
              btnClass="text-18 font-medium text-base-black"
              style={"orange"}
              clickFn={() => nextStep()}
            >
              Оформити замолення
            </Button>
          </>
        ) : (
          <Form namePage="order" clickFn={formFn} delivery={"Доставка"} />
        )}
      </Overlay>
    </>
  );
});

CartPopup.propTypes = {
  clickFn: PropTypes.func.isRequired,
  formFn: PropTypes.func.isRequired,
};

export default CartPopup;
