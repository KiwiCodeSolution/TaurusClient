/* eslint-disable no-dupe-keys */
import PropTypes from "prop-types";
import { workTime } from "../helpers/contacts";
import * as icons from "../icons/iconComponent";
import Location from "./Location";

const ContactList = ({ page }) => {
  return (
    <ul
      className={`flex ${
        page === "contacts"
          ? "w-full justify-center gap-x-16 text-lite-yellow mb-10 mx-auto"
          : "w-[180px] flex-col gap-y-3"
      }`}
    >
      <li className={`${page === "contacts" ? "order-2 flex flex-col gap-y-3" : "order-1"}`}>
        {page === "contacts" && <p className="font-bold">Телефони</p>}

        <div className="flex gap-x-[6px] contact_item">
          <div className="w-6 pt-1">{page === "contacts" ? <icons.Phone section={"contacts"} /> : <icons.Phone />}</div>
          <div className="flex flex-col gap-y-[2px]">
            <a href="tel:+380991018181" className="hover:text-base-yellow hover:cursor-pointer">
              +38 099 101 81 81
            </a>
            <a href="tel:+380991018181" className="hover:text-base-yellow hover:cursor-pointer">
              +38 099 101 81 81
            </a>
          </div>
        </div>
      </li>

      <li className={`${page === "contacts" ? "order-1 flex flex-col gap-y-3" : "order-2"} contact_item`}>
        {page === "contacts" && <p className="font-bold">Адреса</p>}
        {page === "contacts" ? <Location section={"contacts"} /> : <Location />}
      </li>

      <li
        className={`${page === "contacts" ? "order-3 flex flex-col gap-y-3" : "order-3  items-center"}  contact_item`}
      >
        {page === "contacts" && <p className="font-bold">Час роботи</p>}
        <div className="flex gap-x-[6px] ">
          <div className="w-6">{page === "contacts" ? <icons.Clock section={"contacts"} /> : <icons.Clock />}</div>
          <span>{workTime}</span>
        </div>
      </li>
    </ul>
  );
};

ContactList.propTypes = {
  page: PropTypes.string,
};

export default ContactList;
