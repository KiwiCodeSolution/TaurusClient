import PropTypes from "prop-types";
import Button from "./UI/Button";
import * as icons from "../icons/iconComponent";
import { Link, useLocation } from "react-router-dom";
import NoImage from "/images/no_image.png";

const PromoItem = ({ item, type }) => {
  const { image, sale, description, oldPrice, _id, label, title, newPrice } = item;
  const location = useLocation();

  return (
    <article className="w-[336px] md:w-[356px] h-[546px] md:h-[568px] py-6 px-4 md:py-8 md:px-6 border border-base-brown flex flex-col gap-y-6 justify-between relative mx-auto">
      <div className="w-[304px] h-[235px] border border-base-brown overflow-hidden relative">
        <img src={image ? `http://localhost:5000/${image}` : NoImage} alt="Promo" />
        <div className="w-[82px] h-8 px-1 py-3 text-18 font-medium text-base-black bg-base-orange flex items-center justify-center absolute top-3 left-0">
          Новина
        </div>
      </div>
      {label && (
        <div className="w-[75px] h-[72px] rounded-full bg-base-orange flex flex-col justify-center items-center text-white text-24 font-semibold absolute top-3 right-3">
          <span className="w-full text-center">{label}</span>
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <h3 className="w-full uppercase text-18 leading-[27px] text-base-yellow text-center">
          {title}
        </h3>
      </div>
      <p className="w-full text-center text-16 leading-6 text-beige">
        {description} <span className="font-semibold text-base-orange">{sale}.</span>
      </p>
      {oldPrice && (
        <ul className="flex gap-x-2 text-18 leading-[27px] justify-center mt-auto">
          <li className="text-base-yellow"> разом за </li>
          <li className="text-base-orange">{newPrice}</li>
          <li className="text-base-yellow"> замість </li>
          <li className="text-base-orange line-through">{oldPrice}</li>
        </ul>
      )}
      {type === "admin" ? (
        <div className="w-full flex justify-between items-center gap-x-4 mt-1">
          <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-beige cursor-pointer ">
            <Link
              className="w-full flex items-center justify-center"
              to={`/admin/access/site/promo/${_id}`}
              state={{ from: location }}
            >
              <icons.Edit className={"fill-beige w-4 h-4"} />
            </Link>
          </button>
          <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
            <icons.Show className={"fill-white w-4 h-4"} />
          </button>
          <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
            <icons.Archive className={"fill-white w-4 h-4"} />
          </button>
          <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
            <icons.Trash className={"fill-white w-4 h-4"} />
          </button>
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
    image: PropTypes.string,
    sale: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    label: PropTypes.string,
    oldPrice: PropTypes.number,
    newPrice: PropTypes.number,
  }).isRequired,
  type: PropTypes.string,
};

export default PromoItem;
