import PropTypes from "prop-types";
import Overlay from "./UI/modal/Overlay";

const ConfirmPopup = ({ clickFn }) => {
  return (
    <Overlay clickFn={clickFn} stylesPopUp={"w-[572px] h-[319px] flex flex-col items-strt"} status={"confirm"}>
      <p className="uppercase text-center text-xl mb-10">дякуємо</p>
      <p className="text-center mb-4">Ваша заявка на бронювання столику прийнята. </p>
      <p className="text-center mb-10">Наш менеджер зв’яжеться з Вами найближчим часом для підтвержження бронювання.</p>
    </Overlay>
  );
};

ConfirmPopup.propTypes = {
  data: PropTypes.object,
  clickFn: PropTypes.func.isRequired,
};

export default ConfirmPopup;
