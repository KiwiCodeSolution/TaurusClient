import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

const OrdersArchivePage = observer(() => {
  return (
    <>
      <MetaData>Архів замовлень</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Архів замовлень</TitlePage>
      </section>
    </>
  );
});

export default OrdersArchivePage;
