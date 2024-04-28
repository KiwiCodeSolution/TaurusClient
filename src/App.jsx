/* prettier-ignore */
import React, { Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { PrivateRoute, RedirectRoute } from "./helpers/redirect";
import Archive from "./pages/admin/ArchivePage";
import HidePage from "./pages/admin/HidePage";



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
const EditDishPage = React.lazy(() => import("./pages/admin/EditDishPage"));
const CreateDishPage = React.lazy(() => import("./pages/admin/CreateDishPage"));
const EditPromoPage = React.lazy(() => import("./pages/admin/EditPromoPage"));



const NotPages = React.lazy(() => import("./pages/admin/NotPages"));

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
            <Route path="menu/:_id" element={<PrivateRoute> <EditDishPage /> </PrivateRoute>}/>
            <Route path="menu/create" element={<PrivateRoute> <CreateDishPage /> </PrivateRoute>}/>
            <Route path="menu/archive" element={<PrivateRoute> <Archive /> </PrivateRoute>}/>
            <Route path="menu/hide" element={<PrivateRoute> <HidePage /> </PrivateRoute>}/>
            <Route path="promo" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/><Route path="promo/create" element={<PrivateRoute> <EditPromoPage /> </PrivateRoute>}/>
               <Route path="promo/:_id" element={<PrivateRoute> <EditPromoPage /> </PrivateRoute>}/>
            <Route path="delivery" element={<PrivateRoute> <MenuDeliveryAdmin /> </PrivateRoute>}/>
            
          </Route>

          {/* Робота із замовленнями, зверненнями та бронюванням столиків */}
          <Route path="restaurant">
            <Route path="delivery" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="take" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="appeals" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="booking" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
            <Route path="archive" element={<PrivateRoute> <PromoAdmin /> </PrivateRoute>}/>
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
