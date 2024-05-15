import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import Button from "../../components/UI/Button";

import { Archive, ArrowBack } from "../../icons/iconComponent";

const UsersPage = observer(() => {
  return (
    <>
      <MetaData>Адміністрування</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Адміністрування</TitlePage>
      </section>
    </>
  );
});

export default UsersPage;
