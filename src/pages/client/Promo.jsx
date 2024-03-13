import MetaData from "../../components/MetaData";
import PromoItem from "../../components/PromoItem";
import TitlePage from "../../components/TitlePage";

const PROMO_ITEMS = [
  {
    id: "1",
    src: "/images/promo/chocolate-fondue.png",
    percent: "50%",
    title: "Акція До дня закоханих!",
    text: "Замовляй Французький шоколадний фондан з морозивом та отримай другий зі знижкою",
    icon: "heart",
    oldPrice: "157 грн.",
    currentPrice: "210 грн.",
    proposal: "1+1",
  },
  {
    id: "2",
    src: "/images/promo/sushi-set.png",
    percent: "30%",
    title: "Акція До дня закоханих!",
    text: "Замовляй Суші сет “Perfect match” зі знижкою",
    icon: "heart",
    oldPrice: "260 грн.",
    currentPrice: "200 грн.",
    proposal: "-30%",
  },
  {
    id: "3",
    src: "/images/promo/fwine-cheese.png",
    percent: "10%",
    title: "Акція До дня закоханих!",
    text: "Проведи День закоханих в романтичній атмосфері “Taurus Soul”. Замовляй  будь-який другий бокал червоного або білого вина зі  знижкою",
    icon: "heart",
    proposal: "10%",
  },
];

const Promo = () => {
  return (
    <>
      <MetaData>Акції ресторану</MetaData>
      <section>
        <img src="" alt="" className="w-full h-[416px] object-cover border-b-[0.5px] border-base-brown" />
        <div className="w-full mx-auto wrapper">
          <TitlePage>Акції</TitlePage>

          <div className="w-[1116px] grid grid-cols-3 gap-y-12 gap-x-6 mx-auto">
            {PROMO_ITEMS.map((el) => (
              <PromoItem key={el.id} item={el} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Promo;
