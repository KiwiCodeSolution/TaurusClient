import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
// import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import PromoForm from "../../adminSections/PromoForm";

import TitlePage from "../../adminSections/TitlePage";
import ButtonBack from "../../adminSections/ButtonBack";

const ModifyPromoPage = ({ type }) => {
  // const { _id } = useParams();

  // const promotions = dishesStore.dishes;

  // if (!_id && type === "edit") return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  // if (!promotions ) return <h2>Ми не отримали перелік акцій. Спробуйте ще раз</h2>;

  // const currentPromo = promotions.find(promo => promo._id === _id);
  // if (!currentPromo && type === "edit") return <h2>У нас немає акції їз id:{_id}</h2>;

  return (
    <>
      <MetaData>{type === "edit" ? "Редагування Акції" : "Створення акції"}</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>
          {type === "edit" ? "Редагування акційної позиції" : "Створити нову акцію"}
        </TitlePage>

        <div className="w-[980px] mx-auto relative ">
          <ButtonBack />
          {type === "edit" ? <PromoForm /> : <PromoForm type={"create"} />}
        </div>
      </section>
    </>
  );
};

ModifyPromoPage.propTypes = {
  type: PropTypes.string,
};

export default ModifyPromoPage;
