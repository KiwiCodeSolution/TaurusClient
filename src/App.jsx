/* prettier-ignore */
import React, { Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { PrivateRoute, RedirectRoute } from "./helpers/redirect";

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
const ModifyDishPage = React.lazy(() => import("./pages/admin/ModifyDishPage"));
const ModifyPromoPage = React.lazy(() => import("./pages/admin/ModifyPromoPage"));
const InvisibleDishPage = React.lazy(() => import("./pages/admin/InvisibleDishPage"));
const InvisiblePromoPage = React.lazy(() => import("./pages/admin/InvisiblePromoPage"));
const NotPages = React.lazy(() => import("./pages/admin/NotPages"));
const OrdersPage = React.lazy(() => import("./pages/admin/OrdersPage"));
const OrdersArchivePage = React.lazy(() => import("./pages/admin/OrdersPage"));
const FeedbackPage = React.lazy(() => import("./pages/admin/FeedbackPage"));
const ServicesPage = React.lazy(() => import("./pages/admin/ServicesPage"));
const BookingPage = React.lazy(() => import("./pages/admin/BookingPage"));

const App = observer(() => {
  return (
    <Suspense fallback={<Loader />}>
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
        <Route path="/admin" element={<RedirectRoute> <LoginPage /> </RedirectRoute>}/>

        {/* Стартова сторінка */}
        <Route path="/admin/access" element={<PrivateRoute> <HomeAdmin /> </PrivateRoute>}>
          {/* Робота із меню страв та акціями */}
          <Route path="site"> 
            <Route path="menu" element={<PrivateRoute> <MenuAdmin /> </PrivateRoute>}/>
            <Route path="menu/:_id" element={<PrivateRoute> <ModifyDishPage type={"edit"}/> </PrivateRoute>}/>
            <Route path="menu/create" element={<PrivateRoute> <ModifyDishPage /> </PrivateRoute>}/>
            <Route path="menu/archive" element={<PrivateRoute> <InvisibleDishPage /> </PrivateRoute>}/>
            <Route path="menu/hide" element={<PrivateRoute> <InvisibleDishPage type={"hide"}/> </PrivateRoute>}/>
            <Route path="delivery" element={<PrivateRoute> <MenuDeliveryAdmin /> </PrivateRoute>}/>
            <Route path="promo" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="promo/:_id" element={<PrivateRoute> <ModifyPromoPage type={"edit"}/> </PrivateRoute>}/>      
            <Route path="promo/create" element={<PrivateRoute> <ModifyPromoPage /> </PrivateRoute>}/>
            <Route path="promo/archive" element={<PrivateRoute> <InvisiblePromoPage /> </PrivateRoute>}/>
            <Route path="promo/hide" element={<PrivateRoute> <InvisiblePromoPage type={"hide"}/> </PrivateRoute>}/>
          </Route>

          {/* Робота із замовленнями, зверненнями та бронюванням столиків */}
          <Route path="restaurant">
            <Route path="orders" element={<PrivateRoute> <OrdersPage /> </PrivateRoute>}/>
            <Route path="orders/archive" element={<PrivateRoute> <OrdersArchivePage /> </PrivateRoute>}/>
            <Route path="feedback" element={<PrivateRoute> <FeedbackPage /> </PrivateRoute>}/>
            <Route path="services" element={<PrivateRoute> <ServicesPage /> </PrivateRoute>}/>
            <Route path="booking" element={<PrivateRoute> <BookingPage /> </PrivateRoute>}/>
           
          </Route>

           {/* Робота із замовленнями, зверненнями та бронюванням столиків */}
          <Route path="users">
            <Route path="staff" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="archive" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="staff/:_id" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
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
