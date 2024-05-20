import PropTypes from "prop-types";

import NotificationsOverlay from "./UI/modal/NotificationsOverlay";

const ConfirmPopup = ({ type, clickFn }) => {
  return (
    <NotificationsOverlay
      stylesPopUp={"w-[312px] md:w-[572px] h-[319px] flex flex-col items-center"}
      clickFn={clickFn}
    >
      {type === "booking" && (
        <>
          <p className="uppercase text-center text-xl mb-10">дякуємо</p>
          <p className="text-center mb-4">Ваша заявка на бронювання столику прийнята. </p>
          <p className="text-center mb-10">
            Наш менеджер зв’яжеться з Вами найближчим часом для підтвержження бронювання.
          </p>
        </>
      )}
      {type === "cart" && (
        <>
          <p className="uppercase text-center text-xl mb-10">дякуємо!</p>
          <p className="text-center mb-4">Ваше замовлення прийнято.</p>
          <p className="text-center mb-10">Наш менеджер зв’яжеться з Вами найближчим часом.</p>
        </>
      )}
      {type === "contact" && (
        <>
          <p className="uppercase text-center text-xl mb-10">дякуємо!</p>
          <p className="text-center mb-4">Вашe повідомлення відправлено.</p>
          <p className="text-center mb-10">Наш менеджер зв’яжеться з Вами найближчим часом.</p>
        </>
      )}
    </NotificationsOverlay>
  );
};

ConfirmPopup.propTypes = {
  type: PropTypes.string,
  clickFn: PropTypes.func.isRequired,
};

export default ConfirmPopup;
