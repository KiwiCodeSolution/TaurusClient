import PropTypes from "prop-types";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import { Archive, Minus, Plus, Trash } from "../icons/iconComponent";

const BookingItem = ({ item }) => {
  const { customerName, phoneNumber, email, date, time, numberOfPeople, message } = item;
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");

  return (
    <article className="w-full min-h-[71px] p-2 border-b border-base-brown border-dashed text-sm text-beige flex  flex-col justify-center">
      <div className="w-full h-full flex items-center gap-x-6 px-2 overflow-hidden">
        <p className="w-[117px]">
          {formattedDate} {time}
        </p>
        <p className="w-[188px]">{customerName}</p>
        <div className="w-[342px] max-h-[63px] overflow-hidden">
          <div className="line-clamp-3">
            <p className="block">{message}</p>
          </div>
        </div>
        <p className="w-[109px]">{numberOfPeople}</p>
        <p className="w-[100px]">{status}</p>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div className="mt-2">
          <div className="grid grid-cols-3">
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Email: </span>
              <a href={`mailto:${email}`} className="cursor-pointer">
                {email}
              </a>
            </p>
            <p>
              <span className="text-base font-semibold text-base-yellow">Телефон: </span>
              {phoneNumber}
            </p>

            <p className="col-span-3">
              <span className="text-base font-semibold text-base-yellow">Повідомлення: </span>
              {message}
            </p>
          </div>

          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Trash className={"fill-white w-4 h-4"} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

BookingItem.propTypes = {
  item: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    numberOfPeople: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingItem;
