import PropTypes from "prop-types";
import Button from "./UI/Button";
import * as icons from "../icons/iconComponent";

const PromoItem = ({ item }) => {
  const { src, percent, title, text, proposal, oldPrice, currentPrice } = item;
  return (
    <article className="w-[356px] h-[568px] py-8 px-6 border border-base-brown flex flex-col gap-y-6 justify-between relative mx-auto">
      <div className="w-[308px] h-[235px] border border-base-brown overflow-hidden relative">
        <img src={src} className="w-[308px] h-[235px] object-cover" />
        <div className="w-[82px] h-8 px-1 py-3 text-18 font-medium text-base-back bg-base-orange flex items-center justify-center absolute top-3 left-0">
          Акція
        </div>
      </div>
      <div className="w-[75px] h-[72px] rounded-full bg-base-orange flex flex-col justify-center items-center text-white text-24 font-semibold absolute top-3 right-3">
        <span className="">{percent}</span>
        <span className="uppercase">off</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <h3 className="uppercase text-18 leading-[27px] text-base-yellow">{title}</h3>
        <div className="w-[35px] h-[34px] flex justify-center items-center relative">
          <icons.Heart className={"absolute top-0 left-0"} />
          <p className="text-xs text-white leading-[15px] font-semibold absolute top-1/4 left-1/2 -translate-x-1/2 z-10">
            {proposal}
          </p>
        </div>
      </div>
      <p className="w-full text-center text-16 leading-6 text-lite-yellow">
        {text} <span className="font-semibold text-base-orange">{percent}.</span>
      </p>
      {oldPrice && (
        <ul className="flex gap-x-2 text-18 leading-[27px] justify-center mt-auto">
          <li className="text-base-yellow"> разом за </li>
          <li className="text-base-orange">{currentPrice}</li>
          <li className="text-base-orange line-through">{oldPrice}</li>
        </ul>
      )}
      <Button style="orange" btnClass="mt-auto">
        Замовити
      </Button>
    </article>
  );
};

PromoItem.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    percent: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    proposal: PropTypes.string,
    oldPrice: PropTypes.string,
    currentPrice: PropTypes.string,
  }).isRequired,
};

export default PromoItem;
