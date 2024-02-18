/* eslint-disable no-dupe-keys */
import { workTime } from "../helpers/contacts";
import * as icons from "../icons/iconComponent";
import Location from "./Location";

const ContactList = () => {
  return (
    <ul className="w-[180px] flex flex-col gap-y-3">
      <li className="flex gap-x-[6px]">
        <div className="w-6 pt-1">
          <icons.Phone />
        </div>
        <div className="flex flex-col gap-y-[2px]">
          <a href="tel:+380991018181" className="hover:text-base-yellow hover:cursor-pointer">
            +38 099 101 81 81
          </a>
          <a href="tel:+380991018181" className="hover:text-base-yellow hover:cursor-pointer">
            +38 099 101 81 81
          </a>
        </div>
      </li>

      <li className="">
        <Location />
      </li>
      <li className="flex gap-x-[6px] items-center">
        <div className="w-6">
          <icons.Clock />
        </div>
        <span>{workTime}</span>
      </li>
    </ul>
  );
};

export default ContactList;
