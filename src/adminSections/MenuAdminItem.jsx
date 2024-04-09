import { observer } from "mobx-react-lite";
import MenuItem from "../components/MenuItem";
import { useEffect } from "react";
import dishesStore from "../store/dishes";

const MenuAdminItem = observer(() => {
  useEffect(() => {
    dishesStore.getDishesAction();
  }, []);

  const dishes = dishesStore.dishes;

  return (
    <section className="flex flex-col gp-y-1">
      <div className="w-[914px] flex mx-auto items-center justify-between bg-base-brown text-beige text-14">
        Ціна
        <div className="w-[426px] flex justify-between items-center">
          <span>Ціна</span>
          <span>Акція</span>
          <span>Знижка</span>
          <span>Редагувати</span>
          <span>Видалити</span>
        </div>
      </div>
      {dishes.map(item => (
        <MenuItem key={item._id} item={item} section={"admin"} />
      ))}
    </section>
  );
});

export default MenuAdminItem;
