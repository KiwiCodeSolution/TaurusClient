import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/client/Home";
import NotFound from "./pages/client/NotFound";
import Services from "./pages/client/Services";
import Promo from "./pages/client/Promo";
import Contacts from "./pages/client/Contacts";
import Reserve from "./pages/client/Reserve";
import Menu from "./pages/client/Menu";
import SharedLayout from "./components/SharedLayout";
import Order from "./pages/client/Order";
import MenuAdmin from "./pages/admin/MenuAdmin";
import PromoAdmin from "./pages/admin/PromoAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import MenuDeliveryAdmin from "./pages/admin/MenuDeliveryAdmin";
import LoginPage from "./pages/client/Login";
import { PrivateRoute, RedirectRoute } from "./helpers/redirect";
import NotPages from "./pages/admin/NotPages";

const App = observer(() => {
  return (
    <>
      <Routes>
        {/* клієнтська частина */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="services" element={<Services />} />
          <Route path="promo" element={<Promo />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="order" element={<Order />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* кінець клієнтської частини */}

        {/* адмінська частина */}
        {/* авторизація */}

        <Route
          path="/admin"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />

        {/* стартова сторінка */}

        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <HomeAdmin />
            </PrivateRoute>
          }
        >
          {/* робота із меню страв та акціями */}

          <Route path="menu">
            <Route
              index
              element={
                <PrivateRoute>
                  <MenuAdmin />
                </PrivateRoute>
              }
            />

            <Route
              path="promo"
              element={
                <PrivateRoute>
                  <PromoAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="delivery"
              element={
                <PrivateRoute>
                  <MenuDeliveryAdmin />
                </PrivateRoute>
              }
            />
          </Route>

          {/* робота із замовленнями */}

          <Route path="orders">
            <Route
              path="delivery"
              element={
                <PrivateRoute>
                  <PromoAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="take"
              element={
                <PrivateRoute>
                  <PromoAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="archive"
              element={
                <PrivateRoute>
                  <PromoAdmin />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/admin/*" element={<NotPages />} />

        {/* кінець адмінської частини */}
      </Routes>
      <ToastContainer transition={Bounce} />
    </>
  );
});

export default App;
