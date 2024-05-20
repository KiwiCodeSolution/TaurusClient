import PropTypes from "prop-types";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import { Archive, ArrowDown, Minus, Plus, Trash } from "../icons/iconComponent";
import reservationsStore from "../store/reservations";

const BookingItem = ({ item }) => {
  const { customerName, phoneNumber, email, date, time, numberOfPeople, message, archive, status } =
    item;
  const [isOpenItem, setIsOpenItem] = useState(false);
  const [isShowStatusButtons, setIsShowStatusButtons] = useState(false);
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");

  const currentStatus = {
    pending: "Нове",
    progress: "В роботі",
    cancelled: "Скасовано",
    confirmed: "Виконано",
  };

  const handleStatus = async key => {
    const newItem = { ...item, status: key };
    await reservationsStore.updateReserveAction(newItem);
    setIsShowStatusButtons(false);
  };

  const toggleItemArchive = async () => {
    const newItem = { ...item, archive: !archive };
    await reservationsStore.updateReserveAction(newItem);
  };

  const deleteItem = async () => {
    await reservationsStore.deleteReserveAction(item);
  };

  const getStatusClass = status => {
    switch (status) {
      case "pending":
        return "bg-[#025FA1] text-beige hover:opacity-80";
      case "progress":
        return "bg-[#FB9C26] text-black hover:opacity-80";
      case "cancelled":
        return "bg-[#EA183B] text-beige hover:opacity-80";
      case "confirmed":
        return "bg-[#107300] text-beige hover:opacity-80";
      default:
        return "";
    }
  };

  const StatusButtons = () => {
    const statusEntries = Object.entries(currentStatus);

    return (
      <div
        className="w-[120px] h-8 absolute top-0 left-0 z-[10]"
        onMouseLeave={() => setIsShowStatusButtons(false)}
      >
        {statusEntries.map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleStatus(key)}
            className={`w-[120px] h-8 rounded-[3px] ${getStatusClass(key)}`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  return (
    <article
      className={`w-full min-h-[71px] p-2 border-b border-base-brown border-dashed text-sm text-beige flex flex-col justify-center ${
        isOpenItem ? "bg-dark-bg" : ""
      }`}
    >
      <div
        className={`w-full h-full flex items-center gap-x-6 px-2 ${
          isOpenItem ? "border-b border-black" : ""
        }`}
      >
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
        <div className="w-[120px] h-8 relative">
          {isShowStatusButtons ? (
            <StatusButtons />
          ) : (
            <button
              className={`w-[120px] h-8 rounded-[3px] flex items-center justify-between pl-1 pr-3 ${getStatusClass(
                status
              )}`}
              onClick={() => setIsShowStatusButtons(true)}
            >
              {currentStatus[status]}
              <ArrowDown className={status !== "progress" ? "stroke-beige" : "stroke-black"} />
            </button>
          )}
        </div>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenItem(!isOpenItem)}
        >
          {isOpenItem ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenItem && (
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
            <button
              className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
              onClick={toggleItemArchive}
            >
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            <button
              className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
              onClick={deleteItem}
            >
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
    status: PropTypes.oneOf(["pending", "progress", "confirmed", "cancelled"]).isRequired,
    archive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default BookingItem;
