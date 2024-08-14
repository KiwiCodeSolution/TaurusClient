import PropTypes from "prop-types";
import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";

import PromoItem from "../../components/PromoItem";
import ButtonBack from "../../adminSections/ButtonBack";
import useAuthPage from "../../hooks/isAuthPage";
import promoStore from "../../store/promo";

const InvisiblePromoPage = ({ type }) => {
  useAuthPage(() => {
    promoStore.getAllPromo();
  });

  const promoArchive = promoStore.promo.filter(el => el.archive);
  const promoAvailable = promoStore.promo.filter(el => !el.available);

  const length =
    (type !== "hide" && promoArchive.length < 2) || (type === "hide" && promoAvailable.length < 2);

  return (
    <>
      <MetaData>{type === "hide" ? "Приховані Новини" : "Архів Новин"}</MetaData>
      <section className="w-[980px] h-screen  mx-auto flex flex-col admin">
        <TitlePage>{type === "hide" ? "Приховані Новини" : "Архів Новин"}</TitlePage>

        <div className="w-[980px] h-screen mx-auto relative">
          <ButtonBack />
          <div
            className={`w-[980px] ${
              length ? "h-[calc(100%-100px)]" : "h-[calc(100%-250px)]"
            }  mt-[80px] mx-auto overflow-y-auto`}
          >
            <div className="w-full grid grid-cols-2 gap-y-12 gap-x-6 mx-auto">
              {type === "hide"
                ? promoAvailable.map(el => <PromoItem key={el._id} item={el} type={"admin"} />)
                : promoArchive.map(el => <PromoItem key={el._id} item={el} type={"admin"} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

InvisiblePromoPage.propTypes = {
  type: PropTypes.string,
};

export default InvisiblePromoPage;
