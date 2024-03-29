/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { useState } from "react";

const ITEMS = [
  { id: 1, title: "їжа", image: "/images/home/food.jpg", alt: "загальне зображення їжі", link: "/menu" },
  {
    id: 2,
    title: "замовити",
    image: "/images/home/order.png",
    alt: "зображення однієї зі страв, яку можн азамовити",
    link: "/reserve",
  },
  {
    id: 3,
    title: "напої",
    image: "/images/home/beverages.png",
    alt: "зображення напоїв, що подають у ресторані",
    link: "/menu",
  },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(1);

  return (
    <div className="relative">
      <div className="flex justify-between mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        {ITEMS.map((el) => (
          <Link to={el.link} key={el.id} className={`${el.id === 2 ? "border-base-white border-l-4 border-r-4" : ""}`}>
            <button
              onMouseEnter={() => setCurrentImage(el.id)}
              className="w-fit text-5xl uppercase font-medium leading-normal hover:text-base-yellow duration-300 ease-in cursor-pointer px-14"
            >
              {el.title}
            </button>
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
        <div className="w-full h-screen fixed top-0 left-0 bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.5)]" />
      </div>
    </div>
  );
};

export default Home;
