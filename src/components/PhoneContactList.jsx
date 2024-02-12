import Overlay from "./UI/modal/Overlay";
import * as icons from "../icons/iconComponent";
const telNumber = "0991018181";

const ITEMS = [
  { id: "1", link: `tel:+38${telNumber}`, Icon: icons.Phone, text: "Подзвонити" },
  { id: "2", link: `https://t.me/+38${telNumber}`, Icon: icons.TelegramSecond, text: "Telegram" },
  { id: "3", link: `https://wa.me/${telNumber}`, Icon: icons.WhatsApp, text: "WhatsApp" },
];

const PhoneContactList = () => {
  return (
    <Overlay>
      <div className="w-[352px] p-10 bg-base-back absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-100 border_overlay mx-auto flex flex-col ">
        <h4 className="text-xl uppercase leading-[30px] text-center text-lite-yellow mb-4">
          Оберіть зручний спосіб зв’язку з нами
        </h4>
        <span className="text-lite-yellow text-center mb-1">Наш номер</span>
        <span className="text-lite-yellow text-center mb-4">+38 {telNumber}</span>
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
        <button className="phoneContactList_button">
          <icons.Cross className={"absolute top-[16px] right-[16px] icon"} />
        </button>
      </div>
    </Overlay>
  );
};

export default PhoneContactList;
