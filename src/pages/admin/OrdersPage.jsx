import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import OrderItem from "../../adminSections/OrderItem";

const OrdersPage = observer(() => {
  return (
    <>
      <MetaData>Замовлення</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Історія замовлень</TitlePage>
        {/* <input type="search" /> */}
        <div className="w-[916px] h-[37px] py-2 pl-2 pr-[60px] flex mx-auto items-center gap-x-6 justify-between bg-base-brown text-beige text-14 mt-[15px]">
          <p className="w-[117px]">Дата і час</p>
          <p className="w-[103px]">Номер</p>
          <p className="w-[202px]">Замовник</p>
          <p className="w-[105px]">Тип</p>
          <p className="w-[85px]">Сума, грн</p>
          <p className="w-[120px]">Статус</p>
        </div>

        <div className="w-full h-[calc(100%-400px)] mx-auto overflow-y-auto pt-[18px] px-8">
          <OrderItem />
        </div>
      </section>
    </>
  );
});

export default OrdersPage;
