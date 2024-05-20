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
          ? "w-full flex-col md:flex-row justify-center gap-y-3 md:gap-y-0 gap-x-16 text-beige mb-10 mx-auto"
          : "w-[160px]  md:w-[180px] flex-col gap-y-3"
      }`}
    >
      <li className={`${page === "contacts" ? "order-2 flex flex-col gap-y-3" : "order-1"}`}>
        {page === "contacts" && <p className="font-bold text-center">Телефони</p>}

        <div className="flex gap-x-[6px] justify-center md:justify-start contact_item">
          <div className="w-6 pt-1">
            {page === "contacts" ? <icons.Phone section={"contacts"} /> : <icons.Phone />}
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <a
              href="tel:+380991018181"
              className="hover:text-base-yellow hover:cursor-pointer text-sm"
            >
              +38 099 101 81 81
            </a>
            <a
              href="tel:+380991018181"
              className="hover:text-base-yellow hover:cursor-pointer text-sm"
            >
              +38 099 101 81 81
            </a>
          </div>
        </div>
      </li>

      <li
        className={`${
          page === "contacts" ? "order-1 flex flex-col gap-y-3" : "order-2"
        } contact_item`}
      >
        {page === "contacts" && <p className="font-bold text-center">Адреса</p>}
        {page === "contacts" ? <Location section={"contacts"} /> : <Location />}
      </li>

      <li
        className={`${
          page === "contacts" ? "order-3 flex flex-col gap-y-3" : "order-3 items-center"
        } contact_item`}
      >
        {page === "contacts" && <p className="font-bold text-center">Час роботи</p>}
        <div className="flex gap-x-[6px] justify-center md:justify-start items-center">
          <div className="w-6">
            {page === "contacts" ? <icons.Clock section={"contacts"} /> : <icons.Clock />}
          </div>
          <span className=" text-sm">{workTime}</span>
        </div>
      </li>
    </ul>
  );
};

ContactList.propTypes = {
  page: PropTypes.string,
};

export default ContactList;
