import { Navigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
// import auth from "./store/auth";

const auth = true;

export const PrivateRoute = observer(({ children }) => {
  return auth ? children : <Navigate to="/admin" />;
});

export const RedirectRoute = observer(({ children }) => {
  return auth ? <Navigate to="/admin/authorized" /> : children;
});
