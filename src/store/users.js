import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import authStore from "./auth";
import { getAllUsers } from "../API/users";

class Users {
  users = [];
  isProcessing = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "users",
      properties: ["users"],
      storage: window.localStorage,
    });
  }

  getUsers = async () => {
    this.isProcessing = true;
    const result = await getAllUsers(authStore.token);

    runInAction(() => {
      if (result.data) {
        this.isProcessing = false;
        this.users = result.data;
      }
      if (result.error) {
        this.isProcessing = false;
        return;
      }
    });
  };
}

export default new Users();
