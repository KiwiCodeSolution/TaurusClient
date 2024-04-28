import MetaData from "../../components/MetaData";
import TitlePage from "../../adminSections/TitlePage";
import dishesStore from "../../store/dishes";

import { Link, useLocation } from "react-router-dom";
import { ArrowBack, Minus, Plus } from "../../icons/iconComponent";
import MenuItem from "../../components/MenuItem";
import { useState } from "react";

const HidePage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();
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

  console.log(openCategoryName);

  function openMenu(name) {
    setOpenCategoryName(name);
    setIsCategoryOpen(!isCategoryOpen);
  }

  return (
    <>
      <MetaData>Приховані страви</MetaData>
      <section className="w-[calc(100%-300px)] flex flex-col relative admin">
        <TitlePage>Приховані позиції меню</TitlePage>
        <div className="w-[914px] h-full mx-auto relative">
          <Link
            className="flex gap-x-2 absolute top-8 left-[20px] back text-beige hover:text-base-yellow items-center"
            to={location?.state?.from.pathname ?? "/"}
          >
            <ArrowBack className={"fill-beige"} />
            Повернутись
          </Link>
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

export default HidePage;
