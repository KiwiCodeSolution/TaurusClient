import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { getDishes, createDish, updateDish, deleteDish } from "../API/dishes";
import authStore from "./auth";

class Dishes {
  dishes = [];
  isProcessing = false;
  navigate = null;
  isError = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "dishes",
      properties: ["dishes"],
      storage: window.localStorage,
    });
  }
  setNavigate(navigateFunction) {
    this.navigate = navigateFunction; // Метод для встановлення функції navigate
  }

  fulfilled() {
    this.isProcessing = false;
    this.navigate("/admin/access/site/menu");
    this.getDishesAction();
  }

  getDishesAction = async () => {
    this.isProcessing = true;
    const result = await getDishes();

    runInAction(() => {
      if (result.data) {
        this.isProcessing = false;
        this.dishes = result.data;
      }
      if (result.error) {
        this.isProcessing = false;
        return;
      }
    });
  };

  createDishesAction = async dish => {
    this.isProcessing = true;
    const result = await createDish(dish, authStore.token);

    runInAction(() => {
      if (result.data) {
        this.fulfilled();
      }
      if (result.error) {
        this.isProcessing = false;
        this.isError = true;

        return;
      }
    });

    return true;
  };

  updateDishesAction = async dish => {
    this.isProcessing = true;
    const result = await updateDish(dish, authStore.token);

    runInAction(() => {
      if (result.data) {
        this.fulfilled();
      }
      if (result.error) {
        this.isProcessing = false;
        this.isError = true;
        return;
      }
    });

    return true;
  };

  updateAvailableDishesAction = async dish => {
    this.isProcessing = true;
    const result = await updateDish(dish, authStore.token);

    runInAction(() => {
      if (result.data) {
        this.isProcessing = false;

        this.getDishesAction();
      }
      if (result.error) {
        this.isProcessing = false;
        this.isError = true;
        return;
      }
    });

    return true;
  };

  deleteDishesAction = async dish => {
    this.isProcessing = true;
    const result = await deleteDish(dish, authStore.token);

    runInAction(() => {
      if (result.data) {
        this.fulfilled();
      }
      if (result.error) {
        this.isProcessing = false;
        this.getDishesAction();
        return;
      }
    });

    return true;
  };
}
export default new Dishes();
