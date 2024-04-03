import { Navigate } from "react-router-dom";

import { observer } from "mobx-react-lite";

import authStore from "../store/auth";
// import auth from "./store/auth";

const auth = authStore.isAuth;

console.log(auth);

export const PrivateRoute = observer(({ children }) => {
  return auth ? children : <Navigate to="/admin" />;
});

export const RedirectRoute = observer(({ children }) => {
  return auth ? <Navigate to="/admin/authorized" /> : children;
});
