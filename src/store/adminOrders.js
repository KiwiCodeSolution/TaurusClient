import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { getAllOrders } from "../API/orders";

class AdminOrders {
  orders = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "orders",
      properties: ["orders"],
      storage: window.localStorage,
    });
  }

  getOrders = async () => {
    const result = await getAllOrders();

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.orders = result.data;
    });
  };
}

export default new AdminOrders();
