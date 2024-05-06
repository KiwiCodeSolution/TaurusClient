import { useParams } from "react-router-dom";
import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import PromoForm from "../../adminSections/PromoForm";

import TitlePage from "../../adminSections/TitlePage";
import ButtonBack from "../../adminSections/ButtonBack";
const EditPromoPage = () => {
  const { _id } = useParams();

  // const promotions = dishesStore.dishes;

  // if (!_id) return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  // if (!promotions) return <h2>Ми не отримали перелік акцій. Спробуйте ще раз</h2>;

  // const currentPromo = promotions.find(promo => promo._id === _id);
  // if (!currentPromo) return <h2>У нас немає акції їз id:{_id}</h2>;

  return (
    <>
      <MetaData>Редагування Акції</MetaData>
      <section className="w-[980px] flex flex-col mx-auto admin">
        <TitlePage>Редагування акційної позиції</TitlePage>

        <div className="w-[980px] mx-auto relative">
          <ButtonBack />
          <PromoForm />
        </div>
      </section>
    </>
  );
};

export default EditPromoPage;
