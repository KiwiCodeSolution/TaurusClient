import { useEffect } from "react";
import authStore from "../store/auth";

const useAuthPage = func => {
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      func();
    } else {
      authStore.setIsAuth(false);
      authStore.setToken("");
    }
  }, []);
};

export default useAuthPage;
