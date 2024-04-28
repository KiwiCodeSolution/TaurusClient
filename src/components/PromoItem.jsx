import PropTypes from "prop-types";
import Button from "./UI/Button";
import * as icons from "../icons/iconComponent";
import { Link, useLocation } from "react-router-dom";

const PromoItem = ({ item, type }) => {
  const { src, sale, title, text, proposal, oldPrice, currentPrice, _id } = item;
  const location = useLocation();

  return (
    <article className="w-[356px] h-[568px] py-8 px-6 border border-base-brown flex flex-col gap-y-6 justify-between relative mx-auto">
      <div className="w-[308px] h-[235px] border border-base-brown overflow-hidden relative">
        <img src={src} className="w-[308px] h-[235px] object-cover" />
        <div className="w-[82px] h-8 px-1 py-3 text-18 font-medium text-base-black bg-base-orange flex items-center justify-center absolute top-3 left-0">
          Акція
        </div>
      </div>
      <div className="w-[75px] h-[72px] rounded-full bg-base-orange flex flex-col justify-center items-center text-white text-24 font-semibold absolute top-3 right-3">
        <span className="">{sale}</span>
        <span className="uppercase">off</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <h3 className="uppercase text-18 leading-[27px] text-base-yellow">{title}</h3>
        {/* <div className="w-[35px] h-[34px] flex justify-center items-center relative">
          <icons.Heart className={"absolute top-0 left-0"} />
          <p className="text-xs text-white leading-[15px] font-semibold absolute top-1/4 left-1/2 -translate-x-1/2 z-10">
            {proposal}
          </p>
        </div> */}
      </div>
      <p className="w-full text-center text-16 leading-6 text-beige">
        {text} <span className="font-semibold text-base-orange">{sale}.</span>
      </p>
      {oldPrice && (
        <ul className="flex gap-x-2 text-18 leading-[27px] justify-center mt-auto">
          <li className="text-base-yellow"> разом за </li>
          <li className="text-base-orange">{currentPrice}</li>
          <li className="text-base-orange line-through">{oldPrice}</li>
        </ul>
      )}
      {type === "admin" ? (
        <div className="w-full flex justify-between items-center gap-x-4 mt-1">
          <Link
            className="cursor-pointer w-fit h-[38px] py-[6px] px-3 bg-dark-btn-bg border border-beige text-16 text-beige flex items-center gap-x-2 btn_gray hover:border-base-orange hover:text-base-orange"
            to={`/admin/access/site/promo/${_id}`}
            state={{ from: location }}
          >
            <icons.Edit className={"fill-beige hover:fill-base-orange"} /> Редагувати
          </Link>

          <Button
            style={"transparent"}
            btnClass="flex items-center justify-center gap-x-[6px] trash"
          >
            <icons.Trash className={"fill-white w-4 h-4"} /> Видалити
          </Button>
        </div>
      ) : (
        <Button style="orange" btnClass="mt-auto">
          Замовити
        </Button>
      )}
    </article>
  );
};

PromoItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    sale: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    proposal: PropTypes.string,
    oldPrice: PropTypes.string,
    currentPrice: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
};

export default PromoItem;
