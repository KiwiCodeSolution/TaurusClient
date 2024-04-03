import React, { Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "react-toastify/dist/ReactToastify.css";

const Home = React.lazy(() => import("./pages/client/Home"));
const NotFound = React.lazy(() => import("./pages/client/NotFound"));
const Services = React.lazy(() => import("./pages/client/Services"));
const Promo = React.lazy(() => import("./pages/client/Promo"));
const Contacts = React.lazy(() => import("./pages/client/Contacts"));
const Reserve = React.lazy(() => import("./pages/client/Reserve"));
const Menu = React.lazy(() => import("./pages/client/Menu"));
const SharedLayout = React.lazy(() => import("./components/SharedLayout"));
const Order = React.lazy(() => import("./pages/client/Order"));
const MenuAdmin = React.lazy(() => import("./pages/admin/MenuAdmin"));
const PromoAdmin = React.lazy(() => import("./pages/admin/PromoAdmin"));
const HomeAdmin = React.lazy(() => import("./pages/admin/HomeAdmin"));
const MenuDeliveryAdmin = React.lazy(() => import("./pages/admin/MenuDeliveryAdmin"));
const LoginPage = React.lazy(() => import("./pages/client/Login"));
const { PrivateRoute, RedirectRoute } = React.lazy(() => import("./helpers/redirect"));
const NotPages = React.lazy(() => import("./pages/admin/NotPages"));

const App = observer(() => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Клієнтська частина */}
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
        {/* Кінець клієнтської частини */}

        {/* Адміністративна частина */}
        {/* Авторизація */}
        <Route
          path="/admin"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />

        {/* Стартова сторінка */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <HomeAdmin />
            </PrivateRoute>
          }
        >
          {/* Робота із меню страв та акціями */}
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

          {/* Робота із замовленнями */}
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

        {/* Кінець адміністративної частини */}
      </Routes>
      <ToastContainer transition={Bounce} />
    </Suspense>
  );
});

export default App;
