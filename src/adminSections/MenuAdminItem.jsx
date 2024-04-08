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
    <div className="flex flex-col gp-y-1">
      {dishes.map(item => (
        <MenuItem key={item._id} item={item} section={"admin"} />
      ))}
    </div>
  );
});

export default MenuAdminItem;
