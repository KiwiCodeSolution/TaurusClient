import { observer } from "mobx-react-lite";
import MetaData from "../../components/MetaData";
import CategoryFilter from "../../components/CategoryFilter";
import { useEffect } from "react";
import dishesStore from "../../store/dishes";
import MenuItem from "../../components/MenuItem";

const MenuDeliveryAdmin = observer(() => {
  useEffect(() => {
    dishesStore.getDishesAction();
  }, []);

  const dishes = dishesStore.dishes;

  return (
    <>
      <MetaData>Перелік страв</MetaData>
      <section className="mx-auto w-[calc(100%-300px)] h-screen admin">
        <CategoryFilter page={"admin"} />
        <div className="w-[914px] h-[37px] py-2 px-4 flex gap-x-5 mx-auto items-center justify-between bg-base-brown text-beige text-14 my-4">
          <span className="w-[488px]">Назва</span>

          <div className="w-[426px] flex justify-between items-center gap-x-5">
            <span className="w-[73px] text-center">Ціна</span>
            <span className="w-[41px] text-center">Акція</span>
            <span className="w-[56px] text-center">Знижка</span>
            <span className="w-[83px] text-center">Редагувати</span>
            <span className="w-[73px] text-center">Видалити</span>
          </div>
        </div>
        <div className="w-[914px] h-[calc(100%-300px)] mx-auto px-4 overflow-auto">
          {dishes.map(item => (
            <MenuItem key={item._id} item={item} section={"admin"} />
          ))}
        </div>
      </section>
    </>
  );
});

export default MenuDeliveryAdmin;
