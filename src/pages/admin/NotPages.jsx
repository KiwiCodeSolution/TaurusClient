import { NavLink } from "react-router-dom";
import MetaData from "../../components/MetaData";
import Button from "../../components/UI/Button";

const NotPages = () => {
  return (
    <>
      <MetaData>Такої сторінки не існує</MetaData>
      <section className="section-wrapper pt-[106px] bg-base-black h-screen">
        <div className="flex flex-col gap-y-10 mx-auto w-fit text-center">
          <h1 className="text-not_found">Oops!</h1>
          <p className="text-[36px] text-beige">404 - Таку сторінку не знайдено</p>
          <p className="w-[420px] text-14 text-beige mx-auto">
            Сторінку, яку Ви шукаєте, не вдалося знайти. Можливо, її було видалено, її ім’я змінено
            або вона тимчасово недоступна.
          </p>
          <Button style={"orange"} btnClass={"font-medium text-base-black text-18"}>
            <NavLink to="/admin/access">Перейти на доашню сторінку</NavLink>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotPages;
