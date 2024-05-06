import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";
import PromoForm from "../../adminSections/PromoForm";
import ButtonBack from "../../adminSections/ButtonBack";

const CreatePromoPage = () => {
  return (
    <>
      <MetaData>Створення страви</MetaData>
      <section className="w-[980px] mx-auto flex flex-col">
        <TitlePage>Створити нову страву</TitlePage>

        <div className="w-[980px] mx-auto relative">
          <ButtonBack />
          <PromoForm type={"create"} />
        </div>
      </section>
    </>
  );
};

export default CreatePromoPage;
