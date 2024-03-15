import PropTypes from "prop-types";
import Overlay from "./UI/modal/Overlay";
import * as icons from "../icons/iconComponent";
import { phoneNumber } from "../helpers/contacts";
const telNumber = "+380991018181";

const ITEMS = [
  { id: "1", link: `tel:${telNumber}`, Icon: icons.Phone, text: "Подзвонити" },
  { id: "2", link: `https://t.me/${telNumber}`, Icon: icons.TelegramSecond, text: "Telegram" },
  { id: "3", link: `https://wa.me/${telNumber}`, Icon: icons.WhatsApp, text: "WhatsApp" },
];

const PhoneContactList = ({ clickFn }) => {
  return (
    <Overlay
      clickFn={clickFn}
      componentName={"PhoneContactList"}
      stylesPopUp={"w-[352px] border_overlay flex flex-col"}
    >
      <>
        <h4 className="text-xl uppercase leading-[30px] text-center text-lite-yellow mb-4">
          Оберіть зручний спосіб зв’язку з нами
        </h4>
        <span className="text-lite-yellow text-center mb-1">Наш номер</span>
        <span className="text-lite-yellow text-center mb-4">{phoneNumber}</span>
        <div className="w-full h-[1px] line" />
        <div className="flex flex-col gap-y-5 mt-6 ">
          {ITEMS.map(({ Icon, text, link }) => (
            <a
              key={text}
              href={link}
              target="_blank"
              className="phoneContactList_link px-3 py-2 flex gap-x-2 mx-auto items-center text-base-yellow hover:text-lite-yellow"
            >
              <Icon section="phone" /> <span className=""> {text}</span>
            </a>
          ))}
        </div>
      </>
    </Overlay>
  );
};

PhoneContactList.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default PhoneContactList;
