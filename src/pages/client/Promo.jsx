/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import MetaData from "../../components/MetaData";
import PromoItem from "../../components/PromoItem";
import PromoSwiper from "../../components/PromoSwiper";
import TitlePage from "../../components/TitlePage";
import promoStore from "../../store/promo";

export const PROMO_ITEMS = [
  {
    _id: "1",
    src: "/images/promo/chocolate-fondue.png",
    sale: "50%",
    title: "Акція До дня закоханих!",
    text: "Замовляй Французький шоколадний фондан з морозивом та отримай другий зі знижкою",
    icon: "heart",
    oldPrice: "157 грн.",
    currentPrice: "210 грн.",
    proposal: "1+1",
  },
  {
    _id: "2",
    src: "/images/promo/sushi-set.png",
    sale: "30%",
    title: "Акція До дня закоханих!",
    text: "Замовляй Суші сет “Perfect match” зі знижкою",
    icon: "heart",
    oldPrice: "260 грн.",
    currentPrice: "200 грн.",
    proposal: "-30%",
  },
  {
    _id: "3",
    src: "/images/promo/fwine-cheese.png",
    sale: "10%",
    title: "Акція До дня закоханих!",
    text: "Проведи День закоханих в романтичній атмосфері “Taurus Soul”. Замовляй  будь-який другий бокал червоного або білого вина зі  знижкою",
    icon: "heart",
    proposal: "10%",
  },
];

const Promo = observer(() => {
  useEffect(() => {
    promoStore.getAllPromo();
  }, []);

  const promo = promoStore.promo;
  return (
    <>
      <MetaData>Акції ресторану</MetaData>
      <div className="h-[198px] md:h-[416px]">
        <PromoSwiper />
      </div>
      <section className="relative wrapper w-full section-wrapper py-8 xl:py-16 mx-auto">
        <TitlePage>Акції</TitlePage>

        <div className="w-full xl:w-[1116px] grid grid-cols-1 xl:grid-cols-3 gap-y-12 gap-x-6 mx-auto">
          {promo.map(el => (
            <PromoItem key={el._id} item={el} />
          ))}
        </div>
      </section>
    </>
  );
});

export default Promo;
