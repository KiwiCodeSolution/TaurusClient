import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import dishesStore from "../../store/dishes";
import MetaData from "../../components/MetaData";
import DishForm from "../../adminSections/DishForm";
import TitlePage from "../../adminSections/TitlePage";
import ButtonBack from "../../adminSections/ButtonBack";

const ModifyDishPage = ({ type }) => {
  const { _id } = useParams();

  const dishes = dishesStore.dishes;

  if (!_id && type === "edit") return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  if (!dishes) return <h2>Ми не отримали перелік страв. Спробуйте ще раз</h2>;

  const currentDish = dishes.find(dish => dish._id === _id);
  if (!currentDish && type === "edit") return <h2>У нас немає страви їз id:{_id}</h2>;

  return (
    <>
      <MetaData>{type === "edit" ? "Редагування страви" : "Створення страви"}</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>
          {type === "edit" ? "Редагування позиції меню" : "Створити нову страву"}
        </TitlePage>

        <div className="w-[980px] mx-auto relative ">
          <ButtonBack />
          {type === "edit" ? (
            <DishForm item={currentDish} type={"edit"} />
          ) : (
            <DishForm type={"create"} />
          )}
        </div>
      </section>
    </>
  );
};

ModifyDishPage.propTypes = {
  type: PropTypes.string,
};

export default ModifyDishPage;
