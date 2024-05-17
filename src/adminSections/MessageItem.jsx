import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";
import { useState } from "react";
import { Archive, Minus, Plus, Trash } from "../icons/iconComponent";

const MessageItem = ({ item }) => {
  const { status, name, email, phone, message, createdAt } = item;
  const parsedDate = parseISO(createdAt);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");
  const formattedTime = format(parsedDate, "HH:mm");
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  return (
    <article className="w-full min-h-[71px] p-2 border-b border-base-brown border-dashed text-sm text-beige flex flex-col justify-center">
      <div className="w-full h-[71px] flex items-center gap-x-6 px-2 overflow-hidden">
        <div className="w-[117px] flex flex-col">
          <span>{formattedDate} </span>
          <span>{formattedTime}</span>
        </div>
        <p className="w-[168px]">{name}</p>
        <div className="w-[342px] max-h-[63px] overflow-hidden">
          <div className="line-clamp-3">
            <p className="block">{message}</p>
          </div>
        </div>

        <p className="w-[120px]">{status}</p>
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
              {phone}
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

MessageItem.propTypes = {
  item: PropTypes.shape({
    status: PropTypes.string.isRequired,
    archive: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageItem;
