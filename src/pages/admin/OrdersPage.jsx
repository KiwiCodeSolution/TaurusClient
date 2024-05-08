import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

const OrdersPage = observer(() => {
  return (
    <>
      <MetaData>Замовлення</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Історія замовлень</TitlePage>

        <div className="w-full h-[calc(100%-400px)] mx-auto overflow-y-auto pt-[18px] px-8">
          <input type="search" />
        </div>
      </section>
    </>
  );
});

export default OrdersPage;
