import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { currentUser, login, logout } from "../API/auth";

class Auth {
  isAuth = false;
  token = "";
  isLoading = false;
  error = "";
  message = "";
  user = {};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "auth",
      properties: ["isAuth", "token", "error", "user"],
      storage: window.localStorage,
    });
  }

  setIsAuth = bool => (this.isAuth = bool);
  setToken = token => (this.token = token);
  setIsLoading = bool => (this.isLoading = bool);
  setError = errMessage => (this.error = errMessage);
  setMessage = message => (this.message = message);

  loginAction = async user => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const { token } = await login(user);
      if (token) {
        this.token = token;

        const user = await currentUser(token); // Додано await для очікування відповіді

        runInAction(() => {
          this.isLoading = false;

          if (user) {
            this.user = user;
            this.isAuth = true;
            this.error = "";
          } else {
            this.token = "";
          }
        });
      } else {
        runInAction(() => {
          this.isLoading = false;
          this.error = "Failed to get token";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = error.response ? error.response.data.message : error.message;
      });
    }
  };

  logoutAction = async () => {
    try {
      this.isLoading = true;
      await logout(this.token);
      runInAction(() => {
        this.isLoading = false;
        this.isAuth = false;
        this.token = "";
      });
    } catch (error) {
      this.setIsLoading(false);
      if (error.response) {
        // server error
        this.setError(error.response.data.message);
        this.setIsAuth(false);
        this.setToken("");
      } else {
        this.setError(error.message); // no internet connection
      }
    }
  };

  // getCurrentAction = async () => {
  //   try {
  //     console.log("getCurrentAction - token:", this.token);
  //     if (this.token) {
  //       this.setError("");
  //       await getCurrent(this.token);
  //     }

  //   } catch (error) {
  //     if (error.response) { // server error
  //       this.setIsAuth(false);
  //       this.setToken("");
  //     } else {
  //       this.setError(error.message);   // no internet connection
  //     }
  //   }
  // }
}

export default new Auth();
