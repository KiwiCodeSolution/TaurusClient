import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import authStore from "./auth";
import { getAllUsers } from "../API/users";

class Users {
  users = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "users",
      properties: ["users"],
      storage: window.localStorage,
    });
  }

  getUsers = async () => {
    const result = await getAllUsers(authStore.token);
    console.log(result.data);

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.users = result.data;
    });
  };
}

export default new Users();
