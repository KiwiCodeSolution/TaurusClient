import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { deleteReserve, getAllReserves, sendReserve, updateReserve } from "../API/reservations";
import authStore from "./auth";

class Reservations {
  reserves = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "reserves",
      properties: ["reserves"],
      storage: window.localStorage,
    });
  }

  getReserveAction = async () => {
    const result = await getAllReserves(authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.reserves = result.data;
    });
  };

  createReserveAction = async data => {
    const result = await sendReserve(data);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getReserveAction();

    return true;
  };

  updateReserveAction = async data => {
    const result = await updateReserve(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getReserveAction();

    return true;
  };

  deleteReserveAction = async data => {
    const result = await deleteReserve(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getReserveAction();

    return true;
  };
}
export default new Reservations();
