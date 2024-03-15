import PropTypes from "prop-types";
import Overlay from "./UI/modal/Overlay";
import Button from "./UI/Button";

const ConfirmPopup = ({ clickFn }) => {
  return (
    <Overlay clickFn={clickFn}>
      <p className="uppercase text-center text-xl mb-10">дякуємо</p>
      <p className="text-center mb-4">Ваша заявка на бронювання столику прийнята. </p>
      <p className="text-center mb-10">Наш менеджер зв’яжеться з Вами найближчим часом для підтвержження бронювання.</p>
      <Button style={"orange"} clickFn={clickFn}>
        Закрити
      </Button>
    </Overlay>
  );
};

ConfirmPopup.propTypes = {
  data: PropTypes.object,
  clickFn: PropTypes.func.isRequired,
};

export default ConfirmPopup;
