import { observer } from "mobx-react-lite";
import CategoryFilter from "../../components/CategoryFilter";
import { useEffect } from "react";
import dishesStore from "../../store/dishes";
import MenuItem from "../../components/MenuItem";

const MenuAdmin = observer(() => {
  useEffect(() => {
    dishesStore.getDishesAction();
  }, []);

  const dishes = dishesStore.dishes;
  return (
    <section className="mx-auto w-[calc(100%-300px)]">
      <CategoryFilter page={"admin"} />
      {dishes.map(item => (
        <MenuItem key={item._id} item={item} section={"admin"} />
      ))}
    </section>
  );
});

export default MenuAdmin;
