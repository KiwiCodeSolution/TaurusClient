import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { getDishes, createDish, updateDish, deleteDish } from "../API/dishes";
import authStore from "./auth";

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

  createDishesAction = async dish => {
    const result = await createDish(dish, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getDishesAction();

    return true;
  };

  updateDishesAction = async dish => {
    console.log(authStore.token);
    const result = await updateDish(dish, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getDishesAction();

    return true;
  };

  deleteDishesAction = async dish => {
    const result = await deleteDish(dish, authStore.token);

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
