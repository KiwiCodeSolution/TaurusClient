import PropTypes from "prop-types";
import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";
import dishesStore from "../../store/dishes";
import { Minus, Plus } from "../../icons/iconComponent";
import MenuItem from "../../components/MenuItem";
import { useState } from "react";
import ButtonBack from "../../adminSections/ButtonBack";

const InvisibleDishPage = ({ type }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const dishes = dishesStore.dishes;

  const topCategories = [];

  dishes.forEach(el => {
    if (!topCategories.includes(el.topCategory)) {
      topCategories.push(el.topCategory);
    }
  });

  const [openCategoryName, setOpenCategoryName] = useState(topCategories[0]);

  const menuAvailable = dishes.filter(
    ({ topCategory, available }) => topCategory === openCategoryName && !available
  );

  function openMenu(name) {
    setOpenCategoryName(name);
    setIsCategoryOpen(!isCategoryOpen);
  }
  return (
    <>
      <MetaData>{type === "hide" ? "Приховані страви" : "Архів страв"}</MetaData>
      <section className="w-[980px] mx-auto flex flex-col relative admin">
        <TitlePage>{type === "hide" ? "Приховані позиції меню" : "Архів позиції меню"}</TitlePage>
        <div className="w-[914px] h-full mx-auto relative">
          <ButtonBack />
          <div className="w-[914px] h-[37px] p-2 flex mx-auto items-center justify-between bg-base-brown text-beige text-14 mt-[75px] mb-4">
            <span className="w-fit">Назва</span>
            <div className="w-[426px] flex justify-between items-center gap-x-5">
              <span className="w-[73px] text-center">Ціна</span>
              <span className="w-[77px] text-center">Видимість</span>
              <span className="w-[83px] text-center">Редагувати</span>
              <span className="w-[73px] text-center">Видалити</span>
            </div>
          </div>
          <div className="w-[914px] h-[70%] flex flex-col mx-auto px-4 overflow-auto">
            {topCategories.map(el => (
              <div key={el} className="w-full">
                <div
                  className="w-full h-[37px] bg-dark-btn-bg uppercase text-beige px-1 py-2  cursor-pointer flex items-center justify-between border-b-[1px] border-base-brown"
                  onClick={openCategoryName === el ? () => openMenu("") : () => openMenu(el)}
                >
                  {el}
                  {openCategoryName === el ? <Minus /> : <Plus />}
                </div>

                {openCategoryName === el &&
                  menuAvailable.map(element => (
                    <MenuItem key={element._id} item={element} section={"admin"} archive />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

InvisibleDishPage.propTypes = {
  type: PropTypes.string,
};

export default InvisibleDishPage;
