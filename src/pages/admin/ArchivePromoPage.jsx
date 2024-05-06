import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";
import ButtonBack from "../../adminSections/ButtonBack";

const ArchivePromo = () => {
  return (
    <>
      <MetaData>Архів Акцій</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>Архів акцій</TitlePage>

        <div className="w-[980px] mx-auto relative">
          <ButtonBack />
        </div>
      </section>
    </>
  );
};

export default ArchivePromo;
