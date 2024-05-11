/* eslint-disable react/prop-types */
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import React, { Component } from "react";
import Slider from "react-slick";
import * as icons from "../icons/iconComponent";
import categoryStore from "../store/filter";
import useMediaQuery from "../hooks/useMediaQuery";

const ICONS = [
  {
    id: 1,
    Icon: icons.Menu,
    IconHover: icons.MenuHover,
    topCategoryName: "основне меню",
    title: "основне меню",
  },
  {
    id: 2,
    Icon: icons.Desserts,
    IconHover: icons.DessertsHover,
    topCategoryName: "десерти",
    title: "десерти",
  },
  {
    id: 3,
    Icon: icons.Drinks,
    IconHover: icons.DrinksHover,
    topCategoryName: "напої",
    title: "напої",
  },
];

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CategoryNextArrow(props) {
  const { style, onClick, disabled } = props;

  return (
    <button
      className={`top-1/3 -right-0 absolute w-12 h-12 rounded-full border border--beige justify-center hover:border-base-orange z-[20] cursor-pointer disabled:opacity-20 disabled:cursor-auto`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
      disabled={!disabled}
    >
      <icons.ArrowUp className={"rotate-90"} />
    </button>
  );
}

function CategoryPrevArrow(props) {
  const { style, onClick, disabled } = props;

  return (
    <button
      className={`top-1/3 -left-0 absolute w-12 h-12 rounded-full border border-beige justify-center hover:border-base-orange z-[20] cursor-pointer disabled:opacity-20 disabled:cursor-auto`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
      disabled={!disabled}
    >
      <icons.ArrowUp className={"-rotate-90"} />
    </button>
  );
}

class CategorySwiper extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
  }

  goToPrev = () => {
    this.sliderRef.current.slickPrev();
    this.props.onClick("minus"); // Go to previous slide
  };

  goToNext = () => {
    this.sliderRef.current.slickNext();
    this.props.onClick("plus"); // Go to next slide
  };

  render() {
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <>
        <Slider ref={this.sliderRef} {...settings} className="w-full">
          {ICONS.map(({ id, IconHover, title }) => (
            <div className="w-full flex flex-col items-center justify-center" key={id}>
              <div className="w-[80px] h-[80px] mb-4 mx-auto">
                <IconHover />
              </div>
              <p className="text-lg uppercase mx-auto text-center text-base-orange">{title}</p>
            </div>
          ))}
        </Slider>
        <CategoryNextArrow onClick={this.goToNext} disabled={this.props.currentId < 3} />
        <CategoryPrevArrow onClick={this.goToPrev} disabled={this.props.currentId > 1} />
      </>
    );
  }
}

const CategoryFilter = observer(({ page }) => {
  const { isMobile } = useMediaQuery();
  const [currentTopTitle, setCurrentTopTitle] = useState(categoryStore.topCategory);
  const [currentId, setCurrentId] = useState(1);

  function handleChangeCategory(topCategoryName) {
    setCurrentTopTitle(topCategoryName);
    categoryStore.setTopCategory(topCategoryName);
  }

  function swiperClick(type) {
    if (type === "plus") {
      setCurrentId(currentId + 1);
    }
    if (type === "minus") {
      setCurrentId(currentId - 1);
    }
  }

  useEffect(() => {
    const filterCategory = ICONS.filter(el => el.id === currentId);
    handleChangeCategory(filterCategory[0].topCategoryName);
  }, [currentId]);

  return (
    <>
      <ul className="category-list">
        <li
          className={`${
            page === "admin" ? "mb-10" : "mb-6 md:mb-9"
          } flex gap-x-3 md:gap-x-4 items-center justify-center w-full`}
        >
          {page !== "admin" && page !== "order" && <icons.Devices />}

          <h1
            className={`${
              page === "admin" ? "text-[32px] mt-12 mb-1" : "text-[32px] md:text-[53px]"
            }  text-beige uppercase`}
          >
            {page !== "order" ? "Меню" : "Меню доставки"}
          </h1>
        </li>
        <li
          className={`${
            page !== "admin" ? "w-[320px] xl:w-[736px] border_menu pb-10" : "w-[851px] pb-3"
          } flex xl:gap-x-14 mx-auto relative`}
        >
          {isMobile ? (
            <CategorySwiper onClick={swiperClick} currentId={currentId} />
          ) : (
            ICONS.map(({ id, Icon, IconHover, topCategoryName, title }) => (
              <button
                key={id + topCategoryName}
                className={`flex items-center justify-between hover:underline hover:underline-offset-4 menu-list py-[29px] ${
                  title === categoryStore.topCategory
                    ? "text-base-orange hover:underline hover:underline-offset-4"
                    : "text-beige"
                } 
              ${
                page === "admin"
                  ? "w-[237px] h-[55px] hover:text-base-yellow"
                  : "w-[208px] h-[208px] flex-col"
              }
               ${page === "admin" && title === categoryStore.topCategory ? "bg-dark-btn-bg" : ""}
               `}
                onClick={() => handleChangeCategory(topCategoryName, title, id)}
              >
                {page !== "admin" && (
                  <div className="w-[112px] h-[112px] flex pb-6 items-end justify-center">
                    {title === categoryStore.topCategory ? <IconHover /> : <Icon />}
                  </div>
                )}

                <p className="text-xl uppercase mx-auto">{title}</p>
              </button>
            ))
          )}
        </li>
        {page === "admin" && <li className="border_admin_menu w-[916px] mx-auto" />}
      </ul>
      {page !== "admin" && (
        <h3 className="w-full text-center text-[27px] text-beige uppercase mt-10 mb-8">
          {currentTopTitle}
        </h3>
      )}
    </>
  );
});

export default CategoryFilter;
