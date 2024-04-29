import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import PageButtons from "../../components/PageButtons";
import PromoItem from "../../components/PromoItem";
import { PROMO_ITEMS } from "../client/Promo";

const buttons = [
  { label: "Додати Акцію", link: "/admin/access/site/promo/create" },
  { label: "Архів Акцій", link: "/admin/access/site/promo/archive" },
  { label: "Переглянути приховані", link: "/admin/access/site/promo/hide" },
];

const PromoAdmin = () => {
  return (
    <>
      <MetaData>Акції</MetaData>
      <section className="mx-auto w-[calc(100%-300px)] h-screen admin">
        <TitlePage>Редагування акцій</TitlePage>

        <PageButtons buttons={buttons} />
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
