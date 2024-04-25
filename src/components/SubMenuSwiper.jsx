import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import categoryStore from "../store/filter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowUp } from "../icons/iconComponent";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={`-top-[58px] right-[5px] `}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"rotate-90"} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={`-top-[58px] left-[5px] xl:left-0 xl:right-[173px] `}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowUp className={"-rotate-90"} />
    </div>
  );
}

class SubMenuSwiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.items[0],
    };

    this.sliderRef = React.createRef();
  }

  render() {
    const { items, fnc } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    console.log(categoryStore.subCategory);

    return (
      <Slider
        ref={this.sliderRef}
        {...settings}
        className="z-0 w-[735px] flex gap-x-[94px] px-[94px] justify-between mx-auto"
      >
        {items.map(el => (
          <div key={el} className="mx-auto">
            <button
              onClick={() => fnc(el)}
              className={`text-xl ${
                el === this.state.active
                  ? "text-base-orange hover:underline hover:underline-offset-4"
                  : "text-beige hover:text-base-yellow hover:underline hover:underline-offset-4"
              }  uppercase mx-auto `}
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
