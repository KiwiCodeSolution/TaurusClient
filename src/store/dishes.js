import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { getDishes, createDish, updateDish, deleteDish } from "../API/dishes";

class Dishes {
  dishes = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "dishes",
      properties: ["dishes"],
      storage: window.localStorage,
    });
  }

  getDishesAction = async () => {
    const result = await getDishes();

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.dishes = result.data;
    });
  };

  createDishesAction = async (dish) => {
    const result = await createDish(dish);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getDishesAction();

    return true;
  };

  updateDishesAction = async (dish) => {
    const result = await updateDish(dish);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getDishesAction();

    return true;
  };
}
export default new Dishes();
