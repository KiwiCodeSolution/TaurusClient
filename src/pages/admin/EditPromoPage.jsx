import { useParams, useLocation, Link } from "react-router-dom";
import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import PromoForm from "../../adminSections/PromoForm";
import { ArrowBack } from "../../icons/iconComponent";
import TitlePage from "../../adminSections/TitlePage";
const EditPromoPage = () => {
  const { _id } = useParams();
  const location = useLocation();
  // const promotions = dishesStore.dishes;

  // if (!_id) return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  // if (!promotions) return <h2>Ми не отримали перелік акцій. Спробуйте ще раз</h2>;

  // const currentPromo = promotions.find(promo => promo._id === _id);
  // if (!currentPromo) return <h2>У нас немає акції їз id:{_id}</h2>;

  return (
    <>
      <MetaData>Редагування Акції</MetaData>
      <section className="w-[calc(100%-300px)] flex flex-col">
        <TitlePage>Редагування акційної позиції</TitlePage>

        <div className="w-[calc(100%-300px)] mx-auto relative">
          <Link
            className="flex gap-x-2 absolute top-8 left-[20px] back text-beige hover:text-base-yellow items-center"
            to={location?.state?.from.pathname ?? "/"}
          >
            <ArrowBack className={"fill-beige"} />
            Повернутись
          </Link>
          {/* <PromoForm item={currentPromo} /> */}
        </div>
      </section>
    </>
  );
};

export default EditPromoPage;
