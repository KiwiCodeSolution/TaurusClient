import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { deleteOrder, getAllOrders, updateOrder } from "../API/orders";
import authStore from "./auth";

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
    const result = await getAllOrders(authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.orders = result.data;
    });
  };

  updateOrder = async data => {
    const result = await updateOrder(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getOrders();

    return true;
  };

  deleteOrder = async data => {
    const result = await deleteOrder(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getOrders();

    return true;
  };
}

export default new AdminOrders();
