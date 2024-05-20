import PropTypes from "prop-types";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import { Archive, Minus, Plus, Trash } from "../icons/iconComponent";

const items = [
  { id: "1", name: "Паста з веганськими болами", quantity: "1", salary: "", price: "250" },
  { id: "2", name: "Фетучіні з курячою грудкою ", quantity: "1", salary: "-", price: "120" },
  { id: "3", name: "Ароматний штрудель", quantity: "1", salary: "-", price: "300" },
];

const OrderItem = ({ item }) => {
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
  } = item;
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd-MM-yyyy");

  const formatOrderNumber = number => {
    return number.toString().padStart(9, "0");
  };

  return (
    <article className="w-full px-2 border-b border-base-brown border-dashed text-sm text-beige">
      <div className="w-full h-[63px] flex items-center gap-x-6 px-2">
        <p className="w-[117px]">
          {formattedDate} {time}
        </p>
        <p className="w-[103px]"># {formatOrderNumber(order_number)}</p>
        <p className="w-[202px]">{name}</p>
        <p className="w-[105px]">{delivery_type} </p>
        <p className="w-[85px]">{total_cost || 0} </p>
        <p className="w-[120px]">{status || "Нове"} </p>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div>
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
            {/* <p>
              <span>:</span>
            </p> */}
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
                products.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.salary}</td>
                    <td>{order.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="w-[238px] px-3 flex justify-between gap-x-6 ml-auto">
            <p className="w-full text-right text-base text-base-yellow font-medium">Всього:</p>
            <p className="w-full text-right text-base text-base-yellow font-medium">390 грн</p>
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

OrderItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    total_cost: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["pending", "progress", "confirmed", "cancelled"]).isRequired,
    products: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired,
    delivery_type: PropTypes.oneOf(["У ресторані", "Доставка"]).isRequired,
    order_number: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderItem;
