import { observer } from "mobx-react-lite";
import { Check, Trash, Edit } from "../icons/iconComponent";
import { Link, useLocation } from "react-router-dom";

const MenuItem = observer(({ item, section }) => {
  const location = useLocation();

  if (!item) {
    return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  }

  const { name, price, unit, description, action, _id } = item;

  return (
    <article
      className={`${
        section === "admin"
          ? "gap-x-5 min-h-[74px] border-b border-base-brown border-dashed"
          : "w-[831px] gap-x-14"
      } flex mx-auto items-center justify-between`}
    >
      <ul
        className={`flex flex-col text-beige  overflow-hidden ${
          section === "order" ? "w-[546px]" : section === "admin" ? "w-[488px]" : "w-full"
        }`}
      >
        <li className="text-lg uppercase">{name}</li>
        <li className="text-sm flex justify-between">
          <p className="w-fit relative">
            {description} ({unit})
            <span className="w-[90%] absolute top-0 left-[100%] z-0">
              ....................................................................................................................................................................................................................................................................................................................................................................................................
            </span>
          </p>
          {section !== "admin" && <p className="w-fit h-full bg-base-black z-10">{price}грн</p>}
        </li>
        <li className="text-xs text-base-brown">Pasta with vegan meatballs and tomato sauce</li>
      </ul>
      {section === "admin" && (
        <ul className="w-[426px] flex justify-between items-center gap-x-5">
          <li className="w-[73px] flex items-center justify-center bg-dark-bg text-base-yellow text-14 font-semibold mx-auto">
            {price}грн.
          </li>
          <li className="w-[41px]">
            <div className="w-5 h-5 border rounded-[4px] border-base-brown mx-auto">
              {action && <Check />}
            </div>
          </li>
          <li className="w-[56px] flex items-center justify-center bg-dark-bg text-beige text-14 mx-auto">
            {/* {salary}% */}
            -20%
          </li>
          <li className="w-[83px] flex items-center justify-center">
            <Link
              className="cursor-pointer"
              to={`/admin/access/site/menu/${_id}`}
              state={{ from: location }}
            >
              <Edit className={"fill-beige hover:fill-base-orange"} />
            </Link>
          </li>
          <li className="w-[73px] flex items-center justify-center">
            <button className="cursor-pointer">
              <Trash className={"fill-beige hover:fill-base-orange"} />
            </button>
          </li>
        </ul>
      )}
    </article>
  );
});

export default MenuItem;
