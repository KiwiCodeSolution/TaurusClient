import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
// import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import PromoForm from "../../adminSections/PromoForm";

import TitlePage from "../../adminSections/TitlePage";
import ButtonBack from "../../adminSections/ButtonBack";
import promoStore from "../../store/promo";

const ModifyPromoPage = observer(({ type }) => {
  const { _id } = useParams();

  const promo = promoStore.promo;

  if (!_id && type === "edit") return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  if (!promo) return <h2>Ми не отримали перелік акцій. Спробуйте ще раз</h2>;

  const currentPromo = promo.find(promo => promo._id === _id);
  if (!currentPromo && type === "edit") return <h2>У нас немає акції їз id:{_id}</h2>;

  return (
    <>
      <MetaData>{type === "edit" ? "Редагування Акції" : "Створення акції"}</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>
          {type === "edit" ? "Редагування акційної позиції" : "Створити нову акцію"}
        </TitlePage>

        <div className="w-[980px] mx-auto relative ">
          <ButtonBack />
          {type === "edit" ? <PromoForm item={currentPromo} /> : <PromoForm type={"create"} />}
        </div>
      </section>
    </>
  );
});

ModifyPromoPage.propTypes = {
  type: PropTypes.string,
};

export default ModifyPromoPage;
