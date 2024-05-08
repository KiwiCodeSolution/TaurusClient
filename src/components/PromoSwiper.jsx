/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import items from "../data/promo.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowUp } from "../icons/iconComponent";

function PromoNextArrow(props) {
  const { style, onClick } = props;
  return (
    <button
      className={`bottom-[230px] right-[82px] absolute w-12 h-12 rounded-full border border-base-beige justify-center hover:border-base-orange z-[20]`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"rotate-90"} />
    </button>
  );
}

function PromoPrevArrow(props) {
  const { style, onClick } = props;
  return (
    <button
      className={`bottom-[230px] left-[82px] absolute w-12 h-12 rounded-full border border-base-beige justify-center hover:border-base-orange z-[20]`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"-rotate-90"} />
    </button>
  );
}

class PromoSwiper extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
  }

  render() {
    const settings = {
      infinite: true,
      autoplay: true,

      autoplaySpeed: 3500,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <PromoNextArrow />,
      prevArrow: <PromoPrevArrow />,
    };

    return (
      <Slider ref={this.sliderRef} {...settings} className="">
        {items.map(el => (
          <img
            src={el.src}
            alt={el.alt}
            key={el.alt}
            className="w-full h-[416px] object-cover border-b-[0.5px] border-base-brown object-bottom"
          />
        ))}
      </Slider>
    );
  }
}

PromoSwiper.propTypes = {
  items: PropTypes.array.isRequired,
};

export default observer(PromoSwiper);
