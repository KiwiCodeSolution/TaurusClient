import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/client/Home";
import NotFound from "./pages/client/NotFound";
import Services from "./pages/client/Services";
import Promo from "./pages/client/Promo";
import Contacts from "./pages/client/Contacts";
import Reserve from "./pages/client/Reserve";
import Menu from "./pages/client/Menu";
import { SharedLayout } from "./components/SharedLayout";
import Delivery from "./pages/client/Delivery";
import MenuAdmin from "./pages/admin/MenuAdmin";
import PromoAdmin from "./pages/admin/PromoAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import MenuDeliveryAdmin from "./pages/admin/MenuDeliveryAdmin";
import LoginPage from "./pages/client/Login";
import { PrivateRoute, RedirectRoute } from "./helpers/redirect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="services" element={<Services />} />
          <Route path="promo" element={<Promo />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/admin/authorized"
          element={
            <PrivateRoute>
              <HomeAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/authorized/menu"
          element={
            <PrivateRoute>
              <MenuAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/admin/authorized/restourant">
          <Route
            path="promo"
            element={
              <PrivateRoute>
                <PromoAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="menu_delivery"
            element={
              <PrivateRoute>
                <MenuDeliveryAdmin />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer transition={Bounce} />
    </>
  );
}

export default App;
