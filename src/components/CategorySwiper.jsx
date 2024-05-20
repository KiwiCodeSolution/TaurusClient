/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowUp } from "../icons/iconComponent";
import { ITEM_TOP_CATEGORY } from "../data/constants";

function CategoryNextArrow(props) {
  const { style, onClick, disabled } = props;

  return (
    <button
      className={`top-1/3 -right-0 absolute w-12 h-12 rounded-full border border--beige justify-center hover:border-base-orange z-[20] cursor-pointer disabled:opacity-20 disabled:cursor-auto`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
      disabled={!disabled}
    >
      <ArrowUp className={"rotate-90"} />
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
      <ArrowUp className={"-rotate-90"} />
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
        <Slider ref={this.sliderRef} {...settings} className="w-full mt-8">
          {ITEM_TOP_CATEGORY.map(({ id, IconHover, title }) => (
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

CategorySwiper.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentId: PropTypes.number.isRequired,
};

export default CategorySwiper;
