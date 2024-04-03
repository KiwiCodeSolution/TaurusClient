import { Navigate } from "react-router-dom";

import { observer } from "mobx-react-lite";

import authStore from "../store/auth";

export const PrivateRoute = observer(({ children }) => {
  return authStore.isAuth ? children : <Navigate to="/admin" />;
});

export const RedirectRoute = observer(({ children }) => {
  return authStore.isAuth ? <Navigate to="/admin/home" /> : children;
});
