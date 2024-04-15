import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import PromoItem from "../../components/PromoItem";
import { PROMO_ITEMS } from "../client/Promo";

const PromoAdmin = () => {
  return (
    <>
      <MetaData>Акції</MetaData>
      <section className="mx-auto w-[calc(100%-300px)] h-screen admin">
        <TitlePage>Редагування акцій</TitlePage>
        <div className="w-[980px] h-[75%] mt-[52px] mx-auto overflow-y-auto">
          <div className="w-full grid grid-cols-2 gap-y-12 gap-x-6 mx-auto">
            {PROMO_ITEMS.map(el => (
              <PromoItem key={el._id} item={el} type={"admin"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PromoAdmin;
