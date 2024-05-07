import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { getAllPromotions } from "../API/promotions";

class Promo {
  promo = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "promo",
      properties: ["promo"],
      storage: window.localStorage,
    });
  }

  getAllPromo = async () => {
    const result = await getAllPromotions();

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.promo = result.data;
    });
  };

  // createDishesAction = async dish => {
  //   const result = await createDish(dish);

  //   runInAction(() => {
  //     if (result.error) {
  //       return;
  //     }
  //   });
  //   this.getDishesAction();

  //   return true;
  // };

  // updateDishesAction = async dish => {
  //   const result = await updateDish(dish);

  //   runInAction(() => {
  //     if (result.error) {
  //       return;
  //     }
  //   });
  //   this.getDishesAction();

  //   return true;
  // };

  // deleteDishesAction = async dish => {
  //   const result = await deleteDish(dish);

  //   runInAction(() => {
  //     if (result.error) {
  //       return;
  //     }
  //   });
  //   this.getDishesAction();

  //   return true;
  // };
}
export default new Promo();
