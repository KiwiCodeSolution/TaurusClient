import MetaData from "../../components/MetaData";
import ReserveForm from "../../components/ReserveForm";
import TitlePage from "../../components/TitlePage";

const Reserve = () => {
  return (
    <>
      <MetaData>Резерв столиків</MetaData>
      <section>
        <img
          src="/images/menu/reserve.jpg"
          alt=""
          className="w-full h-[416px] object-cover border-b-[0.5px] border-base-brown"
        />
        <div className="w-full mx-auto wrapper">
          <TitlePage>Забронювати</TitlePage>

          <ReserveForm />
        </div>
      </section>
    </>
  );
};

export default Reserve;
