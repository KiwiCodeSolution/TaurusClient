import MetaData from "../../components/MetaData";
import DishForm from "../../adminSections/DishForm";
import TitlePage from "../../adminSections/TitlePage";

const CreateDishPage = () => {
  return (
    <>
      <MetaData>Створення страви</MetaData>
      <section className="w-[calc(100%-300px)] flex flex-col">
        <TitlePage>Створити нову страву</TitlePage>

        <div className="w-[calc(100%-300px)] mx-auto relative">
          <DishForm type={"create"} />
        </div>
      </section>
    </>
  );
};

export default CreateDishPage;
