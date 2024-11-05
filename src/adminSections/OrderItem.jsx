import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import { Archive, ArrowDown, Minus, Plus, Trash } from "../icons/iconComponent";
import adminOrdersStore from "../store/adminOrders";
import authStore from "../store/auth";

const OrderItem = observer(({ item }) => {
  const {
    name,
    email,
    phone,
    time,
    date,
    message,
    total_cost,
    address,
    status,
    products,
    delivery_type,
    order_number,
    archive,
  } = item;
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isShowStatusButtons, setIsShowStatusButtons] = useState(false);

  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");

  const formatOrderNumber = number => number.toString().padStart(9, "0");

  const findProductById = id => products.find(product => product._id === id);

  const currentStatus = {
    pending: "Нове",
    progress: "В роботі",
    cancelled: "Скасовано",
    confirmed: "Виконано",
  };

  const handleStatus = async key => {
    const newOrder = { ...item, status: key };
    await adminOrdersStore.updateOrder(newOrder);
    setIsShowStatusButtons(false);
  };

  const toggleOrderArchive = async () => {
    const newOrder = { ...item, archive: !archive };
    await adminOrdersStore.updateOrder(newOrder);
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

  const deleteOrderItems = async () => {
    await adminOrdersStore.deleteOrder(item);
  };

  return (
    <article
      className={`w-full px-2 border-b border-base-brown border-dashed text-sm text-beige ${
        isOpenOrder ? "bg-dark-bg" : ""
      }`}
    >
      <div
        className={`w-full h-[63px] flex items-center gap-x-6 px-2 ${
          isOpenOrder ? "border-b border-black" : ""
        }`}
      >
        <p className="w-[117px]">
          {formattedDate} {time}
        </p>
        <p className="w-[103px]">#{formatOrderNumber(order_number)}</p>
        <p className="w-[202px]">{name}</p>
        <p className="w-[105px]">{delivery_type} </p>
        <p className="w-[85px]">{total_cost || 0} </p>
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
              <ArrowDown className={status !== "progress" ? "stroke-beige" : "stroke-black"} />
            </button>
          )}
        </div>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div className="py-2">
          {/* контактна інформація */}
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
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Адреса: </span>
              {address}
            </p>

            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Повідомлення: </span>
              {message}
            </p>
          </div>
          {/* перелік страв у замовленні */}
          <table className="w-full border-separate border-spacing-x-6 border-spacing-y-[6px]">
            <thead className="text-left text-base-yellow">
              <tr>
                <th className="w-6">#</th>
                <th className="w-[438px]">Назва</th>
                <th className="w-[105px]">Кількість</th>
                <th className="w-[85px]">Знижка %</th>
                <th className="w-[168px]">Сума, грн.</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((order, index) => {
                  const { product } = findProductById(order._id);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product?.name || "Невідомий продукт"}</td>
                      <td>{order.quantity}</td>
                      <td>{product?.salary || "-"}</td>
                      <td>{product?.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="w-[238px] px-3 flex justify-between gap-x-6 ml-auto">
            <p className="w-full text-right text-base text-base-yellow font-medium">Всього:</p>
            <p className="w-full text-right text-base text-base-yellow font-medium">
              {total_cost} грн
            </p>
          </div>
          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button
              className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
              onClick={toggleOrderArchive}
            >
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            {authStore.user.role === "admin" && (
              <button
                className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center"
                onClick={deleteOrderItems}
              >
                <Trash className={"fill-white w-4 h-4"} />
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
});

OrderItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    total_cost: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["pending", "progress", "confirmed", "cancelled"]).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      })
    ).isRequired,
    delivery_type: PropTypes.oneOf(["У ресторані", "Доставка"]).isRequired,
    order_number: PropTypes.number.isRequired,
    archive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OrderItem;
