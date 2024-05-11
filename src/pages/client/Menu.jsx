import { observer } from "mobx-react-lite";
import MetaData from "../../components/MetaData";
import { useEffect } from "react";
import CategoriesList from "../../components/CategoriesList";

import CategoryFilter from "../../components/CategoryFilter";
import filterStore from "../../store/filter";
import dishStore from "../../store/dishes";

const Menu = observer(() => {
  useEffect(() => {
    dishStore.getDishesAction();
  }, []);

  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <main className="relative w-full">
        <img
          src={
            filterStore.topCategory === "основне меню"
              ? "/images/menu/dishes.jpg"
              : filterStore.topCategory === "десерти"
              ? "/images/menu/desserts.jpg"
              : "/images/menu/drinks.jpg"
          }
          alt=""
          className="w-full h-[198px] md:h-[416px] object-cover object-top border-b-[0.5px] border-base-brown"
        />
        <section className="wrapper w-full section-wrapper py-8 md:py-16">
          <CategoryFilter />
          <CategoriesList />
        </section>
      </main>
    </>
  );
});

export default Menu;
