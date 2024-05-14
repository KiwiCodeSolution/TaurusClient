import MetaData from "../../components/MetaData";
import Form from "../../components/Form";
import TitlePage from "../../components/TitlePage";
import { imagePages } from "../../helpers/styles";

const Reserve = () => {
  return (
    <>
      <MetaData>Резерв столиків</MetaData>
      <div className="h-[198px] md:h-[416px]">
        <img src="/images/menu/reserve.jpg" alt="" className={imagePages} />
      </div>
      <section className="wrapper w-full section-wrapper py-16">
        <TitlePage>Забронювати</TitlePage>

        <Form namePage={"reserve"} />
      </section>
    </>
  );
};

export default Reserve;
