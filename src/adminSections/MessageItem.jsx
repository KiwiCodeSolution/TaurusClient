import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";
import { useState } from "react";
import { Archive, ArrowDown, Minus, Plus, Trash } from "../icons/iconComponent";
import feedbackStore from "../store/feedback";
import { prefix } from "../helpers/styles";

const MessageItem = ({ item }) => {
  const { status, name, email, phone, message, createdAt, archive } = item;
  const parsedDate = parseISO(createdAt);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");
  const formattedTime = format(parsedDate, "HH:mm");
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [isShowStatusButtons, setIsShowStatusButtons] = useState(false);

  const currentStatus = {
    new: "Нове",
    in_progress: "В роботі",
    completed: "Виконано",
  };

  const getStatusClass = status => {
    switch (status) {
      case "new":
        return "bg-[#025FA1] text-beige hover:opacity-80";
      case "in_progress":
        return "bg-[#FB9C26] text-black hover:opacity-80";
      case "completed":
        return "bg-[#107300] text-beige hover:opacity-80";
      default:
        return "";
    }
  };

  const handleStatus = async key => {
    const newMessage = { ...item, status: key };
    await feedbackStore.updateFeedbackAction(newMessage);
    setIsShowStatusButtons(false);
  };

  const toggleMessageArchive = async () => {
    const newMessage = { ...item, archive: !archive };
    await feedbackStore.updateFeedbackAction(newMessage);
  };

  const deleteMessage = async () => {
    await feedbackStore.deleteMessageAction(item);
  };

  function removeServicePagePrefix(message) {
    if (message.startsWith(prefix)) {
      return message.slice(prefix.length).trim(); // Видаляє префікс та зайві пробіли на початку
    }
    return message;
  }

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
      className={`w-full min-h-[71px] p-2 border-b border-base-brown border-dashed text-sm text-beige flex flex-col justify-center  ${
        isOpenMessage ? "bg-dark-bg" : ""
      }`}
    >
      <div
        className={`w-full h-[71px] flex items-center gap-x-6 px-2  ${
          isOpenMessage ? "border-b border-black" : ""
        }`}
      >
        <div className="w-[117px] flex flex-col">
          <span>{formattedDate} </span>
          <span>{formattedTime}</span>
        </div>
        <p className="w-[168px]">{name}</p>
        <div className="w-[342px] max-h-[63px] overflow-hidden">
          <div className="line-clamp-3">
            <p className="block">{removeServicePagePrefix(message)}</p>
          </div>
        </div>

        <div className="w-[120px] h-8 relative">
          {isShowStatusButtons ? (
            <StatusButtons />
          ) : (
            <button
              className={`w-full h-full rounded-[3px] flex items-center justify-between pl-1 pr-3 ${getStatusClass(
                status
              )}`}
              onClick={() => setIsShowStatusButtons(true)}
            >
              {currentStatus[status]}
              <ArrowDown className={status !== "in_progress" ? "stroke-beige" : "stroke-black"} />
            </button>
          )}
        </div>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenMessage(!isOpenMessage)}
        >
          {isOpenMessage ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenMessage && (
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
              {removeServicePagePrefix(message)}
            </p>
          </div>

          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button
              className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
              onClick={toggleMessageArchive}
            >
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            <button
              className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
              onClick={deleteMessage}
            >
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
    status: PropTypes.oneOf(["new", "in_progress", "completed"]).isRequired,
    archive: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageItem;
