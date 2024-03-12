/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { useState } from "react";

import MetaData from "../../components/MetaData";
import Location from "../../components/Location";
import SocIcons from "../../components/SocIcons";

const ITEMS = [
  {
    id: 1,
    title: "доставка",
    image: "/images/home/order.png",
    alt: "зображення однієї зі страв, яку можн азамовити",
    link: "/reserve",
  },
  { id: 2, title: "меню", image: "/images/home/food.jpg", alt: "загальне зображення їжі", link: "/menu" },
  {
    id: 3,
    title: "забронювати",
    image: "/images/home/reserve.png",
    alt: "зображення напоїв, що подають у ресторані",
    link: "/menu",
  },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(2);

  return (
    <>
      <MetaData>TaurusSoul Ресторан</MetaData>

      <div className="relative">
        <div className="flex justify-between mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          {ITEMS.map((el) => (
            <Link
              to={el.link}
              key={el.id}
              className={`${
                el.id === 2 ? "border-base-white border-l-4 border-r-4" : ""
              } w-fit text-5xl uppercase font-medium leading-normal hover:text-base-yellow duration-300 ease-in cursor-pointer px-14 py-5 relative overflow-hidden pb-1 nav_link`}
              onMouseEnter={() => setCurrentImage(el.id)}
            >
              <span className="relative">
                <span className="before:block before:bg-base-yellow before:opacity-[.8] before:w-full before:h-[2px] before:rounded-full before:absolute before:translate-x-[-200%] line" />
                {el.title}
                <span className="after:block after:bg-base-yellow after:opacity-[.8] after:w-full after:h-[2px] after:rounded-full after:absolute after:translate-x-[200%] line" />
              </span>
            </Link>
          ))}
        </div>

        <div>
          {ITEMS.map((el) => (
            <img
              key={el.id}
              src={el.image}
              alt={el.alt}
              className={`${el.id == currentImage ? "inline w-full h-screen object-cover" : "hidden"}`}
              style={{
                backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                zIndex: 10,
              }}
            />
          ))}
          <div className="w-full h-screen fixed top-0 left-0 bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.5)] z-0" />
        </div>
        <div className="flex flex-col h-[70%] items-center justify-between absolute top-[225px] right-0 z-50">
          <Location section="home" />
          <SocIcons section="home" />
        </div>
      </div>
    </>
  );
};

export default Home;
