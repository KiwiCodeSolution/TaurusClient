import PropTypes from "prop-types";
import NotificationsOverlay from "./UI/modal/NotificationsOverlay";

const ErrorPopup = ({ clickFn }) => {
  return (
    <NotificationsOverlay
      stylesPopUp={"w-[312px] md:w-[572px] h-[319px] flex flex-col items-center"}
      clickFn={clickFn}
    >
      <p className="uppercase text-center text-xl mb-10">Вибачте</p>
      <p className="text-center mb-4">сталася внутрішня помилка сервера.</p>
      <p className="text-center mb-10">
        Наша команда вже працює над вирішенням цього. Будь ласка, спробуйте ще раз пізніше.
      </p>
    </NotificationsOverlay>
  );
};

ErrorPopup.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default ErrorPopup;
