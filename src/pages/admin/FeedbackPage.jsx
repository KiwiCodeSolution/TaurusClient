import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

const FeedbackPage = observer(() => {
  return (
    <>
      <MetaData>Повідомлення</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Повідомлення</TitlePage>
      </section>
    </>
  );
});

export default FeedbackPage;
