import { useState } from "react";
import { Archive, Minus, Plus, Trash } from "../icons/iconComponent";

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
          {/* контактна інформація */}
          <div className="grid grid-cols-3">
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Email: </span>
              <a href="mailto:roman_bondarenko@gmail.com" className="cursor-pointer">
                roman_bondarenko@gmail.com
              </a>
            </p>
            <p>
              <span className="text-base font-semibold text-base-yellow">Телефон: </span>
              +38 099 840 96 14
            </p>
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Адреса: </span>кв. 32, буд.
              71 вул. Прорізна, м. Харків, Харківська обл., Україна, 83000
            </p>
            {/* <p>
              <span>:</span>
            </p> */}
            <p className="col-span-2">
              <span className="text-base font-semibold text-base-yellow">Повідомлення: </span>
              Вишневий штрудель (3й поверх)
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

export default OrderItem;
