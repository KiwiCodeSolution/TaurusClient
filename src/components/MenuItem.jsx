import { observer } from "mobx-react-lite";
import { Trash, Edit, Hide, Archive } from "../icons/iconComponent";
import { Link, useLocation } from "react-router-dom";
import dishesStore from "../store/dishes";
import { useState } from "react";
import ConfirmModalAdmin from "../adminSections/modal/ConfirmModalAdmin";

const MenuItem = observer(({ item, section, archive }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationType, setOperationType] = useState("");

  if (!item) {
    return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  }

  const { name, price, description, _id, englishName, weight } = item;

  const handleAvailableChange = async () => {
    const updatedItem = { ...item, available: !item.available };
    await dishesStore.updateDishesAction(updatedItem);
  };

  const handleArchiveChange = async () => {
    const updatedItem = { ...item, archive: true };
    await dishesStore.updateDishesAction(updatedItem);
  };

  function openModal(type) {
    setIsModalOpen(true);
    setOperationType(type);
  }

  return (
    <>
      <article
        className={`${
          section === "admin"
            ? "gap-x-5 min-h-[74px] border-b border-base-brown border-dashed"
            : "w-full md:w-[831px] md:gap-x-14 mb-4 md:mb-0"
        } flex mx-auto items-center justify-between`}
      >
        <ul
          className={`flex flex-col text-beige overflow-hidden ${
            section === "order" ? "w-[546px]" : section === "admin" ? "w-[488px]" : "w-full"
          }`}
        >
          <li className="text-sm md:text-lg uppercase">{name}</li>
          <li className="text-sm flex gap-x-2 justify-between">
            <p className="w-fit relative">
              {description} ({weight}, г)
              <span className="hidden md:block w-[90%] absolute top-0 left-[100%] z-0">
                ....................................................................................................................................................................................................................................................................................................................................................................................................
              </span>
            </p>
            {section !== "admin" && <p className="w-fit h-full bg-base-black z-10">{price}грн</p>}
          </li>
          <li className="text-sm md:text-xs font-medium text-base-brown">{englishName}</li>
        </ul>
        {section === "admin" && (
          <ul className="w-[426px] flex justify-between items-center gap-x-5">
            <li className="w-[73px] flex items-center justify-center bg-dark-bg text-base-yellow text-14 font-semibold mx-auto">
              {price}грн.
            </li>
            <li className="w-[77px] flex items-center justify-center">
              <button className="cursor-pointer" onClick={() => openModal("hide")}>
                <Hide className={"fill-beige hover:fill-base-orange"} />
              </button>
            </li>

            {!archive && (
              <li className="w-[77px] flex items-center justify-center">
                <button className="cursor-pointer" onClick={() => openModal("archive")}>
                  <Archive className={"fill-beige hover:fill-base-orange"} />
                </button>
              </li>
            )}

            <li className="w-[83px] flex items-center justify-center">
              <Link
                className="cursor-pointer"
                to={`/admin/access/site/menu/${_id}`}
                state={{ from: location }}
              >
                <Edit className={"fill-beige hover:fill-base-orange"} />
              </Link>
            </li>
            <li className="w-[73px] flex items-center justify-center">
              <button className="cursor-pointer" onClick={() => openModal("delete")}>
                <Trash className={"fill-beige hover:fill-base-orange"} />
              </button>
            </li>
          </ul>
        )}
      </article>

      {isModalOpen && (
        <ConfirmModalAdmin
          chancelFn={() => setIsModalOpen(false)}
          confirmFn={
            operationType === "hide"
              ? () => handleAvailableChange()
              : operationType === "archive"
              ? () => handleArchiveChange()
              : () => dishesStore.deleteDishesAction(item)
          }
        >
          <p className="w-[218px] text-lg uppercase text-beige mb-8 text-center">
            {operationType === "hide"
              ? "Приховати"
              : operationType === "archive"
              ? "Підтвердження Aрхівування"
              : "Підтвердження видалення"}
          </p>
          <p className="text-beige text-base mb-12 text-center">
            Ви впевнені, що хочете{" "}
            {operationType === "hide"
              ? "приховати"
              : operationType === "archive"
              ? "архівувати"
              : "видалити"}
            ?
          </p>
        </ConfirmModalAdmin>
      )}
    </>
  );
});

export default MenuItem;
