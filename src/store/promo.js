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
  isProcessing = false;
  navigate = null;
  isError = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "promo",
      properties: ["promo"],
      storage: window.localStorage,
    });
  }

  setNavigate(navigateFunction) {
    this.navigate = navigateFunction; // Метод для встановлення функції navigate
  }

  fulfilled() {
    this.isProcessing = false;
    this.navigate("/admin/access/site/promo");
    this.getAllPromo();
  }

  getAllPromo = async () => {
    this.isProcessing = true;
    const result = await getAllPromotions(authStore.token);

    runInAction(() => {
      if (result.data) {
        this.isProcessing = false;
        this.promo = result.data;
        console.log(this.promo);
      }
      if (result.error) {
        this.isProcessing = false;
        return;
      }
    });
  };

  createPromo = async promo => {
    this.isProcessing = true;
    const result = await createPromotion(promo, authStore.token);

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

  updatePromo = async promo => {
    this.isProcessing = true;
    const result = await updatePromotion(promo, authStore.token);

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

  deletePromo = async promo => {
    this.isProcessing = true;
    const result = await deletePromotion(promo, authStore.token);

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
}
export default new Promo();
