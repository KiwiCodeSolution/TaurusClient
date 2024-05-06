import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";
import { PROMO_ITEMS } from "../client/Promo";
import PromoItem from "../../components/PromoItem";
import ButtonBack from "../../adminSections/ButtonBack";

const HidePromo = () => {
  return (
    <>
      <MetaData>Приховані Акції</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>Приховані Акції</TitlePage>

        <div className="w-[980px] mx-auto relative">
          <ButtonBack />

          <div className="w-[980px] h-[75%] mt-[52px] mx-auto overflow-y-auto">
            <div className="w-full grid grid-cols-2 gap-y-12 gap-x-6 mx-auto opacity-50">
              {PROMO_ITEMS.map(el => (
                <PromoItem key={el._id} item={el} type={"admin"} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HidePromo;
