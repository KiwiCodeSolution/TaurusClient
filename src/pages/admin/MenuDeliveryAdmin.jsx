import { observer } from "mobx-react-lite";
import MetaData from "../../components/MetaData";
import CategoryFilter from "../../components/CategoryFilter";
import { useEffect } from "react";
import dishesStore from "../../store/dishes";
import MenuItem from "../../components/MenuItem";
import PageButtons from "../../adminSections/PageButtons";

const buttons = [
  { label: "Додати позицію", link: "/admin/access/site/menu/create" },
  { label: "Архів", link: "/admin/access/site/menu/archive" },
  { label: "Переглянути приховані", link: "/admin/access/site/menu/hide" },
];

const MenuDeliveryAdmin = observer(() => {
  useEffect(() => {
    dishesStore.getDishesAction();
  }, []);

  const dishes = dishesStore.dishes;

  return (
    <>
      <MetaData>Перелік страв</MetaData>
      <section className="mx-auto w-[980px] h-screen admin">
        <CategoryFilter page={"admin"} />
        <PageButtons buttons={buttons} />
        <div className="w-[914px] h-[37px] p-2 flex mx-auto items-center justify-between bg-base-brown text-beige text-14 my-4">
          <span className="w-fit">Назва</span>

          <div className="w-[426px] flex justify-between items-center gap-x-5">
            <span className="w-[73px] text-center">Ціна</span>
            <span className="w-[77px] text-center">Видимість</span>
            <span className="w-[77px] text-center">Архівувати</span>
            <span className="w-[83px] text-center">Редагувати</span>
            <span className="w-[73px] text-center">Видалити</span>
          </div>
        </div>
        <div className="w-[914px] h-[calc(100%-400px)] mx-auto px-4 overflow-auto">
          {dishes.map(item => (
            <MenuItem key={item._id} item={item} section={"admin"} />
          ))}
        </div>
      </section>
    </>
  );
});

export default MenuDeliveryAdmin;
