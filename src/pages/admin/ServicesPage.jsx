import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

const ServicesPage = observer(() => {
  return (
    <>
      <MetaData>Послуги</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Замовлення послуг</TitlePage>
      </section>
    </>
  );
});

export default ServicesPage;
