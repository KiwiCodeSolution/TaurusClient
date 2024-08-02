import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import authStore from "./auth";
import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  updatePromotion,
} from "../API/promotions";

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
    const result = await getAllPromotions(authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.promo = result.data;
    });
  };

  createPromo = async promo => {
    const result = await createPromotion(promo, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getAllPromo();

    return true;
  };

  updatePromo = async promo => {
    const result = await updatePromotion(promo, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getAllPromo();

    return true;
  };

  deletePromo = async promo => {
    const result = await deletePromotion(promo, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getAllPromo();

    return true;
  };
}
export default new Promo();
