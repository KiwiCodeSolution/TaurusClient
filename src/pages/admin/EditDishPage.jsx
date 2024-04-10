import { useParams, useLocation, Link } from "react-router-dom";
import dishesStore from "../../store/dishes";

import MetaData from "../../components/MetaData";
import EditForm from "../../adminSections/EditForm";

const EditDishPage = () => {
  const { _id } = useParams();
  const location = useLocation();
  const dishes = dishesStore.dishes;

  if (!_id) return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  if (!dishes) return <h2>Ми не отримали перелік страв. Спробуйте ще раз</h2>;

  const currentDish = dishes.find(vacancy => vacancy._id === _id);
  if (!currentDish) return <h2>У нас немає страви їз id:{_id}</h2>;

  return (
    <>
      <MetaData>Редагування страви</MetaData>
      <section className="w-[calc(100%-300px)] flex flex-col">
        <div className="w-full mx-auto flex flex-col">
          <h1 className="w-full text-center uppercase text-[32px] mt-12 mb-10 text-beige">
            Редагування позиції меню
          </h1>
          <div className="border_admin_menu w-[916px] mx-auto" />
        </div>
        <div className="w-[calc(100%-300px)] mx-auto relative">
          <Link
            className="flex gap-x-2 absolute top-8 left-8"
            to={location?.state?.from.pathname ?? "/"}
          >
            Повернутись
          </Link>
          <EditForm item={currentDish} />
        </div>
      </section>
    </>
  );
};

export default EditDishPage;
