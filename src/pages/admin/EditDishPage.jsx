import { useParams, useLocation, Link } from "react-router-dom";
import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import DishForm from "../../adminSections/DishForm";
import { ArrowBack } from "../../icons/iconComponent";
import TitlePage from "../../adminSections/TitlePage";

const EditDishPage = () => {
  const { _id } = useParams();
  const location = useLocation();
  const dishes = dishesStore.dishes;

  if (!_id) return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  if (!dishes) return <h2>Ми не отримали перелік страв. Спробуйте ще раз</h2>;

  const currentDish = dishes.find(dish => dish._id === _id);
  if (!currentDish) return <h2>У нас немає страви їз id:{_id}</h2>;

  return (
    <>
      <MetaData>Редагування страви</MetaData>
      <section className="w-[calc(100%-300px)] flex flex-col">
        <TitlePage>Редагування позиції меню</TitlePage>

        <div className="w-[calc(100%-300px)] mx-auto relative">
          <Link
            className="flex gap-x-2 absolute top-8 left-[20px] back text-beige hover:text-base-yellow items-center"
            to={location?.state?.from.pathname ?? "/"}
          >
            <ArrowBack className={"fill-beige"} />
            Повернутись
          </Link>
          <DishForm item={currentDish} type={"edit"} />
        </div>
      </section>
    </>
  );
};

export default EditDishPage;
