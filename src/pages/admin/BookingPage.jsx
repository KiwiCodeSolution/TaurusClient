import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

const BookingPage = observer(() => {
  return (
    <>
      <MetaData>Бронювання</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Бронювання</TitlePage>
      </section>
    </>
  );
});

export default BookingPage;
