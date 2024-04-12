import { useState } from "react";
import MetaData from "../../components/MetaData";
import ServiceItem from "../../components/ServiceItem";
import TitlePage from "../../components/TitlePage";
import Button from "../../components/UI/Button";
import items from "../../datas/servicesList.json";
import Form from "../../components/Form";
import Overlay from "../../components/UI/modal/Overlay";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MetaData>Послуги ресторану</MetaData>
      <section>
        <img
          src="/images/menu/services.jpg"
          alt=""
          className="w-full h-[416px] object-cover border-b-[0.5px] border-base-brown"
        />
        <div className="w-full mx-auto wrapper">
          <TitlePage>Послуги</TitlePage>
          <div className="grid grid-cols-3 gap-y-12 gap-x-3">
            {items.map(el => (
              <ServiceItem key={el.id} item={el} />
            ))}
          </div>
          <div className="w-full flex justify-center">
            <Button style={"orange"} btnClass={"mt-12 mb-12"} clickFn={() => setIsModalOpen(true)}>
              Зв&apos;язатись
            </Button>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Overlay clickFn={() => setIsModalOpen(false)}>
          <Form namePage="contacts" clickFn={() => setIsModalOpen(false)} />
        </Overlay>
      )}
    </>
  );
};

export default Services;
