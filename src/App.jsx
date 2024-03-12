import { Route, Routes } from "react-router-dom";

import Home from "./pages/client/Home";
import NotFound from "./pages/client/NotFound";
import Services from "./pages/client/Services";
import Promo from "./pages/client/Promo";
import Contacts from "./pages/client/Contacts";
import Reserve from "./pages/client/Reserve";
import Menu from "./pages/client/Menu";
import { SharedLayout } from "./components/SharedLayout";
import Delivery from "./pages/client/Delivery";

function App() {
  return (
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
