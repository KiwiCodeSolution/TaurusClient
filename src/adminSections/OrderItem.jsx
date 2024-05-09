import { useState } from "react";
import { Minus, Plus } from "../icons/iconComponent";

const items = [
  { id: "1", name: "Паста з веганськими болами", quantity: "1", salary: "", price: "250" },
  { id: "2", name: "Фетучіні з курячою грудкою ", quantity: "1", salary: "-", price: "120" },
  { id: "3", name: "Ароматний штрудель", quantity: "1", salary: "-", price: "300" },
];

const OrderItem = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  return (
    <article className="w-full px-2 border-b border-base-brown border-dashed text-sm text-beige">
      <div className="w-full h-[63px] flex items-center gap-x-6 px-2">
        <p className="w-[117px]">01-04-2024 12:35</p>
        <p className="w-[103px]">#0000000001</p>
        <p className="w-[202px]">Катерина Олександрівна Коваленко-Бачинська</p>
        <p className="w-[105px]">На місці</p>
        <p className="w-[85px]">1.750,00 </p>
        <p className="w-[120px]">Нове</p>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div>
          <div className="grid grid-cols-3">
            <p className="col-span-2">
              <span>Email: </span> roman_bondarenko@gmail.com
            </p>
            <p>
              <span>Телефон: </span>+38 099 840 96 14
            </p>
            <p className="col-span-2">
              <span>Адреса: </span>кв. 32, буд. 71 вул. Прорізна, м. Харків, Харківська обл.,
              Україна, 83000
            </p>
            <p>
              <span>:</span>
            </p>
            <p className="col-span-2">
              <span>Повідомлення:</span>Вишневий штрудель (3й поверх)
            </p>
          </div>
          <table className="w-full border-separate border-spacing-x-6 border-spacing-y-[6px]">
            <thead className="text-left text-base-yellow font-medium">
              <tr>
                <th className="w-6">#</th>
                <th className="w-[438px]">Назва</th>
                <th className="w-[105px]">Кількість</th>
                <th className="w-[85px]">Знижка %</th>
                <th className="w-[168px]">Сума, грн.</th>
              </tr>
            </thead>
            <tbody>
              {items.map((order, index) => (
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
        </div>
      )}
    </article>
  );
};

export default OrderItem;
