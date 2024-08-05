/* eslint-disable react/prop-types */
import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import PageButtons from "../../adminSections/PageButtons";
import PromoItem from "../../components/PromoItem";
import { useEffect, useState } from "react";
import promoStore from "../../store/promo";

const buttonsPromo = [
  { label: "Додати Новину", link: "/admin/access/site/promo/create" },
  { label: "Архів Новин", link: "/admin/access/site/promo/archive" },
  { label: "Переглянути приховані", link: "/admin/access/site/promo/hide" },
];

const PromoAdmin = observer(() => {
  useEffect(() => {
    promoStore.getAllPromo();
  }, []);

  const promo = promoStore.promo;

  const [currentSection, setCurrentSection] = useState("Акційні пропозиції");

  const ButtonSection = ({ text }) => {
    return (
      <button
        className={`flex items-center justify-between hover:underline hover:underline-offset-4 menu-list py-[29px] px-[13px] ${
          currentSection === text
            ? "text-base-orange hover:underline hover:underline-offset-4 bg-dark-btn-bg"
            : "text-beige"
        }  w-[237px] h-[55px] hover:text-base-yellow
             
              
               `}
        onClick={() => setCurrentSection(text)}
      >
        <p className="text-lg uppercase mx-auto">{text}</p>
      </button>
    );
  };
  return (
    <>
      <MetaData>Акції</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={"mt-[103px]"}>Новини</TitlePage>

        <div className="w-[980px] flex gap-x-[70px] items-center justify-center mx-auto absolute top-[111px] left-1/2 -translate-x-1/2">
          <ButtonSection text={"Поточні новини"} />
          <ButtonSection text={"Банери"} />
        </div>

        {currentSection === "Поточні новини" ? (
          <>
            <PageButtons buttons={buttonsPromo} />
            <div className="w-[980px] h-[calc(100%-400px)] mt-[52px] mx-auto overflow-y-auto">
              <div className="w-full grid grid-cols-2 gap-y-12 gap-x-6 mx-auto">
                {promo.map(el => (
                  <PromoItem key={el._id} item={el} type={"admin"} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-center text-6xl text-beige uppercase mt-20">
            Цей функціонал на стадії розробки
          </h1>
        )}
      </section>
    </>
  );
});

export default PromoAdmin;
