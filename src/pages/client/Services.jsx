import { useState } from "react";
import { motion } from "framer-motion";
import MetaData from "../../components/MetaData";
// import ServiceItem from "../../components/ServiceItem";
import TitlePage from "../../components/TitlePage";
import Button from "../../components/UI/Button";
import items from "../../data/servicesList.json";
import Form from "../../components/Form";
import Overlay from "../../components/UI/modal/Overlay";
import { imagePages } from "../../helpers/styles";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blocAnimation = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: custom => ({
      scale: 1,
      opacity: 1,
      transition: { delay: custom * 0.2, duration: 0.4 },
    }),
  };

  return (
    <>
      <MetaData>Послуги ресторану</MetaData>
      <div className="h-[198px] md:h-[416px]">
        <img src="/images/menu/services.jpg" alt="" className={imagePages} />
      </div>
      <section className="wrapper w-full section-wrapper py-16">
        <div className="w-full mx-auto wrapper">
          <TitlePage>Послуги</TitlePage>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-12 gap-x-3">
            {items.map(el => (
              <motion.ul
                className="flex flex-col w-full xl:w-[356px] h-[383px] p-0 text-beige mx-auto"
                key={el.id}
                initial="hidden"
                whileInView="visible"
                custom={el.id * 2}
                variants={blocAnimation}
                viewport={{ once: true }}
              >
                <li className="mb-6 mx-auto">
                  <img
                    src={el.src}
                    alt={el.alt}
                    className="w-[261px] h-[261px] border border-base-brown object-contain"
                  />
                </li>
                <li className="text-18 uppercase mb-2 text-center">{el.title}</li>
                <li className="text-14 text-center leading-[21px]">{el.subtitle}</li>
              </motion.ul>
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
          <Form namePage="service" clickFn={() => setIsModalOpen(false)} />
        </Overlay>
      )}
    </>
  );
};

export default Services;
