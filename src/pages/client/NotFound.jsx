import { NavLink } from "react-router-dom";
import MetaData from "../../components/MetaData";
import Button from "../../components/UI/Button";

const NotFound = () => {
  return (
    <>
      <MetaData>Немає такої сторінки</MetaData>
      <section className="section-wrapper pt-[106px] bg-[url('/images/not_found_page.png')] bg-cover bg-no-repeat bg-center h-screen">
        <div className="flex flex-col gap-y-10 mx-auto w-fit text-center">
          <h1 className="text-not_found">Oops!</h1>
          <p className="text-[36px] text-beige">404 - Таку сторінку не знайдено</p>
          <p className="w-[420px] text-14 text-beige mx-auto">
            Сторінку, яку Ви шукаєте, не вдалося знайти. Можливо, її було видалено, її ім’я змінено
            або вона тимчасово недоступна.
          </p>
          <Button style={"orange"} btnClass={"font-medium text-base-black text-18"}>
            <NavLink to="/">Перейти на Головну сторінку</NavLink>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
