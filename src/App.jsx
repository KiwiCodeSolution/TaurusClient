import { Route, Routes } from "react-router-dom";

import Home from "./pages/client/Home";
import NotFound from "./pages/client/NotFound";
import Services from "./pages/client/Services";
import Actions from "./pages/client/Actions";
import Contacts from "./pages/client/Contacts";
import Reserve from "./pages/client/Reserve";
import Menu from "./pages/client/Menu";
import { SharedLayout } from "./components/SharedLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="services" element={<Services />} />
        <Route path="actions" element={<Actions />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
