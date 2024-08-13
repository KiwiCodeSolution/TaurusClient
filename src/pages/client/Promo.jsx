/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import MetaData from "../../components/MetaData";
import PromoItem from "../../components/PromoItem";
import PromoSwiper from "../../components/PromoSwiper";
import TitlePage from "../../components/TitlePage";
import promoStore from "../../store/promo";

const Promo = observer(() => {
  useEffect(() => {
    promoStore.getAllPromo();
  }, []);

  const promo = promoStore.promo;
  return (
    <>
      <MetaData>Акції ресторану</MetaData>
      <div className="h-[198px] md:h-[416px]">
      {promo.length > 0 && <PromoSwiper items={promo} />}
      </div>
      <section className="relative wrapper w-full section-wrapper py-8 md:py-16 mx-auto">
        <TitlePage>Новини</TitlePage>

        <div className="w-full md:w-[1116px] grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 mx-auto">
          {promo.map(el => (
            <PromoItem key={el._id} item={el} />
          ))}
        </div>
      </section>
    </>
  );
});

export default Promo;
