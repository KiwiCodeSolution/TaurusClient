/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowUp } from "../icons/iconComponent";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <button
      className={`-top-1/3 right-0 absolute w-12 h-12 rounded-full border border-base-beige justify-center hover:border-base-orange`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"rotate-90"} />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <button
      className={`-top-1/3 left-0 absolute w-12 h-12 rounded-full border border-base-beige justify-center hover:border-base-orange`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"-rotate-90"} />
    </button>
  );
}

class SubMenuSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.items.length > 0 ? props.items[0] : "", // Встановлюємо перший елемент активним за замовчуванням
    };

    this.sliderRef = React.createRef();
  }

  setActive(el) {
    this.setState({ active: el });
    this.props.fnc(el);
  }

  render() {
    const { items } = this.props;
    const { active } = this.state;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    console.log(active);

    return (
      <Slider
        ref={this.sliderRef}
        {...settings}
        className="z-0 w-[735px] flex gap-x-[94px] px-[94px] justify-between mx-auto mb-[18px]"
      >
        {items.map(el => (
          <div key={el} className="mx-auto">
            <button
              onClick={() => this.setActive(el)}
              className={`text-xl ${
                el === active
                  ? "text-base-orange hover:underline hover:underline-offset-4"
                  : "text-beige hover:text-base-yellow hover:underline hover:underline-offset-4"
              } uppercase mx-auto `}
            >
              {el}
            </button>
          </div>
        ))}
      </Slider>
    );
  }
}

SubMenuSwiper.propTypes = {
  items: PropTypes.array.isRequired,
  fnc: PropTypes.func.isRequired,
};

export default observer(SubMenuSwiper);
