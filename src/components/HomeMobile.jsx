/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Location from "./Location.jsx";
import SocIcons from "./SocIcons";

const ITEMS_MOBILE = [
  {
    id: 1,
    image: "/images/home/start.jpg",
    alt: "загальне зображення їжі",
  },
  {
    id: 2,
    title: "замовити",
    image: "/images/home/delivery_mob.jpg",
    alt: "зображення однієї зі страв, яку можн азамовити",
    link: "/order",
  },
  {
    id: 3,
    title: "меню",
    image: "/images/home/menu_mob.jpg",
    alt: "загальне зображення їжі",
    link: "/menu",
  },
  {
    id: 4,
    title: "забронювати",
    image: "/images/home/reserve_mob.png",
    alt: "зображення напоїв, що подають у ресторані",
    link: "/reserve",
  },
];
const HomeMobile = () => {
  const [currentImage, setCurrentImage] = useState(1);

  // для мобільних пристроїв буде спрацьовувати ефект каруселі: кожні 3 секунди змінюється зображення
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        if (prevImage === 4) {
          return 1;
        } else if (prevImage === 1) {
          return 2;
        } else if (prevImage === 2) {
          return 3;
        } else {
          return 4;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-y-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 md:hidden">
        {ITEMS_MOBILE.map(
          el =>
            el.title && (
              <Link
                to={el.link}
                key={el.id}
                className={`w-full text-[32px] text-center uppercase font-medium leading-normal ${
                  currentImage === el.id ? "underline underline-offset-1" : ""
                } hover:text-base-yellow duration-300 ease-in cursor-pointer relative nav_link`}
              >
                {el.title}
              </Link>
            )
        )}
      </div>

      <div>
        <div className="mx-auto">
          {ITEMS_MOBILE.map(el => (
            <img
              key={el.id}
              src={el.image}
              alt={el.alt}
              className={`${el.id == currentImage ? "inline h-screen object-cover" : "hidden"}`}
            />
          ))}
        </div>

        <div className="w-full h-screen fixed top-0 left-0 bg-gradient-to-t from-[rgb(0,0,0,0.35)] to-[rgb(0,0,0,0.35)] z-0" />
      </div>

      <div className="w-[calc(100%-32px)] flex items-end justify-between md:hidden absolute bottom-8 left-3">
        <Location section="home_mobile" />

        <SocIcons section="home" />
      </div>
    </>
  );
};

export default HomeMobile;
